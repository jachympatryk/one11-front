import { Calendar as CalendarComponent } from '../../components/calendar/calendar.tsx';
import { useDetails } from '../../details.context.tsx';
import { EventsList } from '../../components/events-list/events-list.tsx';
import { useApp } from '../../app.context.tsx';
import styles from './calendar.module.scss';
export const Calendar = () => {
    const { isDataLoading } = useApp();
    const { eventsLoading } = useDetails();

    const isLoaded = !isDataLoading && !eventsLoading;

    return (
        <div className={styles.container}>
            {!isLoaded && <p>Ładowanie</p>}
            {isLoaded && <CalendarComponent />}
            {isLoaded && <EventsList />}
        </div>
    );
};
