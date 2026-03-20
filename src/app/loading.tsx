export default function Loading() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <div className="relative">
        {/* Animated Ripple Effect */}
        <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl animate-pulse scale-150" />
        
        <h2 className="relative text-xs font-black uppercase tracking-[0.5em] text-slate-900 animate-pulse">
          Humming...
        </h2>
      </div>
      
      {/* Subtle Progress Bar */}
      <div className="mt-8 w-32 h-px bg-slate-900/10 overflow-hidden">
        <div className="w-full h-full bg-slate-900 origin-left animate-[loading-bar_1.5s_infinite_ease-in-out]" />
      </div>
    </div>
  )
}