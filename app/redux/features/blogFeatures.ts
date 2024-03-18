import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  BlogResponses,
  BlogPayload,
  BlogCreateResponse,
  BlogResponse,
  BlogUpdatePayload,
} from '@/types';
import { baseUrl, authToken } from '@/utils';

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Blogs'],
  endpoints: (builder) => ({
    getBlogs: builder.query<BlogResponses, null>({
      query: () => ({
        url: '/blogs',
        method: 'GET',
      }),
      providesTags: ['Blogs'],
    }),
    getBlog: builder.query<
      BlogResponse,
      {
        slug: string;
      }
    >({
      query: (query) => ({
        url: `/blogs/${query.slug}`,
        method: 'GET',
      }),
      providesTags: ['Blogs'],
    }),
    createBlog: builder.mutation<BlogCreateResponse, BlogPayload>({
      query: (payload) => {
        const formDataPayload = new FormData();
        formDataPayload.append('title', payload.title);
        formDataPayload.append('content', payload.content);
        formDataPayload.append('preview', payload.description);
        formDataPayload.append('image', payload.image);
        return {
          url: '/blogs',
          method: 'POST',
          body: formDataPayload,
          headers: {
            Authorization: `Bearer ${authToken()}`,
          },
        };
      },
    }),
    getAdminBlogs: builder.query<BlogResponses, null>({
      query: () => ({
        url: '/admin/blogs/',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken()}`,
        },
      }),
      providesTags: ['Blogs'],
    }),
    UpdateBlog: builder.mutation<
      BlogCreateResponse,
      Partial<BlogUpdatePayload>
    >({
      query: (payload) => {
        const formDataPayload = new FormData();
        if (payload.title) formDataPayload.append('title', payload.title);
        if (payload.content) formDataPayload.append('content', payload.content);
        if (payload.description)
          formDataPayload.append('preview', payload.description);
        if (payload.image) formDataPayload.append('image', payload.image);
        return {
          url: `/blogs/${payload.slug}`,
          method: 'PATCH',
          body: formDataPayload,
          headers: {
            Authorization: `Bearer ${authToken()}`,
          },
        };
      },
    }),
    changeBlogStatus: builder.mutation<BlogResponse, { slug: string }>({
      query: (payload) => ({
        url: `/blogs/${payload.slug}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${authToken()}`,
        },
      }),
    }),
    deleteBlog: builder.mutation<BlogResponse, { slug: string }>({
      query: (payload) => ({
        url: `/blogs/${payload.slug}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authToken()}`,
        },
      }),
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogQuery,
  useCreateBlogMutation,
  useGetAdminBlogsQuery,
  useUpdateBlogMutation,
  useChangeBlogStatusMutation,
  useDeleteBlogMutation,
} = blogApi;
