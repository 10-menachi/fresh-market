"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Truck, Clock, Shield, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Same Day Delivery",
    description: "Get your groceries delivered within hours",
    icon: Truck,
  },
  {
    title: "24/7 Support",
    description: "Our customer service team is always here to help",
    icon: Clock,
  },
  {
    title: "Quality Guarantee",
    description: "100% satisfaction or your money back",
    icon: Shield,
  },
  {
    title: "Best Prices",
    description: "Competitive prices on all our products",
    icon: ThumbsUp,
  },
];

export default function Services() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We pride ourselves on providing exceptional service and value to our customers
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <service.icon className="w-12 h-12 mx-auto mb-4 text-green-600" />
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}