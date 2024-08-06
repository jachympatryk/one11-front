import styles from './lineup-overview.module.scss';
import { TeamLineupModel } from '../../../../models/lineup.ts';
import { PlayerModel } from '../../../../models/player.ts';

export const LineupOverview = ({
  lineup,
  players,
}: {
  lineup: TeamLineupModel;
  players: PlayerModel[];
}) => {
  const gridPositions = Array.from(
    { length: 70 },
    (_, index) => `pos-${index + 1}`
  );

  const benchPlayers = lineup.players
    .filter((p) => p.playerPosition === 'pos-0')
    .map((benchPlayer) => {
      const playerDetails = players.find((p) => p.id === benchPlayer.playerId);
      return playerDetails ? { ...benchPlayer, ...playerDetails } : null;
    })
    .filter((p) => p !== null);

  if (players.length > 0 && lineup)
    return (
      <div className={styles.pitch}>
        <div className={styles.field}>
          {gridPositions.map((positionId) => {
            const playerInPosition = lineup.players.find(
              (p) => p.playerPosition === positionId
            );

            return (
              <div
                key={positionId}
                id={positionId}
                className={`${styles.gridPosition} ${playerInPosition ? styles.playerOnPitch : ''}`}
              >
                {playerInPosition ? (
                  <div className={styles.player}>
                    {
                      players.find((p) => p.id === playerInPosition.playerId)
                        ?.surname
                    }
                  </div>
                ) : null}
              </div>
            );
          })}

          <div className={styles.midline}></div>
          <div className={styles.centerCircle}></div>
          <div className={styles.centerSpot}></div>
          <div className={styles.goalAreaLeft}></div>
          <div className={styles.goalAreaRight}></div>
          <div className={styles.penaltyAreaLeft}></div>
          <div className={styles.penaltyAreaRight}></div>
        </div>

        {benchPlayers.length > 0 && (
          <div className={styles.bench}>
            <p>Ławka</p>
            {benchPlayers.map((player) => (
              <div key={player?.id} className={styles.benchPlayer}>
                {player?.surname}
              </div>
            ))}
          </div>
        )}
      </div>
    );

  return <div>Ładownie...</div>;
};
