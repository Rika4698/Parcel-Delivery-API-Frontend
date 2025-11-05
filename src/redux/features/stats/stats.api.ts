import { baseApi } from '@/redux/baseApi';

export const statsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getParcelsStats: builder.query({
      query: () => ({
        url: '/stats/parcel-stat',
        method: 'GET',
      }),
    }),

    getUserStats: builder.query({
      query: () => ({
        url: '/stats/user-stats',
        method: 'GET',
      }),
    }),
    
   
  }),
  
});

export const {
  useGetParcelsStatsQuery,
  useGetUserStatsQuery
  
} = statsApi;