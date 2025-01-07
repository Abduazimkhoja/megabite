import { createApi } from '@reduxjs/toolkit/query/react';
import { instanceFetchBaseQuery, rootUrl } from '../api.helpers';

import {
  TCreateExampleParam,
  TCreateExampleResponse,
  TDeleteExampleParam,
  TDeleteExampleResponse,
  TGetAllExampleParam,
  TGetAllExampleResponse,
  TGetOneExampleParam,
  TGetOneExampleResponse,
  TUpdateExampleParam,
  TUpdateExampleResponse,
} from './type';

// consts
const REDUCER_PATH = 'exampleApi';
const BASE_PATH = '/api/v1/users';
const ROOT_TAG_TYPE = 'example' as const;
const TAG_TYPES = [ROOT_TAG_TYPE] as const;
const rootInvalidateTag = [{ type: ROOT_TAG_TYPE, id: 'LIST' }];

const baseUrl = rootUrl([BASE_PATH]);

export const exampleApi = createApi({
  reducerPath: REDUCER_PATH,
  tagTypes: TAG_TYPES,
  baseQuery: instanceFetchBaseQuery,
  endpoints: (builder) => ({
    getAllExample: builder.query<TGetAllExampleResponse, TGetAllExampleParam>({
      query: () => ({
        url: baseUrl().path,
        params: { isPaginate: true },
      }),
      providesTags: (result) =>
        result
          ? [
              ...(result?.data || []).map(({ id }) => ({
                type: ROOT_TAG_TYPE,
                id,
              })),
              ...rootInvalidateTag,
            ]
          : rootInvalidateTag,
    }),
    getOneExample: builder.query<TGetOneExampleResponse, TGetOneExampleParam>({
      query: ({ id }) => ({
        url: baseUrl({ endpoints: [id] }).path,
      }),
      providesTags: (result, _, { id }) => [
        { type: ROOT_TAG_TYPE, id },
        ...(result ? rootInvalidateTag : []),
      ],
    }),
    createExample: builder.mutation<
      TCreateExampleResponse,
      TCreateExampleParam
    >({
      query: ({ body }) => ({
        url: baseUrl().path,
        method: 'POST',
        body,
      }),
      invalidatesTags: rootInvalidateTag,
    }),
    updateExample: builder.mutation<
      TUpdateExampleResponse,
      TUpdateExampleParam
    >({
      query: ({ body, id }) => ({
        url: baseUrl({ endpoints: [id] }).path,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: rootInvalidateTag,
    }),
    deleteExample: builder.mutation<
      TDeleteExampleResponse,
      TDeleteExampleParam
    >({
      query: ({ id }) => ({
        url: baseUrl({ endpoints: [id] }).path,
        method: 'DELETE',
      }),
      invalidatesTags: rootInvalidateTag,
    }),
  }),
});

export const exampleEndpoints = exampleApi?.endpoints;
export const {
  useGetAllExampleQuery,
  useGetOneExampleQuery,
  useCreateExampleMutation,
  useUpdateExampleMutation,
  useDeleteExampleMutation,
} = exampleApi;
