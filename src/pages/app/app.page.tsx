import { Routes, Route } from 'react-router-dom';
import { SideMenu } from './components/side-menu/side-menu.tsx';
import { UserFunctionalitySelect } from './components/user-functionality-select/user-functionality-select.tsx';
import styles from './app.module.scss';
import { Dashboard } from './pages/dashboard/dashboard.tsx';
import { Calendar } from './pages/calendar/calendar.tsx';

import useIsMobile from '../../hooks/useIsMobile.tsx';
import { Players } from './pages/players/players.tsx';
import { Event } from './pages/event/event.tsx';
import { Chat } from './pages/chat/chat.tsx';
import { Lineup } from './pages/lineup/lineup.tsx';
import { LineupDetails } from './pages/lineup/lineup-details/lineup-details.tsx';
import { FullScreenLoader } from './components/full-screen-loader/full-screen-loader.tsx';
import { useDetails } from './details.context.tsx';
import { Table } from './pages/table/table.tsx';

export const AppPage = () => {
  const isMobile = useIsMobile();

  const { teamDataFetch } = useDetails();

  if (!teamDataFetch) return <FullScreenLoader />;

  return (
    <div className={styles.wrapper}>
      {!isMobile && <SideMenu />}
      <UserFunctionalitySelect />
      <div className={styles.content}>
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="table" element={<Table />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="event/:eventId" element={<Event />} />
          <Route path="players" element={<Players />} />
          <Route path="chat" element={<Chat />} />
          <Route path="lineup" element={<Lineup />} />
          <Route path="lineup/:lineupId" element={<LineupDetails />} />
        </Routes>
      </div>
    </div>
  );
};
