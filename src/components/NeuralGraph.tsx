import React, { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import "../assets/styles/NeuralGraph.scss";

export type GNode = {
  id: string;
  label: string;
  kind: "hub" | "leaf";
  color: string;
  icon?: ReactNode;
};
export type GLink = [string, string];

interface Props {
  nodes: GNode[];
  links: GLink[];
  selected?: string | null;
  hoverId?: string | null;
  onSelect?: (id: string) => void;
  onHover?: (id: string | null) => void;
  ariaLabel: string;
  hint?: string;
  height?: number;
}

type Sim = {
  id: string; x: number; y: number; vx: number; vy: number;
  hub: boolean; r: number; padX: number; ax: number; ay: number; pinned: boolean;
};

type Api = {
  startDrag: (id: string) => void;
  moveDrag: (id: string, x: number, y: number) => void;
  endDrag: (id: string) => void;
  pointer: (x: number | null, y: number | null) => void;
};

/**
 * Force-directed "neural" graph. Physics + links render on a canvas, nodes are
 * real DOM buttons (accessible, themeable, can hold icons) moved via transforms.
 */
export default function NeuralGraph({
  nodes, links, selected = null, hoverId = null, onSelect, onHover, ariaLabel, hint, height = 560,
}: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const els = useRef<Record<string, HTMLButtonElement | null>>({});
  const api = useRef<Api | null>(null);
  const drag = useRef<{ id: string; sx: number; sy: number; moved: boolean } | null>(null);
  const [hover, setHover] = useState<string | null>(null);

  const focus = hoverId ?? hover ?? selected ?? null;

  const adj = useMemo(() => {
    const m = new Map<string, Set<string>>();
    links.forEach(([a, b]) => {
      if (!m.has(a)) m.set(a, new Set());
      if (!m.has(b)) m.set(b, new Set());
      m.get(a)!.add(b); m.get(b)!.add(a);
    });
    return m;
  }, [links]);

  const active = useMemo(
    () => (focus ? new Set<string>([focus, ...Array.from(adj.get(focus) ?? [])]) : null),
    [focus, adj]
  );
  const live = useRef<{ active: Set<string> | null; focus: string | null }>({ active: null, focus: null });
  live.current = { active, focus };

  const sig = nodes.map((n) => n.id).join("|") + "#" + links.length;

  useEffect(() => {
    const wrapEl = wrap.current!;
    const cv = canvas.current!;
    const ctx = cv.getContext("2d")!;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    let W = wrapEl.clientWidth, H = wrapEl.clientHeight;
    const hubIds = nodes.filter((n) => n.kind === "hub").map((n) => n.id);

    const sims: Sim[] = nodes.map((n) => {
      const hub = n.kind === "hub";
      const r = hub ? 30 : n.icon ? 26 : 9;
      return {
        id: n.id, x: W / 2, y: H / 2, vx: 0, vy: 0, hub, r,
        padX: hub ? 70 : Math.min(90, n.label.length * 3.8 + 18),
        ax: 0, ay: 0, pinned: false,
      };
    });
    const byId = new Map(sims.map((s) => [s.id, s]));
    const colorOf = new Map(nodes.map((n) => [n.id, n.color]));
    const L = links
      .map(([a, b]) => {
        const sa = byId.get(a), sb = byId.get(b);
        if (!sa || !sb) return null;
        const hubSide = sa.hub ? sa : sb;
        return { a: sa, b: sb, color: colorOf.get(hubSide.id) || "#c6ff3d" };
      })
      .filter(Boolean) as { a: Sim; b: Sim; color: string }[];

    const setAnchors = () => {
      hubIds.forEach((id, i) => {
        const s = byId.get(id)!;
        if (hubIds.length === 1) { s.ax = W / 2; s.ay = H / 2; return; }
        const ang = (i / hubIds.length) * Math.PI * 2 - Math.PI / 2;
        s.ax = W / 2 + Math.cos(ang) * W * 0.3;
        s.ay = H / 2 + Math.sin(ang) * H * 0.3;
      });
    };
    setAnchors();
    sims.forEach((s) => {
      if (s.hub) { s.x = s.ax; s.y = s.ay; return; }
      const hs = Array.from(adj.get(s.id) ?? []).map((i) => byId.get(i)!).filter((h) => h?.hub);
      const cx = hs.length ? hs.reduce((p, h) => p + h.ax, 0) / hs.length : W / 2;
      const cy = hs.length ? hs.reduce((p, h) => p + h.ay, 0) / hs.length : H / 2;
      const ang = Math.random() * Math.PI * 2, rad = 50 + Math.random() * 70;
      s.x = cx + Math.cos(ang) * rad; s.y = cy + Math.sin(ang) * rad;
    });

    let pointer: { x: number; y: number } | null = null;
    let dragging = false;
    let textRGB = "17,19,20";
    const colorCache = new Map<string, string>();
    const col = (c: string) => {
      let v = colorCache.get(c);
      if (v === undefined) {
        const m = c.match(/^var\((--[\w-]+)\)$/);
        v = m ? getComputedStyle(wrapEl).getPropertyValue(m[1]).trim() || "#c6ff3d" : c;
        colorCache.set(c, v);
      }
      return v;
    };
    const readTheme = () => {
      colorCache.clear();
      const m = getComputedStyle(wrapEl).color.match(/\d+/g);
      if (m) textRGB = `${m[0]},${m[1]},${m[2]}`;
    };
    readTheme();

    const pulses: { l: number; t: number; s: number }[] = [];
    let frame = 0, raf = 0, visible = true, t0 = performance.now();

    const step = (t: number) => {
      for (let i = 0; i < sims.length; i++) {
        const a = sims[i];
        for (let j = i + 1; j < sims.length; j++) {
          const b = sims[j];
          const dx = b.x - a.x, dy = b.y - a.y;
          const d2 = dx * dx + dy * dy + 0.01, d = Math.sqrt(d2);
          if (d > 220) continue;
          const min = a.r + b.r + (a.hub || b.hub ? 40 : 30);
          let f = Math.min(1.1, 1500 / d2);
          if (d < min) f += (min - d) * 0.045;
          const fx = (dx / d) * f, fy = (dy / d) * f;
          if (!a.pinned) { a.vx -= fx; a.vy -= fy; }
          if (!b.pinned) { b.vx += fx; b.vy += fy; }
        }
      }
      for (const l of L) {
        const dx = l.b.x - l.a.x, dy = l.b.y - l.a.y;
        const d = Math.sqrt(dx * dx + dy * dy) + 0.01;
        const len = l.a.r + l.b.r + 58;
        const f = (d - len) * 0.014;
        const fx = (dx / d) * f, fy = (dy / d) * f;
        if (!l.a.pinned) { l.a.vx += fx; l.a.vy += fy; }
        if (!l.b.pinned) { l.b.vx -= fx; l.b.vy -= fy; }
      }
      sims.forEach((s, i) => {
        if (s.pinned) return;
        if (s.hub) {
          const wob = reduced ? 0 : 14;
          s.vx += (s.ax + Math.sin(t * 0.0006 + i * 1.7) * wob - s.x) * 0.012;
          s.vy += (s.ay + Math.cos(t * 0.0005 + i * 1.3) * wob - s.y) * 0.012;
        } else if (!reduced) {
          s.vx += Math.sin(t * 0.0009 + i * 2.1) * 0.025;
          s.vy += Math.cos(t * 0.0008 + i * 1.6) * 0.025;
        }
        if (pointer && !dragging) {
          const dx = s.x - pointer.x, dy = s.y - pointer.y;
          const d = Math.sqrt(dx * dx + dy * dy) + 0.01;
          if (d < 120) {
            const k = (1 - d / 120) ** 2 * 1.1;
            s.vx += (dx / d) * k; s.vy += (dy / d) * k;
          }
        }
        s.vx *= 0.85; s.vy *= 0.85;
        const sp = Math.hypot(s.vx, s.vy);
        if (sp > 6) { s.vx = (s.vx / sp) * 6; s.vy = (s.vy / sp) * 6; }
        s.x += s.vx; s.y += s.vy;
      });
      sims.forEach((s) => {
        s.x = Math.max(s.padX, Math.min(W - s.padX, s.x));
        s.y = Math.max(s.r + 10, Math.min(H - s.r - 26, s.y));
      });
    };

    const draw = () => {
      const { active: act, focus: foc } = live.current;
      ctx.clearRect(0, 0, W, H);
      L.forEach((l) => {
        const touches = !!foc && (l.a.id === foc || l.b.id === foc);
        const lit = !!act && act.has(l.a.id) && act.has(l.b.id);
        ctx.beginPath();
        ctx.moveTo(l.a.x, l.a.y); ctx.lineTo(l.b.x, l.b.y);
        if (touches) { ctx.strokeStyle = col(l.color); ctx.globalAlpha = 0.95; ctx.lineWidth = 1.8; }
        else if (act) { ctx.strokeStyle = `rgba(${textRGB},1)`; ctx.globalAlpha = lit ? 0.22 : 0.05; ctx.lineWidth = 1; }
        else { ctx.strokeStyle = `rgba(${textRGB},1)`; ctx.globalAlpha = 0.2; ctx.lineWidth = 1; }
        ctx.stroke();
      });
      ctx.globalAlpha = 1;
      pulses.forEach((p) => {
        const l = L[p.l];
        const x = l.a.x + (l.b.x - l.a.x) * p.t, y = l.a.y + (l.b.y - l.a.y) * p.t;
        ctx.beginPath(); ctx.arc(x, y, 2.6, 0, Math.PI * 2);
        const pc = col(l.color);
        ctx.fillStyle = pc; ctx.shadowColor = pc; ctx.shadowBlur = 12; ctx.fill();
        ctx.shadowBlur = 0;
      });
      sims.forEach((s) => {
        const el = els.current[s.id];
        if (el) el.style.transform = `translate(${s.x}px, ${s.y}px) translate(-50%, -${s.r}px)`;
      });
    };

    const loop = (now: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      frame++;
      if (frame % 90 === 0) readTheme();
      step(now - t0);
      if (!reduced && L.length) {
        if (pulses.length < 18 && Math.random() < 0.07) {
          const { focus: foc } = live.current;
          const pool = foc ? L.map((l, i) => i).filter((i) => L[i].a.id === foc || L[i].b.id === foc) : [];
          const idx = pool.length && Math.random() < 0.8 ? pool[(Math.random() * pool.length) | 0] : (Math.random() * L.length) | 0;
          pulses.push({ l: idx, t: 0, s: 0.008 + Math.random() * 0.01 });
        }
        for (let i = pulses.length - 1; i >= 0; i--) { pulses[i].t += pulses[i].s; if (pulses[i].t >= 1) pulses.splice(i, 1); }
      }
      draw();
      if (!reduced || dragging) raf = requestAnimationFrame(loop);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };

    const resize = () => {
      const nw = wrapEl.clientWidth, nh = wrapEl.clientHeight;
      if (!nw || !nh) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = nw * dpr; cv.height = nh * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sims.forEach((s) => { s.x *= nw / W; s.y *= nh / H; });
      W = nw; H = nh; setAnchors(); kick();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(wrapEl);
    resize();
    if (reduced) { for (let i = 0; i < 320; i++) step(i * 16); draw(); }

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) kick(); }, { threshold: 0.05 });
    io.observe(wrapEl);
    const onVis = () => kick();
    document.addEventListener("visibilitychange", onVis);

    api.current = {
      startDrag: (id) => { const s = byId.get(id); if (s) { s.pinned = true; dragging = true; kick(); } },
      moveDrag: (id, x, y) => { const s = byId.get(id); if (s) { s.x = x; s.y = y; s.vx = s.vy = 0; kick(); } },
      endDrag: (id) => { const s = byId.get(id); if (s) s.pinned = false; dragging = false; kick(); },
      pointer: (x, y) => { pointer = x === null || y === null ? null : { x, y }; if (!reduced) kick(); },
    };
    kick();
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      document.removeEventListener("visibilitychange", onVis); api.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sig]);

  // redraw dim/highlight changes immediately even when the loop is idle (reduced motion)
  useEffect(() => { api.current?.pointer(null, null); }, [focus]);

  const rel = (e: React.PointerEvent) => {
    const r = wrap.current!.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top] as const;
  };
  const setH = (id: string | null) => { setHover(id); onHover?.(id); };

  return (
    <div
      className="ng"
      ref={wrap}
      style={{ height }}
      role="group"
      aria-label={ariaLabel}
      onPointerMove={(e) => { const [x, y] = rel(e); api.current?.pointer(x, y); }}
      onPointerLeave={() => api.current?.pointer(null, null)}
    >
      <canvas ref={canvas} className="ng-canvas" aria-hidden="true" />
      <div className="ng-badge"><i /> LIVE</div>
      {hint && <div className="ng-hint">{hint}</div>}
      {nodes.map((n) => {
        const dim = active && !active.has(n.id);
        const isFocus = focus === n.id;
        return (
          <button
            key={n.id}
            ref={(el) => { els.current[n.id] = el; }}
            className={`ng-node ${n.kind}${n.icon ? " has-icon" : ""}${dim ? " is-dim" : ""}${isFocus ? " is-focus" : ""}${selected === n.id ? " is-selected" : ""}`}
            style={{ ["--c" as any]: n.color }}
            onPointerEnter={() => setH(n.id)}
            onPointerLeave={() => setH(null)}
            onFocus={() => setH(n.id)}
            onBlur={() => setH(null)}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              drag.current = { id: n.id, sx: e.clientX, sy: e.clientY, moved: false };
              api.current?.startDrag(n.id);
            }}
            onPointerMove={(e) => {
              const d = drag.current;
              if (!d || d.id !== n.id) return;
              if (Math.hypot(e.clientX - d.sx, e.clientY - d.sy) > 4) d.moved = true;
              if (d.moved) { const [x, y] = rel(e); api.current?.moveDrag(n.id, x, y); }
            }}
            onPointerUp={(e) => {
              if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
              api.current?.endDrag(n.id);
              const moved = drag.current?.moved;
              if (!moved) onSelect?.(n.id);
              drag.current = null;
            }}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect?.(n.id); } }}
          >
            <span className="ng-inner">
              <span className="ng-dot">{n.icon}</span>
              <span className="ng-label">{n.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
