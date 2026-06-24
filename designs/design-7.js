/* ==========================================================================
   Design F — "Precision"  ·  Masarat for Accreditation
   Shared interactions for all design-6-*.html pages.
   Vanilla JS, no dependencies. Every module no-ops if its targets are absent.
   All motion respects prefers-reduced-motion.
   ========================================================================== */
(function () {
  "use strict";
  var REDUCE = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---- 1. Header: sticky shrink + shadow -------------------------------- */
  function initHeader() {
    var header = $(".site-header");
    if (!header) return;
    var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 10); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- 2. Mobile overlay menu + accordions ------------------------------ */
  function initMobileMenu() {
    var toggle = $("#navToggle");
    var menu = $("#mobileMenu");
    if (!toggle || !menu) return;
    var lastFocus = null;
    function open() {
      lastFocus = document.activeElement;
      menu.classList.add("open");
      menu.setAttribute("aria-hidden", "false");
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
      var first = menu.querySelector("a,button");
      if (first) first.focus();
    }
    function close() {
      menu.classList.remove("open");
      menu.setAttribute("aria-hidden", "true");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    }
    toggle.addEventListener("click", open);
    $$("[data-mobile-close]", menu).forEach(function (b) { b.addEventListener("click", close); });
    $$("nav a", menu).forEach(function (a) { a.addEventListener("click", close); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && menu.classList.contains("open")) close(); });
    // simple focus trap
    menu.addEventListener("keydown", function (e) {
      if (e.key !== "Tab") return;
      var f = $$("a,button,input,select,textarea", menu).filter(function (el) { return el.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    // accordions inside the mobile menu
    $$(".m-acc-toggle", menu).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var panel = btn.nextElementSibling;
        var open = panel.classList.toggle("open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
    });
  }

  /* ---- 3. Scroll reveal (staggered) ------------------------------------- */
  function initReveal() {
    var els = $$(".reveal");
    if (!els.length) return;
    if (REDUCE || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    // auto-stagger by order within parent
    var counts = new WeakMap();
    els.forEach(function (el) {
      if (el.style.transitionDelay) return;
      var p = el.parentNode, n = counts.get(p) || 0;
      el.style.transitionDelay = Math.min(n, 6) * 70 + "ms";
      counts.set(p, n + 1);
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---- 4. Count-up stats ------------------------------------------------ */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    var prefix = el.getAttribute("data-prefix") || "";
    if (isNaN(target)) return;
    if (REDUCE) { el.textContent = prefix + target + suffix; return; }
    var dur = 1500, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  function initCounters() {
    var els = $$("[data-count]");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) { els.forEach(animateCount); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { animateCount(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.5 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---- 5. Delivery timeline: scroll-linked progress --------------------- */
  function initTimeline() {
    var tl = $("#delivery");
    if (!tl) return;
    var progress = $(".timeline-progress", tl);
    var phases = $$(".phase", tl);
    if (!progress || !phases.length) return;
    function update() {
      var rect = tl.getBoundingClientRect();
      var vh = window.innerHeight;
      var trigger = vh * 0.6;
      var total = rect.height;
      var passed = Math.min(Math.max(trigger - rect.top, 0), total);
      progress.style.height = (passed / total * 100) + "%";
      phases.forEach(function (ph) {
        var pr = ph.getBoundingClientRect();
        ph.classList.toggle("active", pr.top < trigger);
      });
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  /* ---- 6. Filter + search (projects / products) ------------------------- */
  function initFilters() {
    $$("[data-filter-group]").forEach(function (group) {
      var btns = $$(".filter-btn", group);
      var gridSel = group.getAttribute("data-target");
      var grid = gridSel ? $(gridSel) : group.nextElementSibling;
      if (!grid) return;
      var items = $$("[data-cat]", grid);
      var searchInput = $(".js-search", group) || $("#" + (group.getAttribute("data-search") || ""));
      var current = "all";
      function apply() {
        var q = (searchInput && searchInput.value || "").trim().toLowerCase();
        items.forEach(function (it) {
          var cats = (it.getAttribute("data-cat") || "").toLowerCase();
          var text = (it.getAttribute("data-search") || it.textContent || "").toLowerCase();
          var okCat = current === "all" || cats.indexOf(current) > -1;
          var okText = !q || text.indexOf(q) > -1;
          it.classList.toggle("is-hidden", !(okCat && okText));
        });
      }
      btns.forEach(function (b) {
        b.addEventListener("click", function () {
          btns.forEach(function (x) { x.classList.remove("active"); x.setAttribute("aria-pressed", "false"); });
          b.classList.add("active"); b.setAttribute("aria-pressed", "true");
          current = (b.getAttribute("data-filter") || "all").toLowerCase();
          apply();
        });
      });
      if (searchInput) searchInput.addEventListener("input", apply);
      apply();
    });
  }

  /* ---- 7. Video on hover (project cards) -------------------------------- */
  function initHoverVideo() {
    $$(".project-card").forEach(function (card) {
      var v = card.querySelector("video");
      if (!v) return;
      card.addEventListener("mouseenter", function () { var p = v.play(); if (p && p.catch) p.catch(function () {}); });
      card.addEventListener("mouseleave", function () { v.pause(); try { v.currentTime = 0; } catch (e) {} });
    });
  }

  /* ---- 8. Product quick-view drawer ------------------------------------- */
  function initDrawer() {
    var drawer = $("#drawer");
    if (!drawer) return;
    var body = $("#drawerBody", drawer);
    var lastFocus = null;
    function open(html, title) {
      lastFocus = document.activeElement;
      if (body) body.innerHTML = html;
      drawer.classList.add("open");
      drawer.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      var c = $(".drawer-close", drawer);
      if (c) c.focus();
    }
    function close() {
      drawer.classList.remove("open");
      drawer.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    }
    $$(".qv-trigger").forEach(function (t) {
      t.addEventListener("click", function () {
        var card = t.closest(".product-card") || document;
        var content = card.querySelector(".qv-content");
        open(content ? content.innerHTML : "", "");
      });
    });
    $$("[data-drawer-close]", drawer).forEach(function (b) { b.addEventListener("click", close); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && drawer.classList.contains("open")) close(); });
  }

  /* ---- 9. Contact form (front-end demo) --------------------------------- */
  function initForm() {
    var form = $("#quoteForm");
    if (!form) return;
    form.setAttribute("novalidate", "novalidate");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      $$(".field", form).forEach(function (field) {
        var input = field.querySelector("input,select,textarea");
        if (!input || !input.hasAttribute("required")) return;
        var valid = input.value.trim() !== "";
        if (input.type === "email") valid = valid && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
        field.classList.toggle("invalid", !valid);
        if (!valid) ok = false;
      });
      if (!ok) { var bad = form.querySelector(".field.invalid input,.field.invalid select,.field.invalid textarea"); if (bad) bad.focus(); return; }
      var success = $("#formSuccess");
      form.style.display = "none";
      if (success) { success.classList.add("show"); success.focus && success.focus(); }
    });
    $$(".field input,.field select,.field textarea", form).forEach(function (input) {
      input.addEventListener("input", function () { input.closest(".field").classList.remove("invalid"); });
    });
  }

  /* ---- 10. Misc: smooth anchors, scroll-spy, back-to-top, year ---------- */
  function initAnchors() {
    $$('a[href^="#"]').forEach(function (a) {
      var id = a.getAttribute("href");
      if (id === "#" || id.length < 2) return;
      a.addEventListener("click", function (e) {
        var target = document.getElementById(id.slice(1));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: REDUCE ? "auto" : "smooth", block: "start" });
        if (history.replaceState) history.replaceState(null, "", id);
      });
    });
  }
  function initScrollSpy() {
    var spy = $("[data-spy]");
    if (!spy) return;
    var links = $$('a[href^="#"]', spy);
    var map = links.map(function (l) { var s = document.getElementById(l.getAttribute("href").slice(1)); return s ? { l: l, s: s } : null; }).filter(Boolean);
    if (!map.length) return;
    function onScroll() {
      var pos = window.scrollY + 140, active = map[0];
      map.forEach(function (m) { if (m.s.offsetTop <= pos) active = m; });
      links.forEach(function (l) { l.classList.remove("active"); });
      if (active) active.l.classList.add("active");
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }
  function initBackToTop() {
    var btn = $("#backToTop");
    if (!btn) return;
    window.addEventListener("scroll", function () { btn.classList.toggle("show", window.scrollY > 500); }, { passive: true });
    btn.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: REDUCE ? "auto" : "smooth" }); });
  }
  function initYear() { $$(".js-year").forEach(function (el) { el.textContent = new Date().getFullYear(); }); }

  /* ---- boot ------------------------------------------------------------- */
  function init() {
    initHeader(); initMobileMenu(); initReveal(); initCounters(); initTimeline();
    initFilters(); initHoverVideo(); initDrawer(); initForm();
    initAnchors(); initScrollSpy(); initBackToTop(); initYear();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();


/* ==========================================================================
   Design G — "Precision+" enhancement layer (separate, self-contained IIFE).
   Adds: 3D tilt + cursor spotlight on cards, magnetic buttons, animated
   hero headline reveal, hero parallax. Skipped entirely under reduced motion.
   ========================================================================== */
(function () {
  "use strict";
  if (!window.matchMedia || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (window.matchMedia("(pointer: coarse)").matches) return; /* skip pointer effects on touch */
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* 3D tilt + cursor-follow spotlight */
  function tiltAndSpotlight() {
    $$(".card,.bento-item,.product-card,.pillar,.project-card").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width;
        var py = (e.clientY - r.top) / r.height;
        el.style.setProperty("--mx", (px * 100).toFixed(1) + "%");
        el.style.setProperty("--my", (py * 100).toFixed(1) + "%");
        var rx = (0.5 - py) * 5, ry = (px - 0.5) * 5;
        el.style.transform = "perspective(900px) rotateX(" + rx.toFixed(2) + "deg) rotateY(" + ry.toFixed(2) + "deg) translateY(-4px)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });
  }

  /* Magnetic buttons */
  function magnetic() {
    $$(".btn-primary,.btn-navy").forEach(function (b) {
      b.addEventListener("mousemove", function (e) {
        var r = b.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        b.style.transform = "translate(" + (x * 0.25).toFixed(1) + "px," + (y * 0.3).toFixed(1) + "px)";
      });
      b.addEventListener("mouseleave", function () { b.style.transform = ""; });
    });
  }

  /* Hero headline: wrap words (preserving inline elements) and stagger-reveal */
  function heroHeadline() {
    var h = $(".hero h1");
    if (!h) return;
    (function wrap(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (t) {
            if (t.trim() === "") { frag.appendChild(document.createTextNode(t)); }
            else { var s = document.createElement("span"); s.className = "word"; s.textContent = t; frag.appendChild(s); }
          });
          node.replaceChild(frag, n);
        } else if (n.nodeType === 1) { wrap(n); }
      });
    })(h);
    $$(".word", h).forEach(function (w, i) { w.style.transitionDelay = (i * 70) + "ms"; });
    requestAnimationFrame(function () { requestAnimationFrame(function () { h.classList.add("words-in"); }); });
  }

  /* Hero parallax: airflow follows cursor, glow drifts on scroll */
  function heroParallax() {
    var hero = $(".hero");
    if (!hero) return;
    var air = $$(".airflow", hero);
    hero.addEventListener("mousemove", function (e) {
      var r = hero.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / r.height - 0.5;
      air.forEach(function (l) { l.style.transform = "translate3d(" + (px * 14).toFixed(1) + "px," + (py * 14).toFixed(1) + "px,0)"; });
    });
    var glow = $(".hero-glow", hero);
    if (glow) window.addEventListener("scroll", function () { glow.style.transform = "translateY(" + (window.scrollY * 0.15).toFixed(1) + "px)"; }, { passive: true });
  }

  function init() { tiltAndSpotlight(); magnetic(); heroHeadline(); heroParallax(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
