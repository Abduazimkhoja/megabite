'use client';

import Button from '@/components/ui/Button';
import Drawer from '@/components/ui/Drawer';
import InputField from '@/components/ui/InputField';

import {
  useCreateCategoriesMutation,
  useUpdateCategoriesMutation,
} from '@/store/services/categories/api';
import {
  TCreateCategoriesBody,
  TCreateCategoriesForm,
  TUpdateCategoriesBody,
  TUpdateCategoriesForm,
} from '@/store/services/categories/type';
import { Form, Formik, FormikProps } from 'formik';
import { FC, JSX, useEffect, useRef, useState } from 'react';
import * as yup from 'yup';
import { TResponseItem } from './PageContent';

type Props = {
  dataItem?: TResponseItem;
} & JSX.IntrinsicElements['div'];

const PageForm: FC<Props> = ({ dataItem, className = '', ...rest }) => {
  const formikRef = useRef<FormikProps<any>>(null);
  const [isOpen, setIsOpen] = useState(false);

  const initialValue = {
    name: dataItem?.name || '',
  };

  const cleanStates = () => {
    formikRef.current?.resetForm();
    setIsOpen(false);
  };

  const [createCategoriesTrigger, useCreateCategoriesResult] =
    useCreateCategoriesMutation();
  const [updateCategoriesTrigger, useUpdateCategoriesResult] =
    useUpdateCategoriesMutation();

  useEffect(() => {
    if (
      useCreateCategoriesResult?.isSuccess ||
      useUpdateCategoriesResult?.isSuccess
    ) {
      cleanStates();
    }
  }, [
    useCreateCategoriesResult?.isSuccess,
    useUpdateCategoriesResult?.isSuccess,
  ]);

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Обязательное поле')
      .max(30, 'Максимум 30 символов'),
  });

  const handleSubmit = (
    values: TCreateCategoriesForm | TUpdateCategoriesForm,
  ) => {
    const { name } = values;
    const body: TCreateCategoriesBody | TUpdateCategoriesBody = {
      name,
    };

    if (!dataItem) {
      createCategoriesTrigger({ body });
    } else {
      updateCategoriesTrigger({ id: dataItem.id, body });
    }

    setIsOpen(false);
  };

  return (
    <div className={`${className}`} {...rest}>
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
        >
          {({ dirty }) => (
            <Form className="flex flex-col h-full">
              <InputField name="name" required beforeLabel="Катагория" />

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
