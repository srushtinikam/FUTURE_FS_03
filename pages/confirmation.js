// pages/confirmation.js

import SuccessAnimation from "@/components/SuccessAnimation";
import Link from "next/link";

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col justify-center items-center px-4">
      <SuccessAnimation />
      <h1 className="text-3xl font-bold mt-4">Order Placed Successfully!</h1>
      <p className="text-lg mt-2 text-gray-600 dark:text-gray-300">
        Thank you for your purchase.
      </p>
      <Link href="/">
        <button className="mt-4 bg-black text-white dark:bg-white dark:text-black px-6 py-2 rounded hover:opacity-90">
          Go to Homepage
        </button>
      </Link>
    </div>
  );
}
