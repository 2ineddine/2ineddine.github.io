import React from "react";
import { SKILL_INDEX } from "./Expertise";

const PICK = ["pytorch", "opencv", "yolov8", "transformers", "diffusion-models", "rag", "langchain", "langgraph", "docker", "kubernetes", "vertex-ai", "databricks", "gitlab-ci-cd", "faiss", "hugging-face", "flow-matching"];

/** Infinite tech ticker. Each item jumps to the competency map. */
export default function Marquee({ language = "en" }: { language?: "en" | "fr" }) {
  const items = PICK.map((id) => SKILL_INDEX.find((s) => s.id === id)).filter(Boolean) as { id: string; label: string }[];
  const row = (hidden: boolean) => (
    <ul className="mq-row" aria-hidden={hidden || undefined}>
      {items.map((s) => (
        <li key={s.id}>
          <button tabIndex={hidden ? -1 : 0} onClick={() => window.dispatchEvent(new CustomEvent("skill-focus", { detail: { id: s.id } }))}>
            <i />{s.label}
          </button>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="mq" role="region" aria-label={language === "fr" ? "Technologies utilisées" : "Technologies I work with"}>
      <div className="mq-track">{row(false)}{row(true)}</div>
    </div>
  );
}
