import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useAppDispatch } from '../../redux/store/store';
import { postNewUser } from '../../redux/slices/usersSlice';

const schema = yup.object({
  userFirstName: yup.string().required('Введите имя!'),
  userLastName: yup.string().required('Введите фамилию!'),
  userEmail: yup.string().email().required('Введите e-mail!'),
  userRole: yup.string()
    .required()
    .oneOf(['Тестировщик', 'Менеджер', 'Разработчик', 'Директор'], 'Выберите роль!'),
});
type FormData = yup.InferType<typeof schema>;

interface IUserFormProps {
  onClose: () => void;
}

export const CreateUserForm: React.FC<IUserFormProps> = ({
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const { handleSubmit, control, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    shouldFocusError: true,
  });
  const onSubmit = (data: FormData) => {
    dispatch(postNewUser(data));
    onClose();
  };

  return (
    <form
      onSubmit={ handleSubmit(onSubmit) }
      className="create-user-form default-form"
    >
      <div className="default-form__input-wrapper">
        <Controller
          name="userFirstName"
          control={ control }
          render={ ({ field }) =>
            <TextField label="Имя" variant="outlined" { ...field } /> }
        />
        <p className="default-form__error-message">
          { errors.userFirstName?.message }
        </p>
      </div>
      <div className="default-form__input-wrapper">
        <Controller
          name="userLastName"
          control={ control }
          render={ ({ field }) =>
            <TextField label="Фамилия" variant="outlined" { ...field } /> }
        />
        <p className="default-form__error-message">
          { errors.userLastName?.message }
        </p>
      </div>
      <div className="default-form__input-wrapper">
        <FormControl className="default-form__select" fullWidth>
          <InputLabel id="create-user-role-id">Роль</InputLabel>
          <Controller
            name="userRole"
            control={ control }
            render={ ({ field }) =>
              (
                <Select labelId="create-user-role-id" { ...field } label="Роль">
                <MenuItem value="Тестировщик">Тестировщик</MenuItem>
                  <MenuItem value="Разработчик">Разработчик</MenuItem>
                  <MenuItem value="Менеджер">Менеджер проекта</MenuItem>
                  <MenuItem value="Директор">Директор</MenuItem>
                </Select>
              ) }
          />
        </FormControl>
        <p className="default-form__error-message">
          { errors.userRole?.message }
        </p>
      </div>
      <div className="default-form__input-wrapper">
        <Controller
          name="userEmail"
          control={ control }
          render={ ({ field }) =>
            <TextField label="E-mail" variant="outlined" { ...field } /> }
        />
        <p className="default-form__error-message">
          { errors.userEmail?.message }
        </p>
      </div>
      <Button onClick={ handleSubmit(onSubmit) }>
        Сохранить
      </Button>
      <Button onClick={onClose}>
        Закрыть
      </Button>
    </form>
  );
};
