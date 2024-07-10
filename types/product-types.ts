export interface GetAll {
  page: number;
  limit: number;
  search: string | null | undefined;
}

export interface Product {
  id: number;
  createdAt: string;
  lastUpdateAt: string;
  name: string;
  price: string;
  images: string[];
  brand_id: number;
}
export interface CreateRate {
  rate: number;
  product_id: any;
}

export interface ProductStoreState {
  dataProducts: any[];
  isLoading: boolean;
  totalCount: number;
  getAllProducts: (params: GetAll) => Promise<void>;
  searchProducts: (params: GetAll) => Promise<void>;
  getProduct: (id: any) => Promise<void>;
  createRate: (data: CreateRate) => Promise<void>;
}

// export interface Product {
//   age_max: number;
//   age_min: number;
//   category_id: string;
//   color: [string];
//   cost: number;
//   count: number;
//   description: string;
//   discount: number;
//   for_gender: string;
//   image_url: [string];
//   made_in: string;
//   id: number;
//   name: string;
//   size: [string];
// }
