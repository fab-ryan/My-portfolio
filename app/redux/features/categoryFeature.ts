import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CategoryResponses, CategoryPayload } from '@/types';
import { baseUrl } from '@/utils';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Categories'],
  endpoints: (builder) => ({
    getCategories: builder.query<
      CategoryResponses,
      {
        status?: boolean;
      }
    >({
      query: (status) => ({
        url: `/categories${status ? `?status=${status}` : ''}`,

        method: 'GET',
      }),
      providesTags: ['Categories'],
    }),
    getCategory: builder.query<
      CategoryResponses,
      {
        id: string;
      }
    >({
      query: (query) => ({
        url: `/categories/${query.id}`,
        method: 'GET',
      }),
      providesTags: ['Categories'],
    }),
    createCategory: builder.mutation<CategoryResponses, CategoryPayload>({
      query: (body) => ({
        url: '/categories',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Categories'],
    }),
    updateCategory: builder.mutation<
      CategoryResponses,
      { id: string; body: CategoryPayload }
    >({
      query: (body) => ({
        url: `/categories/${body.id}`,
        method: 'PATCH',
        body: body.body,
      }),
      invalidatesTags: ['Categories'],
    }),
    deleteCategory: builder.mutation<CategoryResponses, string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Categories'],
    }),
  }),
});

export const { useGetCategoriesQuery, useGetCategoryQuery } = categoryApi;
