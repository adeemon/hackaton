import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';
import { adaptTaskStatusStringToNumber } from '../../utils/index';
import { RootState } from '../store/store';
import { IProjectCreate, IProject, ITaskCreate } from '../../interfaces';

export interface IProjecstSlice {
  isLoaded: boolean;
  projects: IProject[];
}

export interface IUpdateTaskStatus {
  taskId: number;
  taskStatusId: number;
}

const initialState: IProjecstSlice = {
  isLoaded: false,
  projects: [],
};

export const getAllProjects = createAsyncThunk(
  'projectsSlice/getProjects',
  async () => {
    const requestOptions = {
      method: 'GET',
    };
    const requestPath = 'http://45.12.229.110:8000/projects/all';
    const allIdsRequest = await fetch(requestPath, requestOptions);
    const allIdsResult = (await allIdsRequest.json()) as IProject[];
    return allIdsResult;
  },
);

export const postNewProject = createAsyncThunk(
  'projectsSlice/postProject',
  async (data: IProjectCreate) => {
    const requestPath = 'http://45.12.229.110:8000/project';
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

export const postNewTask = createAsyncThunk(
  'projectsSlice/postTask',
  async (data: ITaskCreate) => {
    const requestPath = 'http://45.12.229.110:8000/task';
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

export const updateTaskStatus = createAsyncThunk(
  'projectsSlice/updateTaskStatus',
  async (data: IUpdateTaskStatus) => {
    const requestPath = `http://45.12.229.110:8000/tasks/${data.taskId}`;
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
    await fetch(requestPath, requestOptions);
    return data;
  },
);

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getAllProjects.fulfilled,
      (state, action: PayloadAction<IProject[]>) => {
        state.projects = action.payload;
        state.isLoaded = true;
      },
    );
    builder.addCase(postNewProject.fulfilled, (state) => {
      state.isLoaded = false;
    });
    builder.addCase(postNewProject.rejected, (state) => {
      state.isLoaded = false;
    });
    builder.addCase(
      updateTaskStatus.fulfilled,
      (state, action: PayloadAction<IUpdateTaskStatus>) => {
        const output = state.projects.map((project) => {
          const out = project;
          const newTaskList = project.taskList.map((task) => {
            if (task.taskId === action.payload.taskId) {
              return {
                ...task,
                taskStatus: adaptTaskStatusStringToNumber(
                  action.payload.taskStatusId,
                ),
              };
            }
            return task;
          });
          return { ...out, taskList: newTaskList };
        });
        state.projects = output;
      },
    );
    builder.addCase(updateTaskStatus.rejected, (state) => {
      state.isLoaded = false;
    });
    builder.addCase(postNewTask.fulfilled, (state) => {
      state.isLoaded = false;
    });
    builder.addCase(postNewTask.rejected, (state) => {
      state.isLoaded = false;
    });
  },
});

export const selectProjectById = (projectId: number) =>
  (state: RootState) =>
    state.projects.projects.filter((project) =>
      project.id === projectId)[0];
export const selectIsProjectsLoaded = (state: RootState) =>
  state.projects.isLoaded === true;
export const selectProjects = (state: RootState) =>
  state.projects.projects;
export default projectsSlice.reducer;
