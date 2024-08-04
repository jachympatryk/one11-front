import { useParams } from 'react-router-dom';
import { useState } from 'react';
import styles from './event.module.scss';
import { mapEventName } from '../../../../utils/mapEventName.ts';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { MdAddLocation } from 'react-icons/md';
import { RiFileListLine } from 'react-icons/ri';
import { AttendanceList } from '../../components/attendance-list/attendance-list.tsx';
import { LineupOverview } from '../../components/lineup-overview/lineup-overview.tsx';
import { Loader } from '../../components/loader/loader.tsx';
import { useEvent } from '../../../../hooks/useEvents.ts';
import { useTeamPlayers } from '../../../../hooks/usePlayers.ts';

export const Event = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const eventNumber = eventId ? parseInt(eventId, 10) : 0;

  const { event, isEventLoading, isEventSuccess, refetchEvent } =
    useEvent(eventNumber);
  const { playersSuccess, players, playersLoading } = useTeamPlayers();

  const [isAttendanceListOpen, setIsAttendanceListOpen] = useState(false);

  if (isEventLoading || playersLoading) return <Loader />;
  if (!event || !players || !playersSuccess || !isEventSuccess)
    return <div className={styles.container}>Brak danych</div>;

  const handleLocation = () => {
    if (event.location?.map_pin) {
      window.open(event.location.map_pin, '_blank');
    }
  };

  const formatDayName = (date: Date) => format(date, 'EEEE', { locale: pl });
  const formatDate = (date: Date) => format(date, 'dd-MM-yyyy');
  const formatTime = (date: Date) => format(date, 'HH:mm');

  const eventStartDate = formatDate(new Date(event.start_time));
  const eventStartTime = formatTime(new Date(event.start_time));
  const eventStartDay = formatDayName(new Date(event.start_time));

  const handleAttendanceList = () => {
    setIsAttendanceListOpen((prevState) => !prevState);
  };

  const isMatchEvent = event.event_type === 'MATCH';
  const showDetails = event?.own_transport || event?.collection_time;

  return (
    <div className={styles.container}>
      <button onClick={handleAttendanceList} className={styles.floatingButton}>
        <RiFileListLine />
      </button>

      {isAttendanceListOpen && (
        <AttendanceList
          event={event}
          players={players}
          refetchEventData={refetchEvent}
        />
      )}

      {!isAttendanceListOpen && (
        <>
          {event?.name && <h3>{event.name}</h3>}

          <div className={styles.eventDetails}>
            <div>
              <h3>{mapEventName(event?.event_type).toUpperCase()}</h3>
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
            {event.location && (
              <button onClick={handleLocation}>
                <MdAddLocation className={styles.icon} />
                <p>{event?.location?.name}</p>
              </button>
            )}
          </div>

          {event?.description_before && (
            <div className={styles.eventDescription}>
              <h2>{isMatchEvent ? <p>Mowa motywacyjna</p> : <p>Opis</p>}</h2>
              <p>{event.description_before}</p>
            </div>
          )}

          {event?.description_after && (
            <div className={styles.eventDescription}>
              <h2>Podsumowanie</h2>
              <p>{event.description_after}</p>
            </div>
          )}

          {event?.lineup && (
            <div className={styles.lineup}>
              <h2>Skład</h2>
              <LineupOverview lineup={event.lineup} players={players} />
            </div>
          )}

          {showDetails && (
            <div className={styles.details}>
              {event?.collection_time && (
                <div className={styles.collectionTime}>
                  <h2>Godzina zbiórki</h2>
                  <p>{formatTime(new Date(event.collection_time))}</p>
                </div>
              )}

              {event?.own_transport && (
                <div className={styles.ownTransport}>
                  <h2>Transport</h2>
                  <p>Własny</p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
