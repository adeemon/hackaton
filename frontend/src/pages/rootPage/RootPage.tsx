import { Outlet } from 'react-router-dom';
import { Header } from '../../layout/header/Header';

export const RootPage: React.FC = () =>
  (
    <>
      <Header />
      <Outlet />
    </>
  );
