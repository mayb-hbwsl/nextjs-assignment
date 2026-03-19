"use client"; // Required for useState and onClick in Next.js App Router

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "./Sidebar";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="sticky top-0 z-50 flex justify-between items-center px-6 md:px-12 py-4 bg-white/20 backdrop-blur-xl border-b border-white/30 shadow-2xl">
        {/* Logo */}
        <Link href="/" className="transition-transform hover:scale-105">
          <Image src="/logo.png" alt="Logo" width={40} height={50} priority />
        </Link>

        {/* Desktop Navigation (Hidden on Mobile) */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className="text-sm font-semibold  hover:text-white transition-colors"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="text-sm font-semibold  hover:text-white transition-colors"
          >
            Products
          </Link>
          <Link
            href="/admin/add-product"
            className="text-sm font-semibold  hover:text-white transition-colors"
          >
            Admin
          </Link>
          <Link
            href="/cart"
            className="bg-slate-800 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-slate-700 hover:shadow-md  transition-all active:scale-95"
          >
            Cart (0)
          </Link>
        </nav>

        {/* Mobile Menu Toggle (Hidden on Desktop) */}
        <button
          type="button"
          className="md:hidden p-2 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
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
      </header>

      {/* Sidebar Overlay */}
      <Sidebar isOpen={isOpen} toggle={toggleSidebar} />
    </>
  );
};

export default Header;
