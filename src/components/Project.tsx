import React, { useState } from "react";
import laborCode from '../assets/images/labor-code.png';
import sourceSeparation from '../assets/images/sources-separation.jpeg';
import mock01 from '../assets/images/mock01.png';
import mock02 from '../assets/images/mock02.png';
import mock03 from '../assets/images/mock03.png';
import mock04 from '../assets/images/mock04.png';
import mock05 from '../assets/images/mock05.png';
import mock06 from '../assets/images/mock06.png';
import mock07 from '../assets/images/mock07.png';
import mock08 from '../assets/images/mock08.png';
import mock09 from '../assets/images/mock09.png';
import '../assets/styles/Project.scss';

function Project() {
    const [activeProject, setActiveProject] = useState<string | null>(null);

    const isFeaturedOpen = activeProject === "labor-code";
    const isSourceSeparationOpen = activeProject === "source-separation";

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
                                href="https://github.com/2ineddine/SINGING-VOICE-SEPARATION-WITH-DEEP-U-NET/tree/main"
                                target="_blank"
                                rel="noreferrer"
                            >
                                GitHub Repository
                            </a>
                        </div>
                    </div>
                </div>
            </article>

            <div className="project">
                <a href="https://yujisatojr.itch.io/highspeedchase" target="_blank" rel="noreferrer"><img src={mock09} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://yujisatojr.itch.io/highspeedchase" target="_blank" rel="noreferrer"><h2>High Speed Chase</h2></a>
                <p>Designed, developed, and launched a 3D multiplayer racing game with C# and Unity. This is available on Itch.io for gamers worldwide to enjoy.</p>
            </div>
            <div className="project">
                <a href="https://yujisatojr.itch.io/spacecraft" target="_blank" rel="noreferrer"><img src={mock08} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://yujisatojr.itch.io/spacecraft" target="_blank" rel="noreferrer"><h2>Astro Raiders</h2></a>
                <p>Developed and released a 2D shooting game with C# and Unity. This project is hosted on the Itch.io public marketplace.</p>
            </div>
            <div className="project">
                <a href="https://www.datumlearn.com/" target="_blank" rel="noreferrer"><img src={mock07} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://www.datumlearn.com/" target="_blank" rel="noreferrer"><h2>Datum: Integrated Learning Platform</h2></a>
                <p>This is an online educational platform that provides high-quality, data science-focused learning resources in the Japanese language. I created the entire platform from scratch using Ruby on Rails.</p>
            </div>
            <div className="project">
                <a href="http://www.wemanage.jp/" target="_blank" rel="noreferrer"><img src={mock06} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="http://www.wemanage.jp/" target="_blank" rel="noreferrer"><h2>WeManage: Real Estate Asset Management</h2></a>
                <p>This mobile application allows realtors in Japan to securely manage their property information and view future income predictions. This app is built with Ruby on Rails and JavaScript.</p>
            </div>
            <div className="project">
                <a href="https://www.byuh.edu/covid-19-case-management" target="_blank" rel="noreferrer"><img src={mock05} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://www.byuh.edu/covid-19-case-management" target="_blank" rel="noreferrer"><h2>COVID-19 Case Management</h2></a>
                <p>Built official charts for COVID/vaccination tracking for an educational institution using JavaScript and the Google Sheets API v4. The dashboard served the university's leadership in their decision-making processes.</p>
            </div>
            <div className="project">
                <a href="https://github.com/yujisatojr/multi-reg-analysis" target="_blank" rel="noreferrer"><img src={mock04} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://github.com/yujisatojr/multi-reg-analysis" target="_blank" rel="noreferrer"><h2>Multiple Regression Property Analysis</h2></a>
                <p>Analyzed the real estate market in Japan and predicted property prices by implementing statistical methods such as OLS and multi-regression analysis. This project leveraged Python and various libraries such as Pandas, NumPy, Matplotlib, and Scikit-Learn.</p>
            </div>
            <div className="project">
                <a href="https://holokai.byuh.edu/programs-of-study" target="_blank" rel="noreferrer"><img src={mock03} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://holokai.byuh.edu/programs-of-study" target="_blank" rel="noreferrer"><h2>Programs of Study</h2></a>
                <p>Designed and developed a custom component for a CMS-based platform (e.g., 'Brightspot') using Java, Handlebars, and LESS. University students can find their majors of interest through this module.</p>
            </div>
            <div className="project">
                <a href="https://hookele.byuh.edu/transfer-evaluation-guidelines-and-matrix" target="_blank" rel="noreferrer"><img src={mock02} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://hookele.byuh.edu/transfer-evaluation-guidelines-and-matrix" target="_blank" rel="noreferrer"><h2>Transfer Evaluation Matrix</h2></a>
                <p>Created an interactive CSV table generator with Java, Handlebars, and LESS. This project helps transfer students to quickly identify eligible credits.</p>
            </div>
            <div className="project">
                <a href="https://github.com/yujisatojr/submeowrine" target="_blank" rel="noreferrer"><img src={mock01} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://github.com/yujisatojr/submeowrine" target="_blank" rel="noreferrer"><h2>Submeowrine</h2></a>
                <p>Developed and released an Android mobile application using Java and Android Studio that runs a 2D shooting game.</p>
            </div>
        </div>
    </div>
    );
}

export default Project;
