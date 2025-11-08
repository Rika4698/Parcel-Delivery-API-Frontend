/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from '@/redux/baseApi';

export const userApis = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllUsers: builder.query({
      query: params => ({
        url: '/user/all-users',
        method: 'GET',
        params: params,
      }),
      providesTags: ['all-users'],
    }),
    
 updateUser: builder.mutation({
      query: ({ id, payload }: { id: string; payload: any }) => ({
        url: `/user/${id}`,
        method: 'PATCH',
        data: payload,
      }),
      invalidatesTags: ['all-users'],
    }),
        updatePublicUser: builder.mutation({
          query: ({ id, payload }: { id: string; payload: any }) => ({
            url: `/user/update-profile/${id}`,
            method: 'PATCH',
            data: payload,
          }),
          invalidatesTags: ['user'],
        }),
     
    
   
  }),
});

export const {
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useUpdatePublicUserMutation
  
} = userApis;
