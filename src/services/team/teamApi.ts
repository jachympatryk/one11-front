import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../server/server.ts';
import { TeamDetailsResponse } from '../../models/team.ts';
import { PlayerModel } from '../../models/player.ts';
import { TeamLineupModel } from '../../models/lineup.ts';

export const teamApi = createApi({
  reducerPath: 'teamApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getTeam: builder.query<TeamDetailsResponse, number>({
      query: (teamId) => ({
        url: `teams/${teamId}`,
      }),
    }),

    getTeamPlayers: builder.query<PlayerModel[], number>({
      query: (teamId) => ({
        url: `teams/${teamId}/players`,
      }),
    }),

    getTeamLineups: builder.query<TeamLineupModel[], number>({
      query: (teamId) => ({
        url: `teams/${teamId}/lineups`,
      }),
    }),
  }),
});

export const {
  useGetTeamQuery,
  useGetTeamPlayersQuery,
  useGetTeamLineupsQuery,
} = teamApi;
