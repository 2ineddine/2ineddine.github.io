import React, { useState } from "react";
import laborCode from '../assets/images/labor-code.png';
import sourceSeparation from '../assets/images/sources-separation.jpeg';
import txttospeech from '../assets/images/txttospeech.jpg';
import '../assets/styles/Project.scss';

function Project() {
    const [activeProject, setActiveProject] = useState<string | null>(null);

    const isFeaturedOpen = activeProject === "labor-code";
    const isSourceSeparationOpen = activeProject === "source-separation";
    const isMatchaOpen = activeProject === "matcha";

    return(
    <div className="projects-container" id="projects">
        <h1>Personal Projects</h1>
        <div className="projects-grid">
            <article className={`project project-featured ${isFeaturedOpen ? "is-open" : ""}`}>
                <div className="project-featured-shell">
                    <button
                        type="button"
                        className="project-image-button"
                        onClick={() => setActiveProject(isFeaturedOpen ? null : "labor-code")}
                        aria-expanded={isFeaturedOpen}
                        aria-controls="labor-code-details"
                    >
                        <img
                            src={laborCode}
                            className="zoom project-featured-image"
                            alt="Retrieval-Augmented Generation System for French Labor Code preview"
                            width="100%"
                        />
                        <span className="project-image-hint">
                            click to show more details
                        </span>
                    </button>

                    <h2 className="project-featured-title">
                        Retrieval-Augmented Generation System for French Labor Code
                    </h2>
                    <div className="project-details" id="labor-code-details">
                        <p>
                            Built a retrieval-augmented QA system over the French Labour Code, combining vector-index semantic search with Llama-3-8B generation and deployment on Hugging Face Spaces.
                        </p>
                        <div className="project-actions">
                            <a
                                className="project-action"
                                href="https://github.com/2ineddine/Retrieval-Augmen-Generation-System-for-French-Labor-Code"
                                target="_blank"
                                rel="noreferrer"
                            >
                                GitHub Repository
                            </a>
                            <a
                                className="project-action"
                                href="https://huggingface.co/spaces/2ineddine/Retrieval-Augmented-Generation-System-for-French-Labor-Code"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Hugging Face Demo
                            </a>
                        </div>
                    </div>
                </div>
            </article>

            <article className={`project project-featured ${isSourceSeparationOpen ? "is-open" : ""}`}>
                <div className="project-featured-shell">
                    <button
                        type="button"
                        className="project-image-button"
                        onClick={() => setActiveProject(isSourceSeparationOpen ? null : "source-separation")}
                        aria-expanded={isSourceSeparationOpen}
                        aria-controls="source-separation-details"
                    >
                        <img
                            src={sourceSeparation}
                            className="zoom project-featured-image"
                            alt="Singing voice separation with Deep U-Net preview"
                            width="100%"
                        />
                        <span className="project-image-hint">
                            click to show more details
                        </span>
                    </button>

                    <h2 className="project-featured-title">
                        Singing Voice Separation with Deep U-Net
                    </h2>
                    <div className="project-details" id="source-separation-details">
                        <p>
                            Developed a Deep U-Net based source separation system to isolate singing vocals from accompaniment, with an emphasis on clean reconstruction and robust audio separation.
                        </p>
                        <div className="project-actions">
                            <a
                                className="project-action"
                                href="https://github.com/2ineddine/SINGING-VOICE-SEPARATION-WITH-DEEP-U-NET"
                                target="_blank"
                                rel="noreferrer"
                            >
                                GitHub Repository
                            </a>
                        </div>
                    </div>
                </div>
            </article>

            <article className={`project project-featured ${isMatchaOpen ? "is-open" : ""}`}>
                <div className="project-featured-shell">
                    <button
                        type="button"
                        className="project-image-button"
                        onClick={() => setActiveProject(isMatchaOpen ? null : "matcha")}
                        aria-expanded={isMatchaOpen}
                        aria-controls="matcha-details"
                    >
                        <img
                            src={txttospeech}
                            className="zoom project-featured-image"
                            alt="Matcha-TTS Implementation Analysis preview"
                            width="100%"
                        />
                        <span className="project-image-hint">
                            click to show more details
                        </span>
                    </button>

                    <h2 className="project-featured-title">
                        Matcha-TTS Implementation Analysis
                    </h2>
                    <div className="project-details" id="matcha-details">
                        <p>
                            A complete PyTorch re-implementation and analysis of the text-to-speech model Matcha-TTS using Optimal-Transport Conditional Flow Matching (OT-CFM). Features a RoPE-based Transformer encoder and 1D U-Net decoder with SnakeBeta activations, achieving state-of-the-art quality (IUT P.808) (MOS 3.86) on the LJ Speech dataset.
                        </p>
                        <div className="project-actions">
                            <a
                                className="project-action"
                                href="https://github.com/2ineddine/MatchaTTS-Implementation-Analysis"
                                target="_blank"
                                rel="noreferrer"
                            >
                                GitHub Repository
                            </a>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    </div>
    );
}

export default Project;
