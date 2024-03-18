import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthPayload, AuthResponse } from '@/types';
import { baseUrl } from '@/utils';


export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Auth'],
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, AuthPayload>({
        query: (payload) => ({
            url: '/login',
            method: 'POST',
            body: payload,
            headers: {
                'Content-Type': 'application/json'
            }
        }),
        }),
    }),
});


export const { useLoginMutation } = authApi;