import { useState, useMemo } from 'react';
import styles from './players-list.module.scss';
import { mapPositionName } from '../../../../utils/mapPositionName.ts';
import { PlayerModel, PlayerPosition } from '../../../../models/player.ts';

export const PlayersList = ({ players }: { players: PlayerModel[] }) => {
  const [playersFiltered] = useState<PlayerPosition | ''>('');

  const playersByPosition = useMemo(() => {
    const grouping = {} as { [key in PlayerPosition]?: typeof players };
    players?.forEach((player) => {
      const { position } = player;
      if (!grouping[position]) {
        grouping[position] = [];
      }
      grouping[position]?.push(player);
    });
    return grouping;
  }, [players]);

  const positionOrder: { [key in PlayerPosition]: number } = {
    GOALKEEPER: 1,
    DEFENDER: 2,
    MIDFIELDER: 3,
    STRIKER: 4,
  };

  const sortedPositions = useMemo(() => {
    const filteredPositions =
      playersFiltered !== ''
        ? [playersFiltered]
        : (Object.keys(playersByPosition) as PlayerPosition[]);
    return filteredPositions.sort(
      (a, b) => positionOrder[a] - positionOrder[b]
    );
  }, [playersByPosition, playersFiltered]);

  return (
    <div className={styles.container}>
      {sortedPositions.map((position) => (
        <div key={position} className={styles.positionGroup}>
          <div className={styles.positionWrapper}>
            <p>{mapPositionName(position, true)}</p>
            <div className={styles.underline} />
          </div>
          <ul className={styles.playersList}>
            {playersByPosition[position]?.map((player) => (
              <li key={player.id} className={styles.player}>
                <div className={styles.playerNumber}>{player.number}</div>
                <p>
                  {player.name} {player.surname}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
