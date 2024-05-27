"use client";

import React, {
  Dispatch,
  ReactNode,
  createContext,
  useEffect,
  useReducer,
} from "react";
import { TCartState, TCartAction } from "@/types";

export const CartContext = createContext<{
  cart: TCartState;
  dispatch: Dispatch<TCartAction>;
}>({
  cart: [],
  dispatch: () => null,
});

const cartReducer = (state: TCartState, action: TCartAction): TCartState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    }
    case "REMOVE_FROM_CART": {
      return state.filter((item) => item.id !== action.payload);
    }
    case "UPDATE_CART_ITEM": {
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    }
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
