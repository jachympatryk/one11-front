import { Calendar as CalendarComponent } from '../../components/calendar/calendar.tsx';
import { EventsList } from '../../components/events-list/events-list.tsx';
import styles from './calendar.module.scss';
import { useState } from 'react';

export const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  return (
    <div className={styles.container}>
      <CalendarComponent
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
      />
      <EventsList
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
      />
    </div>
  );
};
