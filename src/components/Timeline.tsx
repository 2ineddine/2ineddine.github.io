import React from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import orangeLogo from '../assets/images/orange.png';
import sorbonneLogo from '../assets/images/sorbonne.png';
import '../assets/styles/Timeline.scss'

function Timeline({ language = 'en' }: { language?: 'en' | 'fr' }) {
  const isFrench = language === 'fr';

  return (
    <div id="history" className="history-section">
      <div className="items-container">
        <h1>{isFrench ? 'Parcours professionnel' : 'Career History'}</h1>

        <VerticalTimeline>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date={isFrench ? 'Fév. 2026 - Aujourd\'hui' : 'Feb. 2026 - Present'}
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">
              {isFrench ? 'Stagiaire ingénieur IA' : 'AI Engineer Intern'}
            </h3>
            <div className="timeline-institution">
              <img src={orangeLogo} alt="Orange logo" />
              <h4 className="vertical-timeline-element-subtitle">Orange</h4>
            </div>
            <p>
              Rennes, France
            </p>
            <p>
              {isFrench ? 'Deep Learning, GANs & Transformers, MLOps, suivi des expériences' : 'Deep Learning, GANs & Transformers, MLOps, Experiment Tracking'}
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date={isFrench ? 'Mai 2025 - Sept. 2025' : 'May 2025 - Sept. 2025'}
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">
              {isFrench ? 'Stagiaire data scientist' : 'Data Scientist Intern'}
            </h3>
            <div className="timeline-institution">
              <img src={sorbonneLogo} alt="Sorbonne University logo" />
              <h4 className="vertical-timeline-element-subtitle">Sorbonne Université</h4>
            </div>
            <p>
              Paris, France
            </p>
            <p>
              {isFrench ? 'Fusion de capteurs, vision par ordinateur, estimation d\'état, robotique' : 'Sensor Fusion, Computer Vision, State Estimation, Robotics'}
            </p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </div>
  );
}

export default Timeline;
