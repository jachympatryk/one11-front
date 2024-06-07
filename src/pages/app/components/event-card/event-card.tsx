import { Link } from 'react-router-dom';
import { mapEventName } from '../../../../utils/mapEventName.ts';
import { format } from 'date-fns';
import { EventModel } from '../../../../models/event.ts';
import styles from './event-card.module.scss';
import { MdAddLocation } from 'react-icons/md';

export const EventCard = ({ event }: { event: EventModel }) => {
  const formatTime = (dateString: Date) => format(dateString, 'HH:mm');

  const eventStartTime = formatTime(event?.start_time);

  return (
    <div className={styles.container}>
      <Link
        to={`/app/event/${event.id}`}
        data-type={event.event_type}
        className={styles.event}
      >
        <p className={styles.eventName}>{mapEventName(event.event_type)}</p>
        <p className={styles.eventTime}>{eventStartTime}</p>
      </Link>

      <div className={styles.details}>
        {event.location && (
          <div className={styles.location}>
            <MdAddLocation />
            <p>{event.location.name}</p>
          </div>
        )}
      </div>
    </div>
  );
};
