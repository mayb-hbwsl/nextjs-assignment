"use client"; 

import React from 'react';

const EmptyState = () => (
  <div className="w-full py-32 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-700">
    <div className="w-24 h-24 bg-white/20 backdrop-blur-xl border border-white/40 rounded-full flex items-center justify-center mb-6 shadow-inner">
      <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    </div>
    
    <h3 className="text-xl font-bold text-slate-900 tracking-tight">No items found</h3>
    <p className="text-slate-300 text-sm mt-2 font-medium">Try adjusting your filters or search terms.</p>
    
    <button 
      onClick={() => window.location.reload()}
      className="mt-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 hover:text-slate-900 transition-colors cursor-pointer"
    >
      Reset View
    </button>
  </div>
);

export default EmptyState; 