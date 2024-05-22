import { PlayersButtons } from '../../components/players-buttons/players-buttons.tsx';
import { PlayersList } from '../../components/players-list/players-list.tsx';
import styles from './players.module.scss';

export const Players = () => {
  return (
    <div className={styles.container}>
      <PlayersButtons />
      <PlayersList />
    </div>
  );
};
