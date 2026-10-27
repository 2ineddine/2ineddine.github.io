import React from "react";
import '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import sorbonneLogo from '../assets/images/sorbonne.png';
import lyon1Logo from '../assets/images/lyon1.jpg';
import '../assets/styles/Timeline.scss';

function EducationTimeline({ language = 'en' }: { language?: 'en' | 'fr' }) {
  const isFrench = language === 'fr';

  return (
    <div id="education" className="education-section">
      <div className="items-container">
        <h1>{isFrench ? 'Formation' : 'Education'}</h1>

        <VerticalTimeline>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="2024 - 2026"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faGraduationCap} />}
          >
            <h3 className="vertical-timeline-element-title">
              {isFrench ? 'Master – Ingénierie des systèmes intelligents' : 'Master’s – Intelligent Systems Engineering'}
            </h3>
            <div className="timeline-institution">
              <img src={sorbonneLogo} alt="Sorbonne University logo" />
              <h4 className="vertical-timeline-element-subtitle">Sorbonne University</h4>
            </div>
            <p>
              Paris, France
            </p>
          </VerticalTimelineElement>


          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="2021 - 2024"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faGraduationCap} />}
          >
            <h3 className="vertical-timeline-element-title">
              {isFrench ? 'Licence – Électronique, énergie électrique et automatisation' : 'Bachelor’s – Electronics, Electrical Energy and Automation'}
            </h3>
            <div className="timeline-institution">
              <img src={lyon1Logo} alt="Claude Bernard Lyon 1 University logo" />
              <h4 className="vertical-timeline-element-subtitle">Claude Bernard Lyon 1 University</h4>
            </div>
            <p>
              Villeurbanne, France
            </p>
          </VerticalTimelineElement>

        </VerticalTimeline>
      </div>
    </div>
  );
}

export default EducationTimeline;
