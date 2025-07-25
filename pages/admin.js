// pages/admin.js
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { toast } from "react-hot-toast";

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleUpdate = async (productId, field, value) => {
    try {
      const ref = doc(db, "products", productId);
      await updateDoc(ref, { [field]: value });
      toast.success("Product updated");
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const handleAddProduct = async () => {
    try {
      if (
        !newProduct.title ||
        !newProduct.price ||
        !newProduct.image ||
        !newProduct.description
      ) {
        toast.error("All fields required");
        return;
      }
      await addDoc(collection(db, "products"), {
        ...newProduct,
        price: parseInt(newProduct.price),
      });
      toast.success("Product added");
      setNewProduct({
        title: "",
        price: "",
        image: "",
        description: "",
        category: "",
      });
    } catch (error) {
      toast.error("Add failed");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-10 font-outfit">
      <h1 className="text-3xl font-bold">🛠 Admin Panel</h1>

      {/* Add Product */}
      <div className="border rounded p-4">
        <h2 className="text-xl font-semibold mb-4">➕ Add New Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["title", "price", "image", "description", "category"].map((field) => (
            <input
              key={field}
              type="text"
              placeholder={field}
              className="border p-2 rounded"
              value={newProduct[field]}
              onChange={(e) =>
                setNewProduct({ ...newProduct, [field]: e.target.value })
              }
            />
          ))}
        </div>
        <button
          onClick={handleAddProduct}
          className="mt-4 bg-black text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </div>

      {/* Edit Products */}
      <div className="border rounded p-4">
        <h2 className="text-xl font-semibold mb-4">🖊 Edit Existing Products</h2>
        {products.length === 0 ? (
          <p>No products found</p>
        ) : (
          <div className="space-y-6">
            {products.map((product) => (
              <div key={product.id} className="border p-4 rounded space-y-2">
                <h3 className="font-bold">{product.title}</h3>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-32 h-32 object-contain"
                />
                {["title", "price", "image", "description", "category"].map(
                  (field) => (
                    <input
                      key={field}
                      type="text"
                      value={product[field]}
                      placeholder={field}
                      onChange={(e) =>
                        setProducts((prev) =>
                          prev.map((p) =>
                            p.id === product.id
                              ? { ...p, [field]: e.target.value }
                              : p
                          )
                        )
                      }
                      onBlur={() =>
                        handleUpdate(product.id, field, product[field])
                      }
                      className="w-full border p-2 rounded my-1"
                    />
                  )
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
