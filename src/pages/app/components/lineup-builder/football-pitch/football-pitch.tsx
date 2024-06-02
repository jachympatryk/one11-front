import React, { useState } from 'react';
import styles from './football-pitch.module.scss';
import { PlayerModel } from '../../../../../models/player.ts';
import { useNavigate } from 'react-router-dom';
import { TeamLineupRequest } from '../../../../../models/lineup.ts';
import { useUser } from '../../../../../hooks/userUser.ts';
import { useCreateLineupMutation } from '../../../../../services/lineups/lineupsApi.ts';
import { useGetTeamPlayersQuery } from '../../../../../services/team/teamApi.ts';

export interface PlayerPosition {
  id: number;
  positionId: string;
}

export const FootballPitch = () => {
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

  const handleSaveLineup = () => {
    const lineupData: TeamLineupRequest = {
      name: lineupName,
      formationName: formationName,
      players: currentLineup,
    };

    console.log('lineupData', lineupData);

    createLineup({ lineupData, teamId: selectedFunctionary?.teamId as number })
      .unwrap()
      .then((res) => {
        console.log('Zapisano skład', res);
        navigate(`/app/lineup/${res.id}`);
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

    const isPositionOccupied = currentLineup.some(
      (p) => p.positionId === positionId && p.id !== numericPlayerId
    );

    if (isPositionOccupied) {
      return;
    }

    const isPlayerAlreadyOnPitch = currentLineup.some(
      (p) => p.id === numericPlayerId
    );

    if (isPlayerAlreadyOnPitch) {
      const updatedLineup = currentLineup.map((p) =>
        p.id === numericPlayerId ? { ...p, positionId: positionId } : p
      );
      setCurrentLineup(updatedLineup);
    } else {
      const newLineup = currentLineup.filter(
        (p) => p.positionId !== positionId
      );
      newLineup.push({ id: numericPlayerId, positionId });
      setCurrentLineup(newLineup);
    }
  };

  const findPlayerForPosition = (positionId: string) => {
    const playerOnPosition = currentLineup.find(
      (p) => p.positionId === positionId
    );

    if (!playerOnPosition) return undefined;

    return players?.find((player) => player.id === playerOnPosition.id);
  };

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
                {
                  players?.find(
                    (player) =>
                      player.id ===
                      currentLineup.find((p) => p.positionId === id)!.id
                  )?.surname
                }
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

      <div className={styles.bench}>BENCH</div>

      <div className={styles.playerList}>
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
        {players?.map((player) => (
          <div
            key={player.id}
            draggable
            className={styles.player}
            onDragStart={(e) => handleDragStart(e, player)}
          >
            {player.name} {player.surname} ({player.position})
          </div>
        ))}
      </div>
    </div>
  );
};
