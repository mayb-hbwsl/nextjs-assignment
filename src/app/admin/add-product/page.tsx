"use client";
import { title } from 'process';
import React, { useState } from 'react';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productDescription, setProductDescription] = useState('');
  const [category, setCategory] = useState('');
  const [productImage, setProductImage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: Date.now(), // Simple unique ID based on timestamp
        title: productName,
        price: productPrice,
        description: productDescription,
        category: category,
        image: productImage,
        rating: { rate: 0, count: 0 }
      }),
    });

    if(res.ok){
      setIsSuccess(true);
    setProductName('');
    setProductPrice(0);
    setProductDescription('');
    setCategory('');
    setProductImage('');

    setTimeout(() => {
      setIsSuccess(false);    
    }, 2000);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[90vh] px-4 py-12">
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-lg bg-white/30 backdrop-blur-2xl border border-white/40 p-8 md:p-10 rounded-3xl shadow-2xl flex flex-col gap-6 transition-all duration-500"
      >
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">
            {isSuccess ? "Success!" : "New Listing"}
          </h1>
          <p className="text-slate-600 text-sm font-medium">
            {isSuccess ? "Product added to your store." : "Fill in the details below."}
          </p>
        </div>

        <div className={`space-y-4 transition-all duration-300 ${isSuccess ? 'opacity-10 scale-95 pointer-events-none' : 'opacity-100'}`}>
          <input 
            type="text" 
            placeholder="Product Name" 
            required
            value={productName} 
            onChange={(e) => setProductName(e.target.value)} 
            className="w-full bg-white/40 border border-white/20 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900/10 transition-all font-medium"
          />
          
          <div className="flex gap-4">
            <input 
              type="number" 
              placeholder="Price (₹)" 
              required
              value={productPrice === 0 ? '' : productPrice} 
              onChange={(e) => setProductPrice(Number(e.target.value))} 
              className="w-1/2 bg-white/40 border border-white/20 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 transition-all font-medium"
            />
            <input 
              type="text" 
              placeholder="Category" 
              value={category} 
              onChange={(e) => setCategory(e.target.value)} 
              className="w-1/2 bg-white/40 border border-white/20 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 transition-all font-medium"
            />
          </div>

          <textarea 
            placeholder="Description" 
            value={productDescription} 
            onChange={(e) => setProductDescription(e.target.value)} 
            rows={2}
            className="w-full bg-white/40 border border-white/20 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 transition-all font-medium resize-none"
          />

          <input 
            type="text" 
            placeholder="Image URL" 
            value={productImage} 
            onChange={(e) => setProductImage(e.target.value)} 
            className="w-full bg-white/40 border border-white/20 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 transition-all font-medium"
          />
        </div>

        <button 
          type="submit" 
          disabled={isSuccess}
          className={`
            w-full py-4 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all duration-300 shadow-lg
            ${isSuccess 
              ? "bg-green-500 text-white scale-95" 
              : "bg-slate-900 text-white hover:bg-black hover:scale-[1.01] cursor-pointer active:scale-95"}
          `}
        >
          {isSuccess ? "✓ Added" : "List Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;