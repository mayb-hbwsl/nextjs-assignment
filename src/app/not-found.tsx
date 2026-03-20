import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-[12rem] font-black text-slate-900/5 leading-none absolute select-none">
        404
      </h1>
      
      <div className="z-10 space-y-6">
        <h2 className="text-4xl font-black text-slate-900 tracking-tighter">
          Silence in the store.
        </h2>
        <p className="text-slate-300 font-medium max-w-xs mx-auto opacity-70">
          The page you are looking for has lost into another dimension.
        </p>
        
        <Link 
          href="/products" 
          className="inline-block px-10 py-4 bg-slate-900 text-white rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-black transition-all hover:scale-105 active:scale-95 shadow-xl"
        >
          Return to Products
        </Link>
      </div>
    </div>
  )
}