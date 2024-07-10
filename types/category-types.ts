export interface GetAll {
  page: number;
  limit: number;
  search: string | null | undefined;
}

export interface GetAllSub extends GetAll {
  parent_category_id: number;
}

export interface CategoryData {
  id: number;
  createdAt: string;
  lastUpdateAt: string;
  name: string;
}

export interface CategoryStoreState {
  categoriesData: any[];
  subCategoryData: any[];
  isLoading: boolean;
  totalCount: number;
  getAllCategories: (params: GetAll) => Promise<void>;
  getAllSub: (params: GetAllSub) => Promise<void>;
}
