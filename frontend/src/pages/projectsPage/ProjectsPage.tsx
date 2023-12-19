import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, Checkbox, InputLabel, Modal, TextField } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { CreateProjectForm } from '../../components/createProjectForm/CreateProjectForm';
import { ProjectCard } from '../../components/projectCard/ProjectCard';
import { getAllProjects, selectIsProjectsLoaded, selectProjects } from '../../redux/slices/projectSlice';
import { useAppDispatch } from '../../redux/store/store';

export const ProjectsPage: React.FC = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [isOnlyActive, setIsOnlyActive] = useState(false);
  const [filteredName, setFilteredName] = useState('');
  const projects = useSelector(selectProjects);
  const isProjectLoaded = useSelector(selectIsProjectsLoaded);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    !isProjectLoaded && dispatch(getAllProjects());
  }, [isProjectLoaded]);
  const onCreateProject = () => {
    setIsCreating(true);
  };
  const onCloseModal = () => {
    setIsCreating(false);
  };
  const filteredProjects = projects.filter((element) => {
    if (!element.projectName.toLowerCase()
      .includes(filteredName.toLowerCase())
      && filteredName.length > 0) {
      return false;
    }
    if ((element.projectStatus === 'Завершен'
      || element.projectStatus === 'Отменён'
      || element.projectStatus === 'Отменен')
      && isOnlyActive) {
      return false;
    }
    return true;
  });
  const projectsToRender = filteredProjects.map((project) =>
    (
      <Link to={ `/tasks/${project.id}` }>
        <ProjectCard { ...project } key={ project.id } />
      </Link>
    ));

  return (
    <>
      <section className="projects">
        <div className="projects__filter-option">
          <TextField
            id="projects-filter-field"
            label="Фильтр по названию"
            variant="outlined"
            value={ filteredName }
            onChange={ (e) =>
              setFilteredName(e.target.value) }
          />
          <InputLabel>
            Только активные
            <Checkbox
              id="projects-filter-checkbox"
              onChange={ () =>
                setIsOnlyActive(!isOnlyActive) }
            />
          </InputLabel>
        </div>
        <Button id="projects__create-button" variant="outlined" onClick={ onCreateProject }>Начать новый проект</Button>
        { projectsToRender }
      </section>
      <div className="modal-container">
        <Modal
          className="modal"
          open={ isCreating }
          onClose={ onCloseModal }
          aria-labelledby="Создание нового проекта"
        >
          <CreateProjectForm onClose={ onCloseModal } />
        </Modal>
      </div>
    </>
  );
};
