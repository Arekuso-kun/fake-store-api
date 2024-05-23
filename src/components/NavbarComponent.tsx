"use client";

import { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Navbar, Button, DarkThemeToggle } from "flowbite-react";
import { Cart } from "flowbite-react-icons/outline";

import { CartContext } from "@/app/cart/provider";
import { buttonTheme } from "@/app/_themes/buttonTheme";
import { navbarTheme } from "@/app/_themes/navbarTheme";

const NavbarComponent = () => {
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
        (accumulator, item) => accumulator + item.price * item.quantity,
        0
      )
    );
  }, [cart]);

  return (
    <Navbar fluid theme={navbarTheme}>
      <Navbar.Brand href="/">
        <img
          src="/fakestoreapi.png"
          className="mr-3 h-6 sm:h-9"
          alt="Fake Store API Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Fake Store
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <DarkThemeToggle className="mr-3" />
        <Button
          className="max-md:mr-3"
          theme={buttonTheme}
          color="primary"
          onClick={handleClickCart}
        >
          <span className="flex items-center justify-center">
            <span className="mr-1">
              {totalCost ? `${totalCost.toFixed(2)}€` : "Cart"}
            </span>
            <Cart />
          </span>
        </Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        {navLinks.map((link) => (
          <Navbar.Link key={link.title} href={link.href} active={link.active}>
            {link.title}
          </Navbar.Link>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
