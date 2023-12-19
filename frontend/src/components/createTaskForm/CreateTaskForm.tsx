import { useForm, Controller } from 'react-hook-form';
import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { addHours } from 'date-fns';
import * as yup from 'yup';
import { Button, FormControl, InputLabel, MenuItem, Select, TextareaAutosize, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { getAllUsers, selectIsUsersLoaded, selectUsers } from '../../redux/slices/usersSlice';
import { useAppDispatch } from '../../redux/store/store';
import { postNewTask, selectProjectById } from '../../redux/slices/projectSlice';


const schema = yup.object({
  taskName: yup.string().required('Введите название задачи!'),
  taskDesc: yup.string().required('Введите описание задачи!'),
  priority: yup.number().required('Выберите приоритет задачи'),
  taskCreatorId: yup.number().required(),
  taskExecutorId: yup.number().required(),
  taskTimeCostPlan: yup.number().required().min(1),
});
type FormData = yup.InferType<typeof schema>;

interface ITaskFormProps {
  projectId: number;
  onClose: () => void;
}

export const CreateTaskForm: React.FC<ITaskFormProps> = ({
  projectId,
  onClose,
}) => {
  const users = useSelector(selectUsers);
  const dispatch = useAppDispatch();
  const projectName = useSelector(selectProjectById(projectId)).projectName;
  const isUsersLoaded = useSelector(selectIsUsersLoaded);
  const { handleSubmit, control, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    shouldFocusError: true,
  });
  const onSubmit = (data: FormData) => {
    let date = new Date();
    date = addHours(date, data.taskTimeCostPlan * 3);
    const taskDeadline = date.toISOString();
    console.log(taskDeadline);
    dispatch(postNewTask({ ...data, projectId, taskDeadline }));
    console.log(data);
    onClose();
  };

  useEffect(() => {
    !isUsersLoaded && dispatch(getAllUsers());
  }, [users]);
  const filteredUsers = users.filter((user) =>
    (user.userRole === 'Директор' || user.userRole === 'Менеджер'));
  const adminsToSelect = filteredUsers.map((user) =>
    (
      <MenuItem value={ user.id }>
        { `${user.userFirstName} ${user.userLastName} ${user.userRole}` }
      </MenuItem>
    ));

  const usersToSelect = users.map((user) =>
    (
      <MenuItem value={ user.id }>
        { `${user.userFirstName} ${user.userLastName} ${user.userRole}` }
      </MenuItem>
    ));

  return (
    <form
      onSubmit={ handleSubmit(onSubmit) }
      className="create-task-form default-form"
    >
      <p className="create-task-form__project-id">
        {projectName}
      </p>
      <div className="default-form__input-wrapper">
        <Controller
          name="taskName"
          control={ control }
          render={ ({ field }) =>
            <TextField label="Название задачи" variant="outlined" { ...field } /> }
        />
        <p className="default-form__error-message">
          { errors.taskName?.message }
        </p>
      </div>
      <div className="default-form__input-wrapper">
        <Controller
          name="taskDesc"
          control={ control }
          render={ ({ field }) =>
            <TextareaAutosize className="create-task-form__desc" placeholder="Описание" { ...field } /> }
        />
        <p className="default-form__error-message">
          { errors.taskDesc?.message }
        </p>
      </div>
      <div className="default-form__input-wrapper">
        <FormControl className="default-form__select" fullWidth>
          <InputLabel id="choose-task-priority-id">Приоритет</InputLabel>
          <Controller
            name="priority"
            control={ control }
            render={ ({ field }) =>
              (
                <Select labelId="create-task-role-id" { ...field } label="Приоритет">
                  <MenuItem value={ 1 }> Наименьший </MenuItem>
                  <MenuItem value={ 2 }> Низкий </MenuItem>
                  <MenuItem value={ 3 }> Средний </MenuItem>
                  <MenuItem value={ 4 }> Высокий </MenuItem>
                  <MenuItem value={ 5 }> Наибольший </MenuItem>
                </Select>
            ) }
          />
        </FormControl>
      </div>
      <div className="default-form__input-wrapper">
        <FormControl className="default-form__select" fullWidth>
          <InputLabel id="choose-task-creator-id">Создатель</InputLabel>
          <Controller
            name="taskCreatorId"
            control={ control }
            render={ ({ field }) =>
              (
                <Select labelId="create-user-role-id" { ...field } label="Ответственный">
                  { adminsToSelect }
                </Select>
            ) }
          />
        </FormControl>
        <p className="default-form__error-message">
          { errors.taskCreatorId?.message }
        </p>
      </div>
      <div className="default-form__input-wrapper">
        <FormControl className="default-form__select" fullWidth>
          <InputLabel id="choose-task-executor-id">Ответственный</InputLabel>
          <Controller
            name="taskExecutorId"
            control={ control }
            render={ ({ field }) =>
              (
                <Select labelId="create-user-role-id" { ...field } label="Ответственный">
                  { usersToSelect }
                </Select>
            ) }
          />
        </FormControl>
        <p className="default-form__error-message">
          { errors.taskExecutorId?.message }
        </p>
      </div>
      <div className="default-form__input-wrapper">
        <Controller
          name="taskTimeCostPlan"
          control={ control }
          render={ ({ field }) =>
            <TextField type="number" label="Ожидаемое время" variant="outlined" { ...field } /> }
        />
        <p className="default-form__error-message">
          { errors.taskTimeCostPlan?.message }
        </p>
      </div>
      <Button onClick={ handleSubmit(onSubmit) }>
        Сохранить
      </Button>
      <Button onClick={ onClose }>
        Закрыть
      </Button>
    </form>
  );
};
