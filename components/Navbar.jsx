// components/Navbar.jsx
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useDarkMode from "@/hooks/useDarkMode";
import { FiSun, FiMoon } from "react-icons/fi";
import Image from "next/image";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isDark, setIsDark] = useDarkMode();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav className="bg-primary text-white shadow-md font-outfit">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 text-white text-lg font-bold">
          <Image src="/logo1.png" alt="Logo" width={32} height={32} />
          <span>NIKEX</span>
        </Link>

        {/* Nav Links */}
        <div className="hidden sm:flex space-x-6 items-center">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/wishlist" className="hover:underline">Wishlist</Link>
          <Link href="/cart" className="hover:underline">Cart</Link>
          {user?.email === "srushtinikam8042@gmail.com" && (
            <Link href="/admin" className="hover:underline">Admin</Link>
          )}
          {user ? (
            <>
              <Link href="/profile" className="hover:underline">Profile</Link>
              <button
                onClick={handleLogout}
                className="bg-cta text-white px-4 py-1 rounded hover:opacity-90"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:underline">Login</Link>
              <Link href="/register" className="hover:underline">Register</Link>
            </>
          )}

          {/* 🌗 Dark Mode Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="text-white ml-2 text-xl hover:text-yellow-300 transition"
            title="Toggle Dark Mode"
          >
            {isDark ? <FiSun /> : <FiMoon />}
          </button>
        </div>

        {/* Mobile Menu Toggle (optional) */}
        <button onClick={handleToggle} className="sm:hidden text-xl">
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden px-4 pb-4 space-y-2 bg-primary">
          <Link href="/" className="block">Home</Link>
          <Link href="/wishlist" className="block">Wishlist</Link>
          <Link href="/cart" className="block">Cart</Link>
          {user?.email === "srushtinikam8042@gmail.com" && (
            <Link href="/admin" className="block">Admin</Link>
          )}
          {user ? (
            <>
              <Link href="/profile" className="block">Profile</Link>
              <button onClick={handleLogout} className="block w-full text-left">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="block">Login</Link>
              <Link href="/register" className="block">Register</Link>
            </>
          )}
          <button
            onClick={() => setIsDark(!isDark)}
            className="text-white text-xl"
          >
            {isDark ? <FiSun /> : <FiMoon />}
          </button>
        </div>
      )}
    </nav>
  );
}
