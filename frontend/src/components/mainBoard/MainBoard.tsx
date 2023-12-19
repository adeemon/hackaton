import * as React from 'react';
import AddchartIcon from '@mui/icons-material/Addchart';
import DoneIcon from '@mui/icons-material/Done';
import ComputerIcon from '@mui/icons-material/Computer';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { selectProjectById } from '../../redux/slices/projectSlice';
import { TaskCard } from '../taskCard/TaskCard';
import { InfoBoard } from '../infoBoard/InfoBoard';
// import { InfoBoard } from '../infoBoard/InfoBoard';

export interface IMainBoard {
  projectId: number;
}

export const MainBoard: React.FC<IMainBoard> = ({ ...props }) => {
  const project = useSelector(selectProjectById(props.projectId));
  const newTasks = project.taskList.filter((task) =>
    task.taskStatus === 'Новая');
  const inWorkTasks = project.taskList.filter((task) =>
    task.taskStatus === 'В работе');
  const doneTasks = project.taskList.filter((task) =>
    task.taskStatus === 'Выполнено');
  const declinedTasks = project.taskList.filter((task) =>
    task.taskStatus === 'Отменена');
  const newTasksToRender = newTasks.map((task) =>
    <TaskCard task={ task } key={ task.taskId } />);
  const WIPTasksToRender = inWorkTasks.map((task) =>
    <TaskCard task={ task } key={ task.taskId } />);
  const DoneTasksToRender = doneTasks.map((task) =>
    <TaskCard task={ task } key={ task.taskId } />);
  const CanceledTasksToRender = declinedTasks.map((task) =>
    <TaskCard task={ task } key={ task.taskId } />);
  return (
    <>
      <div className="main-board">
        <div className="main-board__tasks-board">
          <div id="new-tasks" className="main-board__tasks-column">
            <div className="main-board__column-title">
              <AddchartIcon />
              Новые: {newTasks.length}
            </div>
            { newTasksToRender }
          </div>
          <div id="in-work-tasks" className="main-board__tasks-column">
            <div className="main-board__column-title">
              <ComputerIcon />
              В работе: { inWorkTasks.length }
            </div>
            { WIPTasksToRender }
          </div>
          <div id="done-tasks" className="main-board__tasks-column">
            <div className="main-board__column-title">
              <DoneIcon />
              Выполнены: { doneTasks.length }
            </div>
            { DoneTasksToRender }
          </div>
          <div id="canceled-tasks" className="main-board__tasks-column">
            <div className="main-board__column-title">
              <CloseIcon />
              Отмененные: { declinedTasks.length }
            </div>
            { CanceledTasksToRender }
          </div>
        </div>
      </div>
      <InfoBoard
        tasksAmount={project.taskList.length}
        completedTasks={doneTasks.length}
        description={project.projectDesc}
      />
    </>
  );
};
