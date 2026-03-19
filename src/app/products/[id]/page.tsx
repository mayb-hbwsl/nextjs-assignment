import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  // Your logic: Fetching full lists to find the product regardless of source
  const [res1, res2] = await Promise.all([
    fetch('https://fakestoreapi.com/products', { cache: 'no-store' }),
    fetch('http://localhost:3000/api/products', { cache: 'no-store' })
  ]);

  const apiProducts = await res1.json();
  const localProducts = await res2.json();

  const allProducts = [...apiProducts, ...localProducts];
  const product = allProducts.find((p) => p.id.toString() === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
        <div className="text-center p-10 bg-slate-900/50 rounded-3xl border border-slate-800 backdrop-blur-xl">
          <h1 className="text-5xl font-black mb-4 tracking-tighter text-blue-500">404</h1>
          <p className="text-slate-400 mb-8 font-medium">This product has left the building.</p>
          <Link href="/products" className="px-8 py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-blue-500 hover:text-white transition-all">
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#020617] flex items-center justify-center p-6 md:p-12 antialiased selection:bg-blue-500/30">
      {/* Dynamic Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />

      <div className="relative max-w-6xl w-full bg-slate-900/40 backdrop-blur-2xl border border-slate-800/60 rounded-[3rem] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.5)] flex flex-col md:flex-row">
        
        {/* LEFT SIDE: Image Showcase */}
        <div className="md:w-5/12 bg-white p-10 flex items-center justify-center relative group min-h-[400px]">
          <Link href="/products" className="absolute top-8 left-8 z-20 bg-slate-900 text-white p-3 rounded-2xl hover:bg-blue-600 transition-all shadow-xl active:scale-90">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </Link>
          
          <div className="relative w-full aspect-square transition-transform duration-1000 group-hover:scale-110">
            <Image 
                src={product.image} 
                alt={product.title} 
                fill
                className="object-contain p-4 md:p-10 mix-blend-multiply"
                priority
            />
          </div>
          {/* Subtle bottom shadow for the image */}
          <div className="absolute bottom-10 w-2/3 h-6 bg-black/5 blur-xl rounded-[100%]" />
        </div>

        {/* RIGHT SIDE: Product Info */}
        <div className="md:w-7/12 p-10 md:p-16 flex flex-col relative overflow-hidden">
          
          {/* Category Tag */}
          <div className="mb-6">
            <span className="bg-blue-500/10 text-blue-400 text-[11px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full border border-blue-500/20">
              {product.category || 'Exclusive Collection'}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white leading-[1.1] mb-6 tracking-tighter">
            {product.title}
          </h1>

          {/* Rating Section */}
          <div className="flex items-center gap-4 mb-8">
             <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-xl border border-slate-700/50">
                <span className="text-yellow-400 text-lg">★</span>
                <span className="font-black text-white">{product.rating?.rate || "4.5"}</span>
             </div>
             <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">
                {product.rating?.count || "0"} Reviews
             </span>
          </div>

          {/* Description */}
          <div className="mb-10">
            <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-3">Description</h3>
            <p className="text-slate-300 text-lg leading-relaxed font-medium">
              {product.description}
            </p>
          </div>

          {/* Pricing & CTA Card (Matches bottom of ProductCard) */}
          <div className="mt-auto pt-10 border-t border-slate-800/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Price</p>
              <p className="text-5xl font-black text-white tracking-tighter flex items-start gap-1">
                <span className="text-2xl mt-1 text-blue-500">₹</span>
                { (product.price).toLocaleString('en-IN')}
              </p>
            </div>
            
            <button className="w-full sm:w-auto bg-white text-slate-900 hover:bg-blue-600 hover:text-white px-12 py-5 rounded-[1.5rem] font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-[0_10px_40px_rgba(255,255,255,0.1)] hover:shadow-blue-500/40 active:scale-95 flex items-center justify-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
              Add to Bag
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

// ... keep your generateStaticParams here ...

export default Page