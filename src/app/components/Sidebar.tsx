import Link from "next/link";
import React from "react";

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

const Sidebar = ({ isOpen, toggle }: SidebarProps) => {
  return (
    <div
      className={`fixed inset-0 z-100 flex flex-col items-center justify-center bg-white/95 backdrop-blur-xl transition-all duration-500 ease-in-out md:hidden ${
        isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      {/* Close Button */}
      <button 
        className="absolute top-6 right-8 text-gray-900 hover:rotate-90 transition-transform duration-300" 
        onClick={toggle}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"> 
          <path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" />
        </svg>
      </button>

      {/* Navigation Links */}
      <nav>
        <ul className="flex flex-col gap-10 text-center text-2xl font-bold text-gray-800">
          <li className="hover:text-blue-600 transition-colors">
            <Link href="/" onClick={toggle}>Home</Link>
          </li>
          <li className="hover:text-blue-600 transition-colors">
            <Link href="/products" onClick={toggle}>Products</Link>
          </li>
          <li className="hover:text-blue-600 transition-colors">
            <Link href="/admin" onClick={toggle}>Admin</Link>
          </li>
          <li className="pt-4">
            <Link 
              href="/cart" 
              onClick={toggle}
              className="bg-blue-600 text-white px-10 py-4 rounded-full shadow-xl active:scale-95 transition-all"
            >
              Cart (0)
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;