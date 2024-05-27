"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { CircularProgress } from "@nextui-org/react";

import Product from "@/components/Product";
import { IProduct } from "@/types";

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
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] gap-4">
          {products.map((product: IProduct) => {
            return <Product key={product.id} product={product} />;
          })}
        </div>
      ) : (
        <div className="flex justify-center">
          <CircularProgress aria-label="Loading..." />
        </div>
      )}
    </>
  );
}
