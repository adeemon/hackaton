import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { IUser, IUserIdLess } from '../../interfaces';

export interface IUsersSlice {
  isLoaded: boolean;
  users: IUser[];
}

const initialState: IUsersSlice = {
  isLoaded: false,
  users: [],
};

export const getAllUsers = createAsyncThunk('usersSlice/getUsers', async () => {
  const requestOptions = {
    method: 'GET',
    headers: {
        accept: 'application/json',
      },
  };
  const requestPath = 'http://45.12.229.110:8000/users/all';
  const allIdsRequest = await fetch(requestPath, requestOptions);
  const allIdsResult = await allIdsRequest.json();
  return allIdsResult as IUser[];
});

export const postNewUser = createAsyncThunk(
  'usersSlice/postUser',
  async (data: IUserIdLess) => {
    const requestPath = 'http://45.12.229.110:8000/user';
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
    const response = await fetch(requestPath, requestOptions);
    const output = await response.json();
    return output;
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getAllUsers.fulfilled,
      (state, action: PayloadAction<IUser[]>) => {
        state.users = action.payload;
        state.isLoaded = true;
      },
    );
    builder.addCase(postNewUser.fulfilled, (state) => {
      state.isLoaded = false;
    });
    builder.addCase(postNewUser.rejected, (state) => {
      state.isLoaded = false;
    });
  },
});

export const selectIsUsersLoaded = (state: RootState) =>
  state.users.isLoaded === true;
export const selectUsers = (state: RootState) =>
  state.users.users;
export default usersSlice.reducer;
