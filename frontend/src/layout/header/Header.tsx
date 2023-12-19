import { Link, NavLink } from 'react-router-dom';

export const Header: React.FC = () =>
  (
    <header className="header">
      <p className="header__logo">
        <Link to="/">
          TrackBreaker
        </Link>
      </p>
      <nav className="header__navigation">
        <ul className="header__links-list">
          <li>
            <NavLink
              to="projects"
              className={ ({ isActive }) =>
                `header__link${(isActive ? ' header__link-active' : '')}` }
            >
              Проекты
            </NavLink>
          </li>
          <li>
            <NavLink
              to="tasks"
              className={ ({ isActive }) =>
                `header__link${(isActive ? ' header__link-active' : '')}` }
            >
              Задачи
            </NavLink>
          </li>
          <li>
            <NavLink
              to="users"
              className={ ({ isActive }) =>
                `header__link${(isActive ? ' header__link-active' : '')}` }
            >
              Пользователи
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
