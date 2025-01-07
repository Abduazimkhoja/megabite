import { categoriesApi } from './categories/api';
import { exampleApi } from './example/api';
import { notificationMiddleware } from './notification.middleware';
import { productsApi } from './products/api';

export const apiReducers = {
  [categoriesApi.reducerPath]: categoriesApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,

  [exampleApi.reducerPath]: exampleApi.reducer,
};

export const apiMiddlewareList = [
  categoriesApi.middleware,
  productsApi.middleware,

  exampleApi.middleware,

  notificationMiddleware,
];
