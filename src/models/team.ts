import { EventModel } from './event.ts';
import { FunctionaryModel } from './functionary.ts';
import { PlayerModel } from './player.ts';
import { MatchWeeksModel, TableModel } from './table.ts';
import { ClubModel } from './club.ts';

export interface TeamDetailsResponse {
  clubId: null;
  club: ClubModel;
  created_at: Date;
  events: EventModel[];
  functionaries: FunctionaryModel[];
  id: number;
  players: PlayerModel[];
  scrapeUrl: string;
  table: TableModel[];
  team_name: string;
  matchWeeks: MatchWeeksModel[];
}
