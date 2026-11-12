export const EMAIL = "zed.bouhadjira@gmail.com";
export const GITHUB = "https://github.com/2ineddine";
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

export const goTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export async function copyEmail(): Promise<boolean> {
  try { await navigator.clipboard.writeText(EMAIL); return true; } catch { return false; }
}

