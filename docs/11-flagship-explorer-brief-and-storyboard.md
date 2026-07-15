# ADR-02 / Brief — "Inside a Masarat Controlled Environment" (flagship 3D)

> The centrepiece interactive experience. **Implemented** as a scroll-driven
> React Three Fiber scene in [`web/src/components/three`](../web/src/components/three).
> This doc is the brief + storyboard; the Blender asset spec is
> [`web/public/models/README.md`](../web/public/models/README.md).

## The idea

A single scroll-driven story that **starts deep in the background and comes
through toward the viewer**: a Masarat cleanroom assembles from the far end while
the camera dollies *through* into the finished, controlled space. It's a
**guided technical explainer** — not an engineering configurator (changing
dimensions, filtration or quotes would require validated rules and a much larger
responsibility).

It connects the three pathways:

- **Build & Engineer** creates the environment (shell, envelope, door).
- **Equip** adds the technical systems (diffusers, filters, cabinets, controls).
- **Test & Maintain** proves and protects performance (HEPA, pressure, airflow).

## Storyboard (scroll 0 → 1)

| Scroll | Camera | What assembles | Copy step |
|---|---|---|---|
| 0.00–0.30 | Far back, high; room small in the distance | Glossy resin **floor** + shell resolve out of the background | **1 · The shell forms in the distance** |
| 0.30–0.65 | Dolly forward + descend to eye level | **GRP walls**, coved corners, **black-framed vision panels**; **ceiling grid** drops in with **swirl diffusers + LED panels** | **2 · Air, light & finishing** |
| 0.65–1.00 | Arrive **inside** the room, gaze sweeping deeper | **Blue cleanroom door**, monitoring/call points, terminal **HEPA**; hotspots reveal | **3 · Inside the controlled environment** |

Hotspots (DOM overlay, reveal as parts land): swirl diffusers + LED, black-framed
vision panels, sealed cleanroom door — and, with the real models, the **Camfil
ECFFU control system**, **biosafety cabinet** and **ceiling HEPA terminal**
(positions already in `cleanroomManifest.ts`).

## Built-in requirements (all implemented)

- **Reduced motion:** renders the finished room, no scrubbing (`prefers-reduced-motion`).
- **WebGL fallback:** a graceful message + no canvas when WebGL is unavailable.
- **Performance:** scene is **lazy-mounted** only while near the viewport; DPR
  capped `[1,2]`; on-demand friendly; single smoothed progress value drives
  camera + parts.
- **Mobile:** the sticky stage collapses to a static block on small screens.
- **Bilingual:** all captions come from the `en`/`ar` dictionaries; RTL-safe.
- **Themify-independent:** it's a self-contained React component tree.

## From placeholder to photoreal (the asset pipeline)

Today the scene is a **procedural placeholder** with the final choreography. To
reach the realism drawn from Masarat's facility photos:

1. Model each part in **Blender** as an optimised marketing derivative (see the
   asset brief for names, budget, orientation, Draco settings).
2. Export **GLB** into `web/public/models/`.
3. Set `modelsReady = true` in `cleanroomManifest.ts`.

The loader preloads + Draco-decodes the parts and runs them through the **same
assembly rig** — so the motion designed here is exactly what ships with the real
models. Positions and per-part timing are data in the manifest, tuned without
touching logic.

## Deliberately out of scope (for now)

- A true configurator (dimensions/equipment/quotes).
- Publishing real client facility layouts, proprietary manufacturing detail, or
  sensitive BSL floor plans. Use representative geometry only.
