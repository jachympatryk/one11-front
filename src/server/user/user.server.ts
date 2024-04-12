import { fetchFromBackend } from '../server.ts';
import { FunctionaryModel as Functionary } from '../../models/functionary.ts';
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
    return await fetchFromBackend<any>('users/sync', {
        method: 'POST',
        body: payload,
    });
};

interface UserFunctionaryResponse {
    userId: number;
    functionaryId: number;
    functionary: Functionary;
}

export const fetchUserFunctionary = async (userId: number) => {
    return await fetchFromBackend<UserFunctionaryResponse[]>(
        `users/${userId}/functionaries`
    );
};

interface UserPlayerResponse {
    userId: number;
    playerId: number;
    functionary?: Functionary;
    player?: PlayerModel;
}

export const fetchUserPlayers = async (userId: number) => {
    return await fetchFromBackend<UserPlayerResponse[]>(
        `users/${userId}/players`
    );
};
