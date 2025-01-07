import { createApi } from '@reduxjs/toolkit/query/react';
import { instanceFetchBaseQuery, rootUrl } from '../api.helpers';

import {
  TCreateCategoriesParam,
  TCreateCategoriesResponse,
  TDeleteCategoriesParam,
  TDeleteCategoriesResponse,
  TGetAllCategoriesParam,
  TGetAllCategoriesResponse,
  TGetOneCategoriesParam,
  TGetOneCategoriesResponse,
  TUpdateCategoriesParam,
  TUpdateCategoriesResponse,
} from './type';

// consts
const REDUCER_PATH = 'categoriesApi';
const BASE_PATH = '/categories';
const ROOT_TAG_TYPE = 'categories' as const;
const TAG_TYPES = [ROOT_TAG_TYPE] as const;
const rootInvalidateTag = [{ type: ROOT_TAG_TYPE, id: 'LIST' }];

const baseUrl = rootUrl([BASE_PATH]);

export const categoriesApi = createApi({
  reducerPath: REDUCER_PATH,
  tagTypes: TAG_TYPES,
  baseQuery: instanceFetchBaseQuery,
  endpoints: (builder) => ({
    getAllCategories: builder.query<
      TGetAllCategoriesResponse,
      TGetAllCategoriesParam
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
    getOneCategories: builder.query<
      TGetOneCategoriesResponse,
      TGetOneCategoriesParam
    >({
      query: ({ id }) => ({
        url: baseUrl({ endpoints: [id] }).path,
      }),
      providesTags: (result, _, { id }) => [
        { type: ROOT_TAG_TYPE, id },
        ...(result ? rootInvalidateTag : []),
      ],
    }),
    createCategories: builder.mutation<
      TCreateCategoriesResponse,
      TCreateCategoriesParam
    >({
      query: ({ body }) => ({
        url: baseUrl().path,
        method: 'POST',
        body,
      }),
      invalidatesTags: rootInvalidateTag,
    }),
    updateCategories: builder.mutation<
      TUpdateCategoriesResponse,
      TUpdateCategoriesParam
    >({
      query: ({ body, id }) => ({
        url: baseUrl({ endpoints: [id] }).path,
        method: 'PUT',
        body,
      }),
      invalidatesTags: rootInvalidateTag,
    }),
    deleteCategories: builder.mutation<
      TDeleteCategoriesResponse,
      TDeleteCategoriesParam
    >({
      query: ({ id }) => ({
        url: baseUrl({ endpoints: [id] }).path,
        method: 'DELETE',
      }),
      invalidatesTags: rootInvalidateTag,
    }),
  }),
});

export const categoriesEndpoints = categoriesApi?.endpoints;
export const {
  useGetAllCategoriesQuery,
  useGetOneCategoriesQuery,
  useCreateCategoriesMutation,
  useUpdateCategoriesMutation,
  useDeleteCategoriesMutation,
} = categoriesApi;
