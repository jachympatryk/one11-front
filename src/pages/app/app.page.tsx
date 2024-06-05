import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { SideMenu } from './components/side-menu/side-menu.tsx';
import styles from './app.module.scss';
import {
  setIsUserPlayer,
  setUserAuthId,
} from '../../services/user/userSlice.ts';
import { useUser } from '../../hooks/userUser.ts';
import { Dashboard } from './pages/dashboard/dashboard.tsx';
import { Table } from './pages/table/table.tsx';
import { UserFunctionalitySelect } from './components/user-functionality-select/user-functionality-select.tsx';
import { Event } from './pages/event/event.tsx';
import { Calendar } from './pages/calendar/calendar.tsx';
import { Players } from './pages/players/players.tsx';
import { Lineup } from './pages/lineup/lineup.tsx';
import { LineupDetails } from './pages/lineup/lineup-details/lineup-details.tsx';
import { Chat } from './pages/chat/chat.tsx';

export const AppPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedFunctionary, updateSelectedFunctionary } = useUser();

  const { updateUserId } = useUser();

  const user = localStorage.getItem('user');

  useEffect(() => {
    const storedData = localStorage.getItem('user');

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const userId = parsedData?.id;

      console.log(parsedData);

      if (userId) {
        updateUserId(userId);

        dispatch(setUserAuthId(userId));
      } else {
        navigate('/auth');
      }
    } else {
      navigate('/auth');
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (user) {
      const storedData = localStorage.getItem('userSelectedFunctionality');

      if (storedData) {
        const formattedData = JSON.parse(storedData);
        updateSelectedFunctionary(formattedData);

        if ('position' in formattedData) {
          dispatch(setIsUserPlayer(!!formattedData.position));
        }
      }
    }
  }, [user]);

  return (
    <div className={styles.wrapper}>
      {!selectedFunctionary && <UserFunctionalitySelect />}
      {selectedFunctionary && (
        <>
          <SideMenu />
          <div className={styles.content}>
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="table" element={<Table />} />
              <Route path="event/:eventId" element={<Event />} />
              <Route path="chat" element={<Chat />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="players" element={<Players />} />
              <Route path="lineup" element={<Lineup />} />
              <Route path="lineup/:lineupId" element={<LineupDetails />} />

              {/*<Route path="functionaries" element={<Functionaries />} />*/}
              {/*<Route path="events" element={<Events />} />*/}
              {/*<Route path="*" element={<Navigate to="/dashboard" />} />*/}
            </Routes>
          </div>
        </>
      )}
    </div>
  );
};
