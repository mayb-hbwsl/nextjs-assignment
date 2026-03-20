"use client";
import React from "react";
import { useCart } from "../context/CartContext";

const ProductAction = ({ product }: { product: any }) => {
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();
  const cartItem = cart.find((item) => item.id === product.id);
  const isInCart = !!cartItem;

  return (
    <div className="mt-auto pt-10 border-t border-slate-800/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
      <div>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">
          Price
        </p>
        <p className="text-5xl font-black text-white tracking-tighter flex items-start gap-1">
          <span className="text-2xl mt-1 text-blue-500 italic">₹</span>
          {product.price.toLocaleString("en-IN")}
        </p>
      </div>

      {isInCart ? (
        <div className="w-full sm:w-auto flex items-center bg-white text-slate-900 rounded-4xl overflow-hidden shadow-2xl animate-in zoom-in duration-300">
          <button
            onClick={() => cartItem.quantity === 1 ? removeFromCart(product.id) : updateQuantity(product.id, -1)}
            className={`px-8 py-5 transition-colors cursor-pointer flex items-center justify-center font-black text-xl ${
                cartItem.quantity === 1 ? "hover:bg-red-500 hover:text-white" : "hover:bg-slate-100"
            }`}
          >
            {cartItem.quantity === 1 ? "✕" : "−"}
          </button>
          
          <span className="px-6 font-black text-2xl min-w-[3ch] text-center border-x border-slate-100">
            {cartItem.quantity}
          </span>
          
          <button
            onClick={() => updateQuantity(product.id, 1)}
            className="px-8 py-5 hover:bg-slate-100 transition-colors font-black text-xl cursor-pointer"
          >
            +
          </button>
        </div>
      ) : (
        <button 
          onClick={() => addToCart(product)}
          className="w-full sm:w-auto bg-white text-slate-900 hover:bg-blue-600 hover:text-white px-12 py-5 rounded-3xl font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-[0_10px_40px_rgba(255,255,255,0.1)] hover:shadow-blue-500/40 active:scale-95 flex items-center justify-center gap-3 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
          Add to Bag
        </button>
      )}
    </div>
  );
};

export default ProductAction;