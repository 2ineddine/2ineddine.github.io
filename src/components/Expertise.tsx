import React from "react";
import "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDocker } from "@fortawesome/free-brands-svg-icons";
import {
  faBrain,
  faRobot,
  faWaveSquare,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import Chip from "@mui/material/Chip";
import "../assets/styles/Expertise.scss";

const labelsDeepLearning = [
  "PyTorch",
  "TensorFlow/Keras",
  "scikit-learn",
  "CNNs",
  "Transformers",
  "GANs",
  "WGAN / WGAN-GP",
  "Diffusion Models",
  "Flow Matching",
];

const labelsVision = [
  "OpenCV",
  "YOLOv8",
  "Object Detection",
  "Instance Segmentation",
  "Optical Flow",
  "Multi-Object Tracking",
  "Kalman & Particle Filters",
  "Camera-LiDAR Fusion",
  "DINO / ViT",
];

const labelsAudio = [
  "Signal Processing",
  "Audio Source Separation",
  "Speech Synthesis (TTS)",
  "Ambisonic Audio",
];

const labelsMLOps = [
  "Docker",
  "Kubernetes",
  "GitLab CI/CD",
  "PostgreSQL",
  "Experiment Tracking",
  "Model Versioning",
  "Model Monitoring",
  "Google Cloud Platform",
  "Vertex AI",
  "Databricks",
  "Linux",
];

const labelsLLM = [
  "LLMs",
  "LangChain",
  "LangGraph",
  "RAG",
  "Hugging Face",
  "FAISS",
  "Embedding Retrieval",
  "Vector Search",
  "Agentic AI",
];

function Expertise({ language = 'en' }: { language?: 'en' | 'fr' }) {
  const isFrench = language === 'fr';

  return (
    <div className="container" id="expertise">
      <div className="skills-container">
        <h1>{isFrench ? 'Expertises' : 'Expertise'}</h1>

        <div className="skills-grid">
          <div className="skill">
            <FontAwesomeIcon icon={faBrain} size="3x" />

            <h3>{isFrench ? 'Apprentissage profond et modélisation générative' : 'Deep Learning & Generative Modeling'}</h3>

            <p>
              {isFrench
                ? 'Je conçois, entraîne et optimise des modèles d\'apprentissage profond, des architectures convolutives et transformeurs aux modèles génératifs modernes, avec un fort accent sur les pipelines d\'entraînement robustes, la reproductibilité et l\'évaluation fiable.'
                : 'I design, train, and optimize deep learning models, from convolutional and transformer architectures to modern generative models, emphasizing robust training pipelines, reproducibility, and reliable evaluation.'}
            </p>

            <div className="flex-chips">
              <span className="chip-title">{isFrench ? 'Pile technologique :' : 'Tech stack:'}</span>
              {labelsDeepLearning.map((label, index) => (
                <Chip key={index} className="chip" label={label} />
              ))}
            </div>
          </div>

          <div className="skill">
            <FontAwesomeIcon icon={faEye} size="3x" />

            <h3>{isFrench ? 'Vision par ordinateur et perception multimodale' : 'Computer Vision & Multimodal Perception'}</h3>

            <p>
              {isFrench
                ? 'Je développe des systèmes de vision pour la détection, la segmentation, le suivi et la perception multimodale, en combinant apprentissage profond et fusion de capteurs pour une compréhension robuste de la scène en temps réel.'
                : 'I develop vision systems for detection, segmentation, tracking, and multimodal perception, combining deep learning with sensor fusion techniques for robust real-time scene understanding.'}
            </p>

            <div className="flex-chips">
              <span className="chip-title">{isFrench ? 'Pile technologique :' : 'Tech stack:'}</span>
              {labelsVision.map((label, index) => (
                <Chip key={index} className="chip" label={label} />
              ))}
            </div>
          </div>

          <div className="skill">
            <FontAwesomeIcon icon={faWaveSquare} size="3x" />

            <h3>{isFrench ? 'Traitement audio et vocal' : 'Audio & Speech Processing'}</h3>

            <p>
              {isFrench
                ? 'Je conçois des solutions d\'apprentissage profond pour l\'analyse de la parole et de l\'audio, y compris la séparation de sources, la synthèse vocale et le traitement du signal pour des applications audio intelligentes.'
                : 'I build deep learning solutions for speech and audio analysis, including source separation, speech synthesis, and signal processing for intelligent audio applications.'}
            </p>

            <div className="flex-chips">
              <span className="chip-title">{isFrench ? 'Pile technologique :' : 'Tech stack:'}</span>
              {labelsAudio.map((label, index) => (
                <Chip key={index} className="chip" label={label} />
              ))}
            </div>
          </div>

          <div className="skill">
            <FontAwesomeIcon icon={faDocker} size="3x" />

            <h3>{isFrench ? 'MLOps et infrastructure cloud' : 'MLOps & Cloud Infrastructure'}</h3>

            <p>
              {isFrench
                ? 'Je déploie et mets à l\'échelle les systèmes d\'apprentissage automatique à l\'aide d\'environnements conteneurisés, de pipelines CI/CD automatisés, de suivi d\'expériences et d\'infrastructures cloud pour des IA prêtes à la production.'
                : 'I deploy and scale machine learning systems using containerized environments, automated CI/CD pipelines, experiment tracking, and cloud-native infrastructure for production-ready AI.'}
            </p>

            <div className="flex-chips">
              <span className="chip-title">{isFrench ? 'Pile technologique :' : 'Tech stack:'}</span>
              {labelsMLOps.map((label, index) => (
                <Chip key={index} className="chip" label={label} />
              ))}
            </div>
          </div>

          <div className="skill">
            <FontAwesomeIcon icon={faRobot} size="3x" />

            <h3>{isFrench ? 'Ingénierie LLM et systèmes de recherche' : 'LLM Engineering & Retrieval Systems'}</h3>

            <p>
              {isFrench
                ? 'Je construis des pipelines de génération augmentée par récupération et des systèmes d\'agents intelligents en combinant grands modèles de langage, recherche vectorielle et frameworks d\'orchestration pour des applications IA fiables et spécifiques au domaine.'
                : 'I build retrieval-augmented generation pipelines and intelligent agent systems by combining large language models, vector search, and orchestration frameworks to deliver reliable, domain-specific AI applications.'}
            </p>

            <div className="flex-chips">
              <span className="chip-title">{isFrench ? 'Pile technologique :' : 'Tech stack:'}</span>
              {labelsLLM.map((label, index) => (
                <Chip key={index} className="chip" label={label} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Expertise;