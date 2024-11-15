"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[500px]"
          >
            <Image
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2574&auto=format&fit=crop"
              alt="Our store"
              fill
              className="object-cover rounded-lg"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">About Fresh Market</h2>
            <p className="text-gray-600 mb-6">
              Since 1995, Fresh Market has been your trusted source for premium quality groceries. 
              We work directly with local farmers and suppliers to bring you the freshest produce, 
              meats, and seafood available.
            </p>
            <p className="text-gray-600 mb-8">
              Our commitment to quality, sustainability, and customer satisfaction has made us 
              the preferred choice for families across the region.
            </p>
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Learn More About Us
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}