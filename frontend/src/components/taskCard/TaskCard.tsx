import { Button, IconButton, Modal } from '@mui/material';
import AddchartIcon from '@mui/icons-material/Addchart';
import DoneIcon from '@mui/icons-material/Done';
import ComputerIcon from '@mui/icons-material/Computer';
import CloseIcon from '@mui/icons-material/Close';
import * as React from 'react';
import { ITask } from '../../interfaces';
import { updateTaskStatus } from '../../redux/slices/projectSlice';
import { useAppDispatch } from '../../redux/store/store';
import { TaskInfo } from '../taskInfo/TaskInfo';

export interface ITaskCard {
  task: ITask;
}

export const TaskCard: React.FC<ITaskCard> = ({ task }) => {
  const [isOpened, setIsOpened] = React.useState(false);
  const dispatch = useAppDispatch();
  const onNew = () => {
    dispatch(updateTaskStatus({ taskId: task.taskId, taskStatusId: 1 }));
  };
  const onWIP = () => {
    dispatch(updateTaskStatus({ taskId: task.taskId, taskStatusId: 2 }));
  };
  const onDone = () => {
    dispatch(updateTaskStatus({ taskId: task.taskId, taskStatusId: 3 }));
  };
  const onCanceled = () => {
    dispatch(updateTaskStatus({ taskId: task.taskId, taskStatusId: 4 }));
  };
  const onExpand = () => {
    setIsOpened(true);
  };
  const onCloseModal = () => {
    setIsOpened(false);
  };
  const onNewButton = (
    <IconButton
      id="task-button-new"
      onClick={ onNew }
    >
      <AddchartIcon />
    </IconButton>
  );
  const onWIPButton = (
    <IconButton
      id="task-button-wip"
      onClick={ onWIP }
    >
      <ComputerIcon />
    </IconButton>
  );
  const onDoneButton = (
    <IconButton
      id="task-button-done"
      onClick={ onDone }
    >
      <DoneIcon />
    </IconButton>
  );
  const onCancelButton = (
    <IconButton
      id="task-button-canceled"
      onClick={ onCanceled }
    >
      <CloseIcon />
    </IconButton>
  );
  return (
    <div className="task-card">
      <div className="task-card__info">
        <Button className="button-hidden" onClick={ onExpand }>
          <p className="task-card__label">
            { task.taskName }
          </p>
        </Button>
        <p className="task-card__executor">
          { task.taskExecutor }
        </p>
      </div>
      <div className="task-card__buttons">
        { task.taskStatus !== 'Новая' && onNewButton }
        { task.taskStatus !== 'В работе' && onWIPButton }
        { task.taskStatus !== 'Выполнено' && onDoneButton }
        { task.taskStatus !== 'Отменена' && onCancelButton }
      </div>
      <Modal
        className="modal"
        open={ isOpened }
        onClose={ onCloseModal }
        aria-labelledby="Информация о задаче"
      >
        <TaskInfo { ...task } onClose={onCloseModal} />
      </Modal>
    </div>
  );
};
