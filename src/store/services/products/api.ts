import { createApi } from '@reduxjs/toolkit/query/react';
import { instanceFetchBaseQuery, rootUrl } from '../api.helpers';

import {
  TCreateProductsParam,
  TCreateProductsResponse,
  TDeleteProductsParam,
  TDeleteProductsResponse,
  TGetAllProductsParam,
  TGetAllProductsResponse,
  TGetOneProductsParam,
  TGetOneProductsResponse,
  TUpdateProductsParam,
  TUpdateProductsResponse,
} from './type';

// consts
const REDUCER_PATH = 'productsApi';
const BASE_PATH = '/products';
const ROOT_TAG_TYPE = 'products' as const;
const TAG_TYPES = [ROOT_TAG_TYPE] as const;
const rootInvalidateTag = [{ type: ROOT_TAG_TYPE, id: 'LIST' }];

const baseUrl = rootUrl([BASE_PATH]);

export const productsApi = createApi({
  reducerPath: REDUCER_PATH,
  tagTypes: TAG_TYPES,
  baseQuery: instanceFetchBaseQuery,
  endpoints: (builder) => ({
    getAllProducts: builder.query<
      TGetAllProductsResponse,
      TGetAllProductsParam
    >({
      query: () => ({
        url: baseUrl().path,
        // params: { isPaginate: true },
      }),
      providesTags: (result) =>
        result
          ? [
              ...(result || []).map(({ id }) => ({
                type: ROOT_TAG_TYPE,
                id,
              })),
              ...rootInvalidateTag,
            ]
          : rootInvalidateTag,
    }),
    getOneProducts: builder.query<
      TGetOneProductsResponse,
      TGetOneProductsParam
    >({
      query: ({ id }) => ({
        url: baseUrl({ endpoints: [id] }).path,
      }),
      providesTags: (result, _, { id }) => [
        { type: ROOT_TAG_TYPE, id },
        ...(result ? rootInvalidateTag : []),
      ],
    }),
    createProducts: builder.mutation<
      TCreateProductsResponse,
      TCreateProductsParam
    >({
      query: ({ body }) => ({
        url: baseUrl().path,
        method: 'POST',
        body,
      }),
      invalidatesTags: rootInvalidateTag,
    }),
    updateProducts: builder.mutation<
      TUpdateProductsResponse,
      TUpdateProductsParam
    >({
      query: ({ body, id }) => ({
        url: baseUrl({ endpoints: [id] }).path,
        method: 'PUT',
        body,
      }),
      invalidatesTags: rootInvalidateTag,
    }),
    deleteProducts: builder.mutation<
      TDeleteProductsResponse,
      TDeleteProductsParam
    >({
      query: ({ id }) => ({
        url: baseUrl({ endpoints: [id] }).path,
        method: 'DELETE',
      }),
      invalidatesTags: rootInvalidateTag,
    }),
  }),
});

export const productsEndpoints = productsApi?.endpoints;
export const {
  useGetAllProductsQuery,
  useGetOneProductsQuery,
  useCreateProductsMutation,
  useUpdateProductsMutation,
  useDeleteProductsMutation,
} = productsApi;
