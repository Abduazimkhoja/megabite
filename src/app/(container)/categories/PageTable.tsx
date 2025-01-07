'use client';
import Button from '@/components/ui/Button';
import DeleteModal from '@/components/ui/DeleteModal';
import Table, { TableColumn } from '@/components/ui/Table';
import { useDeleteCategoriesMutation } from '@/store/services/categories/api';
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
  const [deleteCategoriesTrigger] = useDeleteCategoriesMutation();

  const handleDelete = async (id: string | number) => {
    deleteCategoriesTrigger({ id: String(id) });
  };
  const columns: TableColumn<TColumnType>[] = [
    {
      title: 'Категория',
      key: 'name',
      dataIndex: 'name',
      className: 'w-full',
    },
    {
      title: 'Действия',
      key: 'action',
      dataIndex: 'action',
      render(_, item) {
        return (
          <div className="flex gap-4 justify-center">
            <PageForm dataItem={item} />
            <Button onClick={() => setDeleteItemId(item?.id)}>x</Button>
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
