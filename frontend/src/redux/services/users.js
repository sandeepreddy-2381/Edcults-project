import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const url = "http://localhost:8000/"
const baseQuery = fetchBaseQuery({
  baseUrl: url,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery,
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: 'auth/register',
        method: 'POST',
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (user) => ({
        url: 'auth/login',
        method: 'POST',
        body: user,
      }),
    }),
    refreshToken: builder.mutation({
      query: (data) => ({
        url: 'auth/refresh',
        method: 'POST',
        body: data,
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: 'admin/get-all-users',
      }),
    }),
    getUserById: builder.query({
      query: (userId) => ({
        url: `admin/get-users/${userId}`,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ userId, data }) => ({
        url: `admin/update/${userId}`,
        method: 'PUT',
        body: data,
      }),
    }),
    getMyProfile: builder.query({
      query: () => ({
        url: 'profile',
      }),
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `admin/delete/${userId}`,
        method: 'DELETE',
      }),
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: 'auth/forgot-password',
        method: 'POST',
        params: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, newPassword }) => ({
        url: 'auth/reset-password',
        method: 'POST',
        params: { token, newPassword },
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useRefreshTokenMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useGetMyProfileQuery,
  useDeleteUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = usersApi;
