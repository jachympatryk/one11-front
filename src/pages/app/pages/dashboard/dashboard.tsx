import styles from './dashboard.module.scss';
import { EventsList } from '../../components/events-list/events-list.tsx';
import { useState } from 'react';
import { FutureMatch } from '../../components/future-match/future-match.tsx';
import { Loader } from '../../components/loader/loader.tsx';
import { useTeamEvents } from '../../../../hooks/useEvents.ts';

export const Dashboard = () => {
  const { isEventsSuccess, isEventsLoading, events, isEventsError } =
    useTeamEvents();

  const [currentMonth] = useState<Date>(new Date());

  if (isEventsLoading) return <Loader />;
  if (isEventsError)
    return <div className={styles.container}>Wystąpił błąd</div>;
  if (!isEventsSuccess || !events)
    return <div className={styles.container}>Brak wydarzeń</div>;
  if (events.length === 0)
    return <div className={styles.container}>Brak wydarzeń</div>;

  return (
    <div className={styles.container}>
      <div className={styles.futureMatchWrapper}>
        <FutureMatch gameInTurn={1} events={events} />
        <FutureMatch gameInTurn={2} events={events} />
      </div>

      <EventsList events={events} currentMonth={currentMonth} isCurrentWeek />
    </div>
  );
};
