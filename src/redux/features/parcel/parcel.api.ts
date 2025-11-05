/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from '@/redux/baseApi';


export const parcelApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    
    allParcels: builder.query({
      query: params => ({
        url: '/parcels/all',
        method: 'GET',
        params: params,
      }),
      providesTags: ['parcel'],
    }),
    
    updateParcelStatus: builder.mutation({
      query: ({ id, payload }: { id: string; payload: any }) => ({
        url: `/parcels/parcel-status/${id}`,
        method: 'PATCH',
        data: payload,
      }),
      invalidatesTags: ['parcel'],
    }),
     deleteParcel: builder.mutation({
      query: id => ({
        url: `/parcels/delete/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['parcel'],
    }),
    
  }),
});

export const {
  
  useAllParcelsQuery,
  useUpdateParcelStatusMutation,
  useDeleteParcelMutation,
 
} = parcelApi;
