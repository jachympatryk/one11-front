import { baseQuery } from '../../server/server.ts';
import { createApi } from '@reduxjs/toolkit/query/react';

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getMessagesByConversationId: builder.query({
      query: (conversationId) => ({
        url: `messages/${conversationId}`,
      }),
    }),
    sendMessage: builder.mutation({
      query: ({
        conversationId,
        content,
        functionaryId = null,
        playerId = null,
      }) => ({
        url: 'messages',
        method: 'POST',
        body: {
          conversationId,
          content,
          functionaryId,
          playerId,
        },
      }),
    }),
  }),
});

export const { useGetMessagesByConversationIdQuery, useSendMessageMutation } =
  messagesApi;
