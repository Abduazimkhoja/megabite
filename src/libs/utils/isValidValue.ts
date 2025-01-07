export function isValidValue(value: any): boolean {
  if (value === undefined || value === null || Number.isNaN(value)) return false;
  if (typeof value === 'string' && !value.trim()) return false;
  if (typeof value === 'object' && (value?.length === 0 || Object.keys(value).length === 0))
    return false;
  return true;
}
