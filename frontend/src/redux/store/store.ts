import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import usersSliceReducer from '../slices/usersSlice';
import projectsSliceReducer from '../slices/projectSlice';

export const store = configureStore({
  reducer: {
    users: usersSliceReducer,
    projects: projectsSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// prettier-ignore
export const useAppDispatch = () =>
  useDispatch<AppDispatch>();
