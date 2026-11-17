type L2 = { en: string; fr: string };

export const DOMAIN_DEFS: { id: string; color: string; name: L2 }[] = [
  { id: "d-ai", color: "var(--s1)", name: { en: "AI & Signal", fr: "IA & Signal" } },
  { id: "d-emb", color: "var(--s4)", name: { en: "Embedded & Hardware", fr: "Embarqué & Matériel" } },
  { id: "d-data", color: "var(--s2)", name: { en: "Data", fr: "Données" } },
  { id: "d-sys", color: "var(--s3)", name: { en: "Systems & Automation", fr: "Systèmes & Automatisation" } },
];

export const LANG_DEFS: { id: string; name: string; domains: string[]; use: L2 }[] = [
  { id: "python", name: "Python", domains: ["d-ai", "d-data", "d-sys"], use: { en: "My main language: deep learning, vision, audio and data pipelines.", fr: "Mon langage principal : deep learning, vision, audio et pipelines de données." } },
  { id: "matlab", name: "MATLAB", domains: ["d-ai", "d-emb"], use: { en: "Signal processing and fast algorithm prototyping.", fr: "Traitement du signal et prototypage rapide d'algorithmes." } },
  { id: "c", name: "C", domains: ["d-emb", "d-sys"], use: { en: "Low-level and embedded programming.", fr: "Programmation bas niveau et embarquée." } },
  { id: "cpp", name: "C++", domains: ["d-emb", "d-ai"], use: { en: "Performance-critical code and real-time systems.", fr: "Code critique en performance et systèmes temps réel." } },
  { id: "csharp", name: "C#", domains: ["d-sys"], use: { en: "Application and tooling development.", fr: "Développement d'applications et d'outils." } },
  { id: "vhdl", name: "VHDL", domains: ["d-emb"], use: { en: "Digital circuit design for FPGA.", fr: "Conception de circuits numériques pour FPGA." } },
  { id: "asm", name: "Assembly", domains: ["d-emb"], use: { en: "Close-to-the-metal microcontroller programming.", fr: "Programmation de microcontrôleurs au plus près du matériel." } },
  { id: "sql", name: "SQL", domains: ["d-data"], use: { en: "Relational data modelling and querying (PostgreSQL).", fr: "Modélisation et requêtes de données relationnelles (PostgreSQL)." } },
  { id: "r", name: "R", domains: ["d-data", "d-ai"], use: { en: "Statistics and exploratory data analysis.", fr: "Statistiques et analyse exploratoire de données." } },
  { id: "bash", name: "Bash", domains: ["d-sys"], use: { en: "Linux automation and tooling.", fr: "Automatisation et outillage Linux." } },
];

export const LANG_COUNT = LANG_DEFS.length;
