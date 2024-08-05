// src/services/cartApi.js
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

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    addItemToCart: builder.mutation({
      query: (cartItem) => ({
        url: '/cart/add',
        method: 'PUT',
        body: cartItem,
      }),
    }),
    updateCartItemQuantity: builder.mutation({
      query: ({ id, quantity }) => ({
        url: `/cart/update/${id}`,
        method: 'PUT',
        body: { quantity },
      }),
    }),
    removeCartItem: builder.mutation({
      query: (id) => ({
        url: `/cart/${id}`,
        method: 'DELETE',
      }),
    }),
    clearCart: builder.mutation({
      query: () => ({
        url: '/cart/clear',
        method: 'DELETE',
      }),
    }),
    getUserCart: builder.query({
      query: () => '/cart',
    }),
    getCart: builder.query({
      query: (id) => `/cart/${id}`,
    }),
  }),
});

export const {
  useAddItemToCartMutation,
  useUpdateCartItemQuantityMutation,
  useRemoveCartItemMutation,
  useClearCartMutation,
  useGetUserCartQuery,
  useGetCartQuery,
} = cartApi;

