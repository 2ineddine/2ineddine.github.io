import React, { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrochip,
  faTerminal,
  faDatabase,
  faLaptopCode,
} from "@fortawesome/free-solid-svg-icons";
import {
  SiPython,
  SiC,
  SiCplusplus,
  SiSharp,
  SiGnubash,
  SiR,
} from "react-icons/si";
import "../assets/styles/ProgrammingLanguages.scss";

type Language = {
  name: string;
  accent: string;
  icon: ReactNode;
};

const languages: Language[] = [
  { name: "Python", accent: "python", icon: SiPython({}) },
  { name: "MATLAB", accent: "matlab", icon: <FontAwesomeIcon icon={faLaptopCode} /> },
  { name: "C", accent: "c", icon: SiC({}) },
  { name: "C++", accent: "cpp", icon: SiCplusplus({}) },
  { name: "C#", accent: "csharp", icon: SiSharp({}) },
  { name: "VHDL", accent: "vhdl", icon: <FontAwesomeIcon icon={faMicrochip} /> },
  { name: "Assembly", accent: "asm", icon: <FontAwesomeIcon icon={faTerminal} /> },
  { name: "SQL", accent: "sql", icon: <FontAwesomeIcon icon={faDatabase} /> },
  { name: "R", accent: "r", icon: SiR({}) },
  { name: "Bash", accent: "bash", icon: SiGnubash({}) },
];

function ProgrammingLanguages() {
  return (
    <section className="programming-languages" id="programming-languages">
      <h1>Programming Languages</h1>
      <div className="programming-languages-grid">
        {languages.map(({ name, accent, icon }) => (
          <article className={`programming-language-card ${accent}`} key={name}>
            <div className="language-visual" aria-hidden="true">
              <span className="language-icon">{icon}</span>
            </div>
            <h2>{name}</h2>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ProgrammingLanguages;