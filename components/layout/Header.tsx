"use client";
import { useUserContext } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ShoppingCart,
  Search,
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
import * as Dialog from "@radix-ui/react-dialog";
import { Badge } from "@/components/ui/badge";
import { login, signup } from "@/app/auth/login/actions";
import CartPreview from "../CartPreview";
import { supabase } from "@/lib/supabase";

export default function Header() {
  const { isLoggedIn, setIsLoggedIn } = useUserContext();
  const [tab, setTab] = useState("login");
  const [isOpen, setIsOpen] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [error, setError] = useState<{
    message: string;
    status: number;
    error: string;
  } | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: user, error } = await supabase.auth.getUser();
      if (!error) {
        setIsLoggedIn(!!user);
      }
    };

    getUser();
  }, [setIsLoggedIn]);

  const handleLogin = async () => {
    try {
      if (!loginEmail || !loginPassword) {
        setError({
          message: "Kindly fill in all fields",
          status: 400,
          error: "400",
        });
        return;
      }

      const formData = new FormData();
      formData.append("email", loginEmail);
      formData.append("password", loginPassword);

      const response = await login(formData);

      if (response.error) {
        setError({
          message: response.error,
          status: Number(response.status),
          error: String(response.status),
        });

        setTimeout(() => {
          setError(null);
        }, 5000);
        return;
      }
    } catch (error) {
      setError({
        message: "An error occurred",
        status: 500,
        error: "500",
      });
    } finally {
      setIsOpen(false);
    }
  };

  const handleSignup = async () => {
    try {
      if (!signupName || !signupEmail || !signupPassword) {
        setError({
          message: "Kindly fill in all fields",
          status: 400,
          error: "400",
        });
        return;
      }

      const formData = new FormData();
      formData.append("name", signupName);
      formData.append("email", signupEmail);
      formData.append("password", signupPassword);

      const response = await signup(formData);

      if (response.error) {
        setError({
          message: response.error,
          status: Number(response.status),
          error: String(response.status),
        });
        return;
      }

      setError(null);
    } catch (error) {
      setError({
        message: "An error occurred",
        status: 500,
        error: "500",
      });
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
      {error && (
        <div
          id="toast-danger"
          className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 absolute top-4 right-2 z-50"
          role="alert"
        >
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
            </svg>
            <span className="sr-only">Error icon</span>
          </div>
          <div className="ms-3 text-sm font-normal">{error.message}</div>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            aria-label="Close"
            onClick={() => setError(null)}
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <ShoppingBasket className="h-6 w-6 text-green-600" />
            <span className="font-bold text-xl">Fresh Market</span>
          </Link>

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

          <div className="flex items-center space-x-4">
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
              <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
                <Dialog.Trigger asChild>
                  <Button variant="ghost" size="icon">
                    <LogIn className="h-5 w-5" />
                  </Button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                  <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md shadow-lg w-96">
                    <Dialog.Title className="text-xl font-medium">
                      {tab === "login" ? "Login" : "Sign Up"}
                    </Dialog.Title>
                    {tab === "login" ? (
                      <div>
                        <Input
                          placeholder="Email"
                          type="email"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          className="mt-4"
                        />
                        <Input
                          placeholder="Password"
                          type="password"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          className="mt-4"
                        />
                        <Button
                          variant="default"
                          className="w-full mt-4 bg-green-600 hover:bg-green-700"
                          onClick={handleLogin}
                        >
                          Login
                        </Button>
                        <p className="mt-2 text-sm text-center text-gray-600">
                          Don't have an account?{" "}
                          <span
                            className="text-blue-600 cursor-pointer"
                            onClick={() => setTab("signup")}
                          >
                            Sign Up
                          </span>
                        </p>
                      </div>
                    ) : (
                      <div>
                        <Input
                          placeholder="Name"
                          type="text"
                          value={signupName}
                          onChange={(e) => setSignupName(e.target.value)}
                          className="mt-4"
                        />
                        <Input
                          placeholder="Email"
                          type="email"
                          value={signupEmail}
                          onChange={(e) => setSignupEmail(e.target.value)}
                          className="mt-4"
                        />
                        <Input
                          placeholder="Password"
                          type="password"
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          className="mt-4"
                        />
                        <Button
                          variant="default"
                          className="w-full mt-4 bg-green-600 hover:bg-green-700"
                          onClick={handleSignup}
                        >
                          Sign Up
                        </Button>
                        <p className="mt-2 text-sm text-center text-gray-600">
                          Already have an account?{" "}
                          <span
                            className="text-blue-600 cursor-pointer"
                            onClick={() => setTab("login")}
                          >
                            Login
                          </span>
                        </p>
                      </div>
                    )}
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
