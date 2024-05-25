"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button, Card } from "flowbite-react";

import RatingComponent from "@/components/Rating";
import { CartContext } from "@/app/cart/provider";
import { buttonTheme } from "@/app/_themes/buttonTheme";
import type { IProduct } from "@/app/_types/types";

const Product = ({ product }: { product: IProduct }) => {
  const router = useRouter();
  const { dispatch } = useContext(CartContext);

  const handleClickOnProduct = () => {
    router.push(`/product/${product.id}`);
  };

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <Card
      className="overflow-hidden"
      renderImage={() => (
        <div
          className="w-full bg-white p-2 cursor-pointer"
          onClick={handleClickOnProduct}
        >
          <Image
            className="h-64 w-full object-scale-down"
            src={product.image}
            alt={product.title}
          />
        </div>
      )}
    >
      <h5
        className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-2 h-[3.5rem] cursor-pointer hover:underline"
        onClick={handleClickOnProduct}
      >
        {product.title}
      </h5>
      <div className="my-2 flex items-center">
        <RatingComponent rating={Math.round(product.rating.rate)} />
        <span className="ml-3 mr-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-semibold text-primary-800 dark:bg-primary-200 dark:text-primary-800">
          {product.rating.rate}
        </span>
      </div>
      <div className="flex flex-col items-center justify-between">
        <span className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          {product.price.toFixed(2)}€
        </span>
        <Button theme={buttonTheme} color="primary" onClick={handleAddToCart}>
          Add to cart
        </Button>
      </div>
    </Card>
  );
};

export default Product;
