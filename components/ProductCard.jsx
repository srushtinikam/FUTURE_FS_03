// components/ProductCard.jsx

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  return (
    <div className="bg-white dark:bg-zinc-800 text-[#4A4E69] dark:text-white rounded-xl shadow-lg p-4 flex flex-col transition hover:shadow-xl">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-52 object-contain mb-4 rounded"
      />
      <h2 className="text-xl font-semibold mb-1 truncate">{product.title}</h2>
      <p className="text-lg font-bold text-[#F28482] mb-2">₹{product.price}</p>

      <div className="mt-auto flex justify-between items-center gap-2">
        {/* View Button */}
        <Link href={`/product/${product.id}`}>
          <button className="bg-[#F6BD60] hover:bg-[#e4a946] text-black font-semibold px-3 py-1 rounded transition text-sm">
            👀 View
          </button>
        </Link>

        {/* Wishlist Button */}
        <button
          onClick={() => {
            addToWishlist(product);
            toast.success("Added to Wishlist!");
          }}
          className="text-[#F28482] text-xl hover:scale-110 transition"
          title="Add to Wishlist"
        >
          ❤️
        </button>

        {/* Add to Cart Button */}
        <button
          onClick={() => {
            addToCart(product);
            toast.success("Added to Cart!");
          }}
          className="bg-[#F6BD60] hover:bg-[#e4a946] text-black font-semibold px-3 py-1 rounded text-sm"
        >
          🛒
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
