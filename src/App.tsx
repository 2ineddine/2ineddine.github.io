import React, {useState, useEffect} from "react";
import {
  Main,
  Timeline,
  Languages,
  Expertise,
  Project,
  Certifications,
  ProgrammingLanguages,
  Contact,
  Navigation,
  Footer,
} from "./components";
import FadeIn from './components/FadeIn';
import './index.scss';
import './assets/styles/theme.scss'; // keep last so it overrides component styles

function App() {
    const [mode, setMode] = useState<string>('dark');
    const [language, setLanguage] = useState<'en' | 'fr'>('en');

    const handleModeChange = () => {
        if (mode === 'dark') {
            setMode('light');
        } else {
            setMode('dark');
        }
    }

    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      }, []);

    return (
    <div className={`main-container ${mode === 'dark' ? 'dark-mode' : 'light-mode'}`}>
        <Navigation
          parentToChild={{mode}}
          modeChange={handleModeChange}
          language={language}
          onLanguageChange={setLanguage}
        />
        <FadeIn transitionDuration={700}>
            <Main language={language} />
            <Project language={language} />
            <Expertise language={language} />
            <Timeline language={language} />
            <Languages language={language} />
            <Certifications language={language} />
            <ProgrammingLanguages language={language} />
            <Contact language={language} />
        </FadeIn>
        <Footer />
        
        {/* Theme Toggle Button - Black & White Emojis */}
        <button className="theme-toggle" onClick={handleModeChange}>
            <span className="emoji">{mode === 'dark' ? '☀' : '☽'}</span>
            <span className="toggle-label">{mode === 'dark' ? 'LIGHT' : 'DARK'}</span>
        </button>
    </div>
    );
}

export default App;
