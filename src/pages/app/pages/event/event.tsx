import { useParams } from 'react-router-dom';
import { useDetails } from '../../details.context.tsx';
import { useEffect, useState } from 'react'; // Dodajemy useEffect i useState
import styles from './event.module.scss';
import { mapEventName } from '../../../../utils/mapEventName.ts';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { useMutation, useQueryClient } from 'react-query';
import {
  getEvent,
  updateAttendance,
} from '../../../../server/event/event.server.ts';
import { mapAttendanceStatus } from '../../../../utils/mapAttendanceStatus.ts';
import { useApp } from '../../app.context.tsx';
import { AttendanceStatus, EventModel } from '../../../../models/event.ts';

export const Event = () => {
  const { userSelectedFunctionality } = useApp();
  const { players, userIsPlayer } = useDetails();
  const { eventId } = useParams();
  const queryClient = useQueryClient();

  const [eventData, setEventData] = useState<EventModel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  // TODO: update to use mutation

  const eventNumber = parseInt(String(eventId as unknown as number));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEvent(eventNumber);
        setEventData(data);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    };

    if (eventId) {
      fetchData().then();
    }
  }, [eventId]);

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
        queryClient.invalidateQueries(['event', eventId?.toString()]).then();
        refetch().then();
      },
    }
  );

  const refetch = async () => {
    try {
      const data = await getEvent(eventNumber);
      setEventData(data);
    } catch (error) {
      setIsError(true);
    }
  };

  const changeAttendanceStatus = (newStatus: AttendanceStatus) => {
    mutation.mutate({
      eventId: eventNumber,
      playerId: userSelectedFunctionality?.id || 0,
      status: newStatus,
    });
  };

  if (isLoading) return <div>Ładowanie...</div>;
  if (isError || !eventData) return <div>Błąd ładowania danych eventu.</div>;

  const eventStart = format(
    new Date(eventData.start_time),
    'yyyy-MM-dd HH:mm',
    { locale: pl }
  );

  const eventEnd = eventData.end_time
    ? format(new Date(eventData.end_time), 'yyyy-MM-dd HH:mm', { locale: pl })
    : 'n/d';

  interface AttendanceMap {
    [playerId: number]: AttendanceStatus;
  }

  const attendanceMap: AttendanceMap =
    eventData.attendances.reduce<AttendanceMap>((acc, curr) => {
      acc[curr.playerId] = curr.status;
      return acc;
    }, {} as AttendanceMap);

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
            Twój status:{' '}
            {mapAttendanceStatus(currentPlayerAttendance?.status as string)}
          </p>
          <button onClick={() => changeAttendanceStatus('CONFIRMED')}>
            Potwierdź
          </button>
          <button onClick={() => changeAttendanceStatus('ABSENT')}>
            Nieobecny
          </button>
          <button onClick={() => changeAttendanceStatus('LATE')}>
            Spóźniony
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