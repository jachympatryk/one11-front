import { useDetails } from '../../details.context.tsx';
import styles from './players-buttons.module.scss';
import { ModalComponent } from '../../../../components/modal/modal.tsx';
import { useState } from 'react';
import { AddPlayerForm } from '../../form/add-player/add-player.tsx';

type PlayerPosition = 'GOALKEEPER' | 'DEFENDER' | 'MIDFIELDER' | 'STRIKER';

interface PositionOption {
  id: PlayerPosition | '';
  name: string;
}

export const PlayersButtons = () => {
  const { players, playersFiltered, setPlayersFiltered, userIsPlayer } =
    useDetails();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const isActive = (filter: PlayerPosition | '') =>
    playersFiltered === filter ? styles.activeButton : '';

  const hasPlayers = (position: PlayerPosition | '') =>
    position === ''
      ? true
      : players.some((player) => player.position === position);

  const anyPlayers = players.length > 0;

  const positions: PositionOption[] = [
    { id: '', name: 'Wszyscy' },
    { id: 'GOALKEEPER', name: 'Bramkarze' },
    { id: 'DEFENDER', name: 'Obrońcy' },
    { id: 'MIDFIELDER', name: 'Pomocnicy' },
    { id: 'STRIKER', name: 'Napastnicy' },
  ];

  return (
    <div className={styles.container}>
      <ModalComponent
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <AddPlayerForm closeModal={() => setIsModalOpen(false)} />
      </ModalComponent>
      <div className={styles.filters}>
        {positions.map(({ id, name }) => (
          <button
            key={id}
            onClick={() => setPlayersFiltered(id)}
            className={`${styles.button} ${isActive(id)}`}
            disabled={!anyPlayers || !hasPlayers(id)}
          >
            {name}
          </button>
        ))}
      </div>
      {!userIsPlayer && (
        <button
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          dodaj nowe
        </button>
      )}
    </div>
  );
};
