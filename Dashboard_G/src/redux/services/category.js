// src/services/categoryApi.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const url = "http://localhost:8000/"
const baseQuery = fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
    //   const token="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzaGlyaXNoYXJlZGR5QGdtYWlsLmNvbSIsImlhdCI6MTcyMjE3ODAwMywiZXhwIjoxNzIyMjY0NDAzfQ.mIZDIDqIBM7eRwc5yFYaAlrOUj2nVAsxoB0rVI-VpCY"
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
});

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (category) => ({
        url: '/categories/create',
        method: 'POST',
        body: category,
      }),
    }),
    getCategory: builder.query({
      query: (id) => `/categories/${id}`,
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
      }),
    }),
    getCategories: builder.query({
      query: () => '/categories',
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoryQuery,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} = categoryApi;
