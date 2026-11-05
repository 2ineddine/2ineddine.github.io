import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import '../assets/styles/Main.scss';

function Main({ language = 'en' }: { language?: 'en' | 'fr' }) {
  const fr = language === 'fr';
  const title = fr ? 'Data Scientist | Ingénieur IA' : 'Data Scientist | AI Engineer';
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const socials = (
    <>
      <a href="https://github.com/2ineddine" target="_blank" rel="noreferrer" aria-label="GitHub"><GitHubIcon/></a>
      <a href="https://fr.linkedin.com/in/zineddine-bouhadjira" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon/></a>
      <a href="mailto:zed.bouhadjira@gmail.com" target="_blank" rel="noreferrer" aria-label="Email"><EmailIcon/></a>
    </>
  );

  return (
    <div className="container" id="home">
      <div className="about-section">
        <div className="content hero-copy">
          <span className="eyebrow"><i className="dot" />{fr ? 'Ouvert aux opportunités' : 'Open to new opportunities'}</span>
          <h1>Zineddine <em>Bouhadjira</em></h1>
          <p className="role">{title}</p>
          <p className="vision-text">
            {fr
              ? "Je conçois et déploie des systèmes d'IA — vision, audio et LLM — du prototype à la production."
              : 'I design and ship AI systems — vision, audio and LLMs — from prototype to production.'}
          </p>

          <div className="hero-cta">
            <button className="btn btn-primary" onClick={() => go('projects')}>{fr ? 'Voir les projets' : 'View projects'} ↗</button>
            <button className="btn btn-ghost" onClick={() => go('contact')}>{fr ? 'Me contacter' : 'Contact me'}</button>
          </div>

          <div className="social_icons">{socials}</div>
          <div className="mobile_social_icons">{socials}</div>
        </div>

        <div className="image-wrapper">
          <img src={require("../assets/images/me.png")} alt="Zineddine Bouhadjira" />
        </div>
        <a className="scroll-hint" href="#projects" onClick={(e) => { e.preventDefault(); go('projects'); }}>
          {fr ? 'Défiler' : 'Scroll to explore'}
        </a>
      </div>
    </div>
  );
}

export default Main;
