import http from "@/api/interceptors";
import { SignUp } from "@/types/auth-types";
import { toast } from "react-toastify";
import { create } from "zustand";
interface AcountStoreState {
  userData: any;
  isLoading: boolean;
  getUserData: (userID: any) => Promise<void>;
  updateUser: (data: SignUp, id: number) => Promise<void>;
}

const useAccountStore = create<AcountStoreState>((set) => ({
  userData: [],
  isLoading: false,

  getUserData: async (userID) => {
    set({ isLoading: true });
    try {
      const response = await http.get(`/users/${userID}`);
      if (response.status === 200) {
        set({ userData: response.data.data });
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      set({ userData: [] }); // Clear userData on error
    } finally {
      set({ isLoading: false });
    }
  },

  updateUser: async (data, id) => {
    set({ isLoading: true });
    try {
      const response = await http.patch(`/users/update/${id}`, data);
      if (response.status === 200) {
        const resData = response.data.data;
        set({
          userData: resData,
        });
         toast.success("Tahrirlandi");
      }
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  },
}));

export default useAccountStore;
