import React, { ReactNode, useMemo, useState } from "react";
import { SiPython, SiC, SiCplusplus, SiSharp, SiGnubash, SiR } from "react-icons/si";
import { FaIcon } from "./icons";
import { FaDef, faBrain, faDatabase, faGears, faLaptopCode, faMicrochip, faTerminal } from "./iconData";
import NeuralGraph, { GLink, GNode } from "./NeuralGraph";
import { DOMAIN_DEFS, LANG_DEFS } from "../data/languages";
import { isTouch } from "../data/site";

const DOMAIN_ICON: Record<string, FaDef> = { "d-ai": faBrain, "d-emb": faMicrochip, "d-data": faDatabase, "d-sys": faGears };
const LANG_ICON: Record<string, ReactNode> = {
  python: SiPython({}),
  matlab: <FaIcon icon={faLaptopCode} />,
  c: SiC({}),
  cpp: SiCplusplus({}),
  csharp: SiSharp({}),
  vhdl: <FaIcon icon={faMicrochip} />,
  asm: <FaIcon icon={faTerminal} />,
  sql: <FaIcon icon={faDatabase} />,
  r: SiR({}),
  bash: SiGnubash({}),
};

// Single source of truth lives in data/languages.ts; icons are attached here.
const DOMAINS = DOMAIN_DEFS.map((d) => ({ ...d, icon: DOMAIN_ICON[d.id] }));
const LANGS = LANG_DEFS.map((l) => ({ ...l, icon: LANG_ICON[l.id] }));

function ProgrammingLanguages({ language = "en" }: { language?: "en" | "fr" }) {
  const fr = language === "fr";
  const lang = fr ? "fr" : "en";
  const [selected, setSelected] = useState<string>("python");

  const links: GLink[] = useMemo(() => LANGS.flatMap((l) => l.domains.map<GLink>((d) => [d, l.id])), []);
  const nodes: GNode[] = useMemo(() => [
    ...DOMAINS.map<GNode>((d) => ({ id: d.id, label: d.name[lang], kind: "hub", color: d.color, icon: <FaIcon icon={d.icon} /> })),
    ...LANGS.map<GNode>((l) => ({ id: l.id, label: l.name, kind: "leaf", color: DOMAINS.find((d) => d.id === l.domains[0])!.color, icon: l.icon })),
  ], [lang]);

  const dom = DOMAINS.find((d) => d.id === selected);
  const langObj = LANGS.find((l) => l.id === selected);
  const accent = dom?.color ?? DOMAINS.find((d) => d.id === langObj!.domains[0])!.color;

  return (
    <section className="programming-languages">
      <h1>{fr ? "Langages de programmation" : "Programming Languages"}</h1>
      <p className="skills-lead">
        {fr ? "Dix langages reliés par ce que j'en fais. Touchez un langage pour voir ses domaines." : isTouch() ? "Ten languages, wired together by what I use them for. Tap one to see its domains." : "Ten languages, wired together by what I use them for. Poke one to see its domains."}
      </p>

      <div className="gx">
        <NeuralGraph
          nodes={nodes}
          links={links}
          selected={selected}
          onSelect={setSelected}
          ariaLabel={fr ? "Constellation interactive des langages" : "Interactive languages constellation"}
          hint={fr ? "Glisser · Survoler · Cliquer" : "Drag · Hover · Click"}
          height={520}
        />

        <aside className="gx-panel" style={{ ["--pc" as any]: accent }} aria-live="polite">
          {langObj ? (
            <>
              <span className="gx-kicker">{fr ? "Langage" : "Language"}</span>
              <div className="gx-title">
                <span className="gx-ico">{langObj.icon}</span>
                <h3>{langObj.name}</h3>
              </div>
              <p>{langObj.use[lang]}</p>
              <span className="gx-kicker" style={{ marginTop: 6 }}>{fr ? "Domaines" : "Domains"}</span>
              <div className="gx-chips">
                {langObj.domains.map((d) => (
                  <button key={d} className="gx-chip" onClick={() => setSelected(d)}>{DOMAINS.find((x) => x.id === d)!.name[lang]}</button>
                ))}
              </div>
            </>
          ) : (
            <>
              <span className="gx-kicker">{fr ? "Domaine" : "Domain"}</span>
              <div className="gx-title">
                <span className="gx-ico"><FaIcon icon={dom!.icon} /></span>
                <h3>{dom!.name[lang]}</h3>
              </div>
              <span className="gx-kicker" style={{ marginTop: 6 }}>{fr ? "Langages" : "Languages"}</span>
              <div className="gx-chips">
                {LANGS.filter((l) => l.domains.includes(dom!.id)).map((l) => (
                  <button key={l.id} className="gx-chip" onClick={() => setSelected(l.id)}>{l.name}</button>
                ))}
              </div>
            </>
          )}
        </aside>
      </div>
    </section>
  );
}

export default ProgrammingLanguages;
