import React, { useState } from 'react';
import styles from './football-pitch.module.scss';
import { PlayerModel } from '../../../../../models/player.ts';
import { useNavigate } from 'react-router-dom';
import { TeamLineupRequest } from '../../../../../models/lineup.ts';
import { useUser } from '../../../../../hooks/userUser.ts';
import { useCreateLineupMutation } from '../../../../../services/lineups/lineupsApi.ts';
import { useGetTeamPlayersQuery } from '../../../../../services/team/teamApi.ts';
import { mapPositionName } from '../../../../../utils/mapPositionName.ts';

export interface PlayerPosition {
  id: number;
  positionId: string;
}

export const FootballPitch = ({
  refetchLineups,
}: {
  refetchLineups: () => Promise<void>;
}) => {
  const navigate = useNavigate();

  const [createLineup, { isLoading }] = useCreateLineupMutation();

  const { selectedFunctionary } = useUser();

  const { data: players } = useGetTeamPlayersQuery(
    selectedFunctionary?.teamId as number,
    {
      skip: !selectedFunctionary?.teamId,
    }
  );

  const [currentLineup, setCurrentLineup] = useState<PlayerPosition[]>([]);
  const [lineupName, setLineupName] = useState('');
  const [formationName, setFormationName] = useState('');

  const handleSaveLineup = async () => {
    const lineupData: TeamLineupRequest = {
      name: lineupName,
      formationName: formationName,
      players: currentLineup,
    };

    console.log('lineupData', lineupData);

    await createLineup({
      lineupData,
      teamId: selectedFunctionary?.teamId as number,
    })
      .unwrap()
      .then(async (res) => {
        console.log('Zapisano skład', res);
        navigate(`/app/lineup/${res.id}`);
        await refetchLineups();
      })
      .catch((apiError) => {
        alert(
          `Błąd przy zapisywaniu składu: ${apiError.data?.message || 'Nieznany błąd'}`
        );
      });
  };

  const gridPositions = Array.from(
    { length: 70 },
    (_, index) => `pos-${index + 1}`
  );

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    player: PlayerModel | undefined | null
  ) => {
    if (!player || !player.id) {
      console.error('Player data is incomplete:', player);
      return;
    }

    e.dataTransfer.setData('playerId', player.id.toString());
  };

  console.log(currentLineup);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    positionId: string
  ) => {
    e.preventDefault();
    const playerId = e.dataTransfer.getData('playerId');
    const numericPlayerId = parseInt(playerId);

    if (positionId === 'pos-0') {
      const isAlreadyBench = currentLineup.some(
        (p) => p.id === numericPlayerId && p.positionId === 'pos-0'
      );

      if (!isAlreadyBench) {
        const newLineup = currentLineup.map((p) =>
          p.id === numericPlayerId ? { ...p, positionId: 'pos-0' } : p
        );
        const playerOnBench = newLineup.find((p) => p.id === numericPlayerId);
        if (!playerOnBench) {
          newLineup.push({ id: numericPlayerId, positionId: 'pos-0' });
        }
        setCurrentLineup(newLineup);
      }
      return;
    }

    const isPositionOccupied = currentLineup.some(
      (p) => p.positionId === positionId && p.id !== numericPlayerId
    );

    if (isPositionOccupied) {
      return;
    }

    const newLineup = currentLineup.filter((p) => p.id !== numericPlayerId);
    newLineup.push({ id: numericPlayerId, positionId });
    setCurrentLineup(newLineup);
  };

  const findPlayerForPosition = (positionId: string) => {
    const playerOnPosition = currentLineup.find(
      (p) => p.positionId === positionId
    );

    if (!playerOnPosition) return undefined;

    return players?.find((player) => player.id === playerOnPosition.id);
  };

  const availablePlayers = players?.filter(
    (player) => !currentLineup.some((p) => p.id === player.id)
  );

  return (
    <div className={styles.pitch}>
      <div className={styles.field}>
        {gridPositions.map((id, index) => (
          <div
            key={id}
            id={id}
            className={`${styles.gridPosition} ${
              index === 30 || index === 39 ? styles.goalkeeper : ''
            }`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, id)}
          >
            {currentLineup.find((p) => p.positionId === id) && (
              <div
                draggable
                onDragStart={(e) =>
                  handleDragStart(e, findPlayerForPosition(id))
                }
                className={styles.playerOnPitch}
              >
                <h2>
                  {
                    players?.find(
                      (player) =>
                        player.id ===
                        currentLineup.find((p) => p.positionId === id)!.id
                    )?.number
                  }
                </h2>
                <p>
                  {
                    players?.find(
                      (player) =>
                        player.id ===
                        currentLineup.find((p) => p.positionId === id)!.id
                    )?.surname
                  }
                </p>
              </div>
            )}
          </div>
        ))}

        <div className={styles.midline}></div>
        <div className={styles.centerCircle}></div>
        <div className={styles.centerSpot}></div>
        <div className={styles.goalAreaLeft}></div>
        <div className={styles.goalAreaRight}></div>
        <div className={styles.penaltyAreaLeft}></div>
        <div className={styles.penaltyAreaRight}></div>
      </div>

      <div
        className={styles.bench}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'pos-0')}
      >
        {currentLineup
          .filter((p) => p.positionId === 'pos-0')
          .map((player) => (
            <div
              key={player.id}
              className={styles.playerOnBench}
              draggable
              onDragStart={(e) =>
                handleDragStart(
                  e,
                  players?.find((p) => p.id === player.id)
                )
              }
            >
              <h2>{players?.find((p) => p.id === player.id)?.number}</h2>
              <p>{players?.find((p) => p.id === player.id)?.surname}</p>
            </div>
          ))}
      </div>

      <div className={styles.playerList}>
        <div className={styles.inputsWrapper}>
          <input
            value={lineupName}
            onChange={(e) => setLineupName(e.target.value)}
            placeholder="Nazwa składu"
            className={styles.input}
          />
          <input
            value={formationName}
            onChange={(e) => setFormationName(e.target.value)}
            placeholder="Nazwa formacji"
            className={styles.input}
          />
          <button
            onClick={handleSaveLineup}
            disabled={isLoading}
            className={styles.saveButton}
          >
            {isLoading ? 'Zapisywanie...' : 'Zapisz skład'}
          </button>
        </div>

        <div className={styles.playersWrapper}>
          {availablePlayers?.map((player) => (
            <div
              key={player.id}
              draggable
              className={styles.player}
              onDragStart={(e) => handleDragStart(e, player)}
            >
              <h2>{player.number}</h2>
              <p>
                {player.name} {player.surname}{' '}
                {mapPositionName(player.position)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
