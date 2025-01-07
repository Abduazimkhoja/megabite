import { getNestedValue } from '../getNestedValue';

type Params<TData = Record<string, string>[]> = {
  filterList: TData;
  filterItemPath: 'category.name' | 'example' | 'example.name' | (string & {});
};

export const tableColumnFilter = ({ filterList, filterItemPath }: Params) => {
  const filters = filterList.map((text) => ({ text: text, value: text }));

  const onFilter = (value: string, record: Record<string, any>) => {
    const item = getNestedValue(record, filterItemPath);
    const filtered = item.indexOf(value as string) === 0;
    return filtered;
  };

  return {
    filters,
    onFilter,
  };
};
