"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ShoppingCart,
  Search,
  Menu,
  LogIn,
  ShoppingBasket,
  User,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import * as Dialog from "@radix-ui/react-dialog";
import { createClient } from "@/utils/supabase/client";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tab, setTab] = useState("login");

  useEffect(() => {
    const getUser = async () => {
      const supabase = await createClient();

      const { data: user, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error.message);
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(!!user);
      }
    };

    getUser();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <ShoppingBasket className="h-6 w-6 text-green-600" />
            <span className="font-bold text-xl">Fresh Market</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="#products"
              className="text-gray-600 hover:text-green-600"
            >
              Products
            </Link>
            <Link
              href="#services"
              className="text-gray-600 hover:text-green-600"
            >
              Services
            </Link>
            <Link href="#about" className="text-gray-600 hover:text-green-600">
              About
            </Link>
            <Link
              href="#contact"
              className="text-gray-600 hover:text-green-600"
            >
              Contact
            </Link>
          </nav>

          {/* Search, Cart, Login/Profile, and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top">
                <SheetHeader>
                  <SheetTitle>Search Products</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <Input
                    placeholder="Search for products..."
                    className="max-w-lg mx-auto"
                  />
                </div>
              </SheetContent>
            </Sheet>

            {/* Cart */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center bg-green-600">
                    3
                  </Badge>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Your Cart</SheetTitle>
                </SheetHeader>
                <div className="mt-8">
                  <CartPreview />
                </div>
              </SheetContent>
            </Sheet>

            {/* Login/Profile */}
            {isLoggedIn ? (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>Profile</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <p className="font-medium">Welcome, John Doe!</p>
                    <p className="text-sm text-gray-600">johndoe@example.com</p>
                    <Button
                      className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => setIsLoggedIn(false)}
                    >
                      Logout
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            ) : (
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <Button variant="ghost" size="icon">
                    <LogIn className="h-5 w-5" />
                  </Button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
                  <Dialog.Content className="fixed z-50 bg-white rounded-lg shadow-lg p-6 w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 focus:outline-none">
                    <Dialog.Title className="text-lg font-semibold">
                      Welcome to Fresh Market
                    </Dialog.Title>
                    <Dialog.Description className="text-sm text-gray-600">
                      Please login or sign up to continue.
                    </Dialog.Description>

                    {/* Tabs for Login and Signup */}
                    <div className="mt-4">
                      <div className="flex space-x-4 border-b pb-2">
                        <button
                          onClick={() => setTab("login")}
                          className={`font-medium ${
                            tab === "login"
                              ? "text-green-600 border-b-2 border-green-600"
                              : "text-gray-600"
                          }`}
                        >
                          Login
                        </button>
                        <button
                          onClick={() => setTab("signup")}
                          className={`font-medium ${
                            tab === "signup"
                              ? "text-green-600 border-b-2 border-green-600"
                              : "text-gray-600"
                          }`}
                        >
                          Signup
                        </button>
                      </div>
                      <div className="mt-6">
                        {tab === "login" ? (
                          // Login Form
                          <div className="flex flex-col gap-3">
                            <label>
                              <span className="text-sm font-semibold mb-1">
                                Email
                              </span>
                              <Input
                                placeholder="Enter your email"
                                className="w-full"
                                type="email"
                              />
                            </label>
                            <label>
                              <span className="text-sm font-semibold mb-1">
                                Password
                              </span>
                              <Input
                                placeholder="Enter your password"
                                className="w-full"
                                type="password"
                              />
                            </label>
                            <div className="flex gap-3 mt-6 justify-end">
                              <Dialog.Close asChild>
                                <Button variant="secondary" color="gray">
                                  Cancel
                                </Button>
                              </Dialog.Close>
                              <Dialog.Close asChild>
                                <Button
                                  className="bg-green-600 text-white"
                                  onClick={() => setIsLoggedIn(true)}
                                >
                                  Login
                                </Button>
                              </Dialog.Close>
                            </div>
                          </div>
                        ) : (
                          // Signup Form
                          <div className="flex flex-col gap-3">
                            <label>
                              <span className="text-sm font-semibold mb-1">
                                Name
                              </span>
                              <Input
                                placeholder="Enter your name"
                                className="w-full"
                                type="text"
                              />
                            </label>
                            <label>
                              <span className="text-sm font-semibold mb-1">
                                Email
                              </span>
                              <Input
                                placeholder="Enter your email"
                                className="w-full"
                                type="email"
                              />
                            </label>
                            <label>
                              <span className="text-sm font-semibold mb-1">
                                Password
                              </span>
                              <Input
                                placeholder="Create a password"
                                className="w-full"
                                type="password"
                              />
                            </label>
                            <label>
                              <span className="text-sm font-semibold mb-1">
                                Confirm Password
                              </span>
                              <Input
                                placeholder="Confirm your password"
                                className="w-full"
                                type="password"
                              />
                            </label>
                            <div className="flex gap-3 mt-6 justify-end">
                              <Dialog.Close asChild>
                                <Button variant="secondary" color="gray">
                                  Cancel
                                </Button>
                              </Dialog.Close>
                              <Dialog.Close asChild>
                                <Button
                                  className="bg-green-600 text-white"
                                  onClick={() => setIsLoggedIn(true)}
                                >
                                  Signup
                                </Button>
                              </Dialog.Close>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col space-y-4 mt-8">
                  <Link href="#products" className="text-lg">
                    Products
                  </Link>
                  <Link href="#services" className="text-lg">
                    Services
                  </Link>
                  <Link href="#about" className="text-lg">
                    About
                  </Link>
                  <Link href="#contact" className="text-lg">
                    Contact
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

function CartPreview() {
  const cartItems = [
    {
      name: "Fresh Organic Apples",
      price: 4.99,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6",
    },
    {
      name: "Premium Beef Steak",
      price: 29.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1603048297172-c92544798d5e",
    },
  ];

  return (
    <div>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.name}
            className="flex items-center space-x-4 border-b pb-4"
          >
            <div className="relative h-16 w-16">
              <img
                src={item.image}
                alt={item.name}
                className="object-cover rounded"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-medium">{item.name}</h4>
              <p className="text-sm text-gray-600">
                {item.quantity} × ${item.price}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 space-y-4">
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>$39.97</span>
        </div>
        <Button className="w-full bg-green-600 hover:bg-green-700">
          Checkout
        </Button>
      </div>
    </div>
  );
}
