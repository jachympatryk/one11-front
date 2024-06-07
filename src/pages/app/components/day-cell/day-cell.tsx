import { useNavigate } from 'react-router-dom';
import { format, isSameDay, isSameMonth } from 'date-fns';
import styles from './day-cell.module.scss';
import { useEffect, useState } from 'react';
import { EventModel } from '../../../../models/event.ts';

export const DayCell = ({
  day,
  events,
  currentDate,
}: {
  day: Date;
  events: EventModel[];
  currentDate: Date;
}) => {
  const [isEventDay, setIsEventDay] = useState(events.length > 0);
  const navigate = useNavigate();

  const handleClick = () => {
    if (isEventDay && events.length > 0) {
      navigate(`/app/event/${events[0].id}`);
    }
  };

  const isToday = isSameDay(day, new Date());
  const isCurrentMonth = isSameMonth(day, currentDate);

  useEffect(() => {
    setIsEventDay(events.length > 0);
  }, [events]);

  return (
    <div
      onClick={handleClick}
      className={`${styles.container} ${!isCurrentMonth ? styles.outsideMonth : ''} ${isToday ? styles.isToday : ''}  ${isEventDay ? styles.eventDayContainer : styles.emptyCell} `}
    >
      <p>{format(day, 'd')}</p>
      {isEventDay && (
        <div className={styles.cellWrapper}>
          {events.map((event) => (
            <div
              className={styles.cell}
              data-type={event.event_type}
              key={event.id}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};
