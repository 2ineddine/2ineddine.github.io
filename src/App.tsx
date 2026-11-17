import React, { useCallback, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import Main from "./components/Main";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Marquee from "./components/Marquee";
import ScrollProgress from "./components/ScrollProgress";
import LazySection from "./components/LazySection";
import { goTo } from "./data/site";
import { mountRemainingWhenIdle } from "./lazy/registry";
// Component stylesheets are imported here (not only from inside the lazy chunks) so they stay in the MAIN css file, ahead of theme.scss.
// That keeps the cascade identical to before and means no section's styles can arrive after its markup.
import './assets/styles/NeuralGraph.scss';
import './assets/styles/Expertise.scss';
import './assets/styles/Journey.scss';
import './assets/styles/Languages.scss';
import './assets/styles/Project.scss';
import './assets/styles/Certifications.scss';
import './assets/styles/Contact.scss';
import './assets/styles/GithubActivity.scss';
import './index.scss';
import './assets/styles/theme.scss'; // keep last so it overrides component styles
import './assets/styles/polish.scss';
import './assets/styles/mobile.scss';

// Everything below the fold is code-split. `webpackPrefetch` fetches each chunk at idle priority after the page has loaded,
// so by the time a section scrolls into view its code is already in the cache (and it never competes with the first paint).
const loadProject = () => import(/* webpackPrefetch: true */ "./components/Project");
const loadActivity = () => import(/* webpackPrefetch: true */ "./components/GithubActivity");
const loadExpertise = () => import(/* webpackPrefetch: true */ "./components/Expertise");
const loadTimeline = () => import(/* webpackPrefetch: true */ "./components/Timeline");
const loadLanguages = () => import(/* webpackPrefetch: true */ "./components/Languages");
const loadCertifications = () => import(/* webpackPrefetch: true */ "./components/Certifications");
const loadProgramming = () => import(/* webpackPrefetch: true */ "./components/ProgrammingLanguages");
// The contact form is the only section that needs MUI (~50 kB): load it strictly on demand — when the visitor gets near it or jumps to it.
const loadContact = () => import("./components/Contact");

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
    useEffect(() => mountRemainingWhenIdle(6000), []);

    return (
    <div className={`main-container ${mode === 'dark' ? 'dark-mode' : 'light-mode'}`}>
        <a className="skip-link" href="#projects" onClick={(e) => { e.preventDefault(); goTo('projects'); }}>
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
            <LazySection id="projects" loader={loadProject} language={language} minHeight={2222} minHeightMobile={614} />
            <LazySection id="activity" loader={loadActivity} language={language} minHeight={1026} minHeightMobile={1018} />
            <LazySection id="expertise" loader={loadExpertise} language={language} minHeight={992} minHeightMobile={1437} />
            <LazySection id="history" loader={loadTimeline} language={language} minHeight={1553} minHeightMobile={1684} />
            <LazySection id="languages" loader={loadLanguages} language={language} minHeight={410} minHeightMobile={354} />
            <LazySection id="certifications" loader={loadCertifications} language={language} minHeight={1249} minHeightMobile={495} />
            <LazySection id="programming-languages" loader={loadProgramming} language={language} minHeight={900} minHeightMobile={1204} />
            <LazySection id="contact" loader={loadContact} language={language} minHeight={1013} minHeightMobile={834} idleMount={false} />
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
