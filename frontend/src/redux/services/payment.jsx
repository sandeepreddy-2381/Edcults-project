// src/services/paymentApi.js

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

export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    createHostedCheckout: builder.mutation({
      query: (paymentReq) => ({
        url: '/payments/checkout/hosted',
        method: 'POST',
        body: paymentReq,
      }),
    }),
    updatePayment: builder.mutation({
      query: (sessionId) => ({
        url: '/payments/success',
        method: 'POST',
        body: sessionId,
      }),
    }),
  }),
});

export const {
  useCreateHostedCheckoutMutation,
  useUpdatePaymentMutation,
} = paymentApi;
