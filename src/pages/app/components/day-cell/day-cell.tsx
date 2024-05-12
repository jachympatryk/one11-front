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
  const [, setIsEventDay] = useState(false);

  useEffect(() => {
    if (events && events.length > 0) {
      setIsEventDay(true);
    }
  }, []);

  return (
    <div className={styles.container}>
      <p>{format(day, 'd')}</p>
      <div className={styles.cellWrapper}>
        {events &&
          events?.map((event) => (
            <div
              className={styles.cell}
              datatype={event.event_type} // Zmienione z 'datatype' na 'data-type'
              key={event.id}
            ></div>
          ))}
      </div>
    </div>
  );
};
