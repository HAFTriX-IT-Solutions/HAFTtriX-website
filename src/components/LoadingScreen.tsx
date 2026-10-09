export default function LoadingScreen() {
  return (
    <div className="loading-screen fixed inset-0 flex items-center justify-center z-[100] overflow-hidden">
      <div className="relative text-center px-6" data-animate="scale">
        <div className="relative w-16 h-16 mx-auto mb-6 liquid-glass rounded-2xl p-3 flex items-center justify-center">
          <img src="/logo.jpg" alt="HAFTriX IT Solutions" className="h-full w-full object-contain" />
        </div>
        <div className="mb-6">
          <div className="text-xl font-serif font-medium text-slate-900 dark:text-white">HAFTriX IT Solutions</div>
          <div className="text-[10px] tracking-[0.18em] text-slate-500 uppercase font-mono mt-1">Research &amp; Development</div>
        </div>
        <div className="w-36 h-0.5 mx-auto bg-slate-300/70 dark:bg-white/10 rounded-full overflow-hidden" role="progressbar" aria-label="Loading page">
          <div className="loading-progress w-1/2 h-full bg-blue-700 dark:bg-blue-300 rounded-full" />
        </div>
      </div>
    </div>
  )
}
