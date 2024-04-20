import { NavLink } from 'react-router-dom';
import { FiCalendar, FiHome, FiUsers } from 'react-icons/fi';
import styles from './side-menu.module.scss';

export const SideMenu = () => {
  return (
    <div className={styles.wrapper}>
      <NavLink
        to="/app/dashboard"
        className={({ isActive }) => (isActive ? styles.activeLink : '')}
      >
        <FiHome />
      </NavLink>
      <NavLink
        to="/app/calendar"
        className={({ isActive }) => (isActive ? styles.activeLink : '')}
      >
        <FiCalendar />
      </NavLink>
      <NavLink
        to="/app/players"
        className={({ isActive }) => (isActive ? styles.activeLink : '')}
      >
        <FiUsers />
      </NavLink>
    </div>
  );
};
