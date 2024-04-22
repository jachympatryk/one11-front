import { EventModel } from './event.ts';
import { FunctionaryModel } from './functionary.ts';
import { PlayerModel } from './player.ts';
import { TableModel } from './table.ts';

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
