import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, authToken } from '@/utils';

import { ProjectResponse, ProjectsResponse, ProjectPayload } from '@/types';

export const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Projects'],
  endpoints(build) {
    return {
      getProjects: build.query<
        ProjectsResponse,
        { status?: boolean; category?: string }
      >({
        query: (status) => ({
          url: `/projects${status?.status ? `?status=${status.status}` : ''}${
            status?.category && status?.status
              ? `&category=${status.category}`
              : status?.category
              ? `?category=${status.category}`
              : ''
          }`,
          method: 'GET',
        }),
        providesTags: ['Projects'],
      }),
      getProject: build.query<ProjectResponse, { id: string }>({
        query: (id) => ({
          url: `/projects/${id.id}`,
          method: 'GET',
        }),
        providesTags: ['Projects'],
      }),
      createProject: build.mutation<ProjectResponse, { body: ProjectPayload }>({
        query: (body) => {
          const formDataPayload = new FormData();
          const { body: project } = body;
          formDataPayload.append('title', project.title);
          formDataPayload.append('description', project.description);
          formDataPayload.append('category', project.category);
          formDataPayload.append('image', project.image);
          formDataPayload.append('url', project.url);

          return {
            url: '/projects',
            method: 'POST',
            body: formDataPayload,
            headers: {
              Authorization: `Bearer ${authToken()}`,
            },
          };
        },
        invalidatesTags: ['Projects'],
      }),
      updateProject: build.mutation<
        ProjectResponse,
        { id: string; body: Partial<ProjectPayload> }
      >({
        query: (body) => {
          const { body: project } = body;
          const formDataPayload = new FormData();
          if (project.image instanceof File) {
            formDataPayload.append('image', project.image);
          }
          if (project.title) {
            formDataPayload.append('title', project.title);
          }
          if (project.description) {
            formDataPayload.append('description', project.description);
          }
          if (project.category) {
            formDataPayload.append('category', project.category);
          }
          if (project.url) {
            formDataPayload.append('url', project.url);
          }
          return {
            url: `/projects/${body.id}`,
            method: 'PATCH',
            body: formDataPayload,
            headers: {
              Authorization: `Bearer ${authToken()}`,
            },
          };
        },
        invalidatesTags: ['Projects'],
      }),
      deleteProject: build.mutation<ProjectResponse, { id: string }>({
        query: (id) => ({
          url: `/projects/${id.id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Projects'],
      }),
    };
  },
});

export const {
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useGetProjectQuery,
  useGetProjectsQuery,
  useUpdateProjectMutation,
} = projectApi;
