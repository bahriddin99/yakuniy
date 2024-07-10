export interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  createdAt: string;
  hashed_refresh_token: string;
  lastUpdateAt: number;
  role: string;
}

export interface CommentData {
  comment: string;
  createdAt: string;
  id: number;
  lastUpdateAt: string;
  product_id: number;
  user_id: UserData;
}

export interface CreateComment {
  comment: string;
  product_id: number;
}

export interface CommentsStoreState {
  dataComments: CommentData[];
  isLoading: boolean;
  totalCount: number;
  countComment: number;
  getComments: (id: any) => Promise<number | undefined>;
  createComment: (comment: CreateComment) => Promise<number | undefined>;
}
