import { ReactNode, JSX } from 'react';

export type TableColumn<T> = {
  title: string;
  key: string;
  dataIndex: keyof T | (string & {});
  align?: 'center' | 'left' | 'right';
  render?: (value: any, record: T, index: number) => ReactNode;
  className?: string;
  tdProps?: (
    value: any,
    record: T,
    index: number,
  ) => JSX.IntrinsicElements['td'];
};

export type TableProps<T> = {
  columns: TableColumn<T>[];
  dataSource: T[];
  wrapClassName?: string;
  loading?: boolean;
  tbodyClassName?: string;
  rowKey: Extract<keyof T, string | number> | 'index';
} & JSX.IntrinsicElements['table'];

const Table = <T,>({
  className = '',
  wrapClassName = '',
  tbodyClassName = '',
  loading,
  columns,
  rowKey,
  dataSource,
  ...rest
}: TableProps<T>) => {
  const getTbody = () => {
    if (!dataSource?.length || loading) {
      return (
        <tr>
          <td colSpan={columns?.length}>
            <p className="flex items-center justify-center h-40 text-xl font-bold">
              {loading ? (
                <span className="loading loading-spinner loading-lg text-primary"></span>
              ) : (
                'Нет данных'
              )}
            </p>
          </td>
        </tr>
      );
    }

    return dataSource?.map((record, rowIndex) => (
      <tr key={rowKey === 'index' ? rowIndex : (record?.[rowKey] as string)}>
        {columns?.map((col) => (
          <td
            key={col?.key}
            className={`text-nowrap truncate min-w-5 max-w-100 text-${
              col?.align || 'left'
            } ${col?.className}`}
            {...col?.tdProps?.(
              (record as any)?.[col?.dataIndex],
              record,
              rowIndex,
            )}
          >
            {col?.render
              ? col?.render((record as any)?.[col?.dataIndex], record, rowIndex)
              : ((record as any)[col?.dataIndex] as ReactNode)}
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <div className={`bg-white rounded-xl ${wrapClassName}`}>
      <table
        className={`table overflow-y-scroll relative ${className}`}
        {...rest}
      >
        <thead className="sticky top-0 z-1">
          <tr className="bg-[#FAFAFA]">
            {columns?.map(({ key, title, align, className = '' }) => (
              <th className={`text-${align || 'left'} ${className}`} key={key}>
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={`bg-white ${tbodyClassName}`}>{getTbody()}</tbody>
      </table>
    </div>
  );
};

export default Table;
