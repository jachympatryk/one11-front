import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../server/server.ts';
import { FunctionaryModel } from '../../models/functionary.ts';
import { PlayerModel } from '../../models/player.ts';
import { UserModel } from '../../models/user.ts';

export interface UserFunctionaryResponse {
  userId: number;
  functionaryId: number;
  functionary: FunctionaryModel;
}

export interface UserPlayerResponse {
  userId: number;
  playerId: number;
  player: PlayerModel;
}

export interface UserResponse {
  id: number;
  auth_id: string;
  email: string;
  name?: string;
  surname?: string;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getUserFunctionaries: builder.query<UserFunctionaryResponse[], number>({
      query: (id) => ({ url: `users/${id}/functionaries` }),
    }),
    getUserPlayers: builder.query<UserPlayerResponse[], number>({
      query: (id) => ({ url: `users/${id}/players` }),
    }),
    getUserById: builder.query<UserResponse, string>({
      query: (id) => ({ url: `users/by-auth-id/${id}` }),
    }),
    loginUser: builder.mutation<
      { access_token: string; user: UserModel },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const {
  useGetUserFunctionariesQuery,
  useGetUserPlayersQuery,
  useGetUserByIdQuery,
  useLoginUserMutation,
} = userApi;
