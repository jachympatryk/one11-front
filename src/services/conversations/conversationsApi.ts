import { baseQuery } from '../../server/server.ts';
import { createApi } from '@reduxjs/toolkit/query/react';

export const conversationsApi = createApi({
  reducerPath: 'conversationsApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getTeamConversations: builder.query({
      query: (teamId) => ({
        url: `conversations/${teamId}`,
      }),
    }),
  }),
});

export const { useGetTeamConversationsQuery } = conversationsApi;
