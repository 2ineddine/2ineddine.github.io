import React, { useEffect, useRef, useState } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import { CERT_COUNT } from "./Certifications";
import { LANG_COUNT } from "./ProgrammingLanguages";
import { TOOL_COUNT } from "./Expertise";
import { EMAIL, GITHUB, LINKEDIN, PROJECTS, goTo } from "../data/site";
import "../assets/styles/Main.scss";

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

  // Soft glow that trails the cursor inside the hero.
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget, r = el.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
    cancelAnimationFrame(glow.current);
    glow.current = requestAnimationFrame(() => { el.style.setProperty("--gx", `${x}px`); el.style.setProperty("--gy", `${y}px`); });
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
            {fr ? "Je conçois et déploie des systèmes d'IA — " : "I design and ship AI systems — "}
            <RotatingWord words={words} />
            {fr ? " — du prototype à la production." : " — from prototype to production."}
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
          <img src={require("../assets/images/me.png")} alt="Zineddine Bouhadjira" />
        </div>
        <a className="scroll-hint" href="#projects" onClick={(e) => { e.preventDefault(); goTo("projects"); }}>
          {fr ? "Défiler" : "Scroll to explore"}
        </a>
      </div>
    </div>
  );
}

export default Main;
