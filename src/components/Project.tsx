import React, { useState } from "react";
import laborCode from '../assets/images/labor-code.png';
import sourceSeparation from '../assets/images/sources-separation.jpeg';
import txttospeech from '../assets/images/txttospeech.jpg';
import detection from '../assets/images/detection.jpeg';
import yolo26 from '../assets/images/yolo26.jpg';
import jungle from '../assets/images/jungle.jpeg';
import '../assets/styles/Project.scss';

function Project({ language = 'en' }: { language?: 'en' | 'fr' }) {
    const [activeProject, setActiveProject] = useState<string | null>(null);
    const isFrench = language === 'fr';

    const isFeaturedOpen = activeProject === "labor-code";
    const isSourceSeparationOpen = activeProject === "source-separation";
    const isMatchaOpen = activeProject === "matcha";
    const isMotionOpen = activeProject === "motion";
    const isYolo26Open = activeProject === "yolo26";
    const isJungleOpen = activeProject === "jungle";

    return(
    <div className="projects-container" id="projects">
        <h1>{isFrench ? 'Projets personnels' : 'Personal Projects'}</h1>
        <div className="projects-grid">
            <article className={`project project-featured ${isMotionOpen ? "is-open" : ""}`}>
                <div className="project-featured-shell">
                    <button
                        type="button"
                        className="project-image-button"
                        onClick={() => setActiveProject(isMotionOpen ? null : "motion")}
                        aria-expanded={isMotionOpen}
                        aria-controls="motion-details"
                    >
                        <img
                            src={detection}
                            className="zoom project-featured-image"
                            alt="Motion Detection Estimation and Tracking on Images preview"
                            width="100%"
                        />
                        <span className="project-image-hint">
                            click to show more details
                        </span>
                    </button>

                    <button
                        type="button"
                        className="project-featured-title-button"
                        onClick={() => setActiveProject(isMotionOpen ? null : "motion")}
                        aria-expanded={isMotionOpen}
                        aria-controls="motion-details"
                    >
                        <h2 className="project-featured-title">
                            Motion Detection, Estimation and Tracking on Images
                        </h2>
                    </button>
                    <div className="project-details" id="motion-details">
                        <p>
                            MATLAB-based computer vision toolkit for motion analysis in image sequences. The project implements motion detection, optical flow estimation, and object tracking using methods such as background modeling, block matching, Lucas-Kanade, Horn-Schunck, Particle Filters, and Kalman tracking, with tools for visualization and performance evaluation.
                        </p>
                        <div className="project-actions">
                            <a
                                className="project-action"
                                href="https://github.com/2ineddine/Motion-Detection-Estimation-and-Tracking-on-Images"
                                target="_blank"
                                rel="noreferrer"
                            >
                                GitHub Repository
                            </a>
                        </div>
                    </div>
                </div>
            </article>

            <article className={`project project-featured ${isYolo26Open ? "is-open" : ""}`}>
                <div className="project-featured-shell">
                    <button
                        type="button"
                        className="project-image-button"
                        onClick={() => setActiveProject(isYolo26Open ? null : "yolo26")}
                        aria-expanded={isYolo26Open}
                        aria-controls="yolo26-details"
                    >
                        <img
                            src={yolo26}
                            className="zoom project-featured-image"
                            alt="YOLO26 pothole and crack detection preview"
                            width="100%"
                        />
                        <span className="project-image-hint">
                            click to show more details
                        </span>
                    </button>

                    <button
                        type="button"
                        className="project-featured-title-button"
                        onClick={() => setActiveProject(isYolo26Open ? null : "yolo26")}
                        aria-expanded={isYolo26Open}
                        aria-controls="yolo26-details"
                    >
                        <h2 className="project-featured-title">
                            YOLO26 – Pothole and Crack Detection on Roads
                        </h2>
                    </button>
                    <div className="project-details" id="yolo26-details">
                        <p>
                            Fine-tuned YOLO26n for road anomaly detection on an ~80,000-image multi-source dataset, designing the full data cleaning, merging, and augmentation pipeline, and reaching 72.1% mAP@0.5.
                        </p>
                        <div className="project-actions">
                            <a
                                className="project-action"
                                href="https://github.com/2ineddine/RoadAnomalyDetection"
                                target="_blank"
                                rel="noreferrer"
                            >
                                GitHub Repository
                            </a>
                        </div>
                    </div>
                </div>
            </article>

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

                    <button
                        type="button"
                        className="project-featured-title-button"
                        onClick={() => setActiveProject(isFeaturedOpen ? null : "labor-code")}
                        aria-expanded={isFeaturedOpen}
                        aria-controls="labor-code-details"
                    >
                        <h2 className="project-featured-title">
                            Retrieval-Augmented Generation System for French Labor Code
                        </h2>
                    </button>
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

                    <button
                        type="button"
                        className="project-featured-title-button"
                        onClick={() => setActiveProject(isSourceSeparationOpen ? null : "source-separation")}
                        aria-expanded={isSourceSeparationOpen}
                        aria-controls="source-separation-details"
                    >
                        <h2 className="project-featured-title">
                            Singing Voice Separation with Deep U-Net
                        </h2>
                    </button>
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

                    <button
                        type="button"
                        className="project-featured-title-button"
                        onClick={() => setActiveProject(isMatchaOpen ? null : "matcha")}
                        aria-expanded={isMatchaOpen}
                        aria-controls="matcha-details"
                    >
                        <h2 className="project-featured-title">
                            Matcha-TTS Implementation Analysis
                        </h2>
                    </button>
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

            <article className={`project project-featured ${isJungleOpen ? "is-open" : ""}`}>
                <div className="project-featured-shell">
                    <button
                        type="button"
                        className="project-image-button"
                        onClick={() => setActiveProject(isJungleOpen ? null : "jungle")}
                        aria-expanded={isJungleOpen}
                        aria-controls="jungle-details"
                    >
                        <img
                            src={jungle}
                            className="zoom project-featured-image"
                            alt="Forest acoustic learning preview"
                            width="100%"
                        />
                        <span className="project-image-hint">
                            click to show more details
                        </span>
                    </button>

                    <button
                        type="button"
                        className="project-featured-title-button"
                        onClick={() => setActiveProject(isJungleOpen ? null : "jungle")}
                        aria-expanded={isJungleOpen}
                        aria-controls="jungle-details"
                    >
                        <h2 className="project-featured-title">
                            Self-Supervised Acoustic Representation Learning for Forest Soundscapes
                        </h2>
                    </button>
                    <div className="project-details" id="jungle-details">
                        <p>
                            Trained the DINO ViT-B/8 model via self-supervised learning for acoustic representation using more than 2,000 hours of forest soundscapes in collaboration with IRCAM and MNHN. The learned embeddings enabled similarity search and unsupervised discrimination of acoustic events within the dataset.
                        </p>
                        <div className="project-actions">
                            <a
                                className="project-action"
                                href="https://www.ircam.fr/fr/magazine/sebastien-gaxie--au-coeur-de-la-foret-amazonienne-12"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Project Details
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
