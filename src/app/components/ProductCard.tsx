import React from 'react'
import Image from 'next/image';

const ProductCard = ({ product }: { product: any }) => {
  return (
    // Balanced padding (p-4) and a flexible but constrained width
    <div className="group relative flex flex-col bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl p-4 transition-all duration-500 hover:-translate-y-2 hover:bg-white/50 hover:shadow-2xl w-full max-w-92.5 mx-auto">
      
      {/* Image Container: Square and spacious but not overwhelming */}
      <div className="relative w-full aspect-square bg-slate-300 rounded-xl overflow-hidden mb-4 shadow-sm border border-slate-100">
        <Image 
          src={product.image} 
          alt={product.title} 
          fill
          className="object-contain p-6 transition-transform duration-700 group-hover:scale-105" 
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col grow px-1">
        <h2 className="text-slate-900 font-bold text-base line-clamp-1 mb-1 tracking-tight group-hover:text-slate-700 transition-colors">
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
          <p className="text-xl font-black text-slate-900 tracking-tighter">
            ₹{product.price}
          </p>
          
          <button className="bg-slate-900 text-white p-2.5 rounded-xl hover:bg-slate-700 transition-all active:scale-90 shadow-md">
             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
             </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard