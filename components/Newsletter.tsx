"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function Newsletter() {
  return (
    <section className="py-20 bg-green-600">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center text-white"
        >
          <h2 className="text-4xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Stay updated with our latest products, special offers, and cooking tips!
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white"
            />
            <Button variant="secondary" className="whitespace-nowrap">
              Subscribe
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}