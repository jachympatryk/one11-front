import { useMutation, useQueryClient } from 'react-query';
import { AttendanceStatus, EventModel } from '../../../../models/event.ts';
import { updateAttendance } from '../../../../server/event/event.server.ts';
import { useApp } from '../../app.context.tsx';
import styles from './attendance-buttons.module.scss';
import { useDetails } from '../../details.context.tsx';

export const AttendanceButtons = ({ event }: { event: EventModel }) => {
  const queryClient = useQueryClient();

  const { userIsPlayer } = useDetails();
  const { userSelectedFunctionality } = useApp();

  const mutation = useMutation(
    ({
      eventId,
      playerId,
      status,
    }: {
      eventId: number;
      playerId: number;
      status: AttendanceStatus;
    }) => updateAttendance(eventId, playerId, status),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['event', event.id.toString()]).then();
      },
    }
  );

  const changeAttendanceStatus = (newStatus: AttendanceStatus) => {
    console.log(newStatus);
    mutation.mutate({
      eventId: event.id,
      playerId: userSelectedFunctionality?.id || 0,
      status: newStatus,
    });
  };

  if (!userIsPlayer) return null;

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={() => changeAttendanceStatus('CONFIRMED')}
      >
        Potwierdź
      </button>
      <button
        className={styles.button}
        onClick={() => changeAttendanceStatus('ABSENT')}
      >
        Nieobecny
      </button>
      <button
        className={styles.button}
        onClick={() => changeAttendanceStatus('LATE')}
      >
        Spóźniony
      </button>
    </div>
  );
};
