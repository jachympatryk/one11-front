import { useParams } from 'react-router-dom';
import { useDetails } from '../../details.context.tsx';
import { useEffect, useState } from 'react'; // Dodajemy useEffect i useState
import styles from './event.module.scss';
import { mapEventName } from '../../../../utils/mapEventName.ts';
import { format } from 'date-fns';
import { useMutation, useQueryClient } from 'react-query';
import {
  getEvent,
  updateAttendance,
} from '../../../../server/event/event.server.ts';
import { mapAttendanceStatus } from '../../../../utils/mapAttendanceStatus.ts';
import { useApp } from '../../app.context.tsx';
import { AttendanceStatus, EventModel } from '../../../../models/event.ts';
import { pl } from 'date-fns/locale'; // Import lokalizacji polskiej
import { MdAddLocation } from 'react-icons/md';
import { AttendanceButtons } from '../../components/attendance-buttons/attendance-buttons.tsx';

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

  const handleLocation = () => {
    window.open(eventData.location?.map_pin, '_blank');
  };

  const formatDayName = (dateString: Date) =>
    format(dateString, 'EEEE', { locale: pl });

  const formatDate = (dateString: Date) => format(dateString, 'dd-MM-yyyy');

  const formatTime = (dateString: Date) => format(dateString, 'HH:mm');

  const eventStartDate = formatDate(eventData.start_time);
  const eventStartTime = formatTime(eventData.start_time);
  const eventStartDay = formatDayName(eventData.start_time);

  return (
    <div className={styles.container}>
      <div className={styles.eventDetails}>
        <div>
          <h3>{mapEventName(eventData.event_type).toUpperCase()}</h3>
          <p>
            {eventStartDate} <span>{eventStartDay.toUpperCase()}</span>
          </p>
        </div>
        <p className={styles.time}>{eventStartTime}</p>
        <button onClick={handleLocation}>
          <MdAddLocation className={styles.icon} />
          <p>{eventData.location.name}</p>
        </button>
      </div>

      <AttendanceButtons event={eventData} />

      {eventData.description_before && (
        <div className={styles.eventDescription}>
          <h2>Opis przed</h2>
          <p>{eventData.description_before}</p>
        </div>
      )}

      {eventData.description_after && (
        <div className={styles.eventDescription}>
          <h2>Opis po</h2>
          <p>{eventData.description_after}</p>
        </div>
      )}

      <div className={styles.eventDescription}>
        <h2>Opis Prywatny</h2>
        <p>{eventData.description_after}</p>
      </div>

      <div className={styles.attendanceWrapper}>
        <h2>Lista Obecności</h2>
        <div className={styles.attendanceList}>
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
    </div>
  );
};
