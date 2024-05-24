import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../server/server.ts';
import { EventModel } from '../../models/event.ts';

export const eventsApi = createApi({
  reducerPath: 'eventsApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    createEvent: builder.mutation({
      query: (eventData) => ({
        url: 'events',
        method: 'POST',
        body: eventData,
      }),
    }),

    updateAttendanceStatus: builder.mutation({
      query: ({ eventId, playerId, status }) => ({
        url: `events/${eventId}/attendances/${playerId}`,
        method: 'PUT',
        body: { status },
      }),
    }),

    getEvent: builder.query<EventModel, number>({
      query: (eventId) => ({
        url: `events/${eventId}`,
      }),
    }),

    getTeamEvents: builder.query<EventModel[], number>({
      query: (teamId) => ({
        url: `events/team/${teamId}`,
      }),
    }),
  }),
});

export const {
  useCreateEventMutation,
  useUpdateAttendanceStatusMutation,
  useGetEventQuery,
  useGetTeamEventsQuery,
} = eventsApi;
