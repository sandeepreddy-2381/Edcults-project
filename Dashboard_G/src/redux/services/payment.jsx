// src/services/paymentApi.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const url = "http://localhost:8000/"
const baseQuery = fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      // const token="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzaGlyaXNoYXJlZGR5QGdtYWlsLmNvbSIsImlhdCI6MTcyMjE3ODAwMywiZXhwIjoxNzIyMjY0NDAzfQ.mIZDIDqIBM7eRwc5yFYaAlrOUj2nVAsxoB0rVI-VpCY"
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
