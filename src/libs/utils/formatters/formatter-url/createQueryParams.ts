import { isValidValue } from '@/libs/utils/isValidValue';

export type TQueryParams = Record<string, string | number | boolean | string[]> & {
  page?: number;
  limit?: number;
  sort?: string;
  filter?: string;
  search?: string;
  orderBy?: string;
  order?: 'asc' | 'desc';
  category?: string;
  tags?: string[];
  startDate?: string;
  endDate?: string;
};

type CreateQueryFunction = (options: { queryParams: Partial<TQueryParams> | undefined }) => string;

export const createQueryParams: CreateQueryFunction = ({ queryParams }) => {
  if (!queryParams) return '';
  const urlSearchParams = new URLSearchParams();

  Object.entries(queryParams).forEach(([key, value]) => {
    if (isValidValue(value)) {
      if (Array.isArray(value)) {
        value.forEach((val) => urlSearchParams.append(key, String(val)));
      } else {
        urlSearchParams.append(key, String(value));
      }
    }
  });

  return urlSearchParams.toString();
};
