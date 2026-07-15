import * as THREE from "three";

/**
 * Shared assembly rig for the flagship cleanroom experience. Both the
 * procedural placeholder and the real GLB models animate through this same
 * rig, so swapping in Blender assets never changes the choreography.
 *
 * The story: everything starts compressed deep in the background and resolves
 * forward toward the viewer while the camera dollies *through* into the room.
 */
export interface AssemblyPart {
  object: THREE.Object3D;
  /** Final resting position. */
  home: THREE.Vector3;
  /** Start offset relative to home — biased into the background (−Z). */
  off: THREE.Vector3;
  /** Normalised scroll window [t0, t1] during which this part travels home. */
  t0: number;
  t1: number;
}

export const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const easeIO = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
export const smooth = (e0: number, e1: number, x: number) => {
  const t = clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
};

const _v = new THREE.Vector3();

/** Move each part from its background start toward home based on progress p (0..1). */
export function applyParts(parts: AssemblyPart[], p: number) {
  for (const part of parts) {
    const e = easeIO(smooth(part.t0, part.t1, p));
    _v.copy(part.off).multiplyScalar(1 - e);
    part.object.position.copy(part.home).add(_v);
  }
}

/**
 * Camera dolly: starts far back and high (the environment sits small in the
 * distance) and travels forward + down to eye level *inside* the room, its
 * gaze sweeping deeper down the space — "coming through the way".
 */
export function cameraForProgress(camera: THREE.Camera, p: number) {
  const e = easeIO(p);
  camera.position.set(lerp(0.6, 0.22, e), lerp(3.35, 1.62, e), lerp(15.5, 1.5, e));
  camera.lookAt(0, lerp(1.5, 1.45, e), lerp(0.4, -2.2, e));
}
