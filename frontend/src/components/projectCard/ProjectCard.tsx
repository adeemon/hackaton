import { LinearProgress } from '@mui/material';
import * as React from 'react';
import { IProject } from '../../interfaces';

export const ProjectCard: React.FC<IProject> = ({ ...props }) =>
  (
    <div className="project-card">
      <p className="project-card__title">
        { props.projectName }
      </p>
      <div className="project-card__info-wrapper">
        <div className="project-card__info-block">
          <p className="project-card__info-title">
            Планируемое время
          </p>
          <p className="project-card__info-content">
            { props.projectTimeCostPlan || '0' } ч.
          </p>
        </div>
        <div className="project-card__info-block">
          <p className="project-card__info-title">
            Фактическое время
          </p>
          <p className="project-card__info-content">
            { props.projectTimeCostFact || '0' } ч.
          </p>
        </div>
        <div className="project-card__info-block">
          <p className="project-card__info-title">
            Статус
          </p>
          <p className="project-card__info-content">
            { props.projectStatus }
          </p>
        </div>
        <div className="project-card__info-block">
          <p className="project-card__info-title">
            Продуктивность
          </p>
          <p className="project-card__info-content">
            <LinearProgress variant="determinate" value={ props.productivity } />
          </p>
        </div>
      </div>
    </div>
  );
