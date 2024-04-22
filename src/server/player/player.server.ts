import { fetchFromBackend } from '../server.ts';
import { CreatePlayerModel } from '../../pages/app/form/add-player/add-player.tsx'; // Zakładam, że obsługuje również metody POST

export const createPlayer = async (
  playerData: CreatePlayerModel
): Promise<CreatePlayerModel | null> => {
  try {
    const response = await fetchFromBackend<CreatePlayerModel>('players/', {
      method: 'POST',
      body: playerData,
    });
    console.log('Player created successfully:', response);
    return response;
  } catch (error) {
    console.error('Failed to create player:', error);
    return null;
  }
};
