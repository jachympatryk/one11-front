import { useParams } from 'react-router-dom';
import { useDetails } from '../../details.context.tsx';
import styles from './event.module.scss';
import { mapEventName } from '../../../../utils/mapEventName.ts';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  getEvent,
  updateAttendance,
} from '../../../../server/event/event.server.ts';
import { mapAttendanceStatus } from '../../../../utils/mapAttendanceStatus.ts';
import { useApp } from '../../app.context.tsx';

export const Event = () => {
  const { userSelectedFunctionality } = useApp();
  const { players, userIsPlayer } = useDetails();
  const { eventId } = useParams();

  const {
    data: eventData,
    isLoading,
    isError,
    refetch,
  } = useQuery(['event', eventId], () => getEvent(parseInt(eventId) || 0), {
    enabled: !!eventId,
  });

  if (isLoading) return <div>Ładowanie...</div>;
  if (isError || !eventData) return <div>Błąd ładowania danych eventu.</div>;

  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ eventId, playerId, status }) =>
      updateAttendance(eventId, playerId, status),
    {
      onSuccess: () => {
        // Tutaj możemy zaktualizować cache lub ponownie załadować dane
        queryClient.invalidateQueries(['event', eventId.toString()]).then();
        refetch().then();
      },
    }
  );

  const changeAttendanceStatus = (newStatus) => {
    console.log(newStatus);
    mutation.mutate({
      eventId: parseInt(eventId) || 0,
      playerId: userSelectedFunctionality?.id || 0,
      status: newStatus,
    });
  };

  const eventStart = format(
    new Date(eventData.start_time),
    'yyyy-MM-dd HH:mm',
    { locale: pl }
  );
  const eventEnd = eventData.end_time
    ? format(new Date(eventData.end_time), 'yyyy-MM-dd HH:mm', { locale: pl })
    : 'n/d';

  const attendanceMap = eventData.attendances.reduce((acc, curr) => {
    acc[curr.playerId] = curr.status;
    return acc;
  }, {});

  let currentPlayerAttendance = null;

  if (userIsPlayer) {
    currentPlayerAttendance = eventData.attendances.find(
      (attendance) =>
        attendance.playerId ===
        players.find((player) => player.id === userSelectedFunctionality?.id)
          ?.id
    );
  }

  console.log('attendanceMap');
  console.log(currentPlayerAttendance);

  return (
    <div className={styles.container}>
      <div className={styles.eventDetails}>
        <h3>{mapEventName(eventData.event_type)}</h3>
        <div>
          <p>{eventStart}</p> - <p>{eventEnd}</p>
        </div>
      </div>

      {userIsPlayer && (
        <div>
          <p>
            Twój status: {mapAttendanceStatus(currentPlayerAttendance?.status)}
          </p>
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

      <div className={styles.eventDescription}>
        <h2>Opis przed</h2>
        <p>{eventData.description_before}</p>
        <h2>Opis po</h2>
        <p>{eventData.description_after}</p>
      </div>

      <div className={styles.attendanceList}>
        <h2>Lista Obecności</h2>
        {players.map((player) => (
          <div key={player.id} className={styles.player}>
            <p>
              {player.name} {player.surname}
            </p>
            <p>Status: {mapAttendanceStatus(attendanceMap[player.id])}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
