import { useForm, Controller } from 'react-hook-form';
import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, FormControl, InputLabel, MenuItem, Select, TextareaAutosize, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { getAllUsers, selectIsUsersLoaded, selectUsers } from '../../redux/slices/usersSlice';
import { useAppDispatch } from '../../redux/store/store';
import { postNewProject } from '../../redux/slices/projectSlice';


const schema = yup.object({
  projectName: yup.string().required('Введите название проекта!'),
  projectDesc: yup.string().required('Введите описание проекта!'),
  projectTimeCostPlan: yup.number().required('Укажите ожидаемое время!')
    .min(0, 'Время не может быть меньше часа!')
    .typeError('Введите корректный номер!'),
  userId: yup.number().required('Выберите исполнителя!'),
  projectPriority: yup.number().required(),
});
type FormData = yup.InferType<typeof schema>;

interface IProjectFormProps {
  onClose: () => void;
}

export const CreateProjectForm: React.FC<IProjectFormProps> = ({
  onClose,
}) => {
  const users = useSelector(selectUsers);
  const dispatch = useAppDispatch();
  const isUsersLoaded = useSelector(selectIsUsersLoaded);
  const { handleSubmit, control, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    shouldFocusError: true,
  });
  const onSubmit = (data: FormData) => {
    dispatch(postNewProject(data));
    console.log(data);
    onClose();
  };

  useEffect(() => {
    !isUsersLoaded && dispatch(getAllUsers());
  }, [users]);
  const filteredUsers = users.filter((user) =>
    (user.userRole === 'Директор' || user.userRole === 'Менеджер'));
  const usersToSelect = filteredUsers.map((user) =>
    (
      <MenuItem value={ user.id }>
        { `${user.userFirstName} ${user.userLastName} ${user.userRole}` }
      </MenuItem>
    ));

  return (
    <form
      onSubmit={ handleSubmit(onSubmit) }
      className="create-project-form default-form"
    >
      <div className="default-form__input-wrapper">
        <Controller
          name="projectName"
          control={ control }
          render={ ({ field }) =>
            <TextField label="Название проекта" variant="outlined" { ...field } /> }
        />
        <p className="default-form__error-message">
          { errors.projectName?.message }
        </p>
      </div>
      <div className="default-form__input-wrapper">
        <Controller
          name="projectDesc"
          control={ control }
          render={ ({ field }) =>
            <TextareaAutosize className="create-project-form__desc" placeholder="Описание" { ...field } /> }
        />
        <p className="default-form__error-message">
          { errors.projectDesc?.message }
        </p>
      </div>
      <div className="default-form__input-wrapper">
        <Controller
          name="projectTimeCostPlan"
          control={ control }
          render={ ({ field }) =>
            <TextField type="number" label="Ожидаемое время" variant="outlined" { ...field } /> }
        />
        <p className="default-form__error-message">
          { errors.projectTimeCostPlan?.message }
        </p>
      </div>
      <div className="default-form__input-wrapper">
        <FormControl className="default-form__select" fullWidth>
          <InputLabel id="choose-project-creator-id">Ответственный</InputLabel>
          <Controller
            name="userId"
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
          { errors.userId?.message }
        </p>
      </div>
      <div className="default-form__input-wrapper">
        <FormControl className="default-form__select" fullWidth>
          <InputLabel id="choose-project-creator-id">Приоритет</InputLabel>
          <Controller
            name="projectPriority"
            control={ control }
            render={ ({ field }) =>
              (
                <Select labelId="create-user-role-id" { ...field } label="Приоритет">
                  <MenuItem value={ 1 }> Наименьший </MenuItem>
                  <MenuItem value={ 2 }> Низкий </MenuItem>
                  <MenuItem value={ 3 }> Средний </MenuItem>
                  <MenuItem value={ 4 }> Высокий </MenuItem>
                  <MenuItem value={ 5 }> Наибольший </MenuItem>
                </Select>
              ) }
          />
        </FormControl>
        <p className="default-form__error-message">
          { errors.projectPriority?.message }
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
