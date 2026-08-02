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

function Expertise() {
  return (
    <div className="container" id="expertise">
      <div className="skills-container">
        <h1>Expertise</h1>

        <div className="skills-grid">
          {/* Deep Learning */}
          <div className="skill">
            <FontAwesomeIcon icon={faBrain} size="3x" />

            <h3>Deep Learning & Generative Modeling</h3>

            <p>
              I design, train, and optimize deep learning models, from
              convolutional and transformer architectures to modern generative
              models, emphasizing robust training pipelines, reproducibility,
              and reliable evaluation.
            </p>

            <div className="flex-chips">
              <span className="chip-title">Tech stack:</span>
              {labelsDeepLearning.map((label, index) => (
                <Chip key={index} className="chip" label={label} />
              ))}
            </div>
          </div>

          {/* Computer Vision */}
          <div className="skill">
            <FontAwesomeIcon icon={faEye} size="3x" />

            <h3>Computer Vision & Multimodal Perception</h3>

            <p>
              I develop vision systems for detection, segmentation, tracking,
              and multimodal perception, combining deep learning with sensor
              fusion techniques for robust real-time scene understanding.
            </p>

            <div className="flex-chips">
              <span className="chip-title">Tech stack:</span>
              {labelsVision.map((label, index) => (
                <Chip key={index} className="chip" label={label} />
              ))}
            </div>
          </div>

          {/* Audio */}
          <div className="skill">
            <FontAwesomeIcon icon={faWaveSquare} size="3x" />

            <h3>Audio & Speech Processing</h3>

            <p>
              I build deep learning solutions for speech and audio analysis,
              including source separation, speech synthesis, and signal
              processing for intelligent audio applications.
            </p>

            <div className="flex-chips">
              <span className="chip-title">Tech stack:</span>
              {labelsAudio.map((label, index) => (
                <Chip key={index} className="chip" label={label} />
              ))}
            </div>
          </div>

          {/* MLOps */}
          <div className="skill">
            <FontAwesomeIcon icon={faDocker} size="3x" />

            <h3>MLOps & Cloud Infrastructure</h3>

            <p>
              I deploy and scale machine learning systems using containerized
              environments, automated CI/CD pipelines, experiment tracking, and
              cloud-native infrastructure for production-ready AI.
            </p>

            <div className="flex-chips">
              <span className="chip-title">Tech stack:</span>
              {labelsMLOps.map((label, index) => (
                <Chip key={index} className="chip" label={label} />
              ))}
            </div>
          </div>

          {/* LLM */}
          <div className="skill">
            <FontAwesomeIcon icon={faRobot} size="3x" />

            <h3>LLM Engineering & Retrieval Systems</h3>

            <p>
              I build retrieval-augmented generation pipelines and intelligent
              agent systems by combining large language models, vector search,
              and orchestration frameworks to deliver reliable, domain-specific
              AI applications.
            </p>

            <div className="flex-chips">
              <span className="chip-title">Tech stack:</span>
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