import { Calendar as CalendarComponent } from '../../components/calendar/calendar.tsx';
import { EventsList } from '../../components/events-list/events-list.tsx';
import styles from './calendar.module.scss';
import { useState } from 'react';
import { useGetTeamEventsQuery } from '../../../../services/events/eventApi.ts';
import { useUser } from '../../../../hooks/userUser.ts';
import { Loader } from '../../components/loader/loader.tsx';

export const Calendar = () => {
  const { selectedFunctionary } = useUser();

  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const {
    data: events,
    isSuccess,
    isError,
    isLoading,
  } = useGetTeamEventsQuery(selectedFunctionary?.teamId || 0, {
    skip: !selectedFunctionary?.teamId,
  });

  if (isLoading) return <Loader />;
  if (isError) return <div className={styles.container}>Wystąpił błąd</div>;
  if (!isSuccess || !events)
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
