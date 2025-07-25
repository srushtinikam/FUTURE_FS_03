// pages/checkout.js
import { useCart } from "@/context/CartContext";
import { db } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Lottie from "lottie-react";
import successAnimation from "@/animations/success.json";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleCheckout = async () => {
    if (!cart.length) return toast.error("Your cart is empty.");
    setPlacingOrder(true);

    try {
      await addDoc(collection(db, "orders"), {
        items: cart,
        createdAt: serverTimestamp(),
      });

      clearCart();
      setOrderSuccess(true);
      toast.success("Order placed!");

      setTimeout(() => {
        router.push("/orders");
      }, 2500);
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to place order.");
      setPlacingOrder(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-6 font-outfit">
      <h1 className="text-3xl font-bold mb-6 text-center">🧾 Checkout</h1>

      {placingOrder && orderSuccess ? (
        <div className="flex flex-col items-center justify-center mt-10">
          <div className="w-48 h-48">
            <Lottie animationData={successAnimation} loop={false} />
          </div>
          <p className="text-lg mt-4 font-semibold text-green-600">
            Order placed successfully! Redirecting...
          </p>
        </div>
      ) : cart.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">
          Your cart is empty.
        </p>
      ) : (
        <>
          <ul className="mb-6 space-y-4 max-w-2xl mx-auto">
            {cart.map((item) => (
              <li key={item.id} className="border-b pb-2">
                <div className="flex justify-between">
                  <span>{item.title}</span>
                  <span>₹{item.price} × {item.quantity}</span>
                </div>
              </li>
            ))}
          </ul>

          <div className="text-center">
            <button
              onClick={handleCheckout}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              ✅ Confirm Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}
