import { fetchFromBackend } from '../server.ts';
import { TeamDetailsResponse } from '../../models/team.ts';

export const getTeamDetails = async (
  teamId: number
): Promise<TeamDetailsResponse | null> => {
  try {
    return await fetchFromBackend<TeamDetailsResponse>(`teams/${teamId}`);
  } catch (error) {
    console.error('Failed to fetch team details:', error);
    return null;
  }
};
