type Item = { [key: string]: any };

export function findItemByKey<T extends Item>(data: T | T[] | string, key: string): any {
  if (!data) return undefined;
  if (Array.isArray(data)) {
    for (const item of data) {
      const found = findItemByKey(item, key);
      if (found) return found;
    }
  } else if (typeof data === 'object' && data !== null) {
    if (key in data) {
      return data[key];
    }

    for (const nestedKey in data) {
      if (typeof data[nestedKey] === 'object') {
        const found = findItemByKey(data[nestedKey], key);
        if (found) return found;
      }
    }
  }

  return undefined;
}
