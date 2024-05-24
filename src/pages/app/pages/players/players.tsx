import { PlayersButtons } from '../../components/players-buttons/players-buttons.tsx';
import { PlayersList } from '../../components/players-list/players-list.tsx';
import styles from './players.module.scss';
import { useUser } from '../../../../hooks/userUser.ts';
import { useGetTeamPlayersQuery } from '../../../../services/team/teamApi.ts';

export const Players = () => {
  const { selectedFunctionary } = useUser();

  const { data: players } = useGetTeamPlayersQuery(
    selectedFunctionary?.teamId as number,
    {
      skip: !selectedFunctionary?.teamId,
    }
  );

  if (!players) return <div>No players found.</div>;

  return (
    <div className={styles.container}>
      <PlayersButtons players={players} />
      <PlayersList players={players} />
    </div>
  );
};
