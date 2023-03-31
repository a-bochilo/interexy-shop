export interface CartItemDto {
  id?: string;
  productId: string;
  quantity: number;
}

export interface CartDto {
  id: string;
  created: string;
  updated: string;
  items: CartItemDto[] | [];
}
