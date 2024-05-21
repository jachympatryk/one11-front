import { useParams } from 'react-router-dom';
import { useDetails } from '../../details.context.tsx';
import { useState } from 'react';
import styles from './event.module.scss';
import { mapEventName } from '../../../../utils/mapEventName.ts';
import { format } from 'date-fns';
import { getEvent } from '../../../../server/event/event.server.ts';
import { mapAttendanceStatus } from '../../../../utils/mapAttendanceStatus.ts';
import { AttendanceStatus } from '../../../../models/event.ts';
import { pl } from 'date-fns/locale';
import { MdAdd, MdAddLocation } from 'react-icons/md';
import { AttendanceButtons } from '../../components/attendance-buttons/attendance-buttons.tsx';
import { LineupOverview } from '../../components/lineup-overview/lineup-overview.tsx';
import { useQuery } from 'react-query';

interface AttendanceMap {
  [playerId: number]: AttendanceStatus;
}

export const Event = () => {
  const { eventId } = useParams();
  const { players } = useDetails();

  const [isAttendanceListOpen, setIsAttendanceListOpen] =
    useState<boolean>(false);

  const eventNumber = parseInt(String(eventId as unknown as number));

  const { data: event, isSuccess } = useQuery(
    ['user', eventNumber],
    () => getEvent(eventNumber),
    { enabled: !!eventNumber }
  );

  if (!isSuccess && !event) return <p>asd</p>;

  const attendanceMap: AttendanceMap = event.attendances.reduce<AttendanceMap>(
    (acc, curr) => {
      acc[curr.playerId] = curr.status;
      return acc;
    },
    {} as AttendanceMap
  );

  const handleLocation = () => {
    window.open(event.location?.map_pin, '_blank');
  };

  const formatDayName = (dateString: Date) =>
    format(dateString, 'EEEE', { locale: pl });

  const formatDate = (dateString: Date) => format(dateString, 'dd-MM-yyyy');

  const formatTime = (dateString: Date) => format(dateString, 'HH:mm');

  const eventStartDate = formatDate(event.start_time);
  const eventStartTime = formatTime(event.start_time);
  const eventStartDay = formatDayName(event.start_time);

  const handleAttendanceList = () => {
    setIsAttendanceListOpen((prevState) => !prevState);
  };

  const isMatchEvent = event.event_type === 'MATCH';

  return (
    <div className={styles.container}>
      <button onClick={handleAttendanceList} className={styles.floatingButton}>
        <MdAdd />
      </button>

      {isAttendanceListOpen && (
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
      )}

      {!isAttendanceListOpen && (
        <>
          <div className={styles.eventDetails}>
            <div>
              <h3>{mapEventName(event.event_type).toUpperCase()}</h3>
              <p>
                {eventStartDate} <span>{eventStartDay.toUpperCase()}</span>
              </p>
            </div>
            <p className={styles.time}>{eventStartTime}</p>
            {isMatchEvent && (
              <div className={styles.matchDetails}>
                <div className={styles.logo}></div>
                <p>Ks Nowa Jastrząbka-Żukowice</p>
              </div>
            )}
            <button onClick={handleLocation}>
              <MdAddLocation className={styles.icon} />
              <p>{event.location.name}</p>
            </button>
          </div>

          <AttendanceButtons event={event} />

          {event.description_before && (
            <div className={styles.eventDescription}>
              <h2>{isMatchEvent ? <p>Mowa motywacyjna</p> : <p>Opis</p>}</h2>
              <p>{event.description_before}</p>
            </div>
          )}

          {event.description_after && (
            <div className={styles.eventDescription}>
              <h2>Podsumowanie</h2>
              <p>{event.description_after}</p>
            </div>
          )}

          {isMatchEvent && event.lineup && (
            <div className={styles.lineup}>
              <h2>Skład</h2>
              <LineupOverview lineup={event.lineup} />
            </div>
          )}
        </>
      )}
    </div>
  );
};
