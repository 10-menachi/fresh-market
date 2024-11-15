import React from "react";
import { Button } from "./ui/button";

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

export default CartPreview;
