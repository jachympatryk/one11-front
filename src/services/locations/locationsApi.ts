import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../server/server.ts';

export interface LocationModel {
  id: number;
  name: string;
  address: string;
  clubId: number;
}

export const locationsApi = createApi({
  reducerPath: 'locationsApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getLocationsByClubId: builder.query<LocationModel[], number>({
      query: (clubId) => ({
        url: 'locations',
        params: { clubId },
      }),
    }),
  }),
});

export const { useGetLocationsByClubIdQuery } = locationsApi;
