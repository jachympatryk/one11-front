import { fetchFromBackend } from '../server.ts';

export const getTeamDetails = async (teamId: string) => {
    return await fetchFromBackend(`teams/${teamId}`);
};
