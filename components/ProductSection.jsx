// components/ProductSection.jsx

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import productsData from "./productsData";
import ProductCard from "./ProductCard";

export default function ProductSection() {
  const [firebaseProducts, setFirebaseProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const products = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFirebaseProducts(products);
    };
    fetchProducts();
  }, []);

  const allProducts = [...productsData, ...firebaseProducts];

  return (
    <section className="py-8 px-4 sm:px-8 font-outfit">
      <h2 className="text-3xl font-bold text-center text-[#1a1a1a] dark:text-white mb-8">
        🔥 Our Featured Products
      </h2>

      {allProducts.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          No products found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
