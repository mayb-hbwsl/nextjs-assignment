"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from "../context/CartContext";
import EmptyState from "../components/EmptyState"; 

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, cartCount } = useCart();

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = cartCount > 0 ? 500 : 0;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <Link 
          href="/products" 
          className="-mt-10 text-[20px] font-black uppercase tracking-[0.3em] text-slate-900 hover:text-slate-900 transition-colors"
        >
          Empty Cart | Back to Collection
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-16 animate-in fade-in duration-700">
      <header className="flex items-baseline gap-4 mb-12">
        <h1 className="text-6xl font-black text-slate-900 tracking-tighter">Bag</h1>
        <span className="text-slate-800 font-medium italic">({cartCount} items)</span>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Side: Items List */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div 
              key={item.id} 
              className="group flex flex-col sm:flex-row gap-6 p-6 bg-white/30 backdrop-blur-xl border border-white/40 rounded-3xl transition-all hover:bg-white/50"
            >
              {/* Product Image */}
              <div className="relative w-full sm:w-32 aspect-square bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
                <Image src={item.image} alt={item.title} fill className="object-contain p-4 transition-transform group-hover:scale-110" />
              </div>
              
              {/* Item Details */}
              <div className="flex flex-col justify-between grow py-1">
                <div className="flex justify-between items-start">
                  <div className="max-w-[70%]">
                    <h3 className="text-slate-900 font-bold text-lg leading-tight line-clamp-1">{item.title}</h3>
                    <p className="text-slate-700 text-[10px] font-black uppercase tracking-widest mt-1">
                      {item.category || "Premium Essential"}
                    </p>
                  </div>
                  <p className="text-xl font-black text-slate-900 tracking-tighter">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-6">
                  {/* Quantity Controller Capsule */}
                  <div className="flex items-center bg-slate-900 text-white rounded-xl overflow-hidden shadow-md">
                    <button 
                      onClick={() => item.quantity === 1 ? removeFromCart(item.id) : updateQuantity(item.id, -1)}
                      className="px-4 py-2 hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      {item.quantity === 1 ? "✕" : "−"}
                    </button>
                    <span className="px-2 font-black text-sm min-w-[3ch] text-center">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-4 py-2 hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-[10px] font-black uppercase tracking-widest text-slate-900 hover:text-red-800 transition-colors cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Sticky Summary Card */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900 text-white p-10 rounded-[40px] shadow-2xl sticky top-24 transition-transform hover:scale-[1.01]">
            <h2 className="text-3xl font-black tracking-tighter mb-8 italic">Order Details</h2>
            
            <div className="space-y-5 mb-10">
              <div className="flex justify-between items-center">
                <span className="opacity-50 text-xs font-bold uppercase tracking-widest">Subtotal</span>
                <span className="font-bold">₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="opacity-50 text-xs font-bold uppercase tracking-widest">Shipping</span>
                <span className="font-bold">₹{shipping.toLocaleString("en-IN")}</span>
              </div>
              
              <div className="h-px bg-white/10 my-4"></div>
              
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-1">Total Amount</p>
                  <p className="text-4xl font-black tracking-tighter leading-none">
                    ₹{total.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            </div>

            <button className="w-full bg-white text-slate-900 py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] hover:bg-slate-200 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)] cursor-pointer active:scale-95">
              Checkout
            </button>
            
            <div className="mt-8 flex items-center justify-center gap-2 opacity-30">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <p className="text-[8px] font-bold uppercase tracking-[0.2em]">Happy Shopping!!</p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
};

export default CartPage;