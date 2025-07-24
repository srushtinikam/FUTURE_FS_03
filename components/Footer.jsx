// components/Footer.jsx

import Link from "next/link";
import { useAuth, isAdminUser } from "@/context/AuthContext";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const { user } = useAuth();

  return (
    <footer className="bg-[#f2f5f9] dark:bg-zinc-900 text-[#1a1a1a] dark:text-white font-outfit pt-10 pb-6 px-6 border-t border-gray-200 dark:border-zinc-700">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-sm">
        {/* About */}
        <div>
          <h2 className="text-lg font-bold mb-3">NIKEX</h2>
          <p>
            Your premium destination for authentic Nike sneakers.
            Stylish, durable, and performance-driven.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-[#6c63ff]">Home</Link></li>
            <li><Link href="/wishlist" className="hover:text-[#6c63ff]">Wishlist</Link></li>
            <li><Link href="/cart" className="hover:text-[#6c63ff]">Cart</Link></li>
            {user && <li><Link href="/profile" className="hover:text-[#6c63ff]">Profile</Link></li>}
            {user && isAdminUser(user) && (
              <li><Link href="/admin" className="hover:text-[#6c63ff]">Admin Panel</Link></li>
            )}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p>Email: support@nikexstore.com</p>
          <p>Phone: +91 98765 43210</p>

          {/* Social Links */}
          <div className="flex mt-4 space-x-4 text-[#6c63ff]">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom note */}
      <div className="text-center mt-8 text-xs text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} NIKEX. All rights reserved.
      </div>
    </footer>
  );
}
