import { Expand } from './custom-utility.type';
import { LangEnum } from './lang.type';

export type TId = number;
export type TToken = string;
export type TUrl = string;

export const enum UrlMethodEnum {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export type TBaseRequestParams<TBody = undefined, Id = TId> = {
  id: Id;
  token: TToken;
  refreshToken: TToken;
  body: Expand<TBody>;

  lang?: LangEnum;
  'Accept-Language'?: LangEnum;

  count?: number;
  page?: number;
  page_size?: number;
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
