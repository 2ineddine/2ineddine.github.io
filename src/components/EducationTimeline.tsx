import React from "react";
import '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../assets/styles/Timeline.scss';

function EducationTimeline() {
  return (
    <div id="education">
      <div className="items-container">
        <h1>Education</h1>

        <VerticalTimeline>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ 
              background: 'white', 
              color: 'rgb(39, 40, 34)' 
            }}
            contentArrowStyle={{ borderRight: '7px solid white' }}
            date="2024 - 2026"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faGraduationCap} />}
          >
            <h3 className="vertical-timeline-element-title">
              Master’s – Intelligent Systems Engineering
            </h3>
            <h4 className="vertical-timeline-element-subtitle">
              Sorbonne University
            </h4>
            <p>
              Paris, France
            </p>
          </VerticalTimelineElement>


          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ 
              background: 'white',
              color: 'rgb(39, 40, 34)',
              paddingRight: '-200px'
            }}
            date="2021 - 2024"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faGraduationCap} />}
          >
            <h3 className="vertical-timeline-element-title">
              Bachelor’s – Electronics, Electrical Energy and Automation
            </h3>
            <h4 className="vertical-timeline-element-subtitle">
              Claude Bernard Lyon 1 University
            </h4>
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