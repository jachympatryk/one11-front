import { NavLink } from 'react-router-dom';
import { FiCalendar, FiHome, FiUsers, FiMessageSquare } from 'react-icons/fi';
import styles from './side-menu.module.scss';
import { IoFootballSharp } from 'react-icons/io5';
import { MdOutlineTableRows } from 'react-icons/md';

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
        to="/app/table"
        className={({ isActive }) => (isActive ? styles.activeLink : '')}
      >
        <MdOutlineTableRows />
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
      <NavLink
        to="/app/chat"
        className={({ isActive }) => (isActive ? styles.activeLink : '')}
      >
        <FiMessageSquare />
      </NavLink>
      <NavLink
        to="/app/lineup"
        className={({ isActive }) => (isActive ? styles.activeLink : '')}
      >
        <IoFootballSharp />
      </NavLink>
    </div>
  );
};
