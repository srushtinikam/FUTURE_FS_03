// pages/orders.js
import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  return (
    <ProtectedRoute>
      <div className="min-h-screen px-4 py-12 bg-white dark:bg-black text-black dark:text-white">
        <h1 className="text-3xl font-bold mb-6">🧾 My Orders</h1>

        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div key={order.id} className="border-b pb-4">
                <p className="font-semibold">Order ID: {order.id}</p>
                <p>Date: {order.date}</p>
                <ul className="list-disc pl-6 mt-2">
                  {order.items.map((item) => (
                    <li key={item.id}>
                      {item.title || item.name} - ₹{item.price} × {item.quantity}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 font-bold">Total: ₹{order.total}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
