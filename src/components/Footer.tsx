import React, { useEffect, useState } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { GITHUB, LINKEDIN } from "../data/site";
import CopyEmail from "./CopyEmail";
import "../assets/styles/Footer.scss";

function useClock() {
  const fmt = () => new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Paris" }).format(new Date());
  const [t, setT] = useState(fmt);
  useEffect(() => { const id = setInterval(() => setT(fmt()), 20000); return () => clearInterval(id); }, []);
  return t;
}

function Footer({ language = "en" }: { language?: "en" | "fr" }) {
  const fr = language === "fr";
  const time = useClock();
  return (
    <footer className="ft">
      <div className="ft-top">
        <div>
          <span className="gx-kicker">{fr ? "Une idée, un projet ?" : "Got something in mind?"}</span>
          <p className="ft-cta">{fr ? "Construisons quelque chose qui compte." : "Let’s build something that matters."}</p>
          <CopyEmail language={language} />
        </div>
        <div className="ft-links">
          <a href={GITHUB} target="_blank" rel="noreferrer" aria-label="GitHub"><GitHubIcon /> GitHub</a>
          <a href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon /> LinkedIn</a>
        </div>
      </div>
      <div className="ft-mark" aria-hidden="true">Zineddine Bouhadjira</div>
      <div className="ft-bottom">
        <span><i className="ft-dot" /> {fr ? "France" : "France"} · {time}</span>
        <span>© {new Date().getFullYear()} Zineddine Bouhadjira</span>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>{fr ? "Haut de page ↑" : "Back to top ↑"}</button>
      </div>
    </footer>
  );
}

export default Footer;
