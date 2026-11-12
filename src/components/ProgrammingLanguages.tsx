import React, { ReactNode, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrochip, faTerminal, faDatabase, faLaptopCode, faBrain, faGears } from "@fortawesome/free-solid-svg-icons";
import { SiPython, SiC, SiCplusplus, SiSharp, SiGnubash, SiR } from "react-icons/si";
import NeuralGraph, { GLink, GNode } from "./NeuralGraph";

type L2 = { en: string; fr: string };

const DOMAINS: { id: string; color: string; icon: any; name: L2 }[] = [
  { id: "d-ai", color: "var(--s1)", icon: faBrain, name: { en: "AI & Signal", fr: "IA & Signal" } },
  { id: "d-emb", color: "var(--s4)", icon: faMicrochip, name: { en: "Embedded & Hardware", fr: "Embarqué & Matériel" } },
  { id: "d-data", color: "var(--s2)", icon: faDatabase, name: { en: "Data", fr: "Données" } },
  { id: "d-sys", color: "var(--s3)", icon: faGears, name: { en: "Systems & Automation", fr: "Systèmes & Automatisation" } },
];

const LANGS: { id: string; name: string; icon: ReactNode; domains: string[]; use: L2 }[] = [
  { id: "python", name: "Python", icon: SiPython({}), domains: ["d-ai", "d-data", "d-sys"],
    use: { en: "My main language: deep learning, vision, audio and data pipelines.", fr: "Mon langage principal : deep learning, vision, audio et pipelines de données." } },
  { id: "matlab", name: "MATLAB", icon: <FontAwesomeIcon icon={faLaptopCode} />, domains: ["d-ai", "d-emb"],
    use: { en: "Signal processing and fast algorithm prototyping.", fr: "Traitement du signal et prototypage rapide d'algorithmes." } },
  { id: "c", name: "C", icon: SiC({}), domains: ["d-emb", "d-sys"],
    use: { en: "Low-level and embedded programming.", fr: "Programmation bas niveau et embarquée." } },
  { id: "cpp", name: "C++", icon: SiCplusplus({}), domains: ["d-emb", "d-ai"],
    use: { en: "Performance-critical code and real-time systems.", fr: "Code critique en performance et systèmes temps réel." } },
  { id: "csharp", name: "C#", icon: SiSharp({}), domains: ["d-sys"],
    use: { en: "Application and tooling development.", fr: "Développement d'applications et d'outils." } },
  { id: "vhdl", name: "VHDL", icon: <FontAwesomeIcon icon={faMicrochip} />, domains: ["d-emb"],
    use: { en: "Digital circuit design for FPGA.", fr: "Conception de circuits numériques pour FPGA." } },
  { id: "asm", name: "Assembly", icon: <FontAwesomeIcon icon={faTerminal} />, domains: ["d-emb"],
    use: { en: "Close-to-the-metal microcontroller programming.", fr: "Programmation de microcontrôleurs au plus près du matériel." } },
  { id: "sql", name: "SQL", icon: <FontAwesomeIcon icon={faDatabase} />, domains: ["d-data"],
    use: { en: "Relational data modelling and querying (PostgreSQL).", fr: "Modélisation et requêtes de données relationnelles (PostgreSQL)." } },
  { id: "r", name: "R", icon: SiR({}), domains: ["d-data", "d-ai"],
    use: { en: "Statistics and exploratory data analysis.", fr: "Statistiques et analyse exploratoire de données." } },
  { id: "bash", name: "Bash", icon: SiGnubash({}), domains: ["d-sys"],
    use: { en: "Linux automation and tooling.", fr: "Automatisation et outillage Linux." } },
];

export const LANG_COUNT = LANGS.length;

function ProgrammingLanguages({ language = "en" }: { language?: "en" | "fr" }) {
  const fr = language === "fr";
  const lang = fr ? "fr" : "en";
  const [selected, setSelected] = useState<string>("python");

  const links: GLink[] = useMemo(() => LANGS.flatMap((l) => l.domains.map<GLink>((d) => [d, l.id])), []);
  const nodes: GNode[] = useMemo(() => [
    ...DOMAINS.map<GNode>((d) => ({ id: d.id, label: d.name[lang], kind: "hub", color: d.color, icon: <FontAwesomeIcon icon={d.icon} /> })),
    ...LANGS.map<GNode>((l) => ({ id: l.id, label: l.name, kind: "leaf", color: DOMAINS.find((d) => d.id === l.domains[0])!.color, icon: l.icon })),
  ], [lang]);

  const dom = DOMAINS.find((d) => d.id === selected);
  const langObj = LANGS.find((l) => l.id === selected);
  const accent = dom?.color ?? DOMAINS.find((d) => d.id === langObj!.domains[0])!.color;

  return (
    <section className="programming-languages" id="programming-languages">
      <h1>{fr ? "Langages de programmation" : "Programming Languages"}</h1>
      <p className="skills-lead">
        {fr ? "Dix langages reliés par ce que j'en fais. Touchez un langage pour voir ses domaines." : "Ten languages, wired together by what I use them for. Poke one to see its domains."}
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
                <span className="gx-ico"><FontAwesomeIcon icon={dom!.icon} /></span>
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
