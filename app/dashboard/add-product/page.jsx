"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AddProductForm() {
  const { data: session } = useSession();
  //   console.log(session);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");
  //   console.log(name, description, price, stock, image);
  const [loading, setLoading] = useState(false);
  if (!session) {
    return toast.warn("Please Login First");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !price || !image || !stock) {
      toast.error("Please fill in all fields!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description, price, stock, image }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Product added successfully!");
        setName("");
        setDescription("");
        setPrice("");
        setStock("");
        setImage("");
      } else {
        toast.error(data.error || "Failed to add product.");
      }
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 my-10 bg-white rounded-lg shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Product Name</label>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#FF324D] focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#FF324D] focus:outline-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#FF324D] focus:outline-none"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter product price"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Stock</label>
          <input
            type="number"
            className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#FF324D] focus:outline-none"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Enter Product Stock"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#FF324D] focus:outline-none"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Enter image URL"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#FF324D] text-white py-2 rounded-full font-semibold hover:bg-[#e02e42] transition"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
