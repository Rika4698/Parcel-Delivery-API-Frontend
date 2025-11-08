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
    
   
  }),
});

export const {
  useGetAllUsersQuery,
  useUpdateUserMutation,
  
} = userApis;
