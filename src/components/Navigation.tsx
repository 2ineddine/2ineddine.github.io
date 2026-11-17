import React, { useCallback, useEffect, useRef, useState } from "react";
import { MenuIcon } from "./icons";
import { goTo } from "../data/site";
import "../assets/styles/nav.scss";

const SPY_IDS = ["home", "projects", "activity", "expertise", "history", "languages", "certifications", "programming-languages", "contact"];

function Navigation({ parentToChild, modeChange, language = "en", onLanguageChange }: any) {
  const fr = language === "fr";
  const mode = parentToChild?.mode;

  const navItems: [string, string][] = fr
    ? [["Accueil", "home"], ["Projets", "projects"], ["Activité", "activity"], ["Compétences", "expertise"], ["Parcours", "history"], ["Langues", "languages"], ["Certifications", "certifications"], ["Langages", "programming-languages"], ["Contact", "contact"]]
    : [["Home", "home"], ["Projects", "projects"], ["Activity", "activity"], ["Skills", "expertise"], ["Journey", "history"], ["Languages", "languages"], ["Certifications", "certifications"], ["Programming", "programming-languages"], ["Contact", "contact"]];

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [current, setCurrent] = useState("home");
  const burgerRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Frosted bar once the page has scrolled past the bar height. Passive listener; state only changes when crossing the threshold.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy via IntersectionObserver (no layout reads while scrolling): the section crossing a thin band at 40% of the viewport is "current".
  useEffect(() => {
    const els = SPY_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top).pop();
        if (hit) setCurrent(hit.target.id);
      },
      { rootMargin: "-40% 0px -59.5% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Drawer: lock page scroll, trap focus, close on Escape, restore focus to the hamburger.
  useEffect(() => {
    const root = rootRef.current as (HTMLDivElement & { inert?: boolean }) | null;
    const burger = burgerRef.current;
    if (root) root.inert = !open;
    if (!open) return;
    document.documentElement.classList.add("nav-locked");
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 30);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); setOpen(false); return; }
      if (e.key !== "Tab" || !drawerRef.current) return;
      const f = Array.from(drawerRef.current.querySelectorAll<HTMLElement>("button:not([disabled])"));
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("nav-locked");
      burger?.focus({ preventScroll: true });
    };
  }, [open]);

  const closeAnd = useCallback((fn: () => void) => () => { setOpen(false); window.setTimeout(fn, 250); }, []);

  return (
    <>
      <nav id="navigation" className={`navbar-fixed-top${scrolled ? " scrolled" : ""}`} aria-label={fr ? "Navigation principale" : "Main navigation"}>
        <div className="navigation-bar">
          <button ref={burgerRef} className="nav-menu-btn" aria-label={fr ? "Ouvrir le menu" : "Open menu"} aria-expanded={open} aria-controls="nav-drawer" onClick={() => setOpen(true)}>
            <MenuIcon />
          </button>
          <button className="nav-brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Zineddine Bouhadjira">
            <span className="nav-brand-mark">ZB</span>
            <span className="nav-brand-name">Zineddine</span>
          </button>
          <div className="nav-links">
            {navItems.filter((i) => i[1] !== "contact").map(([label, id]) => (
              <button key={id} className={current === id ? "nav-link active" : "nav-link"} onClick={() => goTo(id)}>
                {label}
              </button>
            ))}
          </div>
          <div className="nav-spacer" />
          <button className="nav-icon-btn nav-theme-btn" aria-label={fr ? "Changer de thème" : "Toggle theme"} onClick={(e) => modeChange?.({ x: e.clientX, y: e.clientY })}>
            {mode === "dark" ? "☀" : "☽"}
          </button>
          <button className="nav-btn lang-btn" onClick={() => onLanguageChange?.(language === "en" ? "fr" : "en")}>
            {language === "en" ? "FR" : "EN"}
          </button>
          <button className="nav-btn nav-cta" onClick={() => goTo("contact")}>Contact ↗</button>
        </div>
      </nav>

      <div className={`nav-drawer-root${open ? " open" : ""}`} ref={rootRef} aria-hidden={!open}>
        <div className="nav-drawer-backdrop" onClick={() => setOpen(false)} />
        <aside id="nav-drawer" className="nav-drawer" role="dialog" aria-modal="true" aria-label="Menu" ref={drawerRef}>
          <div className="nav-drawer-inner">
            <div className="nav-drawer-head">
              <span className="nav-brand-mark">ZB</span>
              <button ref={closeRef} className="nav-icon-btn" aria-label={fr ? "Fermer le menu" : "Close menu"} onClick={() => setOpen(false)}>✕</button>
            </div>
            <ul className="nav-drawer-list">
              {navItems.map(([label, id], i) => (
                <li key={id}>
                  <button className={`nav-drawer-item${current === id ? " on" : ""}`} aria-current={current === id ? "true" : undefined} onClick={closeAnd(() => goTo(id))}>
                    <span className="nav-drawer-n">{String(i + 1).padStart(2, "0")}</span>
                    <span className="nav-drawer-label">{label}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="nav-drawer-foot">
              <button className="nav-drawer-chip" onClick={(e) => modeChange?.({ x: e.clientX, y: e.clientY })}>
                {mode === "dark" ? "☀ " : "☽ "}{mode === "dark" ? (fr ? "Mode clair" : "Light mode") : fr ? "Mode sombre" : "Dark mode"}
              </button>
              <button className="nav-drawer-chip" onClick={() => onLanguageChange?.(language === "en" ? "fr" : "en")}>
                {language === "en" ? "Français" : "English"}
              </button>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

export default Navigation;
