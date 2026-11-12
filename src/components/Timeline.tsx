import React, { useEffect, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import orangeLogo from "../assets/images/orange.png";
import sorbonneLogo from "../assets/images/sorbonne.png";
import lyon1Logo from "../assets/images/lyon1.jpg";
import "../assets/styles/Journey.scss";

type L2 = { en: string; fr: string };
type Tag = { label: L2; skill?: string }; // skill = node id in the competency map

type Item = {
  id: string; kind: "work" | "edu"; start: number; end: number | "now";
  title: L2; short: L2; org: string; logo: string; place: string; date: L2; tags?: Tag[];
};

const ITEMS: Item[] = [
  {
    id: "orange", kind: "work", start: 2026.08, end: "now",
    title: { en: "AI Engineer Intern", fr: "Stagiaire ingénieur IA" }, short: { en: "Orange", fr: "Orange" },
    org: "Orange", logo: orangeLogo, place: "Rennes, France",
    date: { en: "Feb. 2026 – Present", fr: "Fév. 2026 – Aujourd'hui" },
    tags: [
      { label: { en: "Deep Learning", fr: "Deep Learning" }, skill: "dl" },
      { label: { en: "GANs", fr: "GANs" }, skill: "gans" },
      { label: { en: "Transformers", fr: "Transformers" }, skill: "transformers" },
      { label: { en: "MLOps", fr: "MLOps" }, skill: "mlops" },
      { label: { en: "Experiment Tracking", fr: "Suivi des expériences" }, skill: "experiment-tracking" },
    ],
  },
  {
    id: "sorbonne-intern", kind: "work", start: 2025.33, end: 2025.75,
    title: { en: "Data Scientist Intern", fr: "Stagiaire data scientist" }, short: { en: "Sorbonne", fr: "Sorbonne" },
    org: "Sorbonne Université", logo: sorbonneLogo, place: "Paris, France",
    date: { en: "May 2025 – Sept. 2025", fr: "Mai 2025 – Sept. 2025" },
    tags: [
      { label: { en: "Sensor Fusion", fr: "Fusion de capteurs" }, skill: "camera-lidar-fusion" },
      { label: { en: "Computer Vision", fr: "Vision par ordinateur" }, skill: "cv" },
      { label: { en: "State Estimation", fr: "Estimation d'état" }, skill: "kalman-particle-filters" },
      { label: { en: "Robotics", fr: "Robotique" } },
    ],
  },
  {
    id: "master", kind: "edu", start: 2024.0, end: 2026.5,
    title: { en: "Master’s – Intelligent Systems Engineering", fr: "Master – Ingénierie des systèmes intelligents" },
    short: { en: "Master · Sorbonne", fr: "Master · Sorbonne" },
    org: "Sorbonne University", logo: sorbonneLogo, place: "Paris, France",
    date: { en: "2024 – 2026", fr: "2024 – 2026" },
  },
  {
    id: "bachelor", kind: "edu", start: 2021.0, end: 2024.0,
    title: { en: "Bachelor’s – Electronics, Electrical Energy and Automation", fr: "Licence – Électronique, énergie électrique et automatisation" },
    short: { en: "Bachelor · Lyon 1", fr: "Licence · Lyon 1" },
    org: "Claude Bernard Lyon 1 University", logo: lyon1Logo, place: "Villeurbanne, France",
    date: { en: "2021 – 2024", fr: "2021 – 2024" },
  },
];

function Timeline({ language = "en" }: { language?: "en" | "fr" }) {
  const fr = language === "fr";
  const lang = fr ? "fr" : "en";
  const [filter, setFilter] = useState<"all" | "work" | "edu">("all");
  const [active, setActive] = useState<string>(ITEMS[0].id);
  const listRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});

  const now = useMemo(() => { const d = new Date(); return d.getFullYear() + d.getMonth() / 12; }, []);
  const rs = 2021, re = Math.max(2027, Math.ceil(now));
  const pct = (v: number) => ((v - rs) / (re - rs)) * 100;
  const years = Array.from({ length: re - rs }, (_, i) => rs + i);

  const shown = ITEMS.filter((i) => filter === "all" || i.kind === filter);

  // On narrow screens start the rail scrolled to "now"
  useEffect(() => { const r = railRef.current; if (r) r.scrollLeft = r.scrollWidth; }, []);

  // Scroll-linked spine + which card is "current"
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, (window.innerHeight * 0.55 - r.top) / r.height));
      el.style.setProperty("--p", String(p));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) setActive((e.target as HTMLElement).dataset.id!); }),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    Object.values(cardRefs.current).forEach((c) => c && io.observe(c));
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); io.disconnect(); };
  }, [filter]);

  const goto = (id: string) => {
    if (filter !== "all" && ITEMS.find((i) => i.id === id)!.kind !== filter) setFilter("all");
    setActive(id);
    setTimeout(() => cardRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "center" }), 30);
  };
  const focusSkill = (id?: string) => id && window.dispatchEvent(new CustomEvent("skill-focus", { detail: { id } }));

  const lane = (kind: "work" | "edu") => ITEMS.filter((i) => i.kind === kind);

  return (
    <div id="history" className="history-section">
      <h1>{fr ? "Parcours" : "Journey"}</h1>
      <p className="skills-lead">
        {fr
          ? "Expériences au-dessus de la ligne, études en dessous. Cliquez une période pour y aller, cliquez une compétence pour la retrouver sur la carte."
          : "Work above the line, studies below. Click a span to jump to it, click a skill to find it on the competency map."}
      </p>

      {/* ---------- Rail ---------- */}
      <div className="jr-scroll" ref={railRef}>
        <div className="jr-rail" role="list">
          {years.map((y) => (
            <span key={y} className="jr-tick" style={{ left: `${pct(y)}%` }}><i />{y}</span>
          ))}
          <div className="jr-axis" />
          <span className="jr-now" style={{ left: `${pct(now)}%` }}><i /><b>{fr ? "Maintenant" : "Now"}</b></span>
          {(["work", "edu"] as const).map((k) =>
            lane(k).map((it) => {
              const end = it.end === "now" ? now : it.end;
              const left = pct(it.start), width = pct(end) - left;
              return (
                <button
                  key={it.id}
                  role="listitem"
                  className={`jr-seg ${k}${active === it.id ? " on" : ""}${filter !== "all" && filter !== k ? " off" : ""}`}
                  style={{ left: `${left}%`, width: `${width}%` }}
                  onClick={() => goto(it.id)}
                  aria-label={`${it.title[lang]} — ${it.date[lang]}`}
                >
                  <span className="jr-seg-label">{it.short[lang]}</span>
                </button>
              );
            })
          )}
          <span className="jr-lane work-l">{fr ? "Travail" : "Work"}</span>
          <span className="jr-lane edu-l">{fr ? "Études" : "Study"}</span>
        </div>
      </div>

      <div className="jr-filters" role="tablist">
        {(["all", "work", "edu"] as const).map((f) => (
          <button key={f} role="tab" aria-selected={filter === f} className={filter === f ? "on" : ""} onClick={() => setFilter(f)}>
            {f === "all" ? (fr ? "Tout" : "All") : f === "work" ? (fr ? "Expérience" : "Work") : fr ? "Formation" : "Education"}
          </button>
        ))}
      </div>

      {/* ---------- Cards ---------- */}
      <div className="jr-list" ref={listRef}>
        <div className="jr-spine"><i /></div>
        {shown.map((it) => (
          <article
            key={it.id}
            data-id={it.id}
            ref={(el) => { cardRefs.current[it.id] = el; }}
            className={`jr-card ${it.kind}${active === it.id ? " on" : ""}`}
          >
            <span className="jr-marker"><FontAwesomeIcon icon={it.kind === "work" ? faBriefcase : faGraduationCap} /></span>
            <div className="jr-head">
              <span className="gx-kicker">{it.kind === "work" ? (fr ? "Expérience" : "Work") : fr ? "Formation" : "Education"}</span>
              <span className="jr-date">{it.date[lang]}</span>
            </div>
            <h3>{it.title[lang]}</h3>
            <div className="jr-org">
              <img src={it.logo} alt="" />
              <strong>{it.org}</strong>
              <span>· {it.place}</span>
            </div>
            {it.tags && (
              <div className="gx-chips">
                {it.tags.map((t) => (
                  <button
                    key={t.label.en}
                    className={`gx-chip${t.skill ? "" : " static"}`}
                    onClick={() => focusSkill(t.skill)}
                    disabled={!t.skill}
                    title={t.skill ? (fr ? "Voir sur la carte des compétences" : "Show on the competency map") : undefined}
                  >
                    {t.label[lang]}{t.skill ? " ↗" : ""}
                  </button>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}

export default Timeline;
