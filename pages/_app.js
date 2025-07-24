// pages/_app.js
import "@/styles/globals.css";
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { AuthProvider } from "@/context/AuthContext";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <CartProvider>
        <WishlistProvider>
          <AuthProvider>
            <Navbar />
             <Toaster position="top-right" />
            <Component {...pageProps} />
          </AuthProvider>
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  );
}
