import React, { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDocker } from "@fortawesome/free-brands-svg-icons";
import { faBrain, faRobot, faWaveSquare, faEye } from "@fortawesome/free-solid-svg-icons";
import NeuralGraph, { GLink, GNode } from "./NeuralGraph";
import "../assets/styles/Expertise.scss";

type L2 = { en: string; fr: string };

export const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const HUBS: { id: string; icon: any; color: string; short: L2; title: L2; desc: L2; stack: string[] }[] = [
  {
    id: "dl", icon: faBrain, color: "var(--s1)",
    short: { en: "Deep Learning", fr: "Deep Learning" },
    title: { en: "Deep Learning & Generative Modeling", fr: "Apprentissage profond et modélisation générative" },
    desc: {
      en: "I design, train, and optimize deep learning models, from convolutional and transformer architectures to modern generative models, emphasizing robust training pipelines, reproducibility, and reliable evaluation.",
      fr: "Je conçois, entraîne et optimise des modèles d'apprentissage profond, des architectures convolutives et transformeurs aux modèles génératifs modernes, avec un fort accent sur les pipelines d'entraînement robustes, la reproductibilité et l'évaluation fiable.",
    },
    stack: ["PyTorch", "TensorFlow/Keras", "scikit-learn", "CNNs", "Transformers", "GANs", "WGAN / WGAN-GP", "Diffusion Models", "Flow Matching"],
  },
  {
    id: "cv", icon: faEye, color: "var(--s2)",
    short: { en: "Vision", fr: "Vision" },
    title: { en: "Computer Vision & Multimodal Perception", fr: "Vision par ordinateur et perception multimodale" },
    desc: {
      en: "I develop vision systems for detection, segmentation, tracking, and multimodal perception, combining deep learning with sensor fusion techniques for robust real-time scene understanding.",
      fr: "Je développe des systèmes de vision pour la détection, la segmentation, le suivi et la perception multimodale, en combinant apprentissage profond et fusion de capteurs pour une compréhension robuste de la scène en temps réel.",
    },
    stack: ["OpenCV", "YOLOv8", "Object Detection", "Instance Segmentation", "Optical Flow", "Multi-Object Tracking", "Kalman & Particle Filters", "Camera-LiDAR Fusion", "DINO / ViT"],
  },
  {
    id: "audio", icon: faWaveSquare, color: "var(--s3)",
    short: { en: "Audio", fr: "Audio" },
    title: { en: "Audio & Speech Processing", fr: "Traitement audio et vocal" },
    desc: {
      en: "I build deep learning solutions for speech and audio analysis, including source separation, speech synthesis, and signal processing for intelligent audio applications.",
      fr: "Je conçois des solutions d'apprentissage profond pour l'analyse de la parole et de l'audio, y compris la séparation de sources, la synthèse vocale et le traitement du signal pour des applications audio intelligentes.",
    },
    stack: ["Signal Processing", "Audio Source Separation", "Speech Synthesis (TTS)", "Ambisonic Audio"],
  },
  {
    id: "mlops", icon: faDocker, color: "var(--s4)",
    short: { en: "MLOps", fr: "MLOps" },
    title: { en: "MLOps & Cloud Infrastructure", fr: "MLOps et infrastructure cloud" },
    desc: {
      en: "I deploy and scale machine learning systems using containerized environments, automated CI/CD pipelines, experiment tracking, and cloud-native infrastructure for production-ready AI.",
      fr: "Je déploie et mets à l'échelle les systèmes d'apprentissage automatique à l'aide d'environnements conteneurisés, de pipelines CI/CD automatisés, de suivi d'expériences et d'infrastructures cloud pour des IA prêtes à la production.",
    },
    stack: ["Docker", "Kubernetes", "GitLab CI/CD", "PostgreSQL", "Experiment Tracking", "Model Versioning", "Model Monitoring", "Google Cloud Platform", "Vertex AI", "Databricks", "Linux"],
  },
  {
    id: "llm", icon: faRobot, color: "var(--s5)",
    short: { en: "LLMs", fr: "LLM" },
    title: { en: "LLM Engineering & Retrieval Systems", fr: "Ingénierie LLM et systèmes de recherche" },
    desc: {
      en: "I build retrieval-augmented generation pipelines and intelligent agent systems by combining large language models, vector search, and orchestration frameworks to deliver reliable, domain-specific AI applications.",
      fr: "Je construis des pipelines de génération augmentée par récupération et des systèmes d'agents intelligents en combinant grands modèles de langage, recherche vectorielle et frameworks d'orchestration pour des applications IA fiables et spécifiques au domaine.",
    },
    stack: ["LLMs", "LangChain", "LangGraph", "RAG", "Hugging Face", "FAISS", "Embedding Retrieval", "Vector Search", "Agentic AI"],
  },
];

// Tools that genuinely span several domains -> extra links make the graph a real network.
const SHARED: Record<string, string[]> = {
  pytorch: ["cv", "audio"],
  transformers: ["llm"],
  "dino-vit": ["dl"],
  "experiment-tracking": ["dl"],
};

// Flat index of every hub/tool, used by the tech marquee.
export const SKILL_INDEX: { id: string; label: string; hub: boolean }[] = (() => {
  const seen = new Set<string>();
  const out: { id: string; label: string; hub: boolean }[] = [];
  HUBS.forEach((h) => out.push({ id: h.id, label: h.short.en, hub: true }));
  HUBS.forEach((h) => h.stack.forEach((l) => { const id = slug(l); if (!seen.has(id)) { seen.add(id); out.push({ id, label: l, hub: false }); } }));
  return out;
})();
export const TOOL_COUNT = SKILL_INDEX.filter((s) => !s.hub).length;

function Expertise({ language = "en" }: { language?: "en" | "fr" }) {
  const fr = language === "fr";
  const lang = fr ? "fr" : "en";
  const [sel, setSel] = useState<{ hub: string; leaf: string | null }>({ hub: "dl", leaf: null });
  const [chipHover, setChipHover] = useState<string | null>(null);

  const { leafLabel, leafHubs, hubLeaves, links } = useMemo(() => {
    const leafLabel: Record<string, string> = {};
    const leafHubs: Record<string, string[]> = {};
    const ls: GLink[] = [];
    HUBS.forEach((h) => h.stack.forEach((label) => {
      const id = slug(label);
      leafLabel[id] = label;
      (leafHubs[id] ||= []).push(h.id);
      ls.push([h.id, id]);
    }));
    Object.entries(SHARED).forEach(([id, hubs]) => hubs.forEach((h) => {
      if (!leafHubs[id].includes(h)) { leafHubs[id].push(h); ls.push([h, id]); }
    }));
    const hubLeaves: Record<string, string[]> = {};
    Object.entries(leafHubs).forEach(([id, hs]) => hs.forEach((h) => (hubLeaves[h] ||= []).push(id)));
    return { leafLabel, leafHubs, hubLeaves, links: ls };
  }, []);

  const nodes: GNode[] = useMemo(() => {
    const color = Object.fromEntries(HUBS.map((h) => [h.id, h.color]));
    return [
      ...HUBS.map<GNode>((h) => ({ id: h.id, label: h.short[lang], kind: "hub", color: h.color, icon: <FontAwesomeIcon icon={h.icon} /> })),
      ...Object.keys(leafLabel).map<GNode>((id) => ({ id, label: leafLabel[id], kind: "leaf", color: color[leafHubs[id][0]] })),
    ];
  }, [lang, leafLabel, leafHubs]);

  const hub = HUBS.find((h) => h.id === sel.hub)!;
  const selectedId = sel.leaf ?? sel.hub;

  const select = (id: string) => {
    if (HUBS.some((h) => h.id === id)) setSel({ hub: id, leaf: null });
    else setSel((s) => ({ hub: leafHubs[id].includes(s.hub) ? s.hub : leafHubs[id][0], leaf: id }));
  };

  // Other sections (e.g. the timeline tags) can jump here and light up a node.
  useEffect(() => {
    const onFocus = (e: Event) => {
      const id = (e as CustomEvent<{ id: string }>).detail?.id;
      if (!id || (!leafLabel[id] && !HUBS.some((h) => h.id === id))) return;
      select(id);
      document.getElementById("expertise")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    window.addEventListener("skill-focus", onFocus);
    return () => window.removeEventListener("skill-focus", onFocus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leafLabel, leafHubs]);

  const also = sel.leaf ? leafHubs[sel.leaf].filter((h) => h !== sel.hub).map((h) => HUBS.find((x) => x.id === h)!.short[lang]) : [];

  return (
    <div className="container" id="expertise">
      <div className="skills-container">
        <h1>{fr ? "Carte des compétences" : "Competency Map"}</h1>
        <p className="skills-lead">
          {fr
            ? "Cinq domaines, un seul réseau. Survolez un nœud pour voir ce qu'il relie, déplacez-le, cliquez pour explorer."
            : "Five domains, one network. Hover a node to see what it connects, drag it around, click to explore."}
        </p>

        <div className="gx">
          <NeuralGraph
            nodes={nodes}
            links={links}
            selected={selectedId}
            hoverId={chipHover}
            onSelect={select}
            ariaLabel={fr ? "Graphe interactif des compétences" : "Interactive skills graph"}
            hint={fr ? "Glisser · Survoler · Cliquer" : "Drag · Hover · Click"}
            height={600}
          />

          <aside className="gx-panel" style={{ ["--pc" as any]: hub.color }} aria-live="polite">
            <span className="gx-kicker">{fr ? "Domaine" : "Domain"}</span>
            <div className="gx-title">
              <span className="gx-ico"><FontAwesomeIcon icon={hub.icon} /></span>
              <h3>{hub.title[lang]}</h3>
            </div>
            <p>{hub.desc[lang]}</p>
            {sel.leaf && (
              <p className="gx-also">
                <b>{leafLabel[sel.leaf]}</b>
                {also.length
                  ? (fr ? " sert aussi : " : " also powers: ") + also.join(" · ")
                  : fr ? " — outil spécifique à ce domaine" : " — specific to this domain"}
              </p>
            )}
            <span className="gx-kicker" style={{ marginTop: 6 }}>{fr ? "Pile technologique" : "Tech stack"}</span>
            <div className="gx-chips">
              {hubLeaves[hub.id].map((id) => (
                <button
                  key={id}
                  className={`gx-chip${sel.leaf === id ? " on" : ""}${leafHubs[id][0] !== hub.id ? " shared" : ""}`}
                  onMouseEnter={() => setChipHover(id)}
                  onMouseLeave={() => setChipHover(null)}
                  onFocus={() => setChipHover(id)}
                  onBlur={() => setChipHover(null)}
                  onClick={() => select(id)}
                >
                  {leafLabel[id]}
                </button>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Expertise;
