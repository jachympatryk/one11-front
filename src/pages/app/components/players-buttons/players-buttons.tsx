import styles from './players-buttons.module.scss';
import { useDetails } from '../../details.context.tsx';
import { PlayerPosition } from '../../../../models/player.ts';

export const PlayersButtons = () => {
  const { players, playersFiltered, setPlayersFiltered } = useDetails();

  const isActive = (filter: string) =>
    playersFiltered === filter ? styles.activeButton : '';

  const hasPlayers = (position: number) =>
    players.some((player) => player.position === position);

  const anyPlayers = players.length > 0;

  const positions = [
    { id: '', name: 'Wszyscy' },
    { id: 'GOALKEEPER', name: 'Bramkarze' },
    { id: 'DEFENDER', name: 'Obrońcy' },
    { id: 'MIDFIELDER', name: 'Pomocnicy' },
    { id: 'STRIKER', name: 'Napastnicy' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        {positions.map(({ id, name }) => (
          <button
            key={id}
            onClick={() => setPlayersFiltered(id)}
            className={`${styles.button} ${isActive(id)}`}
            disabled={!anyPlayers || (id && !hasPlayers(id))}
          >
            {name}
          </button>
        ))}
      </div>
      <div>Admin buttons</div>
    </div>
  );
};
