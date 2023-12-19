import { createBrowserRouter } from 'react-router-dom';
import { ProfilePage } from '../pages/profilePage/ProfilePage';
import { ProjectsPage } from '../pages/projectsPage/ProjectsPage';
import { RootPage } from '../pages/rootPage/RootPage';
import { TasksPage } from '../pages/tasksPage/TasksPage';
import { UsersPage } from '../pages/usersPage/UsersPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    children: [
      {
        path: '',
        element: <ProjectsPage />,
    },
      {
        path: 'users',
        element: <UsersPage />,
      },
      {
        path: 'tasks',
        element: <TasksPage />,
      },
      {
        path: 'tasks/:projectId',
        element: <TasksPage />,
      },
      {
        path: 'projects',
        element: <ProjectsPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
    ],
  },
]);
