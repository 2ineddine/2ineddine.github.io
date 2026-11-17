/**
 * Skill data shared by the hero (tool count), the tech ticker and the competency map.
 * Kept free of React/graph code so the first-load bundle stays small.
 */
export const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const STACKS: Record<"dl" | "cv" | "audio" | "mlops" | "llm", string[]> = {
  dl: ["PyTorch", "TensorFlow/Keras", "scikit-learn", "CNNs", "Transformers", "GANs", "WGAN / WGAN-GP", "Diffusion Models", "Flow Matching"],
  cv: ["OpenCV", "YOLOv8", "Object Detection", "Instance Segmentation", "Optical Flow", "Multi-Object Tracking", "Kalman & Particle Filters", "Camera-LiDAR Fusion", "DINO / ViT"],
  audio: ["Signal Processing", "Audio Source Separation", "Speech Synthesis (TTS)", "Ambisonic Audio"],
  mlops: ["Docker", "Kubernetes", "GitLab CI/CD", "PostgreSQL", "Experiment Tracking", "Model Versioning", "Model Monitoring", "Google Cloud Platform", "Vertex AI", "Databricks", "Linux"],
  llm: ["LLMs", "LangChain", "LangGraph", "RAG", "Hugging Face", "FAISS", "Embedding Retrieval", "Vector Search", "Agentic AI"],
};

// Tools that genuinely span several domains -> extra links make the graph a real network.
export const SHARED: Record<string, string[]> = {
  pytorch: ["cv", "audio"],
  transformers: ["llm"],
  "dino-vit": ["dl"],
  "experiment-tracking": ["dl"],
};

export const TOOL_LABEL: Record<string, string> = Object.fromEntries(Object.values(STACKS).flat().map((l) => [slug(l), l]));
export const TOOL_COUNT = Object.keys(TOOL_LABEL).length;

/** Tools shown in the scrolling ticker under the hero (ids from the lists above). */
export const MARQUEE_IDS = ["pytorch", "opencv", "yolov8", "transformers", "diffusion-models", "rag", "langchain", "langgraph", "docker", "kubernetes", "vertex-ai", "databricks", "gitlab-ci-cd", "faiss", "hugging-face", "flow-matching"];
