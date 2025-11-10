/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from '@/redux/baseApi';
import type { ITrackParcel, TResponse } from '@/types/parcel';


export const parcelApi = baseApi.injectEndpoints({
  endpoints: builder => ({
      addParcel: builder.mutation({
      query: parcelInfo => ({
        url: '/parcels/create',
        method: 'POST',
        data: parcelInfo,
      }),
      invalidatesTags: ['parcel'],
    }),
    
    allParcels: builder.query({
      query: params => ({
        url: '/parcels/all',
        method: 'GET',
        params: params,
      }),
      providesTags: ['parcel'],
    }),
    
    allInComingParcels: builder.query({
      query: params => ({
        url: '/parcels/incoming-parcel',
        method: 'GET',
        params: params,
      }),
      providesTags: ['parcel'],
    }),

   updateParcel: builder.mutation({
      query: ({ id, payload }: { id: string; payload: any }) => ({
        url: `/parcels/update-parcel/${id}`,
        method: 'PATCH',
        data: payload,
      }),
      invalidatesTags: ['parcel'],
    }),

     confirmDelivery: builder.mutation({
      query: id => ({
        url: `/parcels/confirm/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['parcel'],
    }),

    updateParcelStatus: builder.mutation({
      query: ({ id, payload }: { id: string; payload: any }) => ({
        url: `/parcels/parcel-status/${id}`,
        method: 'PATCH',
        data: payload,
      }),
      invalidatesTags: ['parcel'],
    }),

      getParcelByTrackingId: builder.query<TResponse<ITrackParcel>, string>({
      query: trackingId => ({
        url: `/parcels/track-parcel/${trackingId}`,
        method: 'GET',
      }),
    }),

      allDeliveryHistory: builder.query({
      query: params => ({
        url: '/parcels/delivery-history',
        method: 'GET',
        params: params,
      }),
      providesTags: ['parcel'],
    }),

       cancelParcel: builder.mutation({
      query: id => ({
        url: `/parcels/cancel/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['parcel'],
    }),

     deleteParcel: builder.mutation({
      query: id => ({
        url: `/parcels/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['parcel'],
    }),

    
    
  }),
});

export const {
  useAddParcelMutation,
  useAllParcelsQuery,
  useUpdateParcelStatusMutation,
  useGetParcelByTrackingIdQuery,
  useDeleteParcelMutation,
  useCancelParcelMutation,
  useUpdateParcelMutation,
  useAllInComingParcelsQuery,
  useConfirmDeliveryMutation,
  useAllDeliveryHistoryQuery,
 
} = parcelApi;
