"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Dictionary } from "@/i18n/config";
import { Icon } from "@/components/ui/Icon";

const CleanroomScene = dynamic(() => import("./CleanroomScene"), { ssr: false });

function webglSupported(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
  } catch {
    return false;
  }
}

export default function CleanroomExplorer({ dict }: { dict: Dictionary }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const [ui, setUi] = useState({ step: 0, bar: 0 });
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduce, setReduce] = useState(false);
  const [webgl, setWebgl] = useState(true);

  useEffect(() => {
    setMounted(true);
    setReduce(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false);
    setWebgl(webglSupported());
  }, []);

  // scroll → progress (throttled with rAF)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let raf = 0;
    const compute = () => {
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = clamp(-r.top / (total || 1), 0, 1);
      progress.current = p;
      const step = p < 0.34 ? 0 : p < 0.67 ? 1 : 2;
      setUi((u) => (u.step === step && Math.abs(u.bar - p) < 0.01 ? u : { step, bar: p }));
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [mounted]);

  // only render the WebGL scene while the section is near/in view
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver((entries) => setInView(entries[0].isIntersecting), {
      rootMargin: "300px 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, [mounted]);

  const hotspots = [
    { key: "diffusers", label: dict.explorer.hotspots.diffusers, at: 0.84, style: { left: "34%", top: "15%" } },
    { key: "windows", label: dict.explorer.hotspots.windows, at: 0.58, style: { left: "15%", top: "52%" } },
    { key: "door", label: dict.explorer.hotspots.door, at: 0.72, style: { left: "56%", top: "77%" } },
  ];
  const showScene = mounted && webgl && inView;

  return (
    <section className="explorer" aria-label={dict.explorer.title}>
      <div className="explorer-scroll" ref={scrollRef}>
        <div className="explorer-sticky">
          <div className="wrap">
            <div className="explorer-grid">
              <div className={`explorer-stage ${webgl ? "" : "no-webgl"}`}>
                {showScene && <CleanroomScene progress={progress} reduce={reduce} />}
                <div className="explorer-fallback">{dict.explorer.fallback}</div>
                {hotspots.map((h) => (
                  <span
                    key={h.key}
                    className={`hotspot ${ui.bar >= h.at ? "show" : ""}`}
                    style={h.style as CSSProperties}
                  >
                    {h.label}
                  </span>
                ))}
              </div>

              <div className="explorer-copy">
                <span className="eyebrow">{dict.explorer.eyebrow}</span>
                <h2>{dict.explorer.title}</h2>
                <p className="lead">{dict.explorer.lead}</p>
                {dict.explorer.steps.map((s, i) => (
                  <div key={i} className={`astep ${ui.step === i ? "active" : ""}`}>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                  </div>
                ))}
                <div className="explorer-progress" aria-hidden="true">
                  <i style={{ width: `${Math.round(ui.bar * 100)}%` }} />
                </div>
              </div>
            </div>
          </div>
          <div className="explorer-hint" aria-hidden="true">
            <Icon name="swipe_up" /> {dict.explorer.keepScrolling}
          </div>
        </div>
      </div>
    </section>
  );
}

function clamp(v: number, a: number, b: number) {
  return v < a ? a : v > b ? b : v;
}
