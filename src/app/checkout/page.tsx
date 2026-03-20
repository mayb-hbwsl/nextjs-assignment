"use client";
import React, { useState } from 'react';
import { useCart } from "../context/CartContext";
import Link from 'next/link';
import Image from 'next/image';

const CheckoutPage = () => {
  const { cart, cartCount, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // --- Form States ---
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 500;
  const total = subtotal + shipping;

  // --- Smart Formatting Logic ---
  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formatted = value.match(/.{1,4}/g)?.join(" ") || "";
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (value.length >= 3) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    }
    setExpiry(value);
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCvc(e.target.value.replace(/\D/g, "").slice(0, 3));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API delay
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      clearCart();
    }, 2500);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 animate-in fade-in zoom-in duration-700">
        <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
        </div>
        <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-4">Order Confirmed.</h1>
        <p className="text-slate-800 font-medium max-w-md mb-8">Your order #HM-{Math.floor(Math.random() * 10000)} is being prepared for its journey.</p>
        <Link href="/products" className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all">Continue Exploring</Link>
      </div>
    );
  }

  if (cartCount === 0) return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-black text-slate-900 tracking-tighter opacity-20">YOUR BAG IS SILENT</h2>
      <Link href="/products" className="mt-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-slate-900 transition-all">Back to shop</Link>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#f8fafc] py-12 px-6 md:px-12 antialiased">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* LEFT: Payment & Shipping */}
        <div className="lg:col-span-7 space-y-12">
          <header>
            <Link href="/cart" className="group text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 flex items-center gap-2 mb-6 transition-colors">
              <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Bag
            </Link>
            <h1 className="text-6xl font-black text-slate-900 tracking-tighter">Checkout</h1>
          </header>

          <form onSubmit={handlePlaceOrder} className="space-y-12">
            {/* 01 SHIPPING */}
            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8 flex items-center gap-4">
                01. Shipping <div className="h-[1px] flex-grow bg-slate-200" />
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input required type="text" placeholder="First Name" className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:border-slate-900 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300" />
                <input required type="text" placeholder="Last Name" className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:border-slate-900 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300" />
                <input required type="email" placeholder="Email Address" className="md:col-span-2 w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:border-slate-900 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300" />
                <input required type="text" placeholder="Shipping Address" className="md:col-span-2 w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:border-slate-900 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300" />
              </div>
            </section>

            {/* 02 PAYMENT */}
            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8 flex items-center gap-4">
                02. Payment <div className="h-[1px] flex-grow bg-slate-200" />
              </h2>
              <div className="p-10 bg-slate-900 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group border border-white/5">
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-16">
                    <div className="w-14 h-10 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-lg shadow-inner border border-white/10" />
                    <div className="text-right">
                      <span className="font-black italic text-2xl opacity-80 tracking-tighter">HUMMING</span>
                      <p className="text-[8px] uppercase tracking-[0.4em] opacity-40">Priority Card</p>
                    </div>
                  </div>

                  <div className="mb-10">
                    <label className="text-[9px] uppercase tracking-widest opacity-40 mb-2 block font-black">Card Number</label>
                    <input required type="text" value={cardNumber} onChange={handleCardChange} placeholder="0000 0000 0000 0000" className="bg-transparent border-b border-white/10 w-full text-2xl font-mono tracking-[0.25em] outline-none py-2 placeholder:text-white/10 focus:border-blue-500 transition-colors" />
                  </div>

                  <div className="grid grid-cols-2 gap-12">
                    <div>
                      <label className="text-[9px] uppercase tracking-widest opacity-40 mb-2 block font-black">Expiry</label>
                      <input required type="text" value={expiry} onChange={handleExpiryChange} placeholder="MM/YY" className="bg-transparent border-b border-white/10 w-full outline-none py-1 text-lg font-mono placeholder:text-white/10 focus:border-blue-500 transition-colors" />
                    </div>
                    <div>
                      <label className="text-[9px] uppercase tracking-widest opacity-40 mb-2 block font-black">CVC</label>
                      <input required type="password" value={cvc} onChange={handleCvcChange} placeholder="•••" className="bg-transparent border-b border-white/10 w-full outline-none py-1 text-lg font-mono placeholder:text-white/10 focus:border-blue-500 transition-colors" />
                    </div>
                  </div>
                </div>
                <div className="absolute top-[-20%] right-[-10%] w-80 h-80 bg-blue-500/10 blur-[100px] rounded-full group-hover:bg-blue-500/20 transition-all duration-700" />
              </div>
            </section>

            <button disabled={isProcessing} className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-[0.4em] text-[10px] hover:bg-black transition-all shadow-2xl active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-4">
              {isProcessing ? "Processing Resonance..." : `Finalize Order • ₹${total.toLocaleString("en-IN")}`}
            </button>
          </form>
        </div>

        {/* RIGHT: Order Summary */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 bg-white/60 backdrop-blur-3xl border border-white p-10 rounded-[3.5rem] shadow-2xl shadow-slate-200/50">
            <h3 className="text-2xl font-black text-slate-900 tracking-tighter mb-8 italic">Your Selection</h3>
            
            <div className="max-h-[400px] overflow-y-auto pr-4 space-y-6 mb-8 custom-scrollbar">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-5">
                  <div className="w-20 h-20 bg-white rounded-2xl border border-slate-100 p-3 flex-shrink-0 shadow-sm">
                    <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-sm font-bold text-slate-900 line-clamp-1 leading-tight mb-1">{item.title}</h4>
                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Quantity: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-black text-slate-900 whitespace-nowrap">₹{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-8 border-t border-slate-100">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
                <span>Subtotal</span>
                <span className="text-slate-900">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
                <span>Shipping</span>
                <span className="text-slate-900">₹{shipping.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-end pt-6 border-t border-slate-900/5 mt-6">
                <span className="text-sm font-black uppercase tracking-widest text-slate-900">Total</span>
                <span className="text-4xl font-black text-slate-900 tracking-tighter leading-none">₹{total.toLocaleString("en-IN")}</span>
              </div>
            </div>
            
            <div className="mt-10 p-4 bg-slate-50 rounded-2xl flex items-center justify-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Secure Vault Protocol Active</p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
};

export default CheckoutPage;