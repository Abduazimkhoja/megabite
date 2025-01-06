export type PagesPaths = ['categories', 'products', 'cart', 'home'];

export const headersData: Record<
  PagesPaths[number],
  { title: string; subtitle: string; addButtonLabel: string }
> = {
  categories: {
    title: 'Категории',
    subtitle: 'Список категорий',
    addButtonLabel: 'Добавить категорию',
  },
  products: {
    title: 'Продукты',
    subtitle: 'Список продуктов',
    addButtonLabel: 'Добавить продукт',
  },
  cart: {
    title: 'Корзина',
    subtitle: 'Список продуктов',
    addButtonLabel: '',
  },
  home: {
    title: 'Главная',
    subtitle: 'Список продуктов',
    addButtonLabel: '',
  },
};
