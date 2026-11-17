import React from "react";
import { MARQUEE_IDS, TOOL_LABEL } from "../data/skills";
import { focusSkill } from "../data/site";

/** Infinite tech ticker. Each item jumps to the competency map. */
export default function Marquee({ language = "en" }: { language?: "en" | "fr" }) {
  const items = MARQUEE_IDS.filter((id) => TOOL_LABEL[id]).map((id) => ({ id, label: TOOL_LABEL[id] }));
  const row = (hidden: boolean) => (
    <ul className="mq-row" aria-hidden={hidden || undefined}>
      {items.map((s) => (
        <li key={s.id}>
          <button tabIndex={hidden ? -1 : 0} onClick={() => focusSkill(s.id)}>
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
