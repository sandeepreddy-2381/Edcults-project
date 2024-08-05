import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from './services/products';
import { usersApi } from './services/users';
import { ordersApi } from './services/orders';
import { cartApi } from './services/cart';
import { categoryApi } from './services/category';
import { reviewApi } from './services/review';
import { supplierApi } from './services/supplier';
import { paymentApi } from './services/payment';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [supplierApi.reducerPath]: supplierApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApi.middleware,
      usersApi.middleware,
      ordersApi.middleware,
      cartApi.middleware,
      categoryApi.middleware,
      reviewApi.middleware,
      supplierApi.middleware,
      paymentApi.middleware,
    ),
});

