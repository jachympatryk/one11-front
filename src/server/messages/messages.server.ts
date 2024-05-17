import { fetchFromBackend } from '../server.ts';
import { MessageModel } from '../../models/messages.ts';

export const getMessagesByConversationId = async (
  conversationId: number
): Promise<MessageModel[] | null> => {
  console.log('conversationId:', conversationId);
  try {
    const response = await fetchFromBackend<MessageModel[]>(
      `messages/${conversationId}`,
      {
        method: 'GET',
      }
    );
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
): Promise<MessageModel | null> => {
  console.log('Adding message to conversationId:', conversationId);
  try {
    const payload = userIsPlayer
      ? { conversationId, content, playerId: authorId }
      : { conversationId, content, functionaryId: authorId };

    const response = await fetchFromBackend<MessageModel>('messages', {
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
