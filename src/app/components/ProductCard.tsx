"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link"; 
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }: { product: any }) => {
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();

  // Check if this specific product is already in the cart
  const cartItem = cart.find((item) => item.id === product.id);
  const isInCart = !!cartItem;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(product.id, 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartItem && cartItem.quantity > 1) {
      updateQuantity(product.id, -1);
    } else {
      removeFromCart(product.id);
    }
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className="group relative flex flex-col bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl p-4 transition-all duration-500 hover:-translate-y-2 hover:bg-white/50 hover:shadow-2xl w-full max-w-92.5 mx-auto cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-square bg-white rounded-xl overflow-hidden mb-4 shadow-sm border border-slate-100">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-6 transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col grow px-1">
        <h2 className="text-slate-900 font-bold text-base line-clamp-1 mb-1 tracking-tight">
          {product.title}
        </h2>

        <div className="flex items-center gap-2 mb-4">
          <span className="bg-slate-900 text-white text-[10px] font-black px-2 py-0.5 rounded flex items-center gap-1 uppercase tracking-tighter">
            {product?.rating?.rate || 0} ★
          </span>
          <span className="text-slate-700 text-xs font-medium opacity-60">
            ({product?.rating?.count || 0})
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider -mb-1">
              Price
            </p>
            <p className="text-xl font-black text-slate-900 tracking-tighter">
              ₹ {product.price.toLocaleString("en-IN")}
            </p>
          </div>

          {/* DYNAMIC ACTION AREA */}
          <div className="flex items-center">
            {isInCart ? (
              <div 
                className="flex items-center bg-slate-900 text-white rounded-xl overflow-hidden shadow-lg animate-in zoom-in duration-300"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              >
                {/* Minus / Trash Button */}
                <button 
                  onClick={handleDecrement}
                  className={`px-3 py-2 transition-colors cursor-pointer flex items-center justify-center ${
                    cartItem.quantity === 1 ? "hover:bg-red-500/20 text-red-400" : "hover:bg-white/10 text-white"
                  }`}
                >
                  {cartItem.quantity === 1 ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  ) : (
                    <span className="font-bold text-lg">−</span>
                  )}
                </button>

                <span className="px-1 font-black text-sm min-w-[2.5ch] text-center select-none">
                  {cartItem.quantity}
                </span>

                {/* Plus Button */}
                <button 
                  onClick={handleIncrement}
                  className="px-3 py-2 hover:bg-white/10 transition-colors font-bold cursor-pointer text-white text-lg"
                >
                  +
                </button>
              </div>
            ) : (
              /* Add to Cart Button */
              <button 
                onClick={handleAddToCart}
                className="bg-slate-900 text-white p-2.5 rounded-xl hover:scale-110 transition-all active:scale-90 shadow-md cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;