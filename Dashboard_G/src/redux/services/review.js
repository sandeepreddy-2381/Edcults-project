// src/services/reviewApi.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api/v1',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const reviewApi = createApi({
  reducerPath: 'reviewApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (review) => ({
        url: '/reviews/create',
        method: 'POST',
        body: review,
      }),
    }),
    getProductReviews: builder.query({
      query: (productId) => `/reviews/${productId}`,
    }),
    deleteReview: builder.mutation({
      query: ({ productId, reviewId }) => ({
        url: `/reviews/${productId}/${reviewId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetProductReviewsQuery,
  useDeleteReviewMutation,
} = reviewApi;
