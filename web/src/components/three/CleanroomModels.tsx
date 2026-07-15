"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { cleanroomParts, cleanroomModelFiles, dracoDecoderPath, modelsReady } from "./cleanroomManifest";
import { applyParts, type AssemblyPart } from "./cleanroomRig";

// Warm the cache for the real assets (only when they exist).
if (modelsReady) {
  useGLTF.preload(cleanroomModelFiles, dracoDecoderPath);
}

/**
 * Renders the flagship from real Blender GLB parts and animates them through
 * the shared assembly rig. Only rendered when `modelsReady` is true, so the
 * loader never fetches missing files during the placeholder phase.
 *
 * `progress` is the already-smoothed scroll value from the parent scene.
 */
export default function CleanroomModels({ progress }: { progress: RefObject<number> }) {
  const gltfs = useGLTF(cleanroomModelFiles, dracoDecoderPath) as unknown as { scene: THREE.Group }[];

  const parts = useMemo<AssemblyPart[]>(() => {
    return cleanroomParts.map((part, i) => {
      const object = gltfs[i].scene.clone(true);
      object.position.set(...part.position);
      if (part.rotationY) object.rotation.y = part.rotationY;
      if (part.scale) object.scale.setScalar(part.scale);
      object.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      return {
        object,
        home: new THREE.Vector3(...part.position),
        off: new THREE.Vector3(...part.off),
        t0: part.t0,
        t1: part.t1,
      };
    });
  }, [gltfs]);

  useFrame(() => applyParts(parts, progress.current ?? 0));

  return (
    <>
      {parts.map((part, i) => (
        <primitive key={i} object={part.object} />
      ))}
    </>
  );
}
