import React, { useCallback, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import {
  Main,
  Timeline,
  Languages,
  Expertise,
  Project,
  Certifications,
  ProgrammingLanguages,
  Contact,
  Navigation,
  Footer,
} from "./components";
import Reveal from "./components/Reveal";
import Marquee from "./components/Marquee";
import GithubActivity from "./components/GithubActivity";
import ScrollProgress from "./components/ScrollProgress";
import './index.scss';
import './assets/styles/theme.scss'; // keep last so it overrides component styles
import './assets/styles/polish.scss';

const read = (k: string): string | null => { try { return localStorage.getItem(k); } catch { return null; } };
const write = (k: string, v: string) => { try { localStorage.setItem(k, v); } catch { /* private mode */ } };

function App() {
    const [mode, setMode] = useState<string>(() => (read('theme') === 'light' ? 'light' : 'dark'));
    const [language, setLanguage] = useState<'en' | 'fr'>(() => {
        const saved = read('lang');
        if (saved === 'fr' || saved === 'en') return saved;
        return typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('fr') ? 'fr' : 'en';
    });
    // Clean up the temporary palette-lab preference from earlier testing.
    useEffect(() => { try { localStorage.removeItem('palette'); } catch { /* ignore */ } }, []);

    useEffect(() => {
        write('theme', mode);
        document.documentElement.dataset.theme = mode;
        document.body.style.background = mode === 'dark' ? '#050505' : '#f6f6f1';
    }, [mode]);
    useEffect(() => { write('lang', language); document.documentElement.lang = language; }, [language]);

    // Theme switch as a circular reveal from the click point (View Transitions API), with a plain fallback.
    const toggleMode = useCallback((origin?: { x: number; y: number }) => {
        const next = mode === 'dark' ? 'light' : 'dark';
        const doc: any = document;
        if (!doc.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setMode(next); return; }
        const x = origin?.x ?? window.innerWidth / 2, y = origin?.y ?? window.innerHeight / 2;
        const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
        const t = doc.startViewTransition(() => { flushSync(() => setMode(next)); });
        t.ready.then(() => document.documentElement.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
            { duration: 650, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' }
        )).catch(() => {});
    }, [mode]);

    // Cursor spotlight on cards: publish pointer position as CSS variables.
    useEffect(() => {
        let raf = 0;
        const on = (e: PointerEvent) => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                const el = (e.target as Element | null)?.closest?.('.project-featured-shell, .certification-card, .jr-card, .gx-panel, .language-card') as HTMLElement | null;
                if (!el) return;
                const r = el.getBoundingClientRect();
                el.style.setProperty('--mx', `${e.clientX - r.left}px`);
                el.style.setProperty('--my', `${e.clientY - r.top}px`);
            });
        };
        window.addEventListener('pointermove', on, { passive: true });
        return () => { window.removeEventListener('pointermove', on); cancelAnimationFrame(raf); };
    }, []);

    useEffect(() => { window.scrollTo({top: 0, left: 0, behavior: 'smooth'}); }, []);

    return (
    <div className={`main-container ${mode === 'dark' ? 'dark-mode' : 'light-mode'}`}>
        <a className="skip-link" href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView(); }}>
            {language === 'fr' ? 'Aller au contenu' : 'Skip to content'}
        </a>
        <ScrollProgress />
        <Navigation
          parentToChild={{mode}}
          modeChange={toggleMode}
          language={language}
          onLanguageChange={setLanguage}
        />
        <main>
            <Main language={language} />
            <Marquee language={language} />
            <Reveal><Project language={language} /></Reveal>
            <Reveal><GithubActivity language={language} /></Reveal>
            <Reveal><Expertise language={language} /></Reveal>
            <Reveal><Timeline language={language} /></Reveal>
            <Reveal><Languages language={language} /></Reveal>
            <Reveal><Certifications language={language} /></Reveal>
            <Reveal><ProgrammingLanguages language={language} /></Reveal>
            <Reveal><Contact language={language} /></Reveal>
        </main>
        <Footer language={language} />

        <button className="theme-toggle" onClick={(e) => toggleMode({ x: e.clientX, y: e.clientY })}>
            <span className="emoji">{mode === 'dark' ? '☀' : '☽'}</span>
            <span className="toggle-label">{mode === 'dark' ? 'LIGHT' : 'DARK'}</span>
        </button>
    </div>
    );
}

export default App;
