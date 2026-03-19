import React from "react";
import Image from "next/image";
import Link from "next/link"; // Import Link

const ProductCard = ({ product }: { product: any }) => {
  return (
    // Wrap everything in a Link pointing to the dynamic route
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
          className="object-contain p-6 transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col grow px-1">
        <h2 className="text-slate-900 font-bold text-base line-clamp-1 mb-1 tracking-tight group-hover:text-blue-600 transition-colors">
          {product.title}
        </h2>

        <div className="flex items-center gap-2 mb-4">
          <span className="bg-slate-900 text-white text-[10px] font-black px-2 py-0.5 rounded flex items-center gap-1 uppercase tracking-tighter">
            {product.rating.rate} ★
          </span>
          <span className="text-slate-500 text-xs font-medium">
            ({product.rating.count} reviews)
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider -mb-1">
              Price
            </p>
            <p className="text-xl font-black text-slate-900 tracking-tighter">
              ₹ {product.price.toLocaleString("en-IN")}
            </p>
          </div>

          {/* We use a div here instead of a button to avoid "button inside anchor" HTML errors */}
          <div className="bg-slate-900 text-white p-2.5 rounded-xl group-hover:bg-blue-600 transition-all active:scale-90 shadow-md">
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
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
