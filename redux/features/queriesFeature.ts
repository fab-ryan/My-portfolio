import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { QueryResponse,QueriesResponse } from '@/types';
import { authToken, baseUrl } from '@/utils';

export const queriesApi = createApi({
  reducerPath: 'queriesApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Queries'],
  endpoints: (builder) => ({
    getQueries: builder.query<QueriesResponse, null>({
      query: () => ({
        url: '/queries',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken()}`,
        },
      }),
      providesTags: ['Queries'],
    }),
    getQuery: builder.query<QueryResponse, { id: string }>({
      query: ({ id }) => ({
        url: `/queries/${id}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken()}`,
        },
      }),
      providesTags: ['Queries'],
    }),
    createQuery: builder.mutation<
      QueryResponse,
      { body: { message: string; name: string; email: string } }
    >({
      query: ({ body }) => ({
        url: '/queries',
        method: 'POST',
        body,
        headers: {
          Authorization: `Bearer ${authToken()}`,
        },
      }),
      invalidatesTags: ['Queries'],
    }),

    deleteQuery: builder.mutation<QueryResponse, { id: string }>({
      query: ({ id }) => ({
        url: `/queries/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authToken()}`,
        },
      }),
      invalidatesTags: ['Queries'],
    }),
  }),
});

export const {
  useGetQueriesQuery,
  useGetQueryQuery,
  useCreateQueryMutation,
  useDeleteQueryMutation,
} = queriesApi;
