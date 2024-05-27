"use client";

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Card, CircularProgress, Image } from "@nextui-org/react";

import RatingComponent from "@/components/Rating";
import { CartContext } from "@/app/cart/provider";
import { IProduct } from "@/types";

const ProductPage = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const { dispatch } = useContext(CartContext);

  const handleAddToCart = () => {
    if (product == null) return;
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const capitalizeAndAddPeriod = (text: string): string => {
    if (!text) return "";
    const trimmedText = text.trim();
    const capitalizedText =
      trimmedText.charAt(0).toUpperCase() + trimmedText.slice(1);
    return capitalizedText.endsWith(".")
      ? capitalizedText
      : `${capitalizedText}.`;
  };

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${params.id}`)
      .then((response) => {
        const data = response.data;
        setProduct(data);
      });
  }, [params.id]);

  return (
    <>
      {product != null ? (
        <div>
          <h5 className="mb-4 text-xl font-semibold">{product.title}</h5>
          <div className="flex flex-row gap-4 items-stretch justify-between">
            <Image
              className="bg-white h-1/3 w-1/3 p-3 object-contain"
              src={product.image}
              alt={product.title}
              removeWrapper
            />

            <div className="w-2/5">
              <div className="mb-4 flex items-center">
                <RatingComponent rating={Math.round(product.rating.rate)} />

                <span className="bg-primary-100 text-primary-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800 ms-3 mr-1">
                  {product.rating.rate}
                </span>

                <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
                <a
                  href="#"
                  className="ml-1 text-sm font-medium underline hover:no-underline"
                >
                  {product.rating.count} reviews
                </a>
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {capitalizeAndAddPeriod(product.description)}
              </div>
            </div>
            <Card className="grow h-40 p-6">
              <div className="grow flex flex-col justify-between">
                <span className="text-3xl font-bold">
                  {product.price.toFixed(2)}€
                </span>
                <Button fullWidth color="primary" onClick={handleAddToCart}>
                  Add to cart
                </Button>
              </div>
            </Card>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <CircularProgress aria-label="Loading..." />
        </div>
      )}
    </>
  );
};

export default ProductPage;
