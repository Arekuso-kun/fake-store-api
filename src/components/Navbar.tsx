"use client";

import { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { CartContext } from "@/app/cart/provider";
import { ICartItem } from "@/types";
import { ThemeSwitch } from "@/components/theme-switch";

import {
  Navbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { SearchIcon, ShoppingCartIcon } from "@/components/icons";

const NavbarComponent = () => {
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  const { cart, dispatch } = useContext(CartContext);
  const [totalCost, setTotalCost] = useState(0);

  const router = useRouter();
  const pathname = usePathname();
  const navLinks = [
    {
      href: "/",
      title: "Home",
      active: pathname === "/",
    },
    {
      href: "/store",
      title: "Store",
      active: pathname === "/store",
    },
  ];

  const handleClickCart = () => {
    router.push("/cart");
  };

  useEffect(() => {
    setTotalCost(
      cart.reduce(
        (accumulator: number, item: ICartItem) =>
          accumulator + item.price * item.quantity,
        0
      )
    );
  }, [cart]);

  return (
    <Navbar maxWidth="2xl" position="sticky" isBordered>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image
              src="/fakestoreapi.png"
              className="mr-3"
              alt="Fake Store API Logo"
              width={39.35}
              height={36}
            />
            <p className="font-bold text-inherit"></p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            className="text-sm font-normal"
            endContent={<ShoppingCartIcon />}
            color="primary"
            onClick={handleClickCart}
          >
            <span className="flex items-center justify-center">
              <span className="mr-1">
                {totalCost ? `${totalCost.toFixed(2)}€` : "Cart"}
              </span>
            </span>
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </Navbar>
  );
};

export default NavbarComponent;
