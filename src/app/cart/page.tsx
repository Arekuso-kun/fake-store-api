"use client";

import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button, Table } from "flowbite-react";

import { CartContext } from "@/app/cart/provider";
import { buttonTheme } from "@/app/_themes/buttonTheme";
import { ICartItem } from "@/app/_types/types";

const Cart = () => {
  const router = useRouter();
  const { cart, dispatch } = useContext(CartContext);

  const handleClickOnProduct = (id: number) => {
    router.push(`/product/${id}`);
  };

  const handleRemove = (id: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch({ type: "UPDATE_CART_ITEM", payload: { id, quantity } });
  };

  return (
    <>
      {cart.length > 0 ? (
        <main className="flex flex-col items-center mt-4">
          <div className="max-w-7xl w-full">
            <Table className="">
              <Table.Head>
                <Table.HeadCell></Table.HeadCell>
                <Table.HeadCell>Product name</Table.HeadCell>
                <Table.HeadCell>Quantity</Table.HeadCell>
                <Table.HeadCell>Price per unit</Table.HeadCell>
                <Table.HeadCell>Total Price</Table.HeadCell>
                <Table.HeadCell>
                  <span className="sr-only">Edit</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {cart.map((item: ICartItem) => (
                  <Table.Row
                    key={item.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell
                      className="p-2 bg-white cursor-pointer"
                      onClick={() => {
                        handleClickOnProduct(item.id);
                      }}
                    >
                      <div className="relative h-32 w-32">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          objectFit="contain"
                        />
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <h5
                        className="text-lg font-semibold text-gray-900 dark:text-white cursor-pointer hover:underline"
                        onClick={() => {
                          handleClickOnProduct(item.id);
                        }}
                      >
                        {item.title}
                      </h5>
                    </Table.Cell>
                    <Table.Cell>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleUpdateQuantity(item.id, Number(e.target.value))
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-16 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      />
                    </Table.Cell>
                    <Table.Cell>{`${item.price.toFixed(2)}€`}</Table.Cell>
                    <Table.Cell>{`${(item.price * item.quantity).toFixed(
                      2
                    )}€`}</Table.Cell>
                    <Table.Cell>
                      <div className="flex justify-center">
                        <Button
                          theme={buttonTheme}
                          color="failure"
                          onClick={() => handleRemove(item.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell></Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell className="font-medium text-lg text-gray-900 dark:text-white">
                    {cart
                      .reduce(
                        (acc, item) => acc + item.price * item.quantity,
                        0
                      )
                      .toFixed(2)}
                    €
                  </Table.Cell>
                  <Table.Cell className="flex justify-center">
                    <Button
                      className="whitespace-nowrap"
                      theme={buttonTheme}
                      color="primary"
                    >
                      Place order
                    </Button>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </main>
      ) : (
        <main className="grow flex items-center justify-center">
          <span className="text-2xl font-semibold text-gray-900 dark:text-white">
            Your cart is empty
          </span>
        </main>
      )}
    </>
  );
};

export default Cart;
