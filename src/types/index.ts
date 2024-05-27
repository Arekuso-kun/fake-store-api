import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ICartItem extends IProduct {
  quantity: number;
}

export type TCartAction =
  | { type: "ADD_TO_CART"; payload: IProduct }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "UPDATE_CART_ITEM"; payload: { id: number; quantity: number } };

export type TCartState = ICartItem[];
