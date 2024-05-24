import styles from './dashboard.module.scss';
import { EventsList } from '../../components/events-list/events-list.tsx';
import { useState } from 'react';
import { FutureMatch } from '../../components/future-match/future-match.tsx';
import { useGetTeamEventsQuery } from '../../../../services/events/eventApi.ts';
import { useUser } from '../../../../hooks/userUser.ts';
import { Loader } from '../../components/loader/loader.tsx';

export const Dashboard = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const { selectedFunctionary } = useUser();

  const {
    data: events,
    isSuccess,
    isError,
    isLoading,
  } = useGetTeamEventsQuery(selectedFunctionary?.teamId as number, {
    skip: !selectedFunctionary?.teamId,
  });

  if (isLoading) return <Loader />;
  if (isError) return <div className={styles.container}>Wystąpił błąd</div>;
  if (!isSuccess || !events)
    return <div className={styles.container}>Brak wydarzeń</div>;

  return (
    <div className={styles.container}>
      <div className={styles.futureMatchWrapper}>
        <FutureMatch gameInTurn={1} events={events} />
        <FutureMatch gameInTurn={2} events={events} />
      </div>

      <EventsList
        events={events}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        isCurrentWeek
      />
    </div>
  );
};
