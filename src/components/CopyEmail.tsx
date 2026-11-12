import React, { useState } from "react";
import { EMAIL, copyEmail } from "../data/site";

export default function CopyEmail({ language = "en", className = "" }: { language?: "en" | "fr"; className?: string }) {
  const [done, setDone] = useState(false);
  const fr = language === "fr";
  return (
    <button
      type="button"
      className={`copy-email ${className}`}
      onClick={async () => { if (await copyEmail()) { setDone(true); setTimeout(() => setDone(false), 1800); } else window.location.href = `mailto:${EMAIL}`; }}
    >
      <span>{EMAIL}</span>
      <b>{done ? (fr ? "Copié ✓" : "Copied ✓") : fr ? "Copier" : "Copy"}</b>
    </button>
  );
}
