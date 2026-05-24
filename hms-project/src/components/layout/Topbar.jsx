// ─── Topbar Component ────────────────────────────────────────────────────────
// Top navigation bar with hospital name, page title, and user profile

const Topbar = ({ pageTitle }) => {
  return (
    <header className="fixed top-0 left-20 right-0 h-16 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50 flex items-center justify-between px-6 z-40">
      
      {/* Left: Hospital Branding */}
      <div className="flex items-center gap-3">
        {/* Hospital logo icon */}
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-md">
          <span className="text-white text-xs">🏥</span>
        </div>
        <span className="text-white font-bold text-sm tracking-wide">MedLab Hospital</span>
        
        {/* Breadcrumb separator */}
        <span className="text-slate-600 text-lg mx-1">›</span>
        <span className="text-slate-400 text-sm">{pageTitle}</span>
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-4">
        
        {/* Notification bell */}
        <button className="relative p-2 rounded-lg hover:bg-slate-800 transition-colors duration-200 group">
          <span className="text-slate-400 group-hover:text-white transition-colors">🔔</span>
          {/* Notification dot */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
        </button>

        {/* Search */}
        <button className="p-2 rounded-lg hover:bg-slate-800 transition-colors duration-200 group">
          <span className="text-slate-400 group-hover:text-white transition-colors">🔍</span>
        </button>

        {/* User profile */}
        <div className="flex items-center gap-2 pl-3 border-l border-slate-700 cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold shadow-md">
            AD
          </div>
          <div className="hidden sm:block">
            <p className="text-white text-xs font-semibold leading-none">Admin</p>
            <p className="text-slate-500 text-[10px] mt-0.5">Pharmacist</p>
          </div>
          <span className="text-slate-500 text-xs ml-1 group-hover:text-slate-300 transition-colors">▾</span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
