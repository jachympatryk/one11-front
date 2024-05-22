import { useParams } from 'react-router-dom';
import { useState } from 'react';
import styles from './event.module.scss';
import { mapEventName } from '../../../../utils/mapEventName.ts';
import { format } from 'date-fns';
import { getEvent } from '../../../../server/event/event.server.ts';
import { pl } from 'date-fns/locale';
import { MdAddLocation } from 'react-icons/md';
import { LineupOverview } from '../../components/lineup-overview/lineup-overview.tsx';
import { useQuery } from 'react-query';
import { AttendanceList } from '../../components/attendance-list/attendance-list.tsx';
import { RiFileListLine } from 'react-icons/ri';

export const Event = () => {
  const { eventId } = useParams();

  const [isAttendanceListOpen, setIsAttendanceListOpen] =
    useState<boolean>(false);

  const eventNumber = parseInt(String(eventId as unknown as number));

  const {
    data: event,
    isSuccess,
    refetch,
  } = useQuery(['user', eventNumber], () => getEvent(eventNumber), {
    enabled: !!eventNumber,
  });

  if (!isSuccess && !event)
    return (
      <div className={styles.error}>
        <p>Ładowanie...</p>
      </div>
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
        <RiFileListLine />
      </button>

      {isAttendanceListOpen && (
        <AttendanceList event={event} refetch={refetch} />
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
