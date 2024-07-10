import http from "@/api/interceptors";
import {
  GetAll,
  BrandStoreState,
  GetAllByCategoryId,
} from "@/types/brand-types";
import { create } from "zustand";

const useBrandStore = create<BrandStoreState>((set) => ({
  data: [],
  isLoading: false,
  totalCount: 1,

  getAll: async (params: GetAll) => {
    set({ isLoading: true });
    try {
      const response = await http.get(`/products`, {
        params: {
          page: params.page,
          limit: params.limit,
          name: params.search,
        },
      });

      if (response.status === 200) {
        const { total_count, products } = response.data;
        set({
          totalCount: Math.ceil(total_count / params.limit),
          data: products,
        });
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      set({ totalCount: 0 });
    } finally {
      set({ isLoading: false });
    }
  },
  getAllByCategoryId: async (params: GetAllByCategoryId) => {
    set({ isLoading: true });
    try {
      const response = await http.get(
        `/brand/category/${params.id}?limit=${params.limit}&page=${params.page}`
      );
      if (response.status === 200) {
        const { count, brands } = response.data.data;
        set({
          totalCount: Math.ceil(count / params.limit),
        });
        return brands;
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      set({ totalCount: 0 });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useBrandStore;
