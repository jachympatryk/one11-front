import styles from './attendance-list.module.scss';
import { mapAttendanceStatus } from '../../../../utils/mapAttendanceStatus';
import { AttendanceStatus, EventModel } from '../../../../models/event';
import { PlayerModel } from '../../../../models/player.ts';
import { AttendanceButtons } from '../attendance-buttons/attendance-buttons.tsx';

interface AttendanceMap {
  [playerId: number]: AttendanceStatus;
}

interface PlayersByStatus {
  [status: string]: PlayerModel[];
}

const STATUS_ORDER = ['CONFIRMED', 'LATE', 'PENDING', 'ABSENT'];

export const AttendanceList = ({
  event,
  players,
  refetchEventData,
}: {
  event: EventModel;
  players: PlayerModel[];
  refetchEventData: () => void;
}) => {
  const attendanceMap: AttendanceMap = event.attendances.reduce<AttendanceMap>(
    (acc, curr) => {
      acc[curr.playerId] = curr.status;
      return acc;
    },
    {} as AttendanceMap
  );

  const groupPlayersByStatus = (): PlayersByStatus => {
    return players.reduce<PlayersByStatus>((acc, player) => {
      const status = attendanceMap[player.id];
      if (!acc[status]) {
        acc[status] = [];
      }
      acc[status].push(player);
      return acc;
    }, {});
  };

  const playersByStatus = groupPlayersByStatus();

  return (
    <div className={styles.attendanceWrapper}>
      <h2>Lista Obecności</h2>
      <AttendanceButtons event={event} refetchEventData={refetchEventData} />

      {STATUS_ORDER.map((status) =>
        playersByStatus[status] && playersByStatus[status].length > 0 ? (
          <div key={status} className={styles.statusSection}>
            <h3>{mapAttendanceStatus(status)}</h3>
            <div className={styles.playersWrapper}>
              {playersByStatus[status].map((player) => (
                <div key={player.id} className={styles.player}>
                  <p>
                    {player.name} {player.surname}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : null
      )}
    </div>
  );
};
