// pages/profile.js
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { FiCamera } from "react-icons/fi";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [imageUrl, setImageUrl] = useState("/avatar.png");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    const storedImage = localStorage.getItem("profileImage");
    const storedName = localStorage.getItem("profileName");
    const storedBio = localStorage.getItem("profileBio");

    if (storedImage) setImageUrl(storedImage);
    if (storedName) setDisplayName(storedName);
    if (storedBio) setBio(storedBio);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setImageUrl(base64);
        localStorage.setItem("profileImage", base64);
        toast.success("Profile image updated!");
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please upload a valid image file.");
    }
  };

  const handleSaveInfo = () => {
    localStorage.setItem("profileName", displayName);
    localStorage.setItem("profileBio", bio);
    toast.success("Profile info saved!");
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white px-6 py-12 font-outfit">
        <div className="max-w-xl mx-auto bg-gray-100 dark:bg-zinc-900 p-8 rounded-xl shadow text-center">
          <h1 className="text-3xl font-bold mb-6">👤 My Profile</h1>

          {/* Profile Picture Upload */}
          <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600 group mb-4">
            <img
              src={imageUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <FiCamera size={22} className="text-white" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Name & Bio Inputs */}
          <div className="text-left mb-6">
            <label className="block text-sm mb-1">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full p-2 border rounded bg-white dark:bg-zinc-800 dark:text-white"
            />

            <label className="block mt-4 text-sm mb-1">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full p-2 border rounded bg-white dark:bg-zinc-800 dark:text-white"
            />

            <button
              onClick={handleSaveInfo}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition w-full"
            >
              💾 Save Info
            </button>
          </div>

          {/* Email Display */}
          <p className="text-md font-medium text-gray-700 dark:text-gray-300 mb-6">
            📧 {user?.email}
          </p>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/wishlist">
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded transition">
                💖 Wishlist
              </button>
            </Link>
            <Link href="/orders">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition">
                📦 Orders
              </button>
            </Link>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
            >
              🔓 Logout
            </button>
          </div>

          <p className="text-xs mt-6 text-gray-400">
            Thank you for shopping with Nikex!
          </p>
        </div>
      </div>
    </ProtectedRoute>
  );
}
