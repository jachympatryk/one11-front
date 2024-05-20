import styles from './dashboard.module.scss';
import { EventsList } from '../../components/events-list/events-list.tsx';
import { useState } from 'react';
import { FutureMatch } from '../../components/future-match/future-match.tsx';

export const Dashboard = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  return (
    <div className={styles.container}>
      <div className={styles.futureMatchWrapper}>
        <FutureMatch gameInTurn={1} />
        <FutureMatch gameInTurn={2} />
      </div>
      <EventsList
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        isCurrentWeek
      />
    </div>
  );
};
