"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Beef, Fish, Apple, Carrot } from "lucide-react";
import { motion } from "framer-motion";

const products = [
  {
    title: "Fresh Meat",
    description: "Premium cuts of beef, pork, and poultry",
    icon: Beef,
    color: "text-red-500"
  },
  {
    title: "Seafood",
    description: "Wild-caught and sustainably sourced fish",
    icon: Fish,
    color: "text-blue-500"
  },
  {
    title: "Fresh Fruits",
    description: "Seasonal and exotic fruits",
    icon: Apple,
    color: "text-green-500"
  },
  {
    title: "Vegetables",
    description: "Locally sourced organic vegetables",
    icon: Carrot,
    color: "text-orange-500"
  }
];

export default function Products() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer a wide range of fresh, high-quality products to meet all your culinary needs
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <product.icon className={`w-12 h-12 ${product.color} mb-4`} />
                  <CardTitle>{product.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{product.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}