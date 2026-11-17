export type LogoKey = "google" | "ibm" | "duke" | "coursera";

export const CERT_BASE_URL = "https://www.coursera.org/account/accomplishments/verify/";

export const CERTS: { title: string; issuer: string; issued: string; credentialId: string; logo: LogoKey }[] = [
  { title: "Machine Learning Operations (MLOps) with Vertex AI: Manage Features", issuer: "Google", issued: "July 2026", credentialId: "X2UQQBTMLSHP", logo: "google" },
  { title: "Fundamentals of AI Agents Using RAG and LangChain", issuer: "IBM", issued: "July 2026", credentialId: "CLINZODFTHG2", logo: "ibm" },
  { title: "Natural Language Processing on Google Cloud", issuer: "Google", issued: "July 2026", credentialId: "MWPUMCLUJ0XV", logo: "google" },
  { title: "Introduction to Vertex Forecasting and Time Series in Practice", issuer: "Google", issued: "July 2026", credentialId: "BLWYVDU4DY76", logo: "google" },
  { title: "DevOps, DataOps, MLOps", issuer: "Duke University", issued: "July 2026", credentialId: "42HBT896DK5O", logo: "duke" },
  { title: "Agentic AI with LangChain and LangGraph", issuer: "IBM", issued: "July 2026", credentialId: "MYGUJBPX90J1", logo: "ibm" },
  { title: "Databricks Machine Learning Fundamentals", issuer: "Coursera", issued: "July 2026", credentialId: "UZW8PR7095QD", logo: "coursera" },
  { title: "Generative AI and LLMs: Architecture and Data Preparation", issuer: "IBM", issued: "July 2026", credentialId: "YCI1IJ94MARX", logo: "ibm" },
  { title: "Agentic AI with LangGraph, CrewAI, AutoGen and BeeAI", issuer: "IBM", issued: "July 2026", credentialId: "XLPJSMUM5M9V", logo: "ibm" },
];

export const CERT_COUNT = CERTS.length;
