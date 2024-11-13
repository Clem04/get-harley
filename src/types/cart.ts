import { OrderItem } from "./order";
import { Product } from "./product";

export interface CartState {
  items: OrderItem[];
  orderId: string | number | null;
}

export type CartAction =
  | { type: 'ADD_ITEM'; product: Product }
  | { type: 'UPDATE_QUANTITY'; productId: number; quantity: number }
  | { type: 'CLEAR_CART'; }
  | { type: 'SET_ORDER_ID'; orderId: string }