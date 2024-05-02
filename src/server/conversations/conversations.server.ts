import { fetchFromBackend } from '../server.ts';
import { ConversationModel } from '../../models/conversations.ts';

export const getConversationsByTeam = async (
  teamId: number
): Promise<ConversationModel[] | null> => {
  try {
    const response = await fetchFromBackend<ConversationModel[]>(
      `conversations/${teamId}`,
      {
        method: 'GET',
      }
    );
    console.log('Conversations retrieved successfully:', response);
    return response;
  } catch (error) {
    console.error('Failed to retrieve conversations:', error);
    return null;
  }
};
