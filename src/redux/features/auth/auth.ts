/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from '@/redux/baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

      register: builder.mutation({
      query: userInfo => ({
        url: '/user/register',
        method: 'POST',
        data: userInfo,
      }),
    }),
    login: builder.mutation({
      query: userInfo => ({
        url: '/auth/login',
        method: 'POST',
        data: userInfo,
      }),
      invalidatesTags: ['user'],
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['user'],
    }),
    userInfo: builder.query({
      query: () => ({
        url: '/auth/get-me',
        method: 'GET',
      }),
      providesTags: ['user'],
    }),
    updateProfile: builder.mutation({
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
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useUserInfoQuery,
  useUpdateProfileMutation,
 

} = authApi;
