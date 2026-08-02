import React from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../assets/styles/Timeline.scss'

function Timeline() {
  return (
    <div id="history">
      <div className="items-container">
        <h1>Career History</h1>

        <VerticalTimeline>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ 
              background: 'white', 
              color: 'rgb(39, 40, 34)' 
            }}
            contentArrowStyle={{ borderRight: '7px solid white' }}
            date="Feb. 2026 - Present"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">
              Machine Learning Engineer Intern
            </h3>
            <h4 className="vertical-timeline-element-subtitle">
              Orange
            </h4>
            <p>
              Rennes, France
            </p>
            <p>
              Deep Learning, GANs & Transformers, MLOps, Experiment Tracking
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ 
              background: 'white',
              color: 'rgb(39, 40, 34)'
            }}
            date="May 2025 - Sept. 2025"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">
              Data Scientist Intern
            </h3>
            <h4 className="vertical-timeline-element-subtitle">
              Sorbonne Université
            </h4>
            <p>
              Paris, France
            </p>
            <p>
              Sensor Fusion, Computer Vision, State Estimation, Robotics
            </p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </div>
  );
}

export default Timeline;
