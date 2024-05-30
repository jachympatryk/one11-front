import { Calendar as CalendarComponent } from '../../components/calendar/calendar.tsx';
import { EventsList } from '../../components/events-list/events-list.tsx';
import styles from './calendar.module.scss';
import { useState } from 'react';
import { Loader } from '../../components/loader/loader.tsx';
import { useTeamEvents } from '../../../../hooks/useEvents.ts';

export const Calendar = () => {
  const { events, isEventsSuccess, isEventsLoading, isEventsError } =
    useTeamEvents();

  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  if (isEventsLoading) return <Loader />;
  if (isEventsError)
    return <div className={styles.container}>Wystąpił błąd</div>;
  if (!isEventsSuccess || !events)
    return <div className={styles.container}>Brak danych</div>;

  return (
    <div className={styles.container}>
      <CalendarComponent
        events={events}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
      />

      <EventsList
        events={events}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
      />
    </div>
  );
};
