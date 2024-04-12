import { EventModel } from '../../../../models/event.ts';
import styles from './event-card.module.scss';
import { format, parseISO } from 'date-fns';
import { pl } from 'date-fns/locale';
import { mapEventName } from '../../../../utils/mapEventName.ts';

export const EventCard = ({ event }: { event: EventModel }) => {
    return (
        <li key={event.id} className={styles.container}>
            <div datatype={event.event_type} className={styles.event}>
                <p>{mapEventName(event.event_type)}</p>
            </div>

            <div>
                <p>
                    {format(parseISO(event.start_time), 'yyyy-MM-dd HH:mm', {
                        locale: pl,
                    })}{' '}
                </p>
            </div>
        </li>
    );
};
