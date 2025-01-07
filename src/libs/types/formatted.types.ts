import { TBaseApiResponseData, TBaseApiResponseElements } from './base-response.type';
import { Expand, Prettify } from './custom-utility.type';
import { TPagination } from './pagination.type';

export type TBaseResponseData<TData> = TData extends any[]
  ? Expand<
      {
        data: Expand<TBaseApiResponseData & TData[number]>[];
      } & TBaseApiResponseElements
    >
  : Expand<{ data: Expand<TBaseApiResponseData & TData> } & TBaseApiResponseElements>;

export type TPaginatedResponse<TData> = Prettify<TBaseResponseData<TData> & TPagination>;

export type AddSuffixToKeys<T, Suffix extends string> = {
  [K in keyof T as `${Capitalize<string & K>}${Suffix}`]: T[K];
};

export type AddPrefixToKeys<T, Prefix extends string> = {
  [K in keyof T as `${Prefix}${Capitalize<string & K>}`]: T[K];
};
