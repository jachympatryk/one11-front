import styles from './players-buttons.module.scss';
import { PlayerModel } from '../../../../models/player.ts';

type PlayerPosition = 'GOALKEEPER' | 'DEFENDER' | 'MIDFIELDER' | 'STRIKER';

interface PositionOption {
  id: PlayerPosition | '';
  name: string;
}

export const PlayersButtons = ({ players }: { players: PlayerModel[] }) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const isActive = (filter: PlayerPosition | '') =>
  //   playersFiltered === filter ? styles.activeButton : '';

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
      {/*<ModalComponent*/}
      {/*  isOpen={isModalOpen}*/}
      {/*  onClose={() => {*/}
      {/*    setIsModalOpen(false);*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <AddPlayerForm closeModal={() => setIsModalOpen(false)} />*/}
      {/*</ModalComponent>*/}
      <div className={styles.filters}>
        {positions.map(({ id, name }) => (
          <button
            key={id}
            // onClick={() => setPlayersFiltered(id)}
            // className={`${styles.button} ${isActive(id)}`}
            disabled={!anyPlayers || !hasPlayers(id)}
          >
            {name}
          </button>
        ))}
      </div>
      {/*{!userIsPlayer && (*/}
      {/*  <button*/}
      {/*    onClick={() => {*/}
      {/*      setIsModalOpen(true);*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    dodaj nowe*/}
      {/*  </button>*/}
      {/*)}*/}
    </div>
  );
};
