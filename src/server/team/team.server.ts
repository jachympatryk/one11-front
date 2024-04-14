import { fetchFromBackend } from '../server.ts';
import { EventModel } from '../../models/event.ts';
import { FunctionaryModel } from '../../models/functionary.ts';
import { PlayerModel } from '../../models/player.ts';
import { TableModel } from '../../models/table.ts';

export interface TeamDetailsResponse {
  clubId: null;
  created_at: Date;
  events: EventModel[];
  functionaries: FunctionaryModel[];
  id: number;
  players: PlayerModel[];
  scrapeUrl: string;
  table: TableModel[];
  team_name: string;
}

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
