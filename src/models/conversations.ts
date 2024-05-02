import { MessageModel } from './messages.ts';

export interface ConversationModel {
  id: number;
  created_at: Date;
  name: string;
  teamId: number;
  messages: MessageModel[];
}
