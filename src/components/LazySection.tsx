import React, { ComponentType, useCallback, useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { registerSection } from "../lazy/registry";

type Lang = "en" | "fr";

interface Props {
  id: string;
  loader: () => Promise<{ default: ComponentType<{ language?: Lang }> }>;
  language: Lang;
  /** approximate final heights (px) so the page doesn't jump around while sections mount */
  minHeight: number;
  minHeightMobile: number;
  /** false = never mounted by the background idle pass (heavy code that only matters if the visitor actually gets there) */
  idleMount?: boolean;
}

/**
 * Renders a code-split section only when it is about to be seen.
 *  - the wrapper (and its anchor id) exists from the start, so navigation/scroll-spy always work
 *  - the section mounts when it is within ~1 screen of the viewport AND the visitor has started
 *    interacting (or 2.5 s have passed — so crawlers and idle tabs still get the full page)
 */
export default function LazySection({ id, loader, language, minHeight, minHeightMobile, idleMount = true }: Props) {
  const [Comp, setComp] = useState<ComponentType<{ language?: Lang }> | null>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const started = useRef<Promise<void> | null>(null);
  const mounted = useRef(false);

  const ensure = useCallback(() => {
    if (!started.current) {
      started.current = loader().then((m) => { mounted.current = true; setComp(() => m.default); });
    }
    return started.current;
  }, [loader]);

  useEffect(() => registerSection({ id, el: () => wrap.current, ensure, mounted: () => mounted.current, idle: idleMount }), [id, ensure, idleMount]);

  useEffect(() => {
    if (mounted.current || !wrap.current) return;
    let near = false, ready = false;
    const tryMount = () => { if (near && ready) ensure(); };
    const markReady = () => { ready = true; tryMount(); };
    const io = new IntersectionObserver(([e]) => { near = e.isIntersecting; tryMount(); }, { rootMargin: "900px 0px" });
    io.observe(wrap.current);
    const events = ["scroll", "wheel", "touchstart", "keydown", "pointerdown", "pointermove"] as const;
    events.forEach((ev) => window.addEventListener(ev, markReady, { passive: true, once: true }));
    const timer = window.setTimeout(markReady, 2500);
    return () => { io.disconnect(); window.clearTimeout(timer); events.forEach((ev) => window.removeEventListener(ev, markReady)); };
  }, [ensure]);

  return (
    <div
      id={id}
      ref={wrap}
      className={Comp ? "lazy-section" : "lazy-section lazy-ph"}
      style={Comp ? undefined : ({ ["--mh" as string]: `${minHeight}px`, ["--mhm" as string]: `${minHeightMobile}px` } as React.CSSProperties)}
    >
      {Comp && <Reveal><Comp language={language} /></Reveal>}
    </div>
  );
}
