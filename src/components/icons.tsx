import React from "react";
import { FaDef, mdiEmail, mdiGitHub, mdiLinkedIn, mdiMenu, mdiSend } from "./iconData";

/** Font Awesome icon rendered as a plain inline SVG (1em tall, width from the icon's aspect ratio). */
export function FaIcon({ icon, className }: { icon: FaDef; className?: string }) {
  const [w, h, d] = icon;
  return (
    <svg className={`fa-i${className ? " " + className : ""}`} viewBox={`0 0 ${w} ${h}`} width={`${(w / h).toFixed(3)}em`} height="1em" aria-hidden="true" focusable="false">
      <path fill="currentColor" d={d} />
    </svg>
  );
}

/** 24x24 Material icon as inline SVG (same box model as the former MUI SvgIcon: 1em, font-size 1.5rem). */
function Mdi({ d, className }: { d: string; className?: string }) {
  return (
    <svg className={`ic${className ? " " + className : ""}`} viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" focusable="false">
      <path d={d} />
    </svg>
  );
}

export const GitHubIcon = (p: { className?: string }) => <Mdi d={mdiGitHub} {...p} />;
export const LinkedInIcon = (p: { className?: string }) => <Mdi d={mdiLinkedIn} {...p} />;
export const EmailIcon = (p: { className?: string }) => <Mdi d={mdiEmail} {...p} />;
export const MenuIcon = (p: { className?: string }) => <Mdi d={mdiMenu} {...p} />;
export const SendIcon = (p: { className?: string }) => <Mdi d={mdiSend} {...p} />;
