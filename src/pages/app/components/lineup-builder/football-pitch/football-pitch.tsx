import React, { useState } from 'react';
import styles from './football-pitch.module.scss';
import { useDetails } from '../../../details.context.tsx';
import { PlayerModel } from '../../../../../models/player.ts';
import { createTeamLineup } from '../../../../../server/team/team.server.ts';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../../app.context.tsx';
import {
  TeamLineupModel,
  TeamLineupRequest,
} from '../../../../../models/lineup.ts';

export interface PlayerPosition {
  id: number;
  positionId: string;
}

export interface ApiError {
  message: string;
}

export const FootballPitch = () => {
  const navigate = useNavigate();

  const { userSelectedFunctionality } = useApp();
  const { players } = useDetails();

  const [currentLineup, setCurrentLineup] = useState<PlayerPosition[]>([]);
  const [lineupName, setLineupName] = useState('');
  const [formationName, setFormationName] = useState('');

  const { mutate: saveLineup, isLoading } = useMutation<
    TeamLineupModel | null,
    ApiError,
    TeamLineupRequest
  >(
    (lineupData) =>
      createTeamLineup(userSelectedFunctionality?.teamId || 0, lineupData),
    {
      onSuccess: (res) => {
        console.log('Zapisano skład', res);
        if (res) {
          navigate(`/app/lineup/${res.id}`);
        }
      },
      onError: (error) => {
        alert(
          `Błąd przy zapisywaniu składu: ${error.message || 'Nieznany błąd'}`
        );
      },
    }
  );

  const handleSaveLineup = () => {
    const lineupData: TeamLineupRequest = {
      // Użyj typu TeamLineupRequest
      name: lineupName,
      formationName: formationName,
      players: currentLineup,
    };
    saveLineup(lineupData);
  };

  const gridPositions = Array.from(
    { length: 70 },
    (_, index) => `pos-${index + 1}`
  );

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    player: PlayerModel
  ) => {
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
                  handleDragStart(
                    e,
                    players.find(
                      (player) =>
                        player.id ===
                        currentLineup.find((p) => p.positionId === id)!.id
                    )!
                  )
                }
                className={styles.playerOnPitch}
              >
                {
                  players.find(
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
        {players.map((player) => (
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
