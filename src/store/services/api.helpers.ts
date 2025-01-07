import { getAPIUrl } from '@/contsts/api.const';
import { createUrl } from '@/libs/utils/formatters/formatter-url/createUrl';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const rootUrl = (basePaths?: string[]) => {
  return createUrl({
    baseUrl: getAPIUrl(),
    basePaths,
  });
};

const originBaseUrl = rootUrl()().origin;

export const instanceFetchBaseQuery = fetchBaseQuery({
  baseUrl: originBaseUrl,
  // prepareHeaders: (headers, { getState }) => {
  //   const state = getState() as RootState;
  //   const token = Cookies.get('token');

  //   if (token) {
  //     headers.set('Authorization', `Bearer ${token}`);
  //   }

  //   return headers;
  // },

  // async fetchFn(input, init) {
  //   const baseUrl = typeof input === 'string' ? input : input.url;
  //   const urlOptions = new URL(baseUrl);

  //   if (!urlOptions.searchParams.get('isPaginate')) return fetch(input, init);

  //   const urlParams = new URLSearchParams(window.location.search);
  //   const page = urlParams.get(PaginationKeysEnum.PAGE) || '1';
  //   const pageSize = localStorage.getItem(PaginationKeysEnum.PAGE_SIZE) || '10';

  //   urlOptions.searchParams.delete('isPaginate');
  //   if (page) urlOptions.searchParams.set(PaginationKeysEnum.PAGE, page);
  //   if (pageSize)
  //     urlOptions.searchParams.set(PaginationKeysEnum.PAGE_SIZE, pageSize);

  //   const url = urlOptions.toString();

  //   if (typeof input === 'string') return fetch(url, init);
  //   else {
  //     const newInput = new Request(url, input);
  //     return fetch(newInput, init);
  //   }
  // },
});
