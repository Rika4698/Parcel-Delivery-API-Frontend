import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './axiosQuery';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['user', 'parcel', 'all-users', 'contact'],
  endpoints: () => ({}),
});
