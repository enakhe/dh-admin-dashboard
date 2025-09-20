import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mentor, Newcomer, NewcomerFormData, MentorFormData, ApiResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    tagTypes: ['Mentor', 'Newcomer'],
    endpoints: (builder) => ({
        // Mentor endpoints
        getMentors: builder.query<ApiResponse<Mentor[]>, void>({
            query: () => '/mentors',
            providesTags: ['Mentor'],
        }),
        getMentor: builder.query<ApiResponse<Mentor>, string>({
            query: (id) => `/mentors/${id}`,
            providesTags: (result, error, id) => [{ type: 'Mentor', id }],
        }),
        createMentor: builder.mutation<ApiResponse<Mentor>, MentorFormData>({
            query: (mentor) => ({
                url: '/mentors',
                method: 'POST',
                body: mentor,
            }),
            invalidatesTags: ['Mentor'],
        }),
        updateMentor: builder.mutation<ApiResponse<Mentor>, { id: string; data: MentorFormData }>({
            query: ({ id, data }) => ({
                url: `/mentors/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Mentor', id }],
        }),
        deleteMentor: builder.mutation<ApiResponse<null>, string>({
            query: (id) => ({
                url: `/mentors/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Mentor'],
        }),

        // Newcomer endpoints
        getNewcomers: builder.query<ApiResponse<Newcomer[]>, void>({
            query: () => '/newcomers',
            providesTags: ['Newcomer'],
        }),
        getNewcomer: builder.query<ApiResponse<Newcomer>, string>({
            query: (id) => `/newcomers/${id}`,
            providesTags: (result, error, id) => [{ type: 'Newcomer', id }],
        }),
        createNewcomer: builder.mutation<ApiResponse<Newcomer>, NewcomerFormData>({
            query: (newcomer) => ({
                url: '/newcomers',
                method: 'POST',
                body: newcomer,
            }),
            invalidatesTags: ['Newcomer'],
        }),
        updateNewcomer: builder.mutation<ApiResponse<Newcomer>, { id: string; data: NewcomerFormData }>({
            query: ({ id, data }) => ({
                url: `/newcomers/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Newcomer', id }],
        }),
        deleteNewcomer: builder.mutation<ApiResponse<null>, string>({
            query: (id) => ({
                url: `/newcomers/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Newcomer'],
        }),
    }),
});

export const {
    useGetMentorsQuery,
    useGetMentorQuery,
    useCreateMentorMutation,
    useUpdateMentorMutation,
    useDeleteMentorMutation,
    useGetNewcomersQuery,
    useGetNewcomerQuery,
    useCreateNewcomerMutation,
    useUpdateNewcomerMutation,
    useDeleteNewcomerMutation,
} = api;
