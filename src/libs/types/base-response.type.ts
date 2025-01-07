export type TBaseApiResponseData = {
  id: number;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type TBaseApiResponseElements = {
  status: number;
  message: string;
};
