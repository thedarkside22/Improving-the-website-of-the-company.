/* ==========================================================================
   design-9-3d.js — REAL 3D cleanroom assembly (Three.js) for Design H.
   Modelled to match Masarat's actual room: warm-white GRP panels with
   vertical joints, black-framed rounded vision windows, a blue cleanroom
   door, a high-gloss mirror resin floor, and a ceiling with recessed LED
   panels + circular swirl diffusers. Scroll-scrubbed exploded assembly.
   Loads AFTER assets/vendor/three.min.js (+ optional Reflector.js).
   No build step; enqueue in WordPress and mount into a Themify Code module.
   Self-guarding; respects prefers-reduced-motion (renders finished room).
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
  var smooth = function (e0, e1, x) { var t = clamp((x - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t); };

  /* ---------- renderer ---------- */
  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch (e) { mount.classList.add("cr3d-nogl"); return; }
  if (!renderer || !renderer.getContext || !renderer.getContext()) { mount.classList.add("cr3d-nogl"); return; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(33, 1, 0.1, 100);
  var TARGET = new THREE.Vector3(0, 1.4, -0.1);

  /* ---------- environment (soft studio gradient → reflections) ---------- */
  function gradientEnv() {
    var c = document.createElement("canvas"); c.width = 16; c.height = 256;
    var x = c.getContext("2d"); var g = x.createLinearGradient(0, 0, 0, 256);
    g.addColorStop(0, "#ffffff"); g.addColorStop(0.5, "#dfe6f0"); g.addColorStop(1, "#5b6070");
    x.fillStyle = g; x.fillRect(0, 0, 16, 256);
    var t = new THREE.CanvasTexture(c); t.mapping = THREE.EquirectangularReflectionMapping; t.encoding = THREE.sRGBEncoding;
    return t;
  }
  var pmrem = new THREE.PMREMGenerator(renderer); pmrem.compileEquirectangularShader();
  var envTex = gradientEnv();
  scene.environment = pmrem.fromEquirectangular(envTex).texture;
  envTex.dispose();

  /* ---------- procedural textures (no image files) ---------- */
  function swirlTexture() {
    var c = document.createElement("canvas"); c.width = c.height = 256; var x = c.getContext("2d");
    x.fillStyle = "#f4f5f7"; x.fillRect(0, 0, 256, 256);
    x.translate(128, 128);
    x.strokeStyle = "#c2c6cf"; x.lineWidth = 2;
    for (var i = 0; i < 44; i++) {
      x.save(); x.rotate(i / 44 * Math.PI * 2);
      x.beginPath(); x.moveTo(18, 0); x.quadraticCurveTo(70, 26, 116, 8); x.stroke();
      x.restore();
    }
    x.strokeStyle = "#aeb3bd";
    [20, 118].forEach(function (r) { x.beginPath(); x.arc(0, 0, r, 0, 6.28); x.stroke(); });
    x.fillStyle = "#d5d8df"; x.beginPath(); x.arc(0, 0, 16, 0, 6.28); x.fill();
    var t = new THREE.CanvasTexture(c); return t;
  }
  var swirlTex = swirlTexture();

  /* ---------- materials ---------- */
  var matPanel = new THREE.MeshStandardMaterial({ color: 0xf0efe9, roughness: 0.58, metalness: 0.02, envMapIntensity: 0.55 });
  var matPanelSide = new THREE.MeshStandardMaterial({ color: 0xeae9e2, roughness: 0.62, metalness: 0.02, envMapIntensity: 0.5 });
  var matJoint = new THREE.MeshStandardMaterial({ color: 0xd7d6ce, roughness: 0.7, metalness: 0.0 });
  var matFrameBlack = new THREE.MeshStandardMaterial({ color: 0x14161b, roughness: 0.5, metalness: 0.25, envMapIntensity: 0.8 });
  var matGlass = new THREE.MeshStandardMaterial({ color: 0xdfeaf0, roughness: 0.05, metalness: 0.0, transparent: true, opacity: 0.5, envMapIntensity: 1.5 });
  var matBlue = new THREE.MeshStandardMaterial({ color: 0x1f52a8, roughness: 0.42, metalness: 0.05, envMapIntensity: 0.7 });
  var matAlu = new THREE.MeshStandardMaterial({ color: 0xcfd3da, roughness: 0.34, metalness: 0.92, envMapIntensity: 1.0 });
  var matCeil = new THREE.MeshStandardMaterial({ color: 0xf6f6f3, roughness: 0.7, metalness: 0.0, envMapIntensity: 0.4 });
  var matLED = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xf2f6ff, emissiveIntensity: 1.35, roughness: 0.5 });
  var matSwirl = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.55, metalness: 0.1, map: swirlTex });
  var matRed = new THREE.MeshStandardMaterial({ color: 0xd21f1f, roughness: 0.45 });

  /* ---------- shape helpers ---------- */
  function roundRect(w, h, r) {
    var s = new THREE.Shape(); var x = -w / 2, y = -h / 2;
    s.moveTo(x + r, y);
    s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
    s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
    s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
    return s;
  }
  // black-framed rounded vision window (faces +Z), embedded on a wall panel
  function visionWindow(w, h) {
    var g = new THREE.Group();
    var outer = roundRect(w, h, 0.11);
    var hole = roundRect(w - 0.14, h - 0.14, 0.08);
    outer.holes.push(hole);
    var frame = new THREE.Mesh(new THREE.ExtrudeGeometry(outer, { depth: 0.05, bevelEnabled: false }), matFrameBlack);
    frame.castShadow = true;
    var glass = new THREE.Mesh(new THREE.ShapeGeometry(roundRect(w - 0.14, h - 0.14, 0.08)), matGlass);
    glass.position.z = 0.03;
    g.add(frame); g.add(glass);
    return g;
  }

  var root = new THREE.Group(); scene.add(root);
  var pieces = [];
  function box(w, h, d, mat) { var m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.castShadow = true; m.receiveShadow = true; return m; }
  function piece(obj, pos, explode, t0, t1) {
    obj.position.set(pos[0], pos[1], pos[2]);
    obj.userData = { home: new THREE.Vector3(pos[0], pos[1], pos[2]), off: new THREE.Vector3(explode[0], explode[1], explode[2]), t0: t0, t1: t1 };
    root.add(obj); pieces.push(obj); return obj;
  }

  // GRP wall panel (faces +Z) with subtle vertical joint reveals + optional window
  function grpPanel(w, h, d, mat, withWindow) {
    var g = new THREE.Group();
    var face = box(w, h, d, mat || matPanel); g.add(face);
    var jl = box(0.02, h, d + 0.006, matJoint); jl.position.set(-w / 2 + 0.01, 0, 0); g.add(jl);
    var jr = box(0.02, h, d + 0.006, matJoint); jr.position.set(w / 2 - 0.01, 0, 0); g.add(jr);
    if (withWindow) { var win = visionWindow(0.95, 1.25); win.position.set(0, 0.18, d / 2 + 0.001); g.add(win); }
    return g;
  }

  var HW = 3, HD = 2, H = 3, WALL = 0.14;

  /* ---------- floor: glossy mirror resin (Reflector if available) ---------- */
  var floorPiece;
  if (typeof THREE.Reflector === "function") {
    var refGeo = new THREE.PlaneGeometry(2 * HW + 0.4, 2 * HD + 0.4);
    var reflector = new THREE.Reflector(refGeo, { textureWidth: 1024, textureHeight: 1024, color: 0xc4c8d0 });
    reflector.rotation.x = -Math.PI / 2;
    floorPiece = new THREE.Group(); floorPiece.add(reflector);
    // light epoxy tint over the mirror → bright, glossy resin floor (not a dark mirror)
    var gloss = new THREE.Mesh(new THREE.PlaneGeometry(2 * HW + 0.4, 2 * HD + 0.4),
      new THREE.MeshStandardMaterial({ color: 0xf3f5f8, roughness: 0.14, metalness: 0.0, transparent: true, opacity: 0.52, envMapIntensity: 1.0 }));
    gloss.rotation.x = -Math.PI / 2; gloss.position.y = 0.001; gloss.receiveShadow = true; floorPiece.add(gloss);
  } else {
    floorPiece = box(2 * HW + 0.4, 0.05, 2 * HD + 0.4,
      new THREE.MeshStandardMaterial({ color: 0xe7e9ec, roughness: 0.12, metalness: 0.1, envMapIntensity: 1.2 }));
  }
  piece(floorPiece, [0, 0, 0], [0, -2.6, 0], 0.0, 0.24);

  /* ---------- back wall: window · door-panel · window ---------- */
  var bpL = grpPanel(2, H, WALL, matPanel, true); piece(bpL, [-2, H / 2, -HD], [0, 0, -3.2], 0.14, 0.5);
  var bpR = grpPanel(2, H, WALL, matPanel, true); piece(bpR, [2, H / 2, -HD], [0, 0, -3.2], 0.16, 0.52);
  var bpC = grpPanel(2, H, WALL, matPanel, false); piece(bpC, [0, H / 2, -HD], [0, 0, -3.2], 0.18, 0.54);

  // blue cleanroom door on the centre panel (arrives a touch later)
  var door = new THREE.Group();
  var leaf = box(1.0, 2.15, 0.08, matBlue); door.add(leaf);
  var vwin = visionWindow(0.24, 1.05); vwin.position.set(-0.18, 0.35, 0.045); vwin.scale.set(0.95, 1, 1); door.add(vwin);
  var handle = box(0.05, 0.32, 0.05, matAlu); handle.position.set(0.36, 0.0, 0.07); door.add(handle);
  door.traverse(function (o) { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  piece(door, [0, 1.075, -HD + WALL / 2 + 0.02], [0, -2.6, 0.5], 0.6, 0.86);

  /* ---------- side walls (2 panels each, front one has a window) ---------- */
  var lw1 = grpPanel(2, H, WALL, matPanelSide, false); lw1.rotation.y = Math.PI / 2; piece(lw1, [-HW, H / 2, -1], [-3.2, 0, 0], 0.18, 0.54);
  var lw2 = grpPanel(2, H, WALL, matPanelSide, true); lw2.rotation.y = Math.PI / 2; piece(lw2, [-HW, H / 2, 1], [-3.2, 0, 0], 0.2, 0.56);
  var rw1 = grpPanel(2, H, WALL, matPanelSide, false); rw1.rotation.y = -Math.PI / 2; piece(rw1, [HW, H / 2, -1], [3.2, 0, 0], 0.18, 0.54);
  var rw2 = grpPanel(2, H, WALL, matPanelSide, true); rw2.rotation.y = -Math.PI / 2; piece(rw2, [HW, H / 2, 1], [3.2, 0, 0], 0.2, 0.56);

  /* ---------- coved corners along wall/floor base ---------- */
  function cove(len, along) {
    var geo = new THREE.CylinderGeometry(0.12, 0.12, len, 18, 1, false, 0, Math.PI / 2);
    var m = new THREE.Mesh(geo, matPanelSide); m.castShadow = true; m.receiveShadow = true;
    var g = new THREE.Group(); g.add(m);
    if (along === "x") m.rotation.z = Math.PI / 2;
    return g;
  }
  var cvL = cove(2 * HD, "z"); piece(cvL, [-HW + 0.12, 0.12, 0], [-1.4, 0, 0], 0.44, 0.64);
  var cvR = cove(2 * HD, "z"); cvR.children[0].rotation.y = Math.PI; piece(cvR, [HW - 0.12, 0.12, 0], [1.4, 0, 0], 0.46, 0.66);
  var cvB = cove(2 * HW, "x"); piece(cvB, [0, 0.12, -HD + 0.12], [0, 0, -1.4], 0.48, 0.68);

  /* ---------- ceiling: panels + T-bar + LED lights + swirl diffusers ---------- */
  var ceiling = new THREE.Group();
  var cw = 2 * HW, cd = 2 * HD, tb = 0.05;
  var cpanel = box(cw, 0.08, cd, matCeil); cpanel.position.y = 0.02; ceiling.add(cpanel);
  for (var gx = -HW + 2; gx < HW; gx += 2) { var b = box(tb, 0.06, cd, matAlu); b.position.set(gx, -0.03, 0); ceiling.add(b); }
  for (var gz = -HD + 2; gz < HD; gz += 2) { var b2 = box(cw, 0.06, tb, matAlu); b2.position.set(0, -0.03, gz); ceiling.add(b2); }
  // recessed LED flat panels (emissive)
  [[-1.4, -0.6], [1.6, 0.8]].forEach(function (p) {
    var led = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.62), matLED);
    led.rotation.x = Math.PI / 2; led.position.set(p[0], -0.045, p[1]); ceiling.add(led);
  });
  // circular swirl diffusers in square housings
  [[0.2, -0.7], [-1.5, 0.9]].forEach(function (p) {
    var house = box(0.8, 0.05, 0.8, matCeil); house.position.set(p[0], -0.02, p[1]); ceiling.add(house);
    var sw = new THREE.Mesh(new THREE.CircleGeometry(0.34, 40), matSwirl);
    sw.rotation.x = Math.PI / 2; sw.position.set(p[0], -0.05, p[1]); ceiling.add(sw);
  });
  ceiling.traverse(function (o) { if (o.isMesh && o.material !== matLED) { o.castShadow = true; o.receiveShadow = true; } });
  piece(ceiling, [0, H, 0], [0, 2.8, 0], 0.5, 0.82);

  /* ---------- wall details: red call-points + low return grille ---------- */
  var callL = box(0.14, 0.2, 0.06, matRed); piece(callL, [-1.0, 1.15, -HD + WALL / 2 + 0.02], [0, 0, -1.0], 0.7, 0.9);
  var callR = box(0.14, 0.2, 0.06, matRed); piece(callR, [1.05, 1.15, -HD + WALL / 2 + 0.02], [0, 0, -1.0], 0.72, 0.92);
  var grille = box(0.7, 0.16, 0.03, matAlu); piece(grille, [-2.0, 0.3, -HD + WALL / 2 + 0.02], [0, -0.8, 0], 0.72, 0.92);

  /* ---------- lights ---------- */
  scene.add(new THREE.HemisphereLight(0xf6f9ff, 0x40465c, 0.9));
  var key = new THREE.DirectionalLight(0xffffff, 1.15);
  key.position.set(6.5, 9.5, 7.5); key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048); key.shadow.radius = 5; key.shadow.bias = -0.00022;
  var sc = key.shadow.camera; sc.near = 1; sc.far = 40; sc.left = -9; sc.right = 9; sc.top = 9; sc.bottom = -9;
  scene.add(key);
  var fill = new THREE.DirectionalLight(0xdce6ff, 0.4); fill.position.set(-7, 4.5, -3); scene.add(fill);
  var rim = new THREE.DirectionalLight(0xffffff, 0.3); rim.position.set(-2, 6, -9); scene.add(rim);

  /* ---------- ground shadow catcher ---------- */
  var gnd = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.ShadowMaterial({ opacity: 0.18 }));
  gnd.rotation.x = -Math.PI / 2; gnd.position.y = -0.002; gnd.receiveShadow = true; scene.add(gnd);

  /* ---------- progress → transforms + camera ---------- */
  var _v = new THREE.Vector3();
  function setProgress(p) {
    for (var i = 0; i < pieces.length; i++) {
      var o = pieces[i], u = o.userData;
      var e = easeIO(smooth(u.t0, u.t1, p));
      _v.copy(u.off).multiplyScalar(1 - e);
      o.position.copy(u.home).add(_v);
    }
    var ce = easeIO(p);
    var az = lerp(-0.72, -0.5, ce), rad = lerp(12.6, 9.7, ce), hgt = lerp(5.1, 2.95, ce);
    camera.position.set(Math.sin(az) * rad, hgt, Math.cos(az) * rad);
    camera.lookAt(TARGET);
    if (p > 0.9) mount.classList.add("cr3d-assembled"); else mount.classList.remove("cr3d-assembled");
  }

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
    pCur = progressFromScroll(); setProgress(pCur); renderer.render(scene, camera);
  } else { start(); }
})();
