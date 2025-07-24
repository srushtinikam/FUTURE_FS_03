// pages/wishlist.js
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import toast from "react-hot-toast";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white px-4 py-12 font-outfit">
        <h1 className="text-3xl font-bold text-center mb-10">💖 Your Wishlist</h1>

        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center mt-12 space-y-6">
            <img
              src="/empty-wishlist.svg"
              alt="Empty Wishlist"
              className="w-60 h-60 mx-auto"
            />
            <p className="text-lg">Your wishlist is feeling lonely.</p>
            <Link href="/" className="text-blue-600 hover:underline text-sm">
              Start adding products →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-gray-100 dark:bg-zinc-900 p-5 rounded-xl shadow hover:shadow-lg transition-all duration-300"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-contain rounded mb-4"
                />
                <h2 className="text-lg font-semibold mb-1">{item.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">₹{item.price}</p>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      removeFromWishlist(item.id);
                      toast.error("Removed from Wishlist");
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => {
                      addToCart(item);
                      toast.success("Added to Cart");
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
