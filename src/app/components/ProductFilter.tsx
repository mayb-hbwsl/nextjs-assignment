"use client";
import React, { useState } from 'react';

const ProductFilters = ({ onFilter }: { onFilter: (search: string, category: string) => void }) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', "Men's Clothing", "Women's Clothing", 'Jewelery', 'Electronics'];

  const handleSearch = (val: string) => {
    setSearch(val);
    onFilter(val, activeCategory);
  };

  const handleCategory = (cat: string) => {
    setActiveCategory(cat);
    onFilter(search, cat);
  };

  return (
    <div className="flex flex-col gap-8 mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
      {/* Search Bar */}
      <div className="relative max-w-2xl w-full group">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-slate-00 group-focus-within:text-slate-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input 
          type="text"
          placeholder="Search collections..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full bg-white/20 backdrop-blur-xl border border-white/40 py-3.5 pl-10 pr-6 rounded-2xl text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all shadow-xl font-medium"
        />
      </div>

      {/* Category Chips */}
      <div className="flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategory(cat)}
            className={`px-6 py-2.5 rounded-full text-[12px] font-black uppercase tracking-widest transition-all duration-300 border cursor-pointer 
              ${activeCategory === cat 
                ? "bg-slate-900 text-white border-slate-900 shadow-lg scale-105" 
                : "bg-white/10 text-slate-900 border-white/20 hover:bg-white/30 hover:text-slate-900"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductFilters;