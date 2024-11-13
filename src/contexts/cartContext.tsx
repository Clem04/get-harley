import React, { createContext, ReactNode, useReducer, useContext } from "react";
import { CartState, CartAction } from "../types/cart";
import cartReducer from "~/reducers/cartReducer";

export const CartContext = createContext<{ state: CartState; dispatch: React.Dispatch<CartAction> } | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], orderId: null });
  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
};
