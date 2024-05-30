import { PlayersList } from '../../components/players-list/players-list.tsx';
import styles from './players.module.scss';
import { useTeamPlayers } from '../../../../hooks/usePlayers.ts';
import { Loader } from '../../components/loader/loader.tsx';

export const Players = () => {
  const { players, playersLoading, playersSuccess, playersError } =
    useTeamPlayers();

  if (playersLoading) return <Loader />;
  if (playersError)
    return <div className={styles.container}>Wystąpił błąd</div>;
  if (!playersSuccess || !players)
    return <div className={styles.container}>Brak wydarzeń</div>;

  return (
    <div className={styles.container}>
      <PlayersList players={players} />
    </div>
  );
};
