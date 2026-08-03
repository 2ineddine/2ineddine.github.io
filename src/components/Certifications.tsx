import React from "react";
import '../assets/styles/Certifications.scss';
import googleLogo from '../assets/images/google.png';
import ibmLogo from '../assets/images/ibm.png';
import dukeLogo from '../assets/images/duke.png';
import courseraLogo from '../assets/images/coursera.png';

const CERTIFICATE_BASE_URL = 'https://www.coursera.org/account/accomplishments/verify/';

const certifications = [
  {
    title: 'Machine Learning Operations (MLOps) with Vertex AI: Manage Features',
    issuer: 'Google',
    issued: 'July 2026',
    credentialId: 'X2UQQBTMLSHP',
    logo: googleLogo,
  },
  {
    title: 'Fundamentals of AI Agents Using RAG and LangChain',
    issuer: 'IBM',
    issued: 'July 2026',
    credentialId: 'CLINZODFTHG2',
    logo: ibmLogo,
  },
  {
    title: 'Natural Language Processing on Google Cloud',
    issuer: 'Google',
    issued: 'July 2026',
    credentialId: 'MWPUMCLUJ0XV',
    logo: googleLogo,
  },
  {
    title: 'Introduction to Vertex Forecasting and Time Series in Practice',
    issuer: 'Google',
    issued: 'July 2026',
    credentialId: 'BLWYVDU4DY76',
    logo: googleLogo,
  },
  {
    title: 'DevOps, DataOps, MLOps',
    issuer: 'Duke University',
    issued: 'July 2026',
    credentialId: '42HBT896DK5O',
    logo: dukeLogo,
  },
  {
    title: 'Agentic AI with LangChain and LangGraph',
    issuer: 'IBM',
    issued: 'July 2026',
    credentialId: 'MYGUJBPX90J1',
    logo: ibmLogo,
  },
  {
    title: 'Databricks Machine Learning Fundamentals',
    issuer: 'Coursera',
    issued: 'July 2026',
    credentialId: 'UZW8PR7095QD',
    logo: courseraLogo,
  },
  {
    title: 'Generative AI and LLMs: Architecture and Data Preparation',
    issuer: 'IBM',
    issued: 'July 2026',
    credentialId: 'YCI1IJ94MARX',
    logo: ibmLogo,
  },
  {
    title: 'Agentic AI with LangGraph, CrewAI, AutoGen and BeeAI',
    issuer: 'IBM',
    issued: 'July 2026',
    credentialId: 'XLPJSMUM5M9V',
    logo: ibmLogo,
  },
].map((certificate) => ({
  ...certificate,
  verificationUrl: `${CERTIFICATE_BASE_URL}${certificate.credentialId}`,
}));

function Certifications() {
  return (
    <section className="certifications-section" id="certifications">
      <div className="certifications-header">
        <div>
          <p className="section-eyebrow">Certifications</p>
          {/* Description intentionally removed for a cleaner, focused section */}
        </div>
      </div>

      <div className="certifications-grid">
        {certifications.map((certificate) => (
          <article className="certification-card" key={certificate.credentialId}>
            <div className="certification-card-header">
              <div className="certification-logo-wrapper">
                <img
                  src={certificate.logo}
                  alt={`${certificate.issuer} logo`}
                  className="certification-logo-img"
                />
              </div>
              <div className="certification-meta">
                <span className="certification-issuer">{certificate.issuer}</span>
                <span className="certification-issued">{certificate.issued}</span>
              </div>
            </div>
            <h2>{certificate.title}</h2>
            <div className="certification-footer">
              <div className="certification-details">
                <span className="certification-label">Credential ID</span>
                <span className="certification-value">{certificate.credentialId}</span>
              </div>
              <a
                className="certification-button"
                href={certificate.verificationUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                Verify Certificate
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Certifications;
