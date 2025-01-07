import { findItemByKey } from '@/libs/utils/findItem';
import { getMessageByStatusCode } from '@/libs/utils/getMessagebyStatusCode';
import { isFulfilled, isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

export const notificationMiddleware: Middleware = (_storeAPI) => (next) => (action: any) => {

  const shouldNotify = (() => {
    const meta = action?.meta?.arg;
    const notification = meta?.originalArgs?.notification;

    if (typeof notification === 'boolean') return notification;

    if (meta?.notification === false) {
      return false;
    }

    const method: string = meta?.type || 'mutation';
    return method.toLowerCase() === 'mutation';
  })();

  if (shouldNotify && isFulfilled(action)) {
    toast.success('Запрос выполнен успешно');
  }

  if (shouldNotify && isRejectedWithValue(action)) {
    const errorMessage =
      findItemByKey(action?.payload, 'message') ||
      getMessageByStatusCode(action?.meta?.baseQueryMeta?.response?.status);
    toast.error(errorMessage);
  }

  return next(action);
};

// Пример вызова запроса с использованием `notification`
// const { data, error, isLoading } = useGetItemsQuery(undefined, {
//   extraOptions: { ⭕ notification: true },
// });

// endpoints: (builder) => ({
// addItem: builder.mutation({
//   query: (newItem) => ({
//     url: '/items',
//     method: 'POST',
//     body: newItem,
//   }),
//   ⭕ extraOptions: {
//     notification: true, // POST запросы будут иметь notification: true
//   },
// }),
