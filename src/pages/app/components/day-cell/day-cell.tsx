import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import styles from './day-cell.module.scss';
import { useEffect, useState } from 'react';
import { EventModel } from '../../../../models/event.ts';

export const DayCell = ({
  day,
  events,
}: {
  day: Date;
  events: EventModel[];
}) => {
  const [isEventDay, setIsEventDay] = useState(false);
  const navigate = useNavigate(); // Używamy useNavigate zamiast useHistory

  const handleClick = () => {
    if (isEventDay && events.length > 0) {
      // Przenosi do strony pierwszego wydarzenia; możesz zmienić logikę wyboru wydarzenia
      navigate(`/app/event/${events[0].id}`);
    }
  };

  useEffect(() => {
    setIsEventDay(events.length > 0);
  }, [events]);

  return (
    <div onClick={handleClick} className={styles.container}>
      <p>{format(day, 'd')}</p>
      <div className={styles.cellWrapper}>
        {events.map((event) => (
          <div
            className={styles.cell}
            data-type={event.event_type} // Prawidłowe użycie atrybutu 'data-type'
            key={event.id}
          ></div>
        ))}
      </div>
    </div>
  );
};
