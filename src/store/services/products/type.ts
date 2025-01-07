// data item
export type TProductsItem = {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  createdAt: string;
};

// data list
export type TProductsList = TProductsItem[];

export type TProductsBody = TCreateProductsBody | TUpdateProductsBody;

// HTTPS 🚀

// GetAll 🔵
export type TGetAllProductsResponse = TProductsList;
export type TGetAllProductsParam = void;

// GetOne 🔵
export type TGetOneProductsResponse = TProductsItem;
export type TGetOneProductsParam = Pick<TProductsItem, 'id'>;

// Create 🟢
export type TCreateProductsResponse = TProductsItem;
export type TCreateProductsBody = Omit<TProductsItem, 'id' | 'createdAt'>;
export type TCreateProductsForm = TCreateProductsBody;
export type TCreateProductsParam = {
  body: TCreateProductsBody;
};

// Update 🟡
export type TUpdateProductsResponse = TProductsItem;
export type TUpdateProductsBody = Omit<TProductsItem, 'id' | 'createdAt'>;
export type TUpdateProductsForm = TUpdateProductsBody;
export type TUpdateProductsParam = Pick<TProductsItem, 'id'> & {
  body: TUpdateProductsBody;
};

// Delete 🔴
export type TDeleteProductsResponse = TProductsItem;
export type TDeleteProductsParam = Pick<TProductsItem, 'id'>;
