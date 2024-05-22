import { NavLink } from 'react-router-dom';
import { FiCalendar, FiHome, FiUsers, FiMessageSquare } from 'react-icons/fi';
import styles from './side-menu.module.scss';
import { IoFootballSharp } from 'react-icons/io5';
import { MdOutlineTableRows } from 'react-icons/md';
import { IoIosSettings } from 'react-icons/io';
import { ModalComponent } from '../../../../components/modal/modal.tsx';
import { useEffect, useState } from 'react';
import { UserFunctionalitySelect } from '../user-functionality-select/user-functionality-select.tsx';
import { useApp } from '../../app.context.tsx';

export const SideMenu = () => {
  const { userSelectedFunctionality } = useApp();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsModalOpen(false);
  }, [userSelectedFunctionality]);

  return (
    <div className={styles.wrapper}>
      <ModalComponent
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Wybierz funkcje"
      >
        <UserFunctionalitySelect />
      </ModalComponent>
      <div className={styles.nav}>
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

      <div className={styles.settings}>
        <button className={styles.button} onClick={() => setIsModalOpen(true)}>
          <IoIosSettings />
        </button>
      </div>
    </div>
  );
};
