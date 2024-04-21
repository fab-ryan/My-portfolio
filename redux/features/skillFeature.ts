import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  SkillPayload,
  SkillResponse,
  SkillUpdatePayload,
  SkillResponses,
} from '@/types';
import { baseUrl, authToken } from '@/utils';

export const skillApi = createApi({
  reducerPath: 'skillApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Skill'],
  endpoints: (builder) => ({
    getSkills: builder.query<SkillResponses, void>({
      query: () => 'skills',
      providesTags: ['Skill'],
    }),
    createSkill: builder.mutation<SkillResponse, SkillPayload>({
      query: (body) => ({
        url: 'skills',
        method: 'POST',
        body: {
          ...body,
          percentage: body.percent,
        },
        headers: {
          Authorization: `Bearer ${authToken()}`,
        },
      }),
      invalidatesTags: ['Skill'],
    }),
    updateSkill: builder.mutation<SkillResponse, SkillUpdatePayload>({
      query: (body) => ({
        url: `skills/${body._id}`,
        method: 'PATCH',
        body: {
          ...body,
          percentage: body.percent,
        },
        headers: {
          Authorization: `Bearer ${authToken()}`,
        },
      }),
      invalidatesTags: ['Skill'],
    }),
    deleteSkill: builder.mutation<SkillResponse, string>({
      query: (id) => ({
        url: `skills/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authToken()}`,
        },
      }),
      invalidatesTags: ['Skill'],
    }),
  }),
});

export const {
  useGetSkillsQuery,
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
} = skillApi;
