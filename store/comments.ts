import http from "@/api/interceptors";
import {
  CommentsStoreState,
  CommentData,
  CreateComment,
} from "@/types/comment-types";
import { create } from "zustand";

const useCommentStore = create<CommentsStoreState>((set) => ({
  dataComments: [],
  isLoading: false,
  totalCount: 1,
  countComment: 0,

  getComments: async (id: string) => {
    set({ isLoading: true });
    try {
      const response = await http.get(`/comment/product/${id}`);
      if (response.status === 200) {
        set({
          countComment: response.data.data.count,
          dataComments: response.data.data.comment,
        });
      }
      return response.status;
    } catch (error) {
      console.error("Error fetching comments:", error);
      set({ totalCount: 0 });
    } finally {
      set({ isLoading: false });
    }
  },

  createComment: async (commentData: CreateComment) => {
    set({ isLoading: true });
    try {
      const response = await http.post(`/comment/create`, commentData);
      if (response.status === 201) {
        set((state) => ({
          dataComments: [...state.dataComments, response.data.data],
          countComment: state.countComment + 1,
        }));
      }
      return response.status;
    } catch (error) {
      console.error("Error creating comment:", error);
      set({ totalCount: 0 });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useCommentStore;
