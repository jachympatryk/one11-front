import { fetchFromBackend } from '../server.ts';
import { FunctionaryModel as Functionary } from '../../models/functionary.ts';

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
    functionary: Functionary;
}

export const fetchUserPlayers = async (userId: number) => {
    return await fetchFromBackend<UserPlayerResponse[]>(
        `users/${userId}/players`
    );
};
