import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { authToken, baseUrl, isAuth } from '@/utils';
import {
  CommentsResponse,
  CommentResponse,
  LikeResponse,
  LikesResponse
} from '@/types/commentResponse';

export const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Comments'],
  endpoints: (builder) => ({
    getComments: builder.query<
      CommentsResponse,
      {
        slug: string;
      }
    >({
      query: (slug) => ({
        url: `/blogs/${slug.slug}/comment`,
        method: 'GET',
      }),
      providesTags: ['Comments'],
    }),
    createComment: builder.mutation<
      CommentResponse,
      {
        slug: string;
        body: { name: string; email: string; comment: string; isAuth: boolean };
      }
    >({
      query: (body) => {
        const {
          body: { isAuth, name, email, comment },
        } = body;
        return {
          url: `/blogs/${body.slug}/comments/`,
          method: 'POST',
          body: {
            name: !isAuth ? name : undefined,
            email: !isAuth ? email : undefined,
            comment,
          },
          headers: {
            Authorization: `Bearer ${authToken()}`,
          },
        };
      },
      invalidatesTags: ['Comments'],
    }),
  }),
});

export const likeApi = createApi({
  reducerPath: 'likeApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Likes'],
  endpoints: (builder) => ({
    like: builder.mutation<LikeResponse, { slug: string }>({
      query: (body) => ({
        url: `/blogs/${body.slug}/like`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken()}`,
        },
      }),
      invalidatesTags: ['Likes'],
    }),
    getLikes: builder.query<LikesResponse, { slug: string }>({
      query: (body) => ({
        url: `/blogs/${body.slug}/like`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetCommentsQuery, useCreateCommentMutation } = commentApi;
export const { useLikeMutation, useGetLikesQuery } = likeApi;
