import http from "@/api/interceptors";
import { GetAll, ProductStoreState } from "@/types/product-types";
import { create } from "zustand";

const useProductStore = create<ProductStoreState>((set) => ({
  dataProducts: [],
  isLoading: false,
  totalCount: 1,

  getAllProducts: async (params: GetAll) => {
    set({ isLoading: true });
    try {
      const response = await http.get(`/products/search`, {
        params: {
          page: params.page,
          limit: params.limit,
          search: params.search,
        },
      });

      if (response.status === 200) {
        const { count, products } = response?.data?.data;
        set({
          totalCount: Math.ceil(count / params.limit),
          dataProducts: products,
        });
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      set({ totalCount: 0 });
    } finally {
      set({ isLoading: false });
    }
  },

  searchProducts: async (params: GetAll) => {
    set({ isLoading: true });
    try {
      const response = await http.get(`/products/search`, {
        params: {
          page: params.page,
          limit: params.limit,
          search: params.search,
        },
      });

      if (response.status === 200) {
        const { count, products } = response?.data?.data;
        return products
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      set({ totalCount: 0 });
    } finally {
      set({ isLoading: false });
    }
  },
  getProduct: async (id) => {
    set({ isLoading: true });
    try {
      const response = await http.get(`/products/${id}`);
      if (response.status === 200) {
        return response?.data?.data;
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      set({ totalCount: 0 });
    } finally {
      set({ isLoading: false });
    }
  },

  createRate: async (data) => {
    set({ isLoading: true });
    try {
      const response = await http.post(`/products/rate`, data);
    } catch (error) {
      console.error("Error fetching rate:", error);
      set({ totalCount: 0 });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useProductStore;
