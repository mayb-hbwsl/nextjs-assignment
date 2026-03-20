import React from "react";
import Image from "next/image";
import Link from "next/link";
import NotFound from "@/app/not-found";
import ProductAction from "@/app/components/ProductAction";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const [res1, res2] = await Promise.all([
    fetch("https://fakestoreapi.com/products", { cache: "no-store" }),
    fetch("http://localhost:3000/api/products", { cache: "no-store" }),
  ]);

  const apiProducts = await res1.json();
  const localProducts = await res2.json();
  const allProducts = [...apiProducts, ...localProducts];
  const product = allProducts.find((p) => p.id.toString() === id);

  if (!product) return <NotFound />;

  return (
    <main className="min-h-screen bg-[#020617] flex items-center justify-center p-6 md:p-12 antialiased">
      {/* Background elements stay the same... */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full -z-10" />

      <div className="relative max-w-6xl w-full bg-slate-900/40 backdrop-blur-2xl border border-slate-800/60 rounded-[3rem] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.5)] flex flex-col md:flex-row">
        
        {/* LEFT SIDE stays exactly as you had it */}
        <div className="md:w-5/12 bg-white p-10 flex items-center justify-center relative group min-h-100">
           {/* ... your image code ... */}
           <Link href="/products" className="absolute top-8 left-8 z-20 bg-slate-900 text-white p-3 rounded-2xl hover:bg-blue-600 transition-all shadow-xl active:scale-90">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m15 18-6-6 6-6" /></svg>
           </Link>
           <div className="relative w-full aspect-square transition-transform duration-1000 group-hover:scale-110">
             <Image src={product.image} alt={product.title} fill className="object-contain p-4 md:p-10 mix-blend-multiply" priority />
           </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="md:w-7/12 p-10 md:p-16 flex flex-col">
          {/* Category, Title, Rating, and Description stay same... */}
          <div className="mb-6">
            <span className="bg-blue-500/10 text-blue-400 text-[11px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full border border-blue-500/20">
              {product.category || "Exclusive Collection"}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white leading-[1.1] mb-6 tracking-tighter">
            {product.title}
          </h1>

          <div className="flex items-center gap-4 mb-8 text-slate-300">
             <span className="text-yellow-400">★</span> {product.rating?.rate || "4.5"} 
             <span className="text-slate-600">|</span> 
             <span className="text-xs uppercase tracking-widest font-bold">{product.rating?.count || 0} Reviews</span>
          </div>

          <p className="text-slate-300 text-lg leading-relaxed font-medium mb-10">
            {product.description}
          </p>

          {/* HERE IS THE UPDATE: Use the Client Action Component */}
          <ProductAction product={product} />
        </div>
      </div>
    </main>
  );
};

export default Page;