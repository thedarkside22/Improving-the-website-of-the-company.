/* ==========================================================================
   design-9-3d.js — REAL 3D cleanroom assembly (Three.js) for Design H.
   Replaces the flat SVG assembly with true geometry, PBR materials, soft
   shadows, environment reflections and a scroll-scrubbed exploded assembly.
   Loads AFTER assets/vendor/three.min.js. No build step; enqueue both in
   WordPress (wp_enqueue_script) and mount into a Themify Code module.
   Self-guarding: no-ops if Three.js or its target elements are absent.
   Respects prefers-reduced-motion (renders the finished room, static).
   ========================================================================== */
(function () {
  "use strict";
  if (typeof THREE === "undefined") return;
  var mount = document.getElementById("cr3d");
  var canvas = document.getElementById("crCanvas");
  var scrollEl = document.getElementById("assemblyScroll");
  if (!mount || !canvas || !scrollEl) return;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var clamp = function (v, a, b) { return v < a ? a : (v > b ? b : v); };
  var lerp = function (a, b, t) { return a + (b - a) * t; };
  var easeIO = function (p) { return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2; };
  var smooth = function (edge0, edge1, x) { var t = clamp((x - edge0) / (edge1 - edge0), 0, 1); return t * t * (3 - 2 * t); };

  /* ---------- renderer ---------- */
  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch (e) { mount.classList.add("cr3d-nogl"); return; }
  if (!renderer || !renderer.getContext || !renderer.getContext()) { mount.classList.add("cr3d-nogl"); return; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.06;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  var TARGET = new THREE.Vector3(0, 1.35, -0.15);

  /* ---------- environment (soft studio gradient → reflections) ---------- */
  function gradientEnv() {
    var c = document.createElement("canvas"); c.width = 16; c.height = 256;
    var x = c.getContext("2d"); var g = x.createLinearGradient(0, 0, 0, 256);
    g.addColorStop(0, "#f6f8ff"); g.addColorStop(0.45, "#cdd6ea"); g.addColorStop(1, "#363c50");
    x.fillStyle = g; x.fillRect(0, 0, 16, 256);
    var t = new THREE.CanvasTexture(c); t.mapping = THREE.EquirectangularReflectionMapping; t.encoding = THREE.sRGBEncoding;
    return t;
  }
  var pmrem = new THREE.PMREMGenerator(renderer); pmrem.compileEquirectangularShader();
  var envTex = gradientEnv();
  scene.environment = pmrem.fromEquirectangular(envTex).texture;
  envTex.dispose();

  /* ---------- procedural maps (subtle realism, no image files) ---------- */
  function noiseRoughness() {
    var c = document.createElement("canvas"); c.width = c.height = 256; var x = c.getContext("2d");
    x.fillStyle = "#9a9a9a"; x.fillRect(0, 0, 256, 256);
    for (var i = 0; i < 9000; i++) {
      var v = 140 + Math.random() * 60;
      x.fillStyle = "rgba(" + v + "," + v + "," + v + ",0.05)";
      x.fillRect(Math.random() * 256, Math.random() * 256, 2, 2);
    }
    var t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(3, 3); return t;
  }
  function perforatedFace() {
    var c = document.createElement("canvas"); c.width = c.height = 256; var x = c.getContext("2d");
    x.fillStyle = "#eef1f7"; x.fillRect(0, 0, 256, 256);
    x.fillStyle = "#b9c0d0";
    for (var yy = 10; yy < 256; yy += 14) for (var xx = 10; xx < 256; xx += 14) { x.beginPath(); x.arc(xx, yy, 3.1, 0, 6.28); x.fill(); }
    var t = new THREE.CanvasTexture(c); return t;
  }
  var grpRough = noiseRoughness();
  var ffuTex = perforatedFace();

  /* ---------- materials ---------- */
  var matGRP = new THREE.MeshStandardMaterial({ color: 0xeef1f6, roughness: 0.62, metalness: 0.02, roughnessMap: grpRough, envMapIntensity: 0.7 });
  var matGRPside = new THREE.MeshStandardMaterial({ color: 0xe4e8f1, roughness: 0.66, metalness: 0.02, envMapIntensity: 0.6 });
  var matAlu = new THREE.MeshStandardMaterial({ color: 0xcfd3da, roughness: 0.34, metalness: 0.92, envMapIntensity: 1.0 });
  var matAluDark = new THREE.MeshStandardMaterial({ color: 0x9aa0ad, roughness: 0.4, metalness: 0.9, envMapIntensity: 0.9 });
  var matFloor = new THREE.MeshStandardMaterial({ color: 0xd3d7e2, roughness: 0.5, metalness: 0.04, envMapIntensity: 0.5 });
  var matGlass = new THREE.MeshStandardMaterial({ color: 0xbfe0f2, roughness: 0.08, metalness: 0.0, transparent: true, opacity: 0.42, envMapIntensity: 1.2 });
  var matDiffuser = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.55, metalness: 0.05, map: ffuTex, emissive: 0xdfe8ff, emissiveIntensity: 0.25 });
  var matOrange = new THREE.MeshStandardMaterial({ color: 0xF7941E, roughness: 0.5, metalness: 0.1 });

  /* ---------- lights ---------- */
  scene.add(new THREE.HemisphereLight(0xe4ebff, 0x2a2f42, 0.55));
  var key = new THREE.DirectionalLight(0xffffff, 1.15);
  key.position.set(6.5, 9.5, 7.5); key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.radius = 5; key.shadow.bias = -0.00022;
  var sc = key.shadow.camera; sc.near = 1; sc.far = 40; sc.left = -9; sc.right = 9; sc.top = 9; sc.bottom = -9;
  scene.add(key);
  var fill = new THREE.DirectionalLight(0xd8e2ff, 0.34); fill.position.set(-7, 4.5, -3); scene.add(fill);
  var rim = new THREE.DirectionalLight(0xffffff, 0.28); rim.position.set(-2, 6, -9); scene.add(rim);

  /* ---------- helpers ---------- */
  var root = new THREE.Group(); scene.add(root);
  var pieces = [];
  function box(w, h, d, mat) { var m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.castShadow = true; m.receiveShadow = true; return m; }

  // add an assembled object with an explode offset + timing window
  function piece(obj, pos, explode, t0, t1, spin) {
    obj.position.set(pos[0], pos[1], pos[2]);
    obj.userData = {
      home: new THREE.Vector3(pos[0], pos[1], pos[2]),
      off: new THREE.Vector3(explode[0], explode[1], explode[2]),
      t0: t0, t1: t1, spin: spin || 0
    };
    root.add(obj); pieces.push(obj); return obj;
  }

  // GRP wall panel with a recessed aluminium frame (edge that catches light)
  function grpPanel(w, h, d) {
    var g = new THREE.Group();
    var face = box(w, h, d, matGRP); g.add(face);
    var f = 0.05;
    var top = box(w, f, d + 0.01, matAlu); top.position.y = h / 2 - f / 2; g.add(top);
    var bot = box(w, f, d + 0.01, matAlu); bot.position.y = -h / 2 + f / 2; g.add(bot);
    var lft = box(f, h, d + 0.01, matAlu); lft.position.x = -w / 2 + f / 2; g.add(lft);
    var rgt = box(f, h, d + 0.01, matAlu); rgt.position.x = w / 2 - f / 2; g.add(rgt);
    return g;
  }

  // coved (quarter-round) corner run — the GRP signature
  function cove(len, axis) {
    var geo = new THREE.CylinderGeometry(0.12, 0.12, len, 20, 1, false, 0, Math.PI / 2);
    var m = new THREE.Mesh(geo, matGRPside); m.castShadow = true; m.receiveShadow = true;
    var grp = new THREE.Group(); grp.add(m);
    if (axis === "x") m.rotation.z = Math.PI / 2; // run along X
    return grp;
  }

  // HEPA fan-filter unit: housing + perforated diffuser face pointing down
  function ffu() {
    var g = new THREE.Group();
    var housing = box(1.25, 0.34, 1.25, matAluDark); g.add(housing);
    var face = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.1), matDiffuser);
    face.rotation.x = Math.PI / 2; face.position.y = -0.171; face.receiveShadow = true; g.add(face);
    return g;
  }

  var HW = 3, HD = 2, H = 3;        // half-width, half-depth, height
  var WALL = 0.14;

  /* ---------- floor ---------- */
  var floor = box(2 * HW + 0.3, 0.14, 2 * HD + 0.3, matFloor); floor.position.y = -0.07;
  piece(floor, [0, -0.07, 0], [0, -2.6, 0], 0.0, 0.24, 0);

  /* ---------- back wall (2 panels + door + header) at z=-HD ---------- */
  var bpL = grpPanel(2, H, WALL); piece(bpL, [-2, H / 2, -HD], [0, 0, -3.2], 0.14, 0.5, 0.1);
  var bpR = grpPanel(2, H, WALL); piece(bpR, [2, H / 2, -HD], [0, 0, -3.2], 0.16, 0.52, -0.1);
  var header = grpPanel(2, 0.8, WALL); piece(header, [0, H - 0.4, -HD], [0, 2.4, 0], 0.5, 0.72, 0);
  // door: frame + glass vision panel + handle
  var door = new THREE.Group();
  var leaf = box(1.15, 2.2, 0.1, matGRPside); door.add(leaf);
  var vp = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.85, 0.12), matGlass); vp.position.set(0, 0.35, 0); door.add(vp);
  var handle = box(0.05, 0.28, 0.05, matAlu); handle.position.set(0.42, -0.05, 0.07); door.add(handle);
  door.traverse(function (o) { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  piece(door, [0, 1.1, -HD + 0.03], [0, -2.6, 0.4], 0.62, 0.86, 0);

  /* ---------- side walls (2 panels each) ---------- */
  var lw1 = grpPanel(2, H, WALL); lw1.rotation.y = Math.PI / 2; piece(lw1, [-HW, H / 2, -1], [-3.2, 0, 0], 0.18, 0.54, 0.1);
  var lw2 = grpPanel(2, H, WALL); lw2.rotation.y = Math.PI / 2; piece(lw2, [-HW, H / 2, 1], [-3.2, 0, 0], 0.2, 0.56, 0.1);
  var rw1 = grpPanel(2, H, WALL); rw1.rotation.y = Math.PI / 2; piece(rw1, [HW, H / 2, -1], [3.2, 0, 0], 0.18, 0.54, -0.1);
  var rw2 = grpPanel(2, H, WALL); rw2.rotation.y = Math.PI / 2; piece(rw2, [HW, H / 2, 1], [3.2, 0, 0], 0.2, 0.56, -0.1);

  /* ---------- coved corners along wall/floor base ---------- */
  var cvL = cove(2 * HD, "z"); cvL.position.set(-HW + 0.12, 0.12, 0); cvL.rotation.y = 0; cvL.children[0].rotation.set(0, 0, 0); cvL.children[0].rotation.x = 0; piece(cvL, [-HW + 0.12, 0.12, 0], [-1.4, 0, 0], 0.44, 0.64, 0);
  var cvR = cove(2 * HD, "z"); cvR.position.set(HW - 0.12, 0.12, 0); cvR.children[0].rotation.y = Math.PI; piece(cvR, [HW - 0.12, 0.12, 0], [1.4, 0, 0], 0.46, 0.66, 0);
  var cvB = cove(2 * HW, "x"); cvB.position.set(0, 0.12, -HD + 0.12); piece(cvB, [0, 0.12, -HD + 0.12], [0, 0, -1.4], 0.48, 0.68, 0);

  /* ---------- ceiling grid (T-bar frame + panels) at y=H ---------- */
  var ceiling = new THREE.Group();
  var cw = 2 * HW, cd = 2 * HD, tb = 0.06;
  var cpanel = box(cw, 0.08, cd, matGRPside); cpanel.position.y = 0.02; ceiling.add(cpanel);
  for (var gx = -HW; gx <= HW; gx += 2) { var b = box(tb, 0.1, cd, matAlu); b.position.set(gx, -0.02, 0); ceiling.add(b); }
  for (var gz = -HD; gz <= HD; gz += 2) { var b2 = box(cw, 0.1, tb, matAlu); b2.position.set(0, -0.02, gz); ceiling.add(b2); }
  ceiling.traverse(function (o) { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  piece(ceiling, [0, H, 0], [0, 2.8, 0], 0.5, 0.8, 0);

  /* ---------- HEPA fan-filter units (drop in last) ---------- */
  var f1 = ffu(); piece(f1, [-1.5, H - 0.18, -0.4], [0, 4.2, 0], 0.76, 0.96, 0);
  var f2 = ffu(); piece(f2, [1.5, H - 0.18, 0.6], [0, 4.6, 0], 0.8, 0.99, 0);

  /* ---------- ground shadow catcher (beyond the slab) ---------- */
  var shadowMat = new THREE.ShadowMaterial({ opacity: 0.22 });
  var gnd = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), shadowMat);
  gnd.rotation.x = -Math.PI / 2; gnd.position.y = -0.14; gnd.receiveShadow = true; scene.add(gnd);

  /* ---------- progress → transforms + camera ---------- */
  var _v = new THREE.Vector3();
  function setProgress(p) {
    for (var i = 0; i < pieces.length; i++) {
      var o = pieces[i], u = o.userData;
      var lt = smooth(u.t0, u.t1, p);
      var e = easeIO(lt);
      _v.copy(u.off).multiplyScalar(1 - e);
      o.position.copy(u.home).add(_v);
      if (u.spin) o.rotation.z = (u._baseZ || 0) + u.spin * (1 - e);
    }
    // camera settles from a wider, higher 3/4 view into the hero framing
    var ce = easeIO(p);
    var az = lerp(-0.72, -0.52, ce);
    var rad = lerp(12.2, 9.7, ce);
    var hgt = lerp(5.0, 3.15, ce);
    camera.position.set(Math.sin(az) * rad, hgt, Math.cos(az) * rad);
    camera.lookAt(TARGET);
    // labels appear once assembled
    if (p > 0.9) mount.classList.add("cr3d-assembled"); else mount.classList.remove("cr3d-assembled");
  }
  // remember base rotation for spun pieces
  pieces.forEach(function (o) { o.userData._baseZ = o.rotation.z; });

  /* ---------- sizing ---------- */
  function resize() {
    var w = mount.clientWidth, h = mount.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  if ("ResizeObserver" in window) new ResizeObserver(resize).observe(mount);
  window.addEventListener("resize", resize);
  resize();

  /* ---------- scroll progress ---------- */
  function progressFromScroll() {
    var r = scrollEl.getBoundingClientRect();
    var total = r.height - window.innerHeight;
    return clamp(-r.top / (total || 1), 0, 1);
  }

  /* ---------- run loop (only while in view) ---------- */
  var pCur = 0, active = false, raf = null;
  function frame() {
    if (!active) return;
    var target = progressFromScroll();
    pCur += (target - pCur) * 0.16;
    if (Math.abs(target - pCur) < 0.0006) pCur = target;
    setProgress(pCur);
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  function start() { if (active) return; active = true; frame(); }
  function stop() { active = false; if (raf) cancelAnimationFrame(raf); raf = null; }

  if (reduce) {
    resize(); setProgress(1); renderer.render(scene, camera);
  } else if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (en) { if (en[0].isIntersecting) start(); else stop(); }, { threshold: 0 }).observe(scrollEl);
    // prime first frame
    pCur = progressFromScroll(); setProgress(pCur); renderer.render(scene, camera);
  } else {
    start();
  }
})();
