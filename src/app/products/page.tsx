"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import ProductFilters from "../components/ProductFilter";
import EmptyState from "../components/EmptyState";


const ProductPage = () => {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res1, res2] = await Promise.all([
          fetch("https://fakestoreapi.com/products"),
          fetch("/api/products") 
        ]);
        
        const apiData = await res1.json();
        const localData = await res2.json();
        const combined = [...apiData, ...localData];
        
        setAllProducts(combined);
        setFilteredProducts(combined);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFilter = (search: string, category: string) => {
    let filtered = allProducts;

    if (category !== 'All') {
      filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  // Local loading state (shows the pulse text)
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xs font-black uppercase tracking-[0.5em] text-slate-900 animate-pulse">
          Humming...
        </h2>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-8 md:p-16 max-w-7xl mx-auto">
      <header className="mb-12">
        <h1 className="text-6xl font-black text-slate-900 mb-4 tracking-tighter">
          Collections
        </h1>
        <p className="text-slate-600 font-medium italic opacity-70">Resonating with your lifestyle.</p>
      </header>

      {/* Filters UI */}
      <ProductFilters onFilter={handleFilter} />

      {/* Logic: If products exist, show grid. If not, show your EmptyState */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {filteredProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </main>
  );
};

export default ProductPage;