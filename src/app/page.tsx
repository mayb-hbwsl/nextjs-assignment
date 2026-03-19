import React from "react";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Decorative Blur - Represents the 'Hum' */}
      <div className="absolute top-[-10%] right-[-10%] w-125 h-125 bg-white/10 rounded-full blur-[120px] -z-10 animate-pulse duration-4000" />
      <div className="absolute bottom-[-10%] left-[-10%] w-100 h-100 bg-slate-400/20 rounded-full blur-[100px] -z-10" />

      <main className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-10">
        {/* Left Side: Brand Narrative */}
        <div className="space-y-10 text-center lg:text-left z-10">
          <div className="space-y-5">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <span className="h-px w-8 bg-slate-900/30"></span>
              <h2 className="text-[10px] uppercase tracking-[0.5em] font-black text-slate-700">
                Est. 2011
              </h2>
            </div>

            <h1 className="text-7xl md:text-9xl font-black text-slate-900 tracking-tighter leading-[0.85] animate-in fade-in slide-in-from-left-8 duration-1000">
              Humming <br />
              <span className="opacity-30">Store.</span>
            </h1>

            <p className="max-w-md text-slate-700 text-lg font-medium leading-relaxed mx-auto lg:mx-0 opacity-70 border-l-2 border-slate-900/10 pl-6 italic">
              A technology and marketing solutions company, headquartered in
              India, serving customers all over the world.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start">
            <Link
              href="/products"
              className="group relative px-12 py-5 bg-slate-900 text-white rounded-full font-bold uppercase tracking-widest text-[10px] overflow-hidden transition-all hover:shadow-2xl active:scale-95"
            >
              <span className="relative z-10">Explore Products</span>
              <div className="absolute inset-0 bg-slate-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Link>

            <Link
              href="/admin/add-product"
              className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 hover:text-slate-500 transition-colors"
            >
              Add Product
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
