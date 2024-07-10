import http from "@/api/interceptors";
import { GetAll, CategoryStoreState, GetAllSub } from "@/types/category-types";
import { create } from "zustand";

const useCategoryStore = create<CategoryStoreState>((set) => ({
  categoriesData: [],
  subCategoryData: [],
  isLoading: false,
  totalCount: 1,

  getAllCategories: async (params: GetAll) => {
    set({ isLoading: true });
    try {
      const response = await http.get(`/category/search?`, {
        params,
      });
      if (response.status === 200) {
        const { count, categories } = response.data.data;
        set({
          totalCount: Math.ceil(count / params.limit),
          categoriesData: categories,
        });
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      set({ totalCount: 0 });
    } finally {
      set({ isLoading: false });
    }
  },

  getAllSub: async (params: GetAllSub) => {
    set({ isLoading: true });
    try {
      const response = await http.get(
        `/sub-category/search/${params.parent_category_id}?search=${params.search}&limit=${params.limit}&page=${params.page}`
      );

      if (response.status === 200) {
        const { count, categories } = response.data.data;
        set({
          totalCount: Math.ceil(count / params.limit),
          subCategoryData: categories,
        });
        return categories;
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      set({ totalCount: 0 });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useCategoryStore;
