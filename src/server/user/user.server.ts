import { fetchFromBackend } from '../server.ts';

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
