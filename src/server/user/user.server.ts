import { fetchFromBackend } from '../server.ts';
import { FunctionaryModel } from '../../models/functionary.ts';
import { PlayerModel } from '../../models/player.ts';

interface UserResponse {
  id: number;
  auth_id: string;
  email: string;
  name?: string;
  surname?: string;
}

export const fetchUserByAuthId = async (authId: string) => {
  return await fetchFromBackend<UserResponse>(`users/by-auth-id/${authId}`);
};

interface SyncUserPayload extends Record<string, unknown> {
  auth_id: string;
  email: string;
  name?: string;
  surname?: string;
}

export const syncUserWithBackend = async (payload: SyncUserPayload) => {
  console.log(payload);
  return await fetchFromBackend<never>('users/sync', {
    method: 'POST',
    body: payload,
  });
};

export interface UserFunctionaryResponse {
  userId: number;
  functionaryId: number;
  functionary: FunctionaryModel;
}

export const fetchUserFunctionary = async (userId: number) => {
  return await fetchFromBackend<UserFunctionaryResponse[]>(
    `users/${userId}/functionaries`
  );
};

export interface UserPlayerResponse {
  userId: number;
  playerId: number;
  player: PlayerModel;
}

export const fetchUserPlayers = async (userId: number) => {
  return await fetchFromBackend<UserPlayerResponse[]>(
    `users/${userId}/players`
  );
};
