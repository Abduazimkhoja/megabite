import { FormEvent } from 'react';
import { Expand } from '@/libs/types/custom-utility.type';

export const formToObject = <TForm extends Record<string, any>>(
  event: FormEvent<HTMLFormElement>,
) => {
  const formRequestData: Record<string, any> = {};

  const formData = new FormData(event.currentTarget);

  formData.forEach((value, key) => {
    formRequestData[key] = value;
  });

  return formRequestData as Expand<TForm>;
};
