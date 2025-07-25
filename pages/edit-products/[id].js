// pages/edit-product/[id].js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useAuth } from "@/context/AuthContext";

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  const [form, setForm] = useState({
    title: "",
    image: "",
    price: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setForm(docSnap.data());
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "products", id), {
        ...form,
        price: Number(form.price),
      });
      alert("✅ Product updated!");
      router.push("/");
    } catch (error) {
      console.error("Error updating:", error);
      alert("❌ Update failed");
    }
  };

  if (!user || user.email !== "srushtinikam8042@gmail.com") {
    return <p className="text-center mt-10">⛔ Unauthorized access</p>;
  }

  return (
    <div className="min-h-screen px-6 py-12 bg-white dark:bg-black text-black dark:text-white">
      <h2 className="text-2xl font-bold text-center mb-6">✏️ Edit Product</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto grid gap-4 bg-zinc-100 dark:bg-zinc-800 p-6 rounded-lg shadow"
      >
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Product Title"
          className="p-2 rounded"
          required
        />
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="p-2 rounded"
          required
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          type="number"
          placeholder="Price"
          className="p-2 rounded"
          required
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="p-2 rounded"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="p-2 rounded resize-none"
          rows={4}
        />
        <button
          type="submit"
          className="bg-black dark:bg-white text-white dark:text-black py-2 rounded-lg font-semibold hover:opacity-90"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}
