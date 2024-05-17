import { fetchFromBackend } from '../server.ts';
import { TeamDetailsResponse } from '../../models/team.ts';
import { TeamLineupModel, TeamLineupRequest } from '../../models/lineup.ts';

// Funkcja do pobierania szczegółów zespołu
export const getTeamDetails = async (
  teamId: number
): Promise<TeamDetailsResponse | null> => {
  try {
    return await fetchFromBackend<TeamDetailsResponse>(`teams/${teamId}`, {
      method: 'GET',
    });
  } catch (error) {
    console.error('Failed to fetch team details:', error);
    return null;
  }
};

// Funkcja do pobierania wszystkich składów zespołu
export const getTeamLineups = async (
  teamId: number
): Promise<TeamLineupModel[] | null> => {
  try {
    return await fetchFromBackend<TeamLineupModel[]>(
      `teams/${teamId}/lineups`,
      {
        method: 'GET',
      }
    );
  } catch (error) {
    console.error('Failed to fetch team lineups:', error);
    return null;
  }
};

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

// Funkcja do pobierania jednego składu zespołu na podstawie ID składu
export const getTeamLineupById = async (
  teamId: number,
  lineupId: number
): Promise<TeamLineupModel | null> => {
  console.log(`teams/${teamId}/lineups/${lineupId}`);
  try {
    return await fetchFromBackend<TeamLineupModel>(
      `teams/${teamId}/lineups/${lineupId}`, // Zmodyfikowany URL do uwzględnienia ID składu
      {
        method: 'GET',
      }
    );
  } catch (error) {
    console.error('Failed to fetch team lineup by ID:', error);
    return null;
  }
};
