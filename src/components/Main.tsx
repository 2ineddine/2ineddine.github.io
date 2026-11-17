import React, { useEffect, useRef, useState } from "react";
import { EmailIcon, GitHubIcon, LinkedInIcon } from "./icons";
import { CERT_COUNT } from "../data/certs";
import { LANG_COUNT } from "../data/languages";
import { TOOL_COUNT } from "../data/skills";
import { EMAIL, GITHUB, LINKEDIN, PROJECTS, goTo } from "../data/site";
import "../assets/styles/Main.scss";

// Hero portrait lives in /public/img with content-hashed names so index.html can <link rel=preload> it.
const PUB = process.env.PUBLIC_URL || "";
const HERO_SMALL = `${PUB}/img/me-480.2db1cb10.webp`;
const HERO_BIG = `${PUB}/img/me-771.bdd1c44e.webp`;

/** Cycles through a list of words, one at a time. */
function RotatingWord({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % words.length), 2400);
    return () => clearInterval(id);
  }, [words.length]);
  return <span className="rot" key={i} aria-label={words[0]}>{words[i % words.length]}</span>;
}

/** Counts up to `to` the first time it is visible. */
function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) { setN(to); return; }
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / 1200);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return <strong ref={ref}>{n}</strong>;
}

function Main({ language = "en" }: { language?: "en" | "fr" }) {
  const fr = language === "fr";
  const title = fr ? "Data Scientist | Ingénieur IA" : "Data Scientist | AI Engineer";
  const words = fr ? ["vision par ordinateur", "audio", "LLM", "MLOps"] : ["computer vision", "audio", "LLMs", "MLOps"];
  const glow = useRef<number>(0);
  const lead = fr ? "Je conçois et déploie des systèmes d'IA — " : "I design and ship AI systems — ";
  const tail = fr ? " — du prototype à la production." : " — from prototype to production.";
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  // Soft glow that trails the cursor inside the hero.
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget, r = el.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
    cancelAnimationFrame(glow.current);
    // offsets from the glow's resting spot (78% / 30%); applied as a transform so no layout work happens
    glow.current = requestAnimationFrame(() => { el.style.setProperty("--dx", `${(x - r.width * 0.78).toFixed(1)}px`); el.style.setProperty("--dy", `${(y - r.height * 0.3).toFixed(1)}px`); });
  };

  const stats = [
    { n: PROJECTS.length, l: fr ? "Projets" : "Projects" },
    { n: TOOL_COUNT, l: fr ? "Outils" : "Tools" },
    { n: LANG_COUNT, l: fr ? "Langages" : "Languages" },
    { n: CERT_COUNT, l: fr ? "Certifications" : "Certificates" },
  ];

  const socials = (
    <>
      <a href={GITHUB} target="_blank" rel="noreferrer" aria-label="GitHub"><GitHubIcon /></a>
      <a href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
      <a href={`mailto:${EMAIL}`} aria-label="Email"><EmailIcon /></a>
    </>
  );

  return (
    <div className="container" id="home">
      <div className="about-section" onPointerMove={onMove}>
        <div className="content hero-copy">
          <span className="eyebrow"><i className="dot" />{fr ? "Ouvert aux opportunités" : "Open to new opportunities"}</span>
          <h1>Zineddine <em>Bouhadjira</em></h1>
          <p className="role">{title}</p>
          <p className="vision-text">
            {/* invisible copy with the longest word: reserves the tallest layout so the text below never jumps */}
            <span className="vt-sizer" aria-hidden="true">{lead}<span className="rot">{longest}</span>{tail}</span>
            <span className="vt-live">{lead}<RotatingWord words={words} />{tail}</span>
          </p>

          <div className="hero-cta">
            <button className="btn btn-primary" onClick={() => goTo("projects")}>{fr ? "Voir les projets" : "View projects"} ↗</button>
            <button className="btn btn-ghost" onClick={() => goTo("contact")}>{fr ? "Me contacter" : "Contact me"}</button>
          </div>

          <div className="social_icons">{socials}</div>
          <div className="mobile_social_icons">{socials}</div>

          <div className="hero-stats">
            {stats.map((s) => (
              <div key={s.l}><CountUp to={s.n} /><span>{s.l}</span></div>
            ))}
          </div>
        </div>

        <div className="image-wrapper">
          <img
            src={HERO_BIG}
            srcSet={`${HERO_SMALL} 480w, ${HERO_BIG} 771w`}
            sizes="(max-width: 900px) min(62vw, 320px), min(36vw, 380px)"
            width={771}
            height={762}
            alt="Zineddine Bouhadjira"
            decoding="async"
            {...({ fetchpriority: "high" } as Record<string, string>)}
          />
        </div>
        <a className="scroll-hint" href="#projects" onClick={(e) => { e.preventDefault(); goTo("projects"); }}>
          {fr ? "Défiler" : "Scroll to explore"}
        </a>
      </div>
    </div>
  );
}

export default Main;
