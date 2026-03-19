import React from "react";
import ProductCard from "@/app/components/ProductCard";

const AdminProductsPage = async () => {
  const res = await fetch("http://localhost:3000/api/products");
  const products: any[] = await res.json();

  console.log("Admin Products:", products); // Debugging log
  console.log(res.status); // Check the response status

  return (
    <main className="min-h-screen p-8 md:p-16">
      <h1 className="text-4xl font-black text-white mb-12 tracking-tighter">
        Admin Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </main>
  );
};

export default AdminProductsPage;
