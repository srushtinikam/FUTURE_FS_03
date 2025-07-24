// pages/product/[id].js

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import productsData from "@/components/productsData";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import toast from "react-hot-toast";

export default function ProductDetail() {
  const { id } = useRouter().query;
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      // First try Firebase
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id, ...docSnap.data() });
          return;
        }
      } catch (err) {
        console.error("Firebase fetch error:", err);
      }

      // Fallback: Check local productsData
      const localProduct = productsData.find((item) => item.id === id);
      if (localProduct) {
        setProduct(localProduct);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#1a1a1a] dark:text-white">
        <p>⚠️ Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f2f5f9] dark:bg-black text-[#1a1a1a] dark:text-white p-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <img
          src={product.image}
          alt={product.title}
          className="w-full md:w-1/2 h-auto object-contain rounded shadow-lg"
        />

        <div className="md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          {product.category && (
            <p className="text-sm uppercase tracking-wider text-gray-500">
              {product.category}
            </p>
          )}
          <p className="text-2xl font-semibold text-[#6c63ff]">₹{product.price}</p>
          <p className="text-sm leading-relaxed">{product.description}</p>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => {
                addToCart(product);
                toast.success("🛒 Added to Cart!");
              }}
              className="bg-[#6c63ff] text-white px-5 py-2 rounded hover:opacity-90 transition"
            >
              Add to Cart
            </button>

            <button
              onClick={() => {
                addToWishlist(product);
                toast.success("❤️ Added to Wishlist!");
              }}
              className="text-[#ff6b6b] hover:underline"
            >
              ❤️ Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
