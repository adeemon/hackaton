import * as React from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { CircularProgress } from '@mui/material';
import { CreateUserForm } from '../../components/createUserForm/CreateUserForm';
import { UserCard } from '../../components/userCard/UserCard';
import { getAllUsers, selectIsUsersLoaded, selectUsers } from '../../redux/slices/usersSlice';
import { useAppDispatch } from '../../redux/store/store';
// import { CreateUserForm } from '../../components/createUserForm/CreateUserForm';

export const UsersPage: React.FC = () => {
  const [isCreating, setIsCreating] = React.useState(false);
  const isLoaded = useSelector(selectIsUsersLoaded);
  const users = useSelector(selectUsers);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    !isLoaded && dispatch(getAllUsers());
  }, [isLoaded]);

  const onCreateUser = () => {
    setIsCreating(true);
    console.log(users);
  };
  const onCloseModal = () => {
    setIsCreating(false);
  };

  const usersToRender = users.map((user) =>
    (
      <UserCard { ...user } key={ user.id } />
    ));
  const content = (
    <>
      <div className="modal-container">
        <Modal
          className="modal"
          open={ isCreating }
          onClose={ onCloseModal }
          aria-labelledby="Создание нового пользователя"
          aria-describedby="Введите имя и фамилию, роль и эмейл пользователя"
        >
          <CreateUserForm onClose={ onCloseModal } />
        </Modal>
      </div>
      <section className="users">
        <Button id="users__create-button" variant="outlined" onClick={ onCreateUser }>Создать пользователя</Button>
        <div className="users__container">
          { usersToRender }
        </div>
      </section>
    </>
  );
  return (
    <div>
      { isLoaded ? content : <CircularProgress /> }
    </div>
  );
};
