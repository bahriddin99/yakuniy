import http from "@/api/interceptors";
import { GetAll } from "@/types/product-types";

export const getAll = async (data: GetAll) => {
  try {
    const response = await http.get(
      `/products?page=${data.page}&limit=${data.limit}&name=${data.search}`
    );
    return response.data.products;
  } catch (error) {
    console.error("Prdoucts get error:", error);
    throw error;
  }
};
