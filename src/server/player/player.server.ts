import { fetchFromBackend } from '../server.ts'; // Zakładam, że obsługuje również metody POST

export interface PlayerModel {
  id?: number;
  name: string;
  surname: string;
  date_of_birth: Date;
  number: number;
  active?: boolean;
  created_at?: Date;
  teamId?: number;
  clubId?: number;
}

export const createPlayer = async (
  playerData: PlayerModel
): Promise<PlayerModel | null> => {
  try {
    const response = await fetchFromBackend<PlayerModel>('players/', {
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
