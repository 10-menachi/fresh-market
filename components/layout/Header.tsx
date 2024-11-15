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
import ToastDemo from "../Toast";
import { AuthError } from "@supabase/supabase-js";

export default function Header() {
  const { isLoggedIn, setIsLoggedIn } = useUserContext();
  const [tab, setTab] = useState("login");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [error, setError] = useState<AuthError | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const supabase = await createClient();
      const { data: user, error } = await supabase.auth.getUser();
      if (!error) {
        setIsLoggedIn(!!user);
      }
    };

    getUser();
  }, [setIsLoggedIn, setError]);

  const handleLogin = async () => {
    if (!loginEmail || !loginPassword) {
      return;
    }

    const formData = new FormData();
    formData.append("email", loginEmail);
    formData.append("password", loginPassword);
    const response = await login(formData);
    if (response?.error) {
      setError(new AuthError(response.error, response.status, "500"));
    }
  };

  const handleSignup = () => {
    const formData = new FormData();
    formData.append("name", signupName);
    formData.append("email", signupEmail);
    formData.append("password", signupPassword);
    signup(formData);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
      {error && (
        <ToastDemo
          title={error.name}
          code={error.code || ""}
          description={error.message}
          open={true}
        />
      )}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <ShoppingBasket className="h-6 w-6 text-green-600" />
            <span className="font-bold text-xl">Fresh Market</span>
          </Link>

          {/* Navigation */}
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

          {/* Search, Cart, Login/Profile */}
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
                      onClick={() => setIsLoggedIn(false)} // Log out
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
                          Log In
                        </button>
                        <button
                          onClick={() => setTab("signup")}
                          className={`font-medium ${
                            tab === "signup"
                              ? "text-green-600 border-b-2 border-green-600"
                              : "text-gray-600"
                          }`}
                        >
                          Sign Up
                        </button>
                      </div>

                      {/* Login Form */}
                      {tab === "login" && (
                        <div className="flex flex-col gap-3 mt-4">
                          <label
                            htmlFor="loginEmail"
                            className="text-sm font-semibold mb-1"
                          >
                            Email
                          </label>
                          <Input
                            id="loginEmail"
                            placeholder="Enter your email"
                            className="w-full"
                            type="email"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                          />
                          <label
                            htmlFor="loginPassword"
                            className="text-sm font-semibold mb-1"
                          >
                            Password
                          </label>
                          <Input
                            id="loginPassword"
                            placeholder="Enter your password"
                            className="w-full"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            type="password"
                          />
                          <div className="flex gap-3 mt-6 justify-end">
                            <Dialog.Close asChild>
                              <Button variant="secondary" color="gray">
                                Cancel
                              </Button>
                            </Dialog.Close>
                            <Dialog.Close asChild>
                              <Button onClick={handleLogin} variant="default">
                                Log In
                              </Button>
                            </Dialog.Close>
                          </div>
                        </div>
                      )}

                      {/* Signup Form */}
                      {tab === "signup" && (
                        <div className="flex flex-col gap-3 mt-4">
                          <label
                            htmlFor="signupName"
                            className="text-sm font-semibold mb-1"
                          >
                            Name
                          </label>
                          <Input
                            id="signupName"
                            placeholder="Enter your name"
                            className="w-full"
                            value={signupName}
                            onChange={(e) => setSignupName(e.target.value)}
                          />
                          <label
                            htmlFor="signupEmail"
                            className="text-sm font-semibold mb-1"
                          >
                            Email
                          </label>
                          <Input
                            id="signupEmail"
                            placeholder="Enter your email"
                            className="w-full"
                            value={signupEmail}
                            onChange={(e) => setSignupEmail(e.target.value)}
                            type="email"
                          />
                          <label
                            htmlFor="signupPassword"
                            className="text-sm font-semibold mb-1"
                          >
                            Password
                          </label>
                          <Input
                            id="signupPassword"
                            placeholder="Enter your password"
                            className="w-full"
                            value={signupPassword}
                            onChange={(e) => setSignupPassword(e.target.value)}
                            type="password"
                          />
                          <div className="flex gap-3 mt-6 justify-end">
                            <Dialog.Close asChild>
                              <Button variant="secondary" color="gray">
                                Cancel
                              </Button>
                            </Dialog.Close>
                            <Dialog.Close asChild>
                              <Button onClick={handleSignup} variant="default">
                                Sign Up
                              </Button>
                            </Dialog.Close>
                          </div>
                        </div>
                      )}
                    </div>
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
