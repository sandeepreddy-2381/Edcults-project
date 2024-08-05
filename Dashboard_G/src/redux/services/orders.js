// src/services/orderApi.js
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

export const ordersApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    newOrder: builder.mutation({
      query: (order) => ({
        url: '/orders/new',
        method: 'POST',
        body: order,
      }),
    }),
    updateOrder: builder.mutation({
      query: ({ id, order }) => ({
        url: `/orders/${id}`,
        method: 'PATCH',
        body: order,
      }),
    }),
    cancelOrder: builder.mutation({
      query: (orderId) => ({
        url: `/orders/cancel/${orderId}`,
        method: 'DELETE',
      }),
    }),
    myOrders: builder.query({
      query: () => '/orders/me',
    }),
    getAllOrders: builder.query({
      query: () => '/orders',
    }),
    getOrder: builder.query({
      query: (id) => `/orders/${id}`,
    }),
  }),
});

export const {
  useNewOrderMutation,
  useUpdateOrderMutation,
  useCancelOrderMutation,
  useMyOrdersQuery,
  useGetAllOrdersQuery,
  useGetOrderQuery,
} = ordersApi;
