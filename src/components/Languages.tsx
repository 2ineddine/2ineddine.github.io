import React from "react";
import "../assets/styles/Languages.scss";

const languages = [
  {
    name: "French",
  },
  {
    name: "English",
  },
];

function Languages() {
  return (
    <section className="languages-container" id="languages">
      <h1>Languages</h1>

      <div className="languages-grid">
        {languages.map((language) => (
          <article className="language-card" key={language.name}>
            <h3>{language.name}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Languages;
