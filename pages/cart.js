// pages/cart.js
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/router";
import emailjs from "emailjs-com";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export default function CartPage() {
  const { user } = useAuth();
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const router = useRouter();

  const SERVICE_ID = "service_n5uuh7q";
  const TEMPLATE_ID = "template_12b3fug";
  const PUBLIC_KEY = "zzRZbfNTi-A0yrJE4";

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (!user) return toast.error("Please log in to continue.");
    if (cart.length === 0) return toast.error("Your cart is empty.");

    const orderId = Date.now().toString();
    const newOrder = {
      id: orderId,
      userId: user?.uid,
      userEmail: user?.email,
      items: cart,
      total,
      createdAt: new Date().toISOString(),
    };

    // Save order locally
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));

    // EmailJS
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          cart_items: cart.map((item) => `${item.title} x ${item.quantity}`).join(", "),
          total: total,
          to_email: user?.email || "your@email.com",
        },
        PUBLIC_KEY
      );
      toast.success("📧 Confirmation email sent!");
    } catch (error) {
      console.error("Email error:", error);
    }

    clearCart();
    router.push("/confirmation");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white px-6 py-12 font-outfit">
      <h1 className="text-3xl font-bold mb-8 text-center">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div className="space-y-8 max-w-4xl mx-auto">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row justify-between items-center gap-6 border-b pb-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-contain"
                />
                <div>
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="px-3 py-1 bg-gray-200 dark:bg-zinc-700 rounded"
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="px-3 py-1 bg-gray-200 dark:bg-zinc-700 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 text-sm bg-red-500 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Total */}
          <div className="text-right text-xl font-bold">
            Total: ₹{total.toLocaleString()}
          </div>

          <div className="text-center">
            <button
              onClick={handleCheckout}
              className="mt-4 bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded hover:opacity-90 transition"
            >
              ✅ Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
