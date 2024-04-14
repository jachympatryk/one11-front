import { Calendar as CalendarComponent } from '../../components/calendar/calendar.tsx';
import { EventsList } from '../../components/events-list/events-list.tsx';
import styles from './calendar.module.scss';

export const Calendar = () => {
  return (
    <div className={styles.container}>
      <CalendarComponent />
      <EventsList />
    </div>
  );
};
