import { baseApi } from '@/redux/baseApi';

export const statsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getParcelsStats: builder.query({
      query: () => ({
        url: '/stats/parcel-stat',
        method: 'GET',
      }),
    }),
    
   
  }),
});

export const {
  useGetParcelsStatsQuery,
  
} = statsApi;