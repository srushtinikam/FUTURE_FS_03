// components/ProtectedRoute.jsx
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      setChecking(false);
    }
  }, [user, router]);

  // Show loading or nothing until auth status is resolved
  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center text-gray-500 dark:text-gray-300">
        Checking authentication...
      </div>
    );
  }

  return children;
}
