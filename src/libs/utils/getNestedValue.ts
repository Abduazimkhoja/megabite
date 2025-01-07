export const getNestedValue = <TReturn = any>(
  obj: { [key: string]: any },
  path: string,
): TReturn => {
  return path.split('.').reduce((acc, key) => {
    return acc && acc[key] !== undefined ? acc[key] : undefined;
  }, obj) as TReturn;
};
