import { useMutation, useQueryClient } from 'react-query';
import { updateAttendance } from '../../../../server/event/event.server.ts';
import { Link } from 'react-router-dom';
import { mapEventName } from '../../../../utils/mapEventName.ts';
import { format } from 'date-fns';
import { EventModel } from '../../../../models/event.ts';
import styles from './event-card.module.scss';
import { pl } from 'date-fns/locale';
import { useDetails } from '../../details.context.tsx';
import { useApp } from '../../app.context.tsx';

export const EventCard = ({ event }: { event: EventModel }) => {
  const queryClient = useQueryClient();
  const { userIsPlayer } = useDetails();
  const { userSelectedFunctionality } = useApp();

  const mutation = useMutation(
    ({ eventId, playerId, status }) =>
      updateAttendance(eventId, playerId, status),
    {
      onSuccess: () => {
        // Tutaj możemy zaktualizować cache lub ponownie załadować dane
        queryClient.invalidateQueries(['event', event.id.toString()]).then();
      },
    }
  );

  const changeAttendanceStatus = (newStatus) => {
    console.log(newStatus);
    mutation.mutate({
      eventId: event.id,
      playerId: userSelectedFunctionality?.id || 0,
      status: newStatus,
    });
  };

  return (
    <div className={styles.container}>
      <Link
        to={`/app/event/${event.id}`}
        datatype={event.event_type}
        className={styles.event}
      >
        <p>{mapEventName(event.event_type)}</p>
      </Link>
      <div>
        <p>{format(event.start_time, 'yyyy-MM-dd HH:mm', { locale: pl })}</p>
      </div>
      {userIsPlayer && (
        <div>
          <button onClick={() => changeAttendanceStatus('CONFIRMED')}>
            Potwierdź
          </button>
          <button onClick={() => changeAttendanceStatus('ABSENT')}>
            Nieobecny
          </button>
          <button onClick={() => changeAttendanceStatus('EXCUSED')}>
            Usprawiedliwiony
          </button>
        </div>
      )}
    </div>
  );
};
