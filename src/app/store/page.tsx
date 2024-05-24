"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";

import Product from "@/components/Product";
import { SpinnerTheme } from "@/app/_themes/spinnerTheme";
import { IProduct } from "@/app/_types/types";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((response) => {
      const data = response.data;
      setProducts(data);
    });
  }, []);

  return (
    <>
      {products.length > 0 ? (
        <main className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-4 mx-24 my-4">
          {products.map((product: IProduct) => {
            return <Product key={product.id} product={product} />;
          })}
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
}
