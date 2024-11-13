import { Product } from "./product"

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: number;
  items: OrderItem[];
  totalAmount: number;
  status: 'CART' | 'PURCHASED'
}
