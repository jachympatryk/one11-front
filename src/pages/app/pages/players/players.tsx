import { PlayersButtons } from '../../components/players-buttons/players-buttons.tsx';
import { PlayersList } from '../../components/players-list/players-list.tsx';
import styles from './players.module.scss';
import { useDetails } from '../../details.context.tsx';
import { useEffect } from 'react';
export const Players = () => {
  const { setPlayersFiltered } = useDetails();

  useEffect(() => {
    setPlayersFiltered('');
  }, []);

  return (
    <div className={styles.container}>
      <PlayersButtons />
      <PlayersList />
    </div>
  );
};
