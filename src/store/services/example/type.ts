import { TBaseApiResponseData } from '@/libs/types/base-response.type';
import { TBaseRequestParams } from '@/libs/types/common.type';
import { CombineLangSuffixFields, Expand } from '@/libs/types/custom-utility.type';
import { TBaseResponseData } from '@/libs/types/formatted.types';
import { LangEnum } from '@/libs/types/lang.type';

export type TExampleLangFields = ['name', 'title'];

// data item
export type TExampleItem = Expand<
  TBaseApiResponseData & {
    name: string;
  } & CombineLangSuffixFields<TExampleLangFields, LangEnum>
>;

// data list
export type TExampleList = TExampleItem[];

// HTTPS 🚀

// GetAll 🔵
export type TGetAllExampleResponse = TBaseResponseData<TExampleList>;
export type TGetAllExampleParam = void;

// GetOne 🔵
export type TGetOneExampleResponse = TBaseResponseData<TExampleItem>;
export type TGetOneExampleParam = Pick<TBaseRequestParams, 'id'>;

// Create 🟢
export type TCreateExampleResponse = TBaseResponseData<TExampleItem>;
export type TCreateExampleBody = void;
export type TCreateExampleForm = TCreateExampleBody;
export type TCreateExampleParam = Pick<TBaseRequestParams<TCreateExampleBody>, 'body'>;

// Update 🟡
export type TUpdateExampleResponse = TBaseResponseData<TExampleItem>;
export type TUpdateExampleBody = void;
export type TUpdateExampleForm = TUpdateExampleBody;
export type TUpdateExampleParam = Pick<TBaseRequestParams<TUpdateExampleBody>, 'body' | 'id'>;

// Delete 🔴
export type TDeleteExampleResponse = TBaseResponseData<TExampleItem>;
export type TDeleteExampleParam = Pick<TBaseRequestParams, 'id'>;
