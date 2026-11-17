import { mountUpTo } from "../lazy/registry";

export const EMAIL = "zed.bouhadjira@gmail.com";
export const GITHUB_USER = "2ineddine";
export const GITHUB = `https://github.com/${GITHUB_USER}`;
export const LINKEDIN = "https://fr.linkedin.com/in/zineddine-bouhadjira";

export const PROJECTS: { id: string; title: string; cat: string }[] = [
  { id: "nvidia", title: "NVIDIA Nemotron Fine-tuning – Kaggle Competition", cat: "LLM" },
  { id: "motion", title: "Motion Detection, Estimation and Tracking on Images", cat: "Vision" },
  { id: "yolo26", title: "YOLO26 – Pothole and Crack Detection on Roads", cat: "Vision" },
  { id: "labor-code", title: "Retrieval-Augmented Generation System for French Labor Code", cat: "LLM" },
  { id: "source-separation", title: "Singing Voice Separation with Deep U-Net", cat: "Audio" },
  { id: "matcha", title: "Matcha-TTS Implementation Analysis", cat: "Audio" },
  { id: "jungle", title: "Self-Supervised Acoustic Representation Learning for Forest Soundscapes", cat: "Audio" },
];

export const SECTIONS: { id: string; en: string; fr: string }[] = [
  { id: "home", en: "Home", fr: "Accueil" },
  { id: "projects", en: "Projects", fr: "Projets" },
  { id: "expertise", en: "Skills", fr: "Compétences" },
  { id: "history", en: "Journey", fr: "Parcours" },
  { id: "languages", en: "Languages", fr: "Langues" },
  { id: "certifications", en: "Certifications", fr: "Certifications" },
  { id: "programming-languages", en: "Programming", fr: "Langages" },
  { id: "contact", en: "Contact", fr: "Contact" },
];

const scrollIdle = (quiet = 160, cap = 3500) =>
  new Promise<void>((resolve) => {
    let t = 0, capT = 0;
    const done = () => { window.removeEventListener("scroll", onScroll); window.clearTimeout(t); window.clearTimeout(capT); resolve(); };
    const onScroll = () => { window.clearTimeout(t); t = window.setTimeout(done, quiet); };
    window.addEventListener("scroll", onScroll, { passive: true });
    t = window.setTimeout(done, quiet + 140); // nothing to scroll? don't wait
    capT = window.setTimeout(done, cap);
  });

/**
 * Smooth-scroll to an element, then re-aim if late layout changes (data arriving, images loading…)
 * moved it while we were scrolling — so every jump lands exactly on its target.
 */
export async function scrollToId(id: string): Promise<void> {
  const target = () => document.getElementById(id);
  target()?.scrollIntoView({ behavior: "smooth" });
  const pad = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  for (let i = 0; i < 4; i++) {
    await scrollIdle();
    const el = target();
    if (!el) return;
    const off = el.getBoundingClientRect().top - pad;
    const atTop = window.scrollY <= 1;
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (Math.abs(off) <= 6 || (off < 0 && atTop) || (off > 0 && atBottom)) return;
    el.scrollIntoView({ behavior: "smooth" });
  }
}

/** Jump to a section. Lazy sections above it are mounted first so the target is where it will stay. */
export async function goTo(id: string): Promise<void> {
  await mountUpTo(id);
  await scrollToId(id);
}

/** Jump to the competency map and highlight a tool/domain (used by the ticker and the journey tags). */
export async function focusSkill(id: string): Promise<void> {
  await mountUpTo("expertise");
  window.dispatchEvent(new CustomEvent("skill-focus", { detail: { id } }));
}

export async function copyEmail(): Promise<boolean> {
  try { await navigator.clipboard.writeText(EMAIL); return true; } catch { return false; }
}


/** True on phones/tablets (coarse primary pointer) — used to say "tap" instead of "click"/"hover". */
export const isTouch = () => typeof window !== "undefined" && !!window.matchMedia?.("(pointer: coarse)").matches;
