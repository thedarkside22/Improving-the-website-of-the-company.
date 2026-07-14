/* ==========================================================================
   design-9.js — ANIMATION LAYER for Design H (Masarat for Accreditation)
   Add-on only: load AFTER design-8.js. Contains just the interactive product
   animations. Reveal/counters/timeline/nav all come from design-8.js.
   Vanilla JS, no dependencies. Every module no-ops if its targets are absent.
   All motion respects prefers-reduced-motion.
   ========================================================================== */
(function(){
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var clamp = function(v,a,b){ return v<a?a:(v>b?b:v); };
  var lerp  = function(a,b,t){ return a+(b-a)*t; };

  /* ---- 1 · cleanroom assembly (scroll-scrub) ---------------------------- */
  (function(){
    var scroll = document.getElementById("assemblyScroll");
    var svg    = document.getElementById("assemblySvg");
    if(!scroll || !svg) return;
    var pieces = Array.prototype.slice.call(svg.querySelectorAll(".piece"));
    var labels = document.getElementById("assemblyLabels");
    var bar    = document.getElementById("assemblyBar");
    var steps  = Array.prototype.slice.call(scroll.querySelectorAll(".assembly-copy .astep"));
    var ticking = false, inView = true;

    function apply(p){
      var e = p<.5 ? 4*p*p*p : 1-Math.pow(-2*p+2,3)/2; /* easeInOutCubic */
      pieces.forEach(function(g){
        var dx = parseFloat(g.getAttribute("data-dx"))||0;
        var dy = parseFloat(g.getAttribute("data-dy"))||0;
        var tx = lerp(dx,0,e), ty = lerp(dy,0,e);
        g.setAttribute("transform","translate("+tx.toFixed(1)+","+ty.toFixed(1)+")");
        g.style.opacity = lerp(.12,1,clamp(e*1.3,0,1)).toFixed(3);
      });
      if(labels) labels.setAttribute("opacity", clamp((p-.82)/.18,0,1).toFixed(3));
      if(bar) bar.style.width = (p*100).toFixed(1)+"%";
      var idx = p<.34 ? 0 : (p<.7 ? 1 : 2);
      steps.forEach(function(s,i){ s.classList.toggle("active", i===idx); });
    }
    function progress(){
      var r = scroll.getBoundingClientRect();
      var total = r.height - window.innerHeight;
      return clamp(-r.top/(total||1),0,1);
    }
    function onScroll(){
      if(ticking || !inView) return;
      ticking = true;
      window.requestAnimationFrame(function(){ apply(progress()); ticking=false; });
    }
    if(reduce){ apply(1); return; }
    if("IntersectionObserver" in window){
      new IntersectionObserver(function(en){ inView = en[0].isIntersecting; if(inView) onScroll(); },
        {threshold:0}).observe(scroll);
    }
    window.addEventListener("scroll", onScroll, {passive:true});
    window.addEventListener("resize", onScroll);
    apply(progress());
  })();

  /* ---- 2 · HEPA filtration (canvas particle sim) ------------------------ */
  (function(){
    var canvas = document.getElementById("hepaCanvas");
    if(!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    var wrap = canvas.parentElement;
    var toggle = document.getElementById("hepaToggle");
    var stateLbl = document.getElementById("hepaState");
    var zoneLbl = document.getElementById("zoneStatus");
    var modeNote = document.getElementById("modeNote");
    var capturedEl = document.getElementById("capturedN");
    var escapedEl = document.getElementById("escapedN");

    var DPR = Math.min(window.devicePixelRatio||1, 2);
    var W=0,H=0, filterY=0, spanL=0, spanR=0;
    var particles=[], clean=[], captured=[], haze=0;
    var capturedCount=0, escapedCount=0, filterOn=true, raf=null, running=false;

    function resize(){
      W = wrap.clientWidth; H = wrap.clientHeight;
      canvas.width = W*DPR; canvas.height = H*DPR;
      ctx.setTransform(DPR,0,0,DPR,0,0);
      filterY = H*0.42; spanL = W*0.12; spanR = W*0.88;
    }
    function rand(a,b){ return a+Math.random()*(b-a); }
    function spawn(){
      particles.push({ x: rand(spanL, spanR), y: rand(-20,-4),
        vx: rand(-0.25,0.25), vy: rand(0.9,1.7), r: rand(1.6,3.2), micro: Math.random()<0.34 });
    }
    function spawnClean(){
      clean.push({ x: rand(spanL, spanR), y: filterY+rand(0,10), vy: rand(1.1,1.9), a: rand(.25,.6), len: rand(10,22) });
    }
    function drawFilter(){
      ctx.save();
      var y=filterY, amp=7, teeth=Math.max(10,Math.round((spanR-spanL)/16));
      ctx.beginPath(); ctx.moveTo(spanL,y-amp);
      for(var i=0;i<=teeth;i++){ var x=spanL+(spanR-spanL)*(i/teeth); ctx.lineTo(x, y+(i%2?amp:-amp)); }
      ctx.lineTo(spanR,y+amp); ctx.lineTo(spanR,y+16); ctx.lineTo(spanL,y+16); ctx.closePath();
      ctx.fillStyle = filterOn ? "rgba(221,227,255,.92)" : "rgba(150,120,120,.55)";
      ctx.fill();
      ctx.strokeStyle = filterOn ? "rgba(122,92,240,.7)" : "rgba(186,26,26,.6)";
      ctx.lineWidth=1.4; ctx.stroke();
      ctx.fillStyle="rgba(255,255,255,.14)";
      ctx.fillRect(spanL-10,y-amp-4,8,26); ctx.fillRect(spanR+2,y-amp-4,8,26);
      for(var c=0;c<captured.length;c++){ var p=captured[c];
        ctx.globalAlpha=p.a; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,6.28);
        ctx.fillStyle=p.micro?"#f2643c":"#8b90a6"; ctx.fill(); }
      ctx.globalAlpha=1; ctx.restore();
    }
    function step(){
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle="rgba(255,255,255,.03)"; ctx.fillRect(0,0,W,filterY);
      if(haze>0){ ctx.fillStyle="rgba(210,70,50,"+(haze*0.5).toFixed(3)+")"; ctx.fillRect(0,filterY+14,W,H-filterY-14); }
      else { ctx.fillStyle="rgba(37,179,232,.05)"; ctx.fillRect(0,filterY+14,W,H-filterY-14); }
      if(filterOn){
        if(clean.length<70 && Math.random()<0.9) spawnClean();
        ctx.lineWidth=1.4; ctx.strokeStyle="rgba(37,179,232,.5)";
        for(var i=clean.length-1;i>=0;i--){ var s=clean[i]; s.y+=s.vy;
          ctx.globalAlpha=s.a; ctx.beginPath(); ctx.moveTo(s.x,s.y); ctx.lineTo(s.x,s.y+s.len); ctx.stroke();
          if(s.y>H){ clean.splice(i,1); } }
        ctx.globalAlpha=1;
      }
      if(particles.length<130 && Math.random()<0.75) spawn();
      for(var j=particles.length-1;j>=0;j--){
        var p=particles[j];
        p.x+=p.vx; p.y+=p.vy; p.vy+=0.006;
        if(filterOn && p.y>=filterY-6 && p.y<=filterY+8 && p.x>spanL && p.x<spanR){
          p.a=rand(.55,.9); captured.push(p); particles.splice(j,1);
          capturedCount++; if(capturedEl) capturedEl.textContent=String(capturedCount);
          if(captured.length>240) captured.shift();
          continue;
        }
        if(!filterOn && p.y>filterY && !p.counted){ p.counted=true; escapedCount++;
          if(escapedEl) escapedEl.textContent=String(escapedCount);
          haze=clamp(haze+0.012,0,1); }
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,6.28);
        ctx.fillStyle=p.micro?"#f2643c":"#8b90a6"; ctx.globalAlpha=0.92; ctx.fill(); ctx.globalAlpha=1;
        if(p.y>H+10){ particles.splice(j,1); }
      }
      if(filterOn && haze>0){ haze=clamp(haze-0.004,0,1); }
      drawFilter();
      raf = window.requestAnimationFrame(step);
    }
    function setMode(on){
      filterOn=on;
      if(stateLbl) stateLbl.textContent = on?"Filter ON":"Filter OFF · bypassed";
      if(zoneLbl){ zoneLbl.textContent = on?"ISO-clean":"contaminated"; zoneLbl.style.color = on?"var(--clean)":"#ff9a86"; }
      if(modeNote){
        modeNote.textContent = on
          ? "Clean, unidirectional airflow keeps the work zone within its ISO 14644 class."
          : "Without filtration, particles flood the work zone — product and people are exposed.";
        modeNote.classList.toggle("bypass", !on);
      }
    }
    function drawStatic(){
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle="rgba(37,179,232,.05)"; ctx.fillRect(0,filterY+14,W,H-filterY-14);
      for(var k=0;k<40;k++){ captured.push({x:rand(spanL,spanR),y:filterY+rand(-6,6),r:rand(1.6,3),a:.8,micro:Math.random()<.34}); }
      drawFilter();
    }
    function start(){ if(running) return; running=true; if(!reduce) step(); else drawStatic(); }
    function stop(){ running=false; if(raf) window.cancelAnimationFrame(raf); raf=null; }

    if(toggle) toggle.addEventListener("change", function(){ setMode(toggle.checked); });
    window.addEventListener("resize", function(){ resize(); });
    resize(); setMode(true);
    if("IntersectionObserver" in window){
      new IntersectionObserver(function(en){ if(en[0].isIntersecting) start(); else stop(); },
        {threshold:.12}).observe(canvas);
    } else { start(); }
  })();

  /* ---- 3 · BSC stream focus on hover / tap ------------------------------ */
  (function(){
    var items = document.querySelectorAll(".bsc-item[data-target]");
    if(!items.length) return;
    var groups = ["grp-down","grp-in","grp-ex"].map(function(id){ return document.getElementById(id); });
    function focus(id){
      groups.forEach(function(g){ if(!g) return;
        g.style.opacity = (!id || g.id===id) ? "1" : "0.16";
        g.style.transition="opacity .25s ease"; });
    }
    Array.prototype.forEach.call(items, function(it){
      var t=it.getAttribute("data-target");
      it.addEventListener("mouseenter", function(){ focus(t); });
      it.addEventListener("mouseleave", function(){ focus(null); });
      it.addEventListener("focusin", function(){ focus(t); });
      it.addEventListener("focusout", function(){ focus(null); });
      it.setAttribute("tabindex","0");
    });
  })();

})();
