'use client';

import Button from '@/components/ui/Button';
import Drawer from '@/components/ui/Drawer';
import InputField from '@/components/ui/InputField';

import { useGetAllCategoriesQuery } from '@/store/services/categories/api';
import {
  useCreateProductsMutation,
  useUpdateProductsMutation,
} from '@/store/services/products/api';
import {
  TCreateProductsBody,
  TCreateProductsForm,
  TUpdateProductsBody,
  TUpdateProductsForm,
} from '@/store/services/products/type';
import { Form, Formik, FormikProps } from 'formik';
import { FC, useEffect, useRef, useState } from 'react';
import * as yup from 'yup';
import { TResponseItem } from './PageContent';
import Image from 'next/image';

type Props = {
  dataItem?: TResponseItem;
};

const PageForm: FC<Props> = ({ dataItem }) => {
  const formikRef = useRef<FormikProps<any>>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [preview, setPreview] = useState(dataItem?.image || '');

  const getAllCategories = useGetAllCategoriesQuery();

  const [createProductsTrigger, useCreateProductsResult] =
    useCreateProductsMutation();
  const [updateProductsTrigger, useUpdateProductsResult] =
    useUpdateProductsMutation();

  const categorySelectItems = getAllCategories?.data?.map(({ id, name }) => ({
    label: name,
    value: name,
  }));

  const {
    name = '',
    category = '',
    description = '',
    image = '',
  } = dataItem || {};

  const initialValue = {
    name,
    category: category || categorySelectItems?.[0]?.value || '',
    description,
    image,
  };

  const cleanStates = () => {
    formikRef.current?.resetForm();
    setIsOpen(false);
  };

  useEffect(() => {
    if (
      useCreateProductsResult?.isSuccess ||
      useUpdateProductsResult?.isSuccess
    ) {
      cleanStates();
    }
  }, [useCreateProductsResult?.isSuccess, useUpdateProductsResult?.isSuccess]);

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Обязательное поле')
      .max(30, 'Максимум 30 символов'),
    category: yup
      .string()
      .required('Обязательное поле')
      .max(30, 'Максимум 30 символов'),
    description: yup.string().max(400, 'Максимум 400 символов'),
  });

  const handleSubmit = (values: TCreateProductsForm | TUpdateProductsForm) => {
    const body: TCreateProductsBody | TUpdateProductsBody = values;

    if (!dataItem) {
      createProductsTrigger({ body });
    } else {
      updateProductsTrigger({ id: dataItem.id, body });
    }

    setIsOpen(false);
  };

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>
        {!dataItem ? 'Добавить' : '+'}
      </Button>
      <Drawer open={isOpen} setOpen={setIsOpen} side="right">
        {/* <FormPageHeader backPath={PAGE_PATH} id={id} /> */}
        <Formik
          innerRef={formikRef}
          initialValues={initialValue}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnBlur={false}
          enableReinitialize
        >
          {({ dirty, setFieldValue, values }) => (
            <Form className="flex flex-col h-full gap-3 min-w-[30vw]">
              <InputField name="name" required beforeLabel="Имя" />
              <InputField
                fieldType="select"
                selectItems={categorySelectItems || []}
                name="category"
                required
                beforeLabel="Катагория"
              />
              <InputField
                fieldType="textarea"
                name="description"
                required
                beforeLabel="Описание"
              />

              {!preview ? (
                <input
                  type="file"
                  name="image"
                  accept="image/png, image/jpeg"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files && files[0]) {
                      const file = files[0];
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        const result = reader.result;
                        if (typeof result === 'string') {
                          setFieldValue('image', result); // Сохраняем Base64 строку в Formik
                          setPreview(result); // Устанавливаем превью, только если результат строка
                        }
                      };
                      reader.readAsDataURL(file); // Читаем файл как Data URL (Base64)
                    }
                  }}
                />
              ) : (
                <div>
                  <Image
                    src={preview}
                    alt=""
                    width={200}
                    height={200}
                    className="rounded shadow"
                  />
                  <Button onClick={() => setPreview('')}>X</Button>
                </div>
              )}

              <div className="flex gap-5 justify-end mt-auto">
                <Button
                  type="button"
                  onClick={cleanStates}
                  className="text-white bg-gray-400"
                >
                  Отменить
                </Button>
                <Button
                  disabled={!dirty}
                  type="submit"
                  className={`text-white bg-green-300`}
                >
                  Сохранить
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Drawer>
    </div>
  );
};

export default PageForm;
