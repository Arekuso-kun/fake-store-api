"use client";

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Card, Spinner } from "flowbite-react";

import { SpinnerTheme } from "@/app/_themes/spinnerTheme";
import RatingComponent from "@/components/RatingComponent";
import { IProduct } from "@/app/_types/types";
import { buttonTheme } from "@/app/_themes/buttonTheme";
import { CartContext } from "@/app/cart/provider";
import Image from "next/image";

const ProductPageComponent = ({ productId }: { productId: string }) => {
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
      .get(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => {
        const data = response.data;
        setProduct(data);
      });
  }, [productId]);

  return (
    <>
      {product != null ? (
        <main className="grow flex flex-col items-center my-4">
          <div className="max-w-7xl w-full">
            <h5 className="mb-4 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {product.title}
            </h5>
            <div className="flex flex-row gap-4 items-stretch justify-between">
              <div className="w-96 bg-white p-3 rounded-3xl">
                <Image
                  className="h-96 w-full object-scale-down"
                  src={product.image}
                  alt={product.title}
                />
              </div>
              <div>
                <div className="mb-4 flex items-center">
                  <RatingComponent rating={Math.round(product.rating.rate)} />

                  <span className="ml-3 mr-1 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-semibold text-primary-800 dark:bg-primary-200 dark:text-primary-800">
                    {product.rating.rate}
                  </span>

                  <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
                  <a
                    href="#"
                    className="ml-1 text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
                  >
                    {product.rating.count} reviews
                  </a>
                </div>
                <div className="text-gray-600 dark:text-gray-400 w-[36rem]">
                  {capitalizeAndAddPeriod(product.description)}
                </div>
              </div>
              <Card className="grow h-40">
                <div className="grow flex flex-col justify-between">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {product.price.toFixed(2)}€
                  </span>
                  <Button
                    fullSized
                    theme={buttonTheme}
                    color="primary"
                    onClick={handleAddToCart}
                  >
                    Add to cart
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </main>
      ) : (
        <main className="grow flex items-center justify-center">
          <Spinner
            theme={SpinnerTheme}
            color="primary"
            size="xl"
            aria-label="Loading product..."
          />
        </main>
      )}
    </>
  );
};

export default ProductPageComponent;
