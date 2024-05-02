import { PlayerModel } from './player.ts';
import { FunctionaryModel } from './functionary.ts';

export interface MessageModel {
  id: number;
  content: string;
  created_at: Date;
  conversationId: number;
  player?: PlayerModel;
  functionary?: FunctionaryModel;
  playerId?: number;
  functionaryId?: number;
}
