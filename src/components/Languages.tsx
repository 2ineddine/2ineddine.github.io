import React from "react";
import "../assets/styles/Languages.scss";

const languages = [
  { name: "French", nameFr: "Français" },
  { name: "English", nameFr: "Anglais" },
];

function Languages({ language = 'en' }: { language?: 'en' | 'fr' }) {
  const isFrench = language === 'fr';

  return (
    <section className="languages-container" id="languages">
      <h1>{isFrench ? 'Langues' : 'Languages'}</h1>

      <div className="languages-grid">
        {languages.map((item) => (
          <article className="language-card" key={item.name}>
            <h3>{isFrench ? item.nameFr : item.name}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Languages;
