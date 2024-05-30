import { useGetTeamPlayersQuery } from '../services/team/teamApi.ts';
import { useUser } from './userUser.ts';

export const useTeamPlayers = () => {
  const { selectedFunctionary } = useUser();

  const teamId = selectedFunctionary?.teamId as number;

  const {
    data: players,
    isLoading: playersLoading,
    isSuccess: playersSuccess,
    isError: playersError,
  } = useGetTeamPlayersQuery(teamId, {
    skip: !teamId,
  });

  return {
    players,
    playersLoading,
    playersSuccess,
    playersError,
  };
};
