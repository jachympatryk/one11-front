import { useMutation } from 'react-query';
import { AttendanceStatus, EventModel } from '../../../../models/event.ts';
import { updateAttendance } from '../../../../server/event/event.server.ts';
import { useApp } from '../../app.context.tsx';
import styles from './attendance-buttons.module.scss';
import { mapAttendanceStatus } from '../../../../utils/mapAttendanceStatus.ts';
import { useDetails } from '../../details.context.tsx';

export const AttendanceButtons = ({
  event,
  refetch,
}: {
  event: EventModel;
  refetch?: () => void;
}) => {
  const { userSelectedFunctionality } = useApp();
  const { isUserPlayer } = useDetails();

  // Sprawdzenie, czy są jakieś dane obecności
  if (!event.attendances || event.attendances.length === 0) {
    return null; // Jeśli nie ma danych obecności, nic nie renderujemy
  }

  const currentUserAttendance = event.attendances.find(
    (attendance) => attendance.playerId === userSelectedFunctionality?.id
  );

  const currentUserStatus = currentUserAttendance
    ? currentUserAttendance.status
    : 'Nieznany';

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
        if (refetch) {
          refetch();
        }
      },
    }
  );

  const changeAttendanceStatus = (newStatus: AttendanceStatus) => {
    console.log(newStatus); // Logowanie dla celów debugowania
    mutation.mutate({
      eventId: event.id,
      playerId: userSelectedFunctionality?.id || 0,
      status: newStatus,
    });
  };

  if (!isUserPlayer || !currentUserAttendance) return null; // Jeśli użytkownik nie jest graczem lub nie ma przypisanego statusu, nie pokazujemy przycisków

  const isButtonDisabled = (status: AttendanceStatus) =>
    status === currentUserStatus;

  return (
    <div className={styles.container}>
      <p className={styles.userStatus}>
        Twój status: <span>{mapAttendanceStatus(currentUserStatus)}</span>
      </p>
      <div className={styles.buttonsWrapper}>
        <button
          className={styles.button}
          disabled={isButtonDisabled('CONFIRMED')}
          data-type={'CONFIRMED'}
          onClick={() => changeAttendanceStatus('CONFIRMED')}
        >
          Potwierdź
        </button>
        <button
          className={styles.button}
          disabled={isButtonDisabled('ABSENT')}
          data-type={'ABSENT'}
          onClick={() => changeAttendanceStatus('ABSENT')}
        >
          Nieobecny
        </button>
        <button
          className={styles.button}
          disabled={isButtonDisabled('LATE')}
          data-type={'LATE'}
          onClick={() => changeAttendanceStatus('LATE')}
        >
          Spóźniony
        </button>
      </div>
    </div>
  );
};
