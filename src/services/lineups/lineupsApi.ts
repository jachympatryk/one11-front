import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../server/server.ts';
import { TeamDetailsResponse } from '../../models/team.ts';
import { TeamLineupModel, TeamLineupRequest } from '../../models/lineup.ts';

export const lineupsApi = createApi({
  reducerPath: 'lineupsApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getLineups: builder.query<TeamLineupModel, number>({
      query: (lineupsId) => ({
        url: `lineups/${lineupsId}`,
      }),
    }),

    createLineup: builder.mutation<
      TeamDetailsResponse,
      { lineupData: TeamLineupRequest; teamId: number }
    >({
      query: ({ lineupData, teamId }) => ({
        url: `lineups/${teamId}`,
        method: 'POST',
        body: lineupData,
      }),
    }),
  }),
});

export const { useGetLineupsQuery, useCreateLineupMutation } = lineupsApi;
