import { Button } from '@mui/material';
import * as React from 'react';
import { ITask } from '../../interfaces';

export interface ITaskInfo extends ITask {
  onClose: () => void;
}

export const TaskInfo: React.FC<ITaskInfo> = ({ ...props }) =>
  (
    <div className="task-info">
      <p className="task-info__task-name">
        <p className="task-info__title">Название</p>
        { props.taskName }
      </p>
      <p className="task-info__project-name">
        <p className="task-info__title">Проект</p>
        { props.projectName }
      </p>
      <p className="task-info__priority">
        <p className="task-info__title">Приоритетность</p>
        { props.priority || 'Не указано'}
      </p>
      <p className="task-info__creator">
        <p className="task-info__title">Создатель</p>
        { props.taskCreator }
      </p>
      <p className="task-info__executor">
        <p className="task-info__title">Исполнитель</p>
        { props.taskExecutor }
      </p>
      <p className="task-info__plan-time">
        <p className="task-info__title">Планируемое время</p>
        { props.taskTimeCostPlan || 'Не' } запланировано.
      </p>
      <p className="task-info__fact-time">
        <p className="task-info__title">Фактическое время</p>
        { props.taskTimeCostFact || 'Не' } затрачено.
      </p>
      <Button onClick={ props.onClose }>
        Закрыть
      </Button>
    </div>
  );
