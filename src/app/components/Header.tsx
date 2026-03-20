"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "./Sidebar";
import { useCart } from "../context/CartContext"; // 1. Import the cart context

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimate, setIsAnimate] = useState(false);
  const { cartCount } = useCart(); // 2. Pull the count from context

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // 3. Effect to trigger a "pop" animation whenever the count changes
  useEffect(() => {
    if (cartCount === 0) return;
    setIsAnimate(true);
    const timer = setTimeout(() => setIsAnimate(false), 300);
    return () => clearTimeout(timer);
  }, [cartCount]);

  return (
    <>
      <header className="sticky top-0 z-50 flex justify-between items-center px-6 md:px-12 py-4 bg-white/20 backdrop-blur-xl border-b border-white/30 shadow-2xl transition-all duration-500">
        {/* Logo */}
        <Link href="/" className="transition-transform hover:scale-110 active:scale-95">
          <Image src="/logo.png" alt="Logo" width={40} height={50} priority />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className="text-sm font-black uppercase tracking-widest text-slate-900 hover:text-slate-100 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="text-sm font-black uppercase tracking-widest text-slate-900 hover:text-slate-100 transition-colors"
          >
            Products
          </Link>

          <Link
            href="/admin/add-product"
            className="text-sm font-black uppercase tracking-widest text-slate-900 hover:text-slate-100 transition-colors"
          >
            Admin
          </Link>
          
          {/* 4. The Dynamic Cart Button */}
          <Link
            href="/cart"
            className={`flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] active:scale-95 ${
              isAnimate ? "scale-110 bg-slate-700" : "scale-100"
            }`}
          >
            Cart 
            <span className={`bg-white text-slate-900 px-2 py-0.5 rounded-full min-w-5 text-center transition-transform ${isAnimate ? 'scale-125' : 'scale-100'}`}>
              {cartCount}
            </span>
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          {/* Mobile Cart Icon shortcut */}
          <Link href="/cart" className="relative p-2 text-slate-900">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
             {cartCount > 0 && (
               <span className="absolute top-0 right-0 bg-slate-900 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                 {cartCount}
               </span>
             )}
          </Link>

          <button
            type="button"
            className="p-2 text-slate-900 hover:bg-white/40 rounded-lg transition-colors cursor-pointer"
            onClick={toggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Sidebar Overlay */}
      <Sidebar isOpen={isOpen} toggle={toggleSidebar} />
    </>
  );
};

export default Header;