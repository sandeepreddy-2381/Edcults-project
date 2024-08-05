// src/services/productApi.js
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

export const productsApi = createApi({
  reducerPath: 'productApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (formData) => ({
        url: '/products/create',
        method: 'POST',
        body: formData,
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ id, product }) => ({
        url: `/products/${id}`,
        method: 'PATCH',
        body: product,
      }),
    }),
    updateProductImages: builder.mutation({
      query: ({ id, images }) => ({
        url: `/products/${id}/images`,
        method: 'POST',
        body: images,
      }),
    }),
    deleteProductImage: builder.mutation({
      query: (imageId) => ({
        url: `/products/images/${imageId}`,
        method: 'DELETE',
      }),
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
    }),
    getProducts: builder.query({
      query: () => '/products',
    }),
    getSupplierProducts: builder.query({
      query: (id) => `/products/supplier/${id}`,
    }),
    getCategoryProducts: builder.query({
      query: (id) => `/products/category/${id}`,
    }),
    searchProducts: builder.query({
      query: (keyword) => `/products/search?keyword=${keyword}`,
    }),
  }),
});

export const {
  useCreateProductMutation,
  useUpdateProductMutation,
  useUpdateProductImagesMutation,
  useDeleteProductImageMutation,
  useGetProductByIdQuery,
  useGetProductsQuery,
  useGetSupplierProductsQuery,
  useSearchProductsQuery,
  useGetCategoryProductsQuery,
} = productsApi;
