import * as React from 'react';

export interface IInfoBoardProps {
  tasksAmount: number;
  completedTasks: number;
  description: string;
}

export const InfoBoard: React.FC<IInfoBoardProps> = ({ ...props }) =>
  (
    <div className="info-board">
      <p className="info-board__title">
        Текущее состояние
      </p>
      <p className="info-board__tasks-info">
        <p>
          Всего задач:
        </p>
        { props.tasksAmount }
      </p>
      <p className="info-board__tasks-info">
        <p>
          Выполнено:
        </p>
        { props.completedTasks }
      </p>
      <p className="info-board__description">
        { props.description }
      </p>
    </div>
  );
