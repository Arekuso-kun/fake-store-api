import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
<<<<<<< Updated upstream
=======
import { Link } from "@nextui-org/react";
>>>>>>> Stashed changes

import NavbarComponent from "@/components/Navbar";
import { CartProvider } from "@/app/cart/provider";
import { Providers } from "@/app/providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
<<<<<<< Updated upstream
      <body
        className={`bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col ${inter.className}`}
      >
        <CartProvider>
          <NavbarComponent />
          {children}
        </CartProvider>
=======
      <body className={`bg-background min-h-screen ${inter.className}`}>
        <Providers
          themeProps={{ attribute: "class", defaultTheme: "dark", children }}
        >
          <div className="relative flex flex-col min-h-screen">
            <CartProvider>
              <NavbarComponent />
              <main className="container mx-auto max-w-screen-2xl pt-16 px-6 flex-grow">
                {children}
              </main>
              <footer className="w-full flex items-center justify-center py-4">
                <Link
                  isExternal
                  className="flex items-center gap-1 text-current"
                  href="https://fakestoreapi.com/"
                  title="fakestoreapi.com homepage"
                >
                  <span className="text-default-600">Powered by</span>
                  <p className="text-primary">Fake Store API</p>
                </Link>
              </footer>
            </CartProvider>
          </div>
        </Providers>
>>>>>>> Stashed changes
      </body>
    </html>
  );
}
