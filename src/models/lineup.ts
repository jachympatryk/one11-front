// lineup.ts
import { PlayerModel } from './player.ts';

export interface LineupPlayerModel {
  id: number;
  playerPosition: string;
  playerId: number;
  lineupId: number;
  player?: PlayerModel; // Opcjonalne, w zależności od potrzeb może zawierać pełne dane zawodnika
}

export interface TeamLineupModel {
  id: number;
  name: string;
  formationName: string;
  created_at: Date;
  teamId: number;
  players: LineupPlayerModel[];
}

export interface TeamLineupRequest {
  name: string;

  formationName: string;
  players: Array<{
    id: number; // ID zawodnika
    positionId: string; // Pozycja zawodnika w składzie
  }>;
}
