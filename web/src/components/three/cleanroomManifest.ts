/**
 * Manifest of the real GLB parts that make up the flagship cleanroom, drawn
 * from Masarat's own facility photos (corridor, Camfil ECFFU control system,
 * swirl diffusers + LED panels, black-framed vision windows, glossy resin
 * floor, blue cleanroom door, Class II biosafety cabinet, ceiling terminal
 * HEPA filter).
 *
 * This is the spec the Blender → glTF pipeline builds against. Each part is a
 * separate optimised .glb with its pivot at the world origin. Drop the files
 * into /public/models, set `modelsReady = true`, and the loader replaces the
 * procedural placeholder with no other code changes. See
 * /public/models/README.md for the full authoring brief.
 */

/** Flip to true once the .glb files exist in /public/models. */
export const modelsReady = false;

/**
 * Draco decoder location. The gstatic CDN works out of the box in production;
 * for a fully self-hosted build, copy the decoder into /public/draco and set
 * this to "/draco/".
 */
export const dracoDecoderPath = "https://www.gstatic.com/draco/versioned/decoders/1.5.7/";

export interface ModelPart {
  id: string;
  /** Path under /public. */
  file: string;
  /** Final resting transform. */
  position: [number, number, number];
  rotationY?: number;
  scale?: number;
  /** Start offset relative to home — push into the background (−Z). */
  off: [number, number, number];
  /** Scroll window during which the part travels home. */
  t0: number;
  t1: number;
  /** Optional hotspot shown when the part has arrived. */
  hotspot?: { at: number; leftPct: number; topPct: number };
}

export const cleanroomParts: ModelPart[] = [
  { id: "shell", file: "/models/corridor-shell.glb", position: [0, 0, 0], off: [0, -2, -6], t0: 0.0, t1: 0.28 },
  { id: "wall-left", file: "/models/wall-left.glb", position: [0, 0, 0], off: [-1, 0, -8], t0: 0.12, t1: 0.5 },
  { id: "wall-right", file: "/models/wall-right.glb", position: [0, 0, 0], off: [1, 0, -8], t0: 0.12, t1: 0.5 },
  { id: "vision-windows", file: "/models/vision-windows.glb", position: [0, 0, 0], off: [0, 0, -8], t0: 0.2, t1: 0.55, hotspot: { at: 0.6, leftPct: 16, topPct: 50 } },
  { id: "ceiling", file: "/models/ceiling-grid.glb", position: [0, 0, 0], off: [0, 2.6, -5], t0: 0.34, t1: 0.66 },
  { id: "diffusers", file: "/models/swirl-diffusers.glb", position: [0, 0, 0], off: [0, 2, -5], t0: 0.4, t1: 0.7, hotspot: { at: 0.7, leftPct: 34, topPct: 15 } },
  { id: "control-panel", file: "/models/camfil-ecffu-panel.glb", position: [0, 0, 0], off: [0, 0, -7], t0: 0.55, t1: 0.82, hotspot: { at: 0.86, leftPct: 62, topPct: 44 } },
  { id: "door", file: "/models/cleanroom-door.glb", position: [0, 0, 0], off: [0, -1, -8], t0: 0.55, t1: 0.82 },
  { id: "bsc", file: "/models/biosafety-cabinet.glb", position: [0, 0, 0], off: [0, 0, -7], t0: 0.62, t1: 0.9, hotspot: { at: 0.9, leftPct: 50, topPct: 74 } },
  { id: "hepa-terminal", file: "/models/hepa-terminal.glb", position: [0, 0, 0], off: [0, 1, -4], t0: 0.7, t1: 0.95 },
];

export const cleanroomModelFiles = cleanroomParts.map((p) => p.file);
