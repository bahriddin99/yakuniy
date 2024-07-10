export interface GetAll {
  page: number;
  limit: number;
  search: string | null | undefined;
}

export interface GetAllByCategoryId {
  id: number;
  page: number;
  limit: number;
}

export interface BrandStoreState {
  data: any[];
  isLoading: boolean;
  totalCount: number;
  getAll: (params: GetAll) => Promise<void>;
  getAllByCategoryId: (params: GetAllByCategoryId) => Promise<void>;
}
