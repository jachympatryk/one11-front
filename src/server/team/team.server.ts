import { fetchFromBackend } from '../server.ts';
import { TeamLineupModel, TeamLineupRequest } from '../../models/lineup.ts';

// Funkcja do tworzenia nowego składu zespołu
export const createTeamLineup = async (
  teamId: number,
  lineupData: TeamLineupRequest
): Promise<TeamLineupModel | null> => {
  try {
    return await fetchFromBackend<TeamLineupModel>(`teams/${teamId}/lineups`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: lineupData,
    });
  } catch (error) {
    console.error('Failed to create team lineup:', error);
    return null;
  }
};
