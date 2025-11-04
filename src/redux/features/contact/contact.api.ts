import { baseApi } from '@/redux/baseApi';

export const contactAPI = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllContacts: builder.query({
      query: params => ({
        url: '/contact',
        method: 'GET',
        params: params,
      }),
      providesTags: ['contact'],
    }),
    contact: builder.mutation({
      query: contactData => ({
        url: `/contact`,
        method: 'POST',
        data: contactData,
      }),
    }),
  }),
});

export const {
  useContactMutation,
  useGetAllContactsQuery,
} = contactAPI;
