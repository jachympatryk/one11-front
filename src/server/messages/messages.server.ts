import { fetchFromBackend } from '../server.ts';

export const getMessagesByConversationId = async (
  conversationId: number
): Promise<any[] | null> => {
  console.log('conversationId:', conversationId);
  try {
    const response = await fetchFromBackend<any>(`messages/${conversationId}`, {
      method: 'GET',
    });
    console.log('Messages retrieved successfully:', response);
    return response;
  } catch (error) {
    console.error('Failed to retrieve messages:', error);
    return null;
  }
};

export const addMessage = async (
  conversationId: number,
  content: string,
  userIsPlayer: boolean,
  authorId: number
): Promise<any> => {
  console.log('Adding message to conversationId:', conversationId);
  try {
    const payload: Record<string, any> = {
      conversationId,
      content,
    };

    if (userIsPlayer) {
      payload.playerId = authorId;
    } else {
      payload.functionaryId = authorId;
    }

    const response = await fetchFromBackend<any>('messages', {
      method: 'POST',
      body: payload,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Message added successfully:', response);
    return response;
  } catch (error) {
    console.error('Failed to add message:', error);
    return null;
  }
};
