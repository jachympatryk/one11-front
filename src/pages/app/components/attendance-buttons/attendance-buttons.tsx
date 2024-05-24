import { AttendanceStatus, EventModel } from '../../../../models/event';
import styles from './attendance-buttons.module.scss';
import { mapAttendanceStatus } from '../../../../utils/mapAttendanceStatus';
import { useUser } from '../../../../hooks/userUser';
import { useUpdateAttendanceStatusMutation } from '../../../../services/events/eventApi.ts';

export const AttendanceButtons = ({
  event,
  refetchEventData,
}: {
  event: EventModel;
  refetchEventData?: () => void;
}) => {
  const { selectedFunctionary, isUserPlayer } = useUser();
  const [updateAttendanceStatus] = useUpdateAttendanceStatusMutation();

  if (!event.attendances || event.attendances.length === 0) {
    return null;
  }

  const currentUserAttendance = event.attendances.find(
    (attendance) => attendance.playerId === selectedFunctionary?.id
  );

  const currentUserStatus = currentUserAttendance
    ? currentUserAttendance.status
    : 'Nieznany';

  const isButtonDisabled = (status: AttendanceStatus) =>
    status === currentUserStatus;

  const changeAttendanceStatus = (newStatus: AttendanceStatus) => {
    updateAttendanceStatus({
      eventId: event.id,
      playerId: selectedFunctionary?.id || 0,
      status: newStatus,
    });
    refetchEventData?.();
  };

  if (!isUserPlayer || !currentUserAttendance) return null;

  return (
    <div className={styles.container}>
      <p className={styles.userStatus}>
        Twój status:{' '}
        <span data-type={currentUserStatus}>
          {mapAttendanceStatus(currentUserStatus)}
        </span>
      </p>
      <div className={styles.buttonsWrapper}>
        {['CONFIRMED', 'ABSENT', 'LATE'].map((status) => (
          <button
            key={status}
            className={styles.button}
            data-type={status}
            disabled={isButtonDisabled(status as AttendanceStatus)}
            onClick={() => changeAttendanceStatus(status as AttendanceStatus)}
          >
            {mapAttendanceStatus(status)}
          </button>
        ))}
      </div>
    </div>
  );
};
