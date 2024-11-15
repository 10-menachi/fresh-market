import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Fresh Market</h3>
            <p className="mb-4">
              Your trusted source for fresh groceries, quality meats, and premium
              produce.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-white">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-white">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-white">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-white">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Products
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">
              Customer Service
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-white">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Store Hours</h3>
            <ul className="space-y-2">
              <li>Monday - Friday: 8AM - 9PM</li>
              <li>Saturday: 9AM - 8PM</li>
              <li>Sunday: 10AM - 6PM</li>
            </ul>
            <p className="mt-4">
              <strong className="text-white">Address:</strong>
              <br />
              123 Market Street
              <br />
              City, Country
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
          <p>© 2024 Fresh Market. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}