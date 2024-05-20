import { format, compareAsc } from 'date-fns';
import { useDetails } from '../../details.context.tsx';
import styles from './future-match.module.scss';
import { pl } from 'date-fns/locale';
import { Link } from 'react-router-dom';
import { AttendanceButtons } from '../attendance-buttons/attendance-buttons.tsx';

export const FutureMatch = ({ gameInTurn }: { gameInTurn: number }) => {
  const { events } = useDetails();

  const getNthMatchEvent = () => {
    const matchEvents = events.filter((event) => event.event_type === 'MATCH');

    matchEvents.sort((a, b) => compareAsc(a.start_time, b.start_time));

    return matchEvents[gameInTurn - 1];
  };

  const formatDayName = (dateString: Date) =>
    format(dateString, 'EEEE', { locale: pl });

  // Execute the filtering function
  const nthMatchEvent = getNthMatchEvent();

  const eventStartDay = formatDayName(nthMatchEvent.start_time);

  return (
    <Link to={`/app/event/${nthMatchEvent.id}`} className={styles.container}>
      {gameInTurn === 1 && <p className={styles.gameInTurn}>Następny mecz</p>}
      {gameInTurn >= 1 && gameInTurn !== 1 && (
        <p className={styles.gameInTurn}>{gameInTurn} mecz</p>
      )}

      {nthMatchEvent ? (
        <div>
          <p>{eventStartDay}</p>
          <p>vs Real Madryt</p>
          <p>Madryt</p>
          <AttendanceButtons event={nthMatchEvent} />
        </div>
      ) : (
        <p>No match event found for the specified turn.</p>
      )}
    </Link>
  );
};
