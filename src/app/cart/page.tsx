"use client";

import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Button,
  Image,
} from "@nextui-org/react";

import { CartContext } from "@/app/cart/provider";
import { ICartItem } from "@/types";

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
        <div className="flex flex-col items-center mt-4">
          <Table
            bottomContent={
              <>
                <div className="font-medium text-lg">
                  Total:{" "}
                  {cart
                    .reduce(
                      (accumulator: number, item: ICartItem) =>
                        accumulator + item.price * item.quantity,
                      0
                    )
                    .toFixed(2)}
                  €
                </div>
                <Button color="primary">Place order</Button>
              </>
            }
          >
            <TableHeader>
              <TableColumn>
                <span className="sr-only">Image</span>
              </TableColumn>
              <TableColumn>Product name</TableColumn>
              <TableColumn>Quantity</TableColumn>
              <TableColumn>Price per unit</TableColumn>
              <TableColumn>Total Price</TableColumn>
              <TableColumn align="center">
                <span className="sr-only">Edit</span>
              </TableColumn>
            </TableHeader>
            <TableBody>
              {cart.map((item: ICartItem) => (
                <TableRow key={item.id}>
                  <TableCell
                    className="cursor-pointer"
                    onClick={() => {
                      handleClickOnProduct(item.id);
                    }}
                  >
                    <Image
                      className="bg-white h-32 w-full min-w-16 p-2 object-contain"
                      src={item.image}
                      alt={item.title}
                      removeWrapper
                    />
                  </TableCell>
                  <TableCell>
                    <h5
                      className="text-lg font-semibold cursor-pointer hover:underline"
                      onClick={() => {
                        handleClickOnProduct(item.id);
                      }}
                    >
                      {item.title}
                    </h5>
                  </TableCell>
                  <TableCell>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleUpdateQuantity(item.id, Number(e.target.value))
                      }
                      className="text-sm rounded-lg block w-16 p-2.5"
                    />
                  </TableCell>
                  <TableCell>{`${item.price.toFixed(2)}€`}</TableCell>
                  <TableCell>{`${(item.price * item.quantity).toFixed(
                    2
                  )}€`}</TableCell>
                  <TableCell>
                    <Button
                      color="danger"
                      variant="bordered"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex justify-center">
          <span className="text-2xl font-semibold">Your cart is empty</span>
        </div>
      )}
    </>
  );
};

export default Cart;
