import React from "react";
import '../assets/styles/Certifications.scss';
import { logos } from '../assets/images';
import { CERTS, CERT_BASE_URL } from '../data/certs';

const certifications = CERTS.map((certificate) => ({
  ...certificate,
  logo: logos[certificate.logo],
  verificationUrl: `${CERT_BASE_URL}${certificate.credentialId}`,
}));

function Certifications({ language = 'en' }: { language?: 'en' | 'fr' }) {
  const isFrench = language === 'fr';

  return (
    <section className="certifications-section">
      <div className="certifications-header">
        <div>
          <p className="section-eyebrow">{isFrench ? 'Certifications' : 'Certifications'}</p>
        </div>
      </div>

      <div className="certifications-grid">
        {certifications.map((certificate) => (
          <article className="certification-card" key={certificate.credentialId}>
            <div className="certification-card-header">
              <div className="certification-logo-wrapper">
                <img
                  src={certificate.logo.src}
                  width={certificate.logo.width}
                  height={certificate.logo.height}
                  loading="lazy"
                  decoding="async"
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
                <span className="certification-label">{isFrench ? 'Identifiant' : 'Credential ID'}</span>
                <span className="certification-value">{certificate.credentialId}</span>
              </div>
              <a
                className="certification-button"
                href={certificate.verificationUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                {isFrench ? 'Vérifier la certification' : 'Verify Certificate'}
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Certifications;
