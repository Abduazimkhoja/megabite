// data item
export type TCategoriesItem = {
  id: string;
  name: string;
  createdAt: string;
};

// data list
export type TCategoriesList = TCategoriesItem[];

export type TCategoriesBody = TCreateCategoriesBody | TUpdateCategoriesBody;

// HTTPS 🚀

// GetAll 🔵
export type TGetAllCategoriesResponse = TCategoriesList;
export type TGetAllCategoriesParam = void;

// GetOne 🔵
export type TGetOneCategoriesResponse = TCategoriesItem;
export type TGetOneCategoriesParam = Pick<TCategoriesItem, 'id'>;

// Create 🟢
export type TCreateCategoriesResponse = TCategoriesItem;
export type TCreateCategoriesBody = Omit<TCategoriesItem, 'id' | 'createdAt'>;
export type TCreateCategoriesForm = TCreateCategoriesBody;
export type TCreateCategoriesParam = {
  body: TCreateCategoriesBody;
};

// Update 🟡
export type TUpdateCategoriesResponse = TCategoriesItem;
export type TUpdateCategoriesBody = Omit<TCategoriesItem, 'id' | 'createdAt'>;
export type TUpdateCategoriesForm = TUpdateCategoriesBody;
export type TUpdateCategoriesParam = Pick<TCategoriesItem, 'id'> & {
  body: TUpdateCategoriesBody;
};

// Delete 🔴
export type TDeleteCategoriesResponse = TCategoriesItem;
export type TDeleteCategoriesParam = Pick<TCategoriesItem, 'id'>;
