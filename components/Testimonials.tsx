"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Regular Customer",
    content: "The quality of their products is exceptional. I've been shopping here for years and have never been disappointed.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&auto=format&fit=crop"
  },
  {
    name: "Michael Chen",
    role: "Food Enthusiast",
    content: "Their selection of fresh seafood is amazing. The staff is knowledgeable and always helpful with recommendations.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&auto=format&fit=crop"
  },
  {
    name: "Emily Davis",
    role: "Local Chef",
    content: "As a chef, I rely on quality ingredients. Fresh Market consistently delivers the best produce and meats in town.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&auto=format&fit=crop"
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear what our valued customers have to say
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600">{testimonial.content}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}