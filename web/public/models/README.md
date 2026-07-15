# Flagship 3D assets — Blender → glTF authoring brief

The flagship "Inside a Masarat controlled environment" experience is built to
run on **real, optimised GLB models** produced from Blender. Until those exist,
the site renders a **procedural placeholder** with the exact same choreography,
so dropping the models in changes nothing but the geometry.

## How to enable the real models

1. Export each part below as an optimised `.glb` into **this folder**
   (`web/public/models/`), using the exact file names.
2. In `src/components/three/cleanroomManifest.ts`, set **`modelsReady = true`**.
3. That's it — the loader (`CleanroomModels.tsx`) replaces the placeholder,
   preloads + Draco-decodes the parts, and animates them through the shared
   assembly rig (`cleanroomRig.ts`).

No other code changes are required. Positions, the background start offsets and
the per-part scroll windows all live in the manifest — tune them there.

## Parts (each its own `.glb`, pivot at the world origin)

| File | What it is (from the facility photos) | Assembles |
|---|---|---|
| `corridor-shell.glb` | Room/corridor shell + **glossy resin floor**, coved corners | first, from below |
| `wall-left.glb` | Left GRP wall run (warm-white panels + vertical joints) | early |
| `wall-right.glb` | Right GRP wall run | early |
| `vision-windows.glb` | **Black-framed rounded vision panels** set into the walls | mid |
| `ceiling-grid.glb` | Walkable T-bar ceiling grid + panels | mid, from above |
| `swirl-diffusers.glb` | Circular **swirl diffusers** in square housings + **LED flat panels** | mid |
| `camfil-ecffu-panel.glb` | **Camfil ECFFU control system** — white cabinet + MCGS touchscreen | late |
| `cleanroom-door.glb` | **Blue cleanroom door** with vision panel + handle | late |
| `biosafety-cabinet.glb` | **Class II biological safety cabinet** (glass sash, stainless deck, UV) | late |
| `hepa-terminal.glb` | Ceiling **terminal HEPA filter** housing (the unit being scan-tested) | last |

## Conventions (important)

- **Units:** metres. The placeholder room is ~6 m × 4 m × 3 m high; match that
  scale so the manifest positions line up (or adjust `position`/`scale` in the
  manifest).
- **Orientation:** +Y up, room opens toward **+Z** (the camera enters from +Z
  and travels toward −Z). Wall runs along Z; back wall at ≈ Z −2.
- **Pivot/origin:** each part's origin at the world origin it should occupy, so
  `position: [0,0,0]` in the manifest "just works". If you'd rather offset in
  Blender, set the manifest `position` to `[0,0,0]` and bake the location in.
- **Materials:** PBR metallic-roughness only (glTF-compatible). Emissive for LED
  panels, diffusers and the BSC UV tube. Keep the resin floor low-roughness.
- **Budget (marketing derivatives, not CAD):** aim ≤ 150k triangles for the
  whole scene; textures ≤ 2K, KTX2/Basis where possible.
- **Compression:** Draco (or meshopt). The loader points Draco at the gstatic
  CDN by default — for a self-hosted decoder, copy it into `web/public/draco/`
  and set `dracoDecoderPath = "/draco/"` in the manifest.
- **No sensitive data:** use representative geometry — never real client
  facility layouts, proprietary manufacturing detail or BSL floor plans.

## Suggested Blender export settings

- Format: **glTF Binary (.glb)**
- Include: Selected Objects · +Y Up
- Geometry: Apply Modifiers · UVs · Normals · Compression (Draco)
- Draco: position 14, normal 10, texcoord 12
- Materials: Export · Images: Automatic (or pre-pack KTX2)
