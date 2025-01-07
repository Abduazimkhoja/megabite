'use client';
import Button from '@/components/ui/Button';
import DeleteModal from '@/components/ui/DeleteModal';
import Table, { TableColumn } from '@/components/ui/Table';
import { useDeleteProductsMutation } from '@/store/services/products/api';
import { FC, useState } from 'react';
import { TColumnType, TResponse } from './PageContent';
import PageForm from './PageForm';

type Props = {
  response: TResponse;
  loading?: boolean;
};

const PageTable: FC<Props> = ({ response, loading }) => {
  const [deleteItemId, setDeleteItemId] = useState<string | number | null>(
    null,
  );

  const [deleteProductsTrigger] = useDeleteProductsMutation();

  const handleDelete = async (id: string | number) => {
    deleteProductsTrigger({ id: String(id) });
  };

  const columns: TableColumn<TColumnType>[] = [
    {
      title: 'Наименование',
      key: 'name',
      dataIndex: 'name',
      className: 'w-[50%]',
    },
    {
      title: 'Категория',
      key: 'category',
      dataIndex: 'category',
      className: 'w-[50%]',
    },
    {
      title: 'Действия',
      key: 'action',
      dataIndex: 'action',
      render(_, dataItem) {
        return (
          <div className="flex gap-4 justify-center">
            <PageForm dataItem={dataItem} />
            <Button onClick={() => setDeleteItemId(dataItem?.id)}>x</Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <DeleteModal
        delteItemId={deleteItemId}
        onCancel={() => {
          setDeleteItemId(null);
        }}
        onConfirm={(id) => {
          // deleteEmployeeTrigger({ id, token });
          handleDelete(id);
          setDeleteItemId(null);
        }}
      />

      <Table
        wrapClassName="overflow-y-auto"
        loading={loading}
        dataSource={response || []}
        columns={columns}
        rowKey="id"
      />
    </>
  );
};

export default PageTable;
