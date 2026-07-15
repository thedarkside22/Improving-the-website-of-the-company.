"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { type AssemblyPart, applyParts, cameraForProgress } from "./cleanroomRig";
import { modelsReady } from "./cleanroomManifest";
import CleanroomModels from "./CleanroomModels";

/* -------------------------------------------------- soft studio env (PMREM) */
function makeEnvironment(gl: THREE.WebGLRenderer): THREE.Texture {
  const c = document.createElement("canvas");
  c.width = 16;
  c.height = 256;
  const x = c.getContext("2d")!;
  const g = x.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0, "#ffffff");
  g.addColorStop(0.5, "#dfe6f0");
  g.addColorStop(1, "#5b6070");
  x.fillStyle = g;
  x.fillRect(0, 0, 16, 256);
  const tex = new THREE.CanvasTexture(c);
  tex.mapping = THREE.EquirectangularReflectionMapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  const pmrem = new THREE.PMREMGenerator(gl);
  pmrem.compileEquirectangularShader();
  const env = pmrem.fromEquirectangular(tex).texture;
  tex.dispose();
  pmrem.dispose();
  return env;
}

/* --------------------------------------------------- procedural swirl map */
function swirlTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const x = c.getContext("2d")!;
  x.fillStyle = "#f4f5f7";
  x.fillRect(0, 0, 256, 256);
  x.translate(128, 128);
  x.strokeStyle = "#c2c6cf";
  x.lineWidth = 2;
  for (let i = 0; i < 44; i++) {
    x.save();
    x.rotate((i / 44) * Math.PI * 2);
    x.beginPath();
    x.moveTo(18, 0);
    x.quadraticCurveTo(70, 26, 116, 8);
    x.stroke();
    x.restore();
  }
  x.strokeStyle = "#aeb3bd";
  [20, 118].forEach((r) => {
    x.beginPath();
    x.arc(0, 0, r, 0, 6.28);
    x.stroke();
  });
  x.fillStyle = "#d5d8df";
  x.beginPath();
  x.arc(0, 0, 16, 0, 6.28);
  x.fill();
  return new THREE.CanvasTexture(c);
}

/* -------------------------------------- procedural placeholder cleanroom */
function buildPlaceholder(): { group: THREE.Group; parts: AssemblyPart[] } {
  const group = new THREE.Group();
  const parts: AssemblyPart[] = [];

  const swirlTex = swirlTexture();
  const matPanel = new THREE.MeshStandardMaterial({ color: 0xf0efe9, roughness: 0.58, metalness: 0.02, envMapIntensity: 0.55 });
  const matPanelSide = new THREE.MeshStandardMaterial({ color: 0xeae9e2, roughness: 0.62, metalness: 0.02, envMapIntensity: 0.5 });
  const matJoint = new THREE.MeshStandardMaterial({ color: 0xd7d6ce, roughness: 0.7, metalness: 0.0 });
  const matFrameBlack = new THREE.MeshStandardMaterial({ color: 0x14161b, roughness: 0.5, metalness: 0.25, envMapIntensity: 0.8 });
  const matGlass = new THREE.MeshStandardMaterial({ color: 0xdfeaf0, roughness: 0.05, metalness: 0.0, transparent: true, opacity: 0.5, envMapIntensity: 1.5 });
  const matBlue = new THREE.MeshStandardMaterial({ color: 0x1f52a8, roughness: 0.42, metalness: 0.05, envMapIntensity: 0.7 });
  const matAlu = new THREE.MeshStandardMaterial({ color: 0xcfd3da, roughness: 0.34, metalness: 0.92, envMapIntensity: 1.0 });
  const matCeil = new THREE.MeshStandardMaterial({ color: 0xf6f6f3, roughness: 0.7, metalness: 0.0, envMapIntensity: 0.4 });
  const matLED = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xf2f6ff, emissiveIntensity: 1.35, roughness: 0.5 });
  const matSwirl = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.55, metalness: 0.1, map: swirlTex });
  const matRed = new THREE.MeshStandardMaterial({ color: 0xd21f1f, roughness: 0.45 });

  function roundRect(w: number, h: number, r: number) {
    const s = new THREE.Shape();
    const x = -w / 2;
    const y = -h / 2;
    s.moveTo(x + r, y);
    s.lineTo(x + w - r, y);
    s.quadraticCurveTo(x + w, y, x + w, y + r);
    s.lineTo(x + w, y + h - r);
    s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    s.lineTo(x + r, y + h);
    s.quadraticCurveTo(x, y + h, x, y + h - r);
    s.lineTo(x, y + r);
    s.quadraticCurveTo(x, y, x + r, y);
    return s;
  }

  function visionWindow(w: number, h: number) {
    const g = new THREE.Group();
    const outer = roundRect(w, h, 0.11);
    outer.holes.push(roundRect(w - 0.14, h - 0.14, 0.08));
    const frame = new THREE.Mesh(new THREE.ExtrudeGeometry(outer, { depth: 0.05, bevelEnabled: false }), matFrameBlack);
    frame.castShadow = true;
    const glass = new THREE.Mesh(new THREE.ShapeGeometry(roundRect(w - 0.14, h - 0.14, 0.08)), matGlass);
    glass.position.z = 0.03;
    g.add(frame, glass);
    return g;
  }

  function box(w: number, h: number, d: number, mat: THREE.Material) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.castShadow = true;
    m.receiveShadow = true;
    return m;
  }

  function piece(obj: THREE.Object3D, pos: number[], off: number[], t0: number, t1: number) {
    obj.position.set(pos[0], pos[1], pos[2]);
    group.add(obj);
    parts.push({
      object: obj,
      home: new THREE.Vector3(pos[0], pos[1], pos[2]),
      off: new THREE.Vector3(off[0], off[1], off[2]),
      t0,
      t1,
    });
    return obj;
  }

  function grpPanel(w: number, h: number, d: number, mat: THREE.Material, withWindow: boolean) {
    const g = new THREE.Group();
    g.add(box(w, h, d, mat));
    const jl = box(0.02, h, d + 0.006, matJoint);
    jl.position.set(-w / 2 + 0.01, 0, 0);
    const jr = box(0.02, h, d + 0.006, matJoint);
    jr.position.set(w / 2 - 0.01, 0, 0);
    g.add(jl, jr);
    if (withWindow) {
      const win = visionWindow(0.95, 1.25);
      win.position.set(0, 0.18, d / 2 + 0.001);
      g.add(win);
    }
    return g;
  }

  const HW = 3;
  const HD = 2;
  const H = 3;
  const WALL = 0.14;

  /* floor — bright glossy resin (rises from below + back) */
  const floor = box(2 * HW + 0.4, 0.05, 2 * HD + 0.4, new THREE.MeshStandardMaterial({ color: 0xe7e9ec, roughness: 0.12, metalness: 0.1, envMapIntensity: 1.2 }));
  piece(floor, [0, 0, 0], [0, -2.0, -5], 0.0, 0.28);

  /* back wall: window · door-panel · window (resolve from the far background) */
  piece(grpPanel(2, H, WALL, matPanel, true), [-2, H / 2, -HD], [0, 0.4, -9], 0.05, 0.42);
  piece(grpPanel(2, H, WALL, matPanel, true), [2, H / 2, -HD], [0, 0.4, -9], 0.07, 0.44);
  piece(grpPanel(2, H, WALL, matPanel, false), [0, H / 2, -HD], [0, 0.5, -9.5], 0.05, 0.4);

  /* blue cleanroom door */
  const door = new THREE.Group();
  door.add(box(1.0, 2.15, 0.08, matBlue));
  const vwin = visionWindow(0.24, 1.05);
  vwin.position.set(-0.18, 0.35, 0.045);
  vwin.scale.set(0.95, 1, 1);
  const handle = box(0.05, 0.32, 0.05, matAlu);
  handle.position.set(0.36, 0.0, 0.07);
  door.add(vwin, handle);
  door.traverse((o) => {
    if ((o as THREE.Mesh).isMesh) {
      o.castShadow = true;
      o.receiveShadow = true;
    }
  });
  piece(door, [0, 1.075, -HD + WALL / 2 + 0.02], [0, -1.2, -8], 0.55, 0.82);

  /* side walls */
  const lw1 = grpPanel(2, H, WALL, matPanelSide, false);
  lw1.rotation.y = Math.PI / 2;
  piece(lw1, [-HW, H / 2, -1], [-1.0, 0, -8], 0.12, 0.5);
  const lw2 = grpPanel(2, H, WALL, matPanelSide, true);
  lw2.rotation.y = Math.PI / 2;
  piece(lw2, [-HW, H / 2, 1], [-1.0, 0, -7.5], 0.16, 0.52);
  const rw1 = grpPanel(2, H, WALL, matPanelSide, false);
  rw1.rotation.y = -Math.PI / 2;
  piece(rw1, [HW, H / 2, -1], [1.0, 0, -8], 0.12, 0.5);
  const rw2 = grpPanel(2, H, WALL, matPanelSide, true);
  rw2.rotation.y = -Math.PI / 2;
  piece(rw2, [HW, H / 2, 1], [1.0, 0, -7.5], 0.16, 0.52);

  /* coved corners */
  function cove(len: number, along: "x" | "z") {
    const geo = new THREE.CylinderGeometry(0.12, 0.12, len, 18, 1, false, 0, Math.PI / 2);
    const m = new THREE.Mesh(geo, matPanelSide);
    m.castShadow = true;
    m.receiveShadow = true;
    const g = new THREE.Group();
    g.add(m);
    if (along === "x") m.rotation.z = Math.PI / 2;
    return g;
  }
  piece(cove(2 * HD, "z"), [-HW + 0.12, 0.12, 0], [-0.7, 0, -5], 0.4, 0.62);
  const cvR = cove(2 * HD, "z");
  (cvR.children[0] as THREE.Mesh).rotation.y = Math.PI;
  piece(cvR, [HW - 0.12, 0.12, 0], [0.7, 0, -5], 0.42, 0.64);
  piece(cove(2 * HW, "x"), [0, 0.12, -HD + 0.12], [0, 0.6, -6], 0.44, 0.66);

  /* ceiling: panels + T-bar + LED + swirl diffusers */
  const ceiling = new THREE.Group();
  const cw = 2 * HW;
  const cd = 2 * HD;
  const tb = 0.05;
  const cpanel = box(cw, 0.08, cd, matCeil);
  cpanel.position.y = 0.02;
  ceiling.add(cpanel);
  for (let gx = -HW + 2; gx < HW; gx += 2) {
    const b = box(tb, 0.06, cd, matAlu);
    b.position.set(gx, -0.03, 0);
    ceiling.add(b);
  }
  for (let gz = -HD + 2; gz < HD; gz += 2) {
    const b2 = box(cw, 0.06, tb, matAlu);
    b2.position.set(0, -0.03, gz);
    ceiling.add(b2);
  }
  ([[-1.4, -0.6], [1.6, 0.8]] as const).forEach((pt) => {
    const led = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.62), matLED);
    led.rotation.x = Math.PI / 2;
    led.position.set(pt[0], -0.045, pt[1]);
    ceiling.add(led);
  });
  ([[0.2, -0.7], [-1.5, 0.9]] as const).forEach((pt) => {
    const house = box(0.8, 0.05, 0.8, matCeil);
    house.position.set(pt[0], -0.02, pt[1]);
    ceiling.add(house);
    const sw = new THREE.Mesh(new THREE.CircleGeometry(0.34, 40), matSwirl);
    sw.rotation.x = Math.PI / 2;
    sw.position.set(pt[0], -0.05, pt[1]);
    ceiling.add(sw);
  });
  ceiling.traverse((o) => {
    if ((o as THREE.Mesh).isMesh && (o as THREE.Mesh).material !== matLED) {
      o.castShadow = true;
      o.receiveShadow = true;
    }
  });
  piece(ceiling, [0, H, 0], [0, 2.6, -5], 0.34, 0.66);

  /* wall details */
  piece(box(0.14, 0.2, 0.06, matRed), [-1.0, 1.15, -HD + WALL / 2 + 0.02], [0, 0.5, -7], 0.7, 0.9);
  piece(box(0.14, 0.2, 0.06, matRed), [1.05, 1.15, -HD + WALL / 2 + 0.02], [0, 0.5, -7], 0.72, 0.92);
  piece(box(0.7, 0.16, 0.03, matAlu), [-2.0, 0.3, -HD + WALL / 2 + 0.02], [0, 0, -7], 0.72, 0.92);

  return { group, parts };
}

function PlaceholderCleanroom({ progress }: { progress: RefObject<number> }) {
  const built = useMemo(() => buildPlaceholder(), []);
  useFrame(() => applyParts(built.parts, progress.current ?? 0));
  return <primitive object={built.group} />;
}

function Scene({ progress, reduce }: { progress: RefObject<number>; reduce: boolean }) {
  const { camera, gl, scene } = useThree();
  const keyLight = useRef<THREE.DirectionalLight>(null);
  const pSmooth = useRef(0);

  useEffect(() => {
    scene.environment = makeEnvironment(gl);
  }, [gl, scene]);

  useEffect(() => {
    const l = keyLight.current;
    if (!l) return;
    l.shadow.mapSize.set(2048, 2048);
    l.shadow.radius = 5;
    l.shadow.bias = -0.00022;
    const c = l.shadow.camera as THREE.OrthographicCamera;
    c.near = 1;
    c.far = 40;
    c.left = -9;
    c.right = 9;
    c.top = 9;
    c.bottom = -9;
    c.updateProjectionMatrix();
  }, []);

  // Smooth the raw scroll progress once here; camera + assembly read the same value.
  useFrame(() => {
    const target = reduce ? 1 : progress.current ?? 0;
    pSmooth.current += (target - pSmooth.current) * 0.16;
    if (Math.abs(target - pSmooth.current) < 0.0006) pSmooth.current = target;
    cameraForProgress(camera, pSmooth.current);
  });

  return (
    <>
      {modelsReady ? (
        <Suspense fallback={null}>
          <CleanroomModels progress={pSmooth} />
        </Suspense>
      ) : (
        <PlaceholderCleanroom progress={pSmooth} />
      )}

      <hemisphereLight args={[0xf6f9ff, 0x40465c, 0.9]} />
      <directionalLight ref={keyLight} castShadow position={[6.5, 9.5, 7.5]} intensity={1.15} />
      <directionalLight position={[-7, 4.5, -3]} intensity={0.4} color={0xdce6ff} />
      <directionalLight position={[-2, 6, -9]} intensity={0.3} />
      <mesh rotation-x={-Math.PI / 2} position-y={-0.002} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <shadowMaterial opacity={0.18} />
      </mesh>
    </>
  );
}

export default function CleanroomScene({
  progress,
  reduce,
}: {
  progress: RefObject<number>;
  reduce: boolean;
}) {
  return (
    <Canvas
      dpr={[1, 2]}
      shadows
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: 33, near: 0.1, far: 100, position: [0.6, 3.35, 15.5] }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.2;
      }}
    >
      <Scene progress={progress} reduce={reduce} />
    </Canvas>
  );
}
