export interface CartStoreState {
  dataCardPr: any[];
  isLoading: boolean;
  totalCount: number;
  countCartPr: number;
  getCartPrs: (id: any) => Promise<number | undefined>;
  addToCart: (product_id: any) => Promise<number | undefined>;
  deleteFromCart: (id: any) => Promise<number | undefined>;
  chengedata: (data: any) => Promise<void>;
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
}
