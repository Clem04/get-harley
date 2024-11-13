import { CartState, CartAction } from "../types/cart";

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const itemExists = state.items.find((item) => item.product.id === action.product.id);
      if (itemExists) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.product.id === action.product.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, { product: action.product, quantity: 1 }],
          orderId: state.orderId || generateOrderId(),
        };
      }
    }
    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.product.id !== action.productId),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.productId ? { ...item, quantity: action.quantity } : item
        ),
      };
    }
    case 'CLEAR_CART':
      return { items: [], orderId: null };
    case 'SET_ORDER_ID':
      return { ...state, orderId: action.orderId };
    default:
      return state;
  }
};

const generateOrderId = () => {
  return Math.floor(Math.random() * 1000000000);
};

export default cartReducer;
