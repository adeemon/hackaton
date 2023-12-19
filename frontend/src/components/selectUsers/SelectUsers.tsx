import { MenuItem } from '@mui/base';
import { CircularProgress, Select } from '@mui/material';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { getAllUsers, selectIsUsersLoaded, selectUsers } from '../../redux/slices/usersSlice';
import { useAppDispatch } from '../../redux/store/store';

export interface IUsersSelect {
  isAdmins: boolean;
}

export const SelectUsers = React.forwardRef<HTMLSelectElement, IUsersSelect>(
  ({ isAdmins }, ref) => {
    const usersSelector = useSelector(selectUsers);
    const isUsersLoaded = useSelector(selectIsUsersLoaded);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
      !isUsersLoaded && dispatch(getAllUsers());
    }, [isUsersLoaded]);
    const filteredUsers = usersSelector.filter((user) =>
      isAdmins
      && (user.userRole === 'Директор' || user.userRole === 'Менеджер'));
    const usersToRender = filteredUsers.map((user) =>
      (
        <MenuItem value={ user.id }>
          { user.userFirstName } { user.userLastName } { user.userRole }
        </MenuItem>
      ));

    const selectToRender = (
      <Select ref={ ref }>
        { usersToRender }
      </Select>
    );

    return (
      <>
        { isUsersLoaded ? selectToRender : <CircularProgress /> }
      </>
    );
  },
);
