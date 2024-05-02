import { Routes, Route } from 'react-router-dom';
import { SideMenu } from './components/side-menu/side-menu.tsx';
import { UserFunctionalitySelect } from './components/user-functionality-select/user-functionality-select.tsx';
import styles from './app.module.scss';
import { Dashboard } from './pages/dashboard/dashboard.tsx';
import { Calendar } from './pages/calendar/calendar.tsx';

import useIsMobile from '../../hooks/useIsMobile.tsx';
import { useApp } from './app.context.tsx';
import { Players } from './pages/players/players.tsx';
import { Event } from './pages/event/event.tsx';
import { Chat } from './pages/chat/chat.tsx';

export const AppPage = () => {
  const isMobile = useIsMobile();

  const { isDataLoading } = useApp();

  // useEffect(() => {
  //     navigate('/app/dashboard');
  // }, [userSelectedFunctionality]);

  if (isDataLoading) return <div>loading</div>;

  return (
    <div className={styles.wrapper}>
      {!isMobile && <SideMenu />}
      <UserFunctionalitySelect />
      <div className={styles.content}>
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="event/:eventId" element={<Event />} />
          <Route path="players" element={<Players />} />
          <Route path="chat" element={<Chat />} />
        </Routes>
      </div>
    </div>
  );
};
