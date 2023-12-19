import Button from '@mui/material/Button';
import { CircularProgress, Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { MainBoard } from '../../components/mainBoard/MainBoard';
import { getAllProjects, selectIsProjectsLoaded, selectProjects } from '../../redux/slices/projectSlice';
import { getAllUsers } from '../../redux/slices/usersSlice';
import { useAppDispatch } from '../../redux/store/store';
import { CreateTaskForm } from '../../components/createTaskForm/CreateTaskForm';

export const TasksPage: React.FC = () => {
  const isProjectsLoaded = useSelector(selectIsProjectsLoaded);
  const [isCreating, setIsCreating] = useState(false);
  const projects = useSelector(selectProjects);
  const dispatch = useAppDispatch();
  const currentPathId = Number.parseInt(useLocation().pathname
    .replace('/tasks', '').replace('/', ''), 10);
  useEffect(() => {
    !isProjectsLoaded && dispatch(getAllProjects());
    !isProjectsLoaded && dispatch(getAllUsers());
    console.log(isCreating);
  }, [isProjectsLoaded]);
  const onCloseModal = () => {
    setIsCreating(false);
  };
  const projectNames = projects.map((project) =>
    (
      <NavLink
        to={ `/tasks/${project.id}` }
        className={ ({ isActive }) =>
          (`tasks__nav-link ${isActive ? 'tasks__nav-link-active' : ''}`) }
      >
        { project.projectName }
      </NavLink>
    ));

  const content = isProjectsLoaded && (
    <>
      <div className="tasks__projects">
        { projectNames }
      </div>
      <MainBoard projectId={ currentPathId || projects[0].id } />
    </>
  );

  return (
    <section className="tasks">
      <Button
        id="tasks__create-task"
        variant="outlined"
        onClick={ () =>
          setIsCreating(true) }
      >
        Создать новую задачу
      </Button>
      <div className="tasks__content-wrapper">
        { isProjectsLoaded ? content : <CircularProgress /> }
      </div>
      { isProjectsLoaded && (
        <Modal
          className="modal"
          open={ isCreating }
          onClose={ onCloseModal }
          aria-labelledby="Создание новой задачи"
        >
          <CreateTaskForm onClose={ onCloseModal } projectId={ currentPathId || projects[0].id } />
        </Modal>
      ) }
    </section>
  );
};
