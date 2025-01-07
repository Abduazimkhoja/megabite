import { getNestedValue } from '@/libs/utils/getNestedValue';
import { alphabeticalSort } from './alphabeticalSort';
import { numericSort } from './numericSort';
import { lengthSort } from './lengthSort';

type ItemPath = 'category.name' | 'example' | 'example.name' | (string & {});
type SortType = 'alphabet' | 'number' | 'length';

export const tableColumnFilter = (itemPath: ItemPath, sortType: SortType) => {
  const sorters = {
    alphabet: alphabeticalSort,
    number: numericSort,
    length: lengthSort,
  };

  const sorter = (a: Record<string, any>, b: Record<string, any>) => {
    const itemA = getNestedValue(a, itemPath);
    const itemB = getNestedValue(b, itemPath);
    const sorted =
      sortType === 'number'
        ? sorters[sortType](itemA as number, itemB as number)
        : sorters[sortType](itemA as string, itemB as string);

    return sorted;
  };

  return sorter;
};
