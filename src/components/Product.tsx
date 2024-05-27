"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody, CardHeader, Image, Button } from "@nextui-org/react";

import RatingComponent from "@/components/Rating";
import { CartContext } from "@/app/cart/provider";
import type { IProduct } from "@/types";

const ProductComponent = ({ product }: { product: IProduct }) => {
  const router = useRouter();
  const { dispatch } = useContext(CartContext);

  const handleClickOnProduct = () => {
    router.push(`/product/${product.id}`);
  };

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader
        className="bg-white cursor-pointer"
        onClick={handleClickOnProduct}
      >
        <Image
          className="h-64 p-2 w-full object-contain"
          src={product.image}
          alt={product.title}
          radius="none"
          removeWrapper
        />
      </CardHeader>
      <CardBody className="gap-4 p-6">
        <h5
          className="text-xl font-semibold tracking-tight line-clamp-2 h-[3.5rem] cursor-pointer hover:underline"
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
        <span className="text-3xl font-bold">{product.price.toFixed(2)}€</span>
        <Button color="primary" fullWidth onClick={handleAddToCart}>
          Add to cart
        </Button>
      </CardBody>
    </Card>
  );
};

export default ProductComponent;
