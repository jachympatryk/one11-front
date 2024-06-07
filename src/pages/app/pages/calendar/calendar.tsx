import { Calendar as CalendarComponent } from '../../components/calendar/calendar.tsx';
import { EventsList } from '../../components/events-list/events-list.tsx';
import styles from './calendar.module.scss';
import { Loader } from '../../components/loader/loader.tsx';
import { useTeamEvents } from '../../../../hooks/useEvents.ts';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate i useLocation z React Router v6

export const Calendar = () => {
  const { events, isEventsSuccess, isEventsLoading, isEventsError } =
    useTeamEvents();
  const navigate = useNavigate(); // użycie useNavigate
  const location = useLocation(); // użycie useLocation

  const setCurrentDateInParams = (date: Date) => {
    const searchParams = new URLSearchParams(location.search);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');

    const monthYear = `${year}-${month}`;
    searchParams.set('currentDate', monthYear);
    navigate({ search: searchParams.toString() }, { replace: true });
  };

  const getCurrentDateFromParams = () => {
    const searchParams = new URLSearchParams(location.search);
    const monthYear = searchParams.get('currentDate');
    if (monthYear) {
      const [year, month] = monthYear.split('-');

      return new Date(Number(year), Number(month) - 1, 1);
    }
    return new Date();
  };

  const currentDate = getCurrentDateFromParams();

  if (isEventsLoading) return <Loader />;
  if (isEventsError)
    return <div className={styles.container}>Wystąpił błąd</div>;
  if (!isEventsSuccess || !events)
    return <div className={styles.container}>Brak danych</div>;

  return (
    <div className={styles.container}>
      <CalendarComponent
        events={events}
        currentDate={currentDate}
        setCurrentDateInParams={setCurrentDateInParams} // Poprawka: setCurrentMonth
      />
      <EventsList events={events} currentMonth={currentDate} />
    </div>
  );
};
