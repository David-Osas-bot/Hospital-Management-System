// ─── Sidebar Component ────────────────────────────────────────────────────────
// Handles the left navigation panel with animated hover states and active routes

import { navItems } from "../../data/pharmacyData";

const Sidebar = ({ activePage, onNavigate }) => {
  return (
    <aside className="fixed left-0 top-0 h-full w-20 bg-slate-900 flex flex-col items-center py-6 z-50 shadow-2xl">
      
      {/* App Logo */}
      <div className="mb-8 flex flex-col items-center">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-lg shadow-violet-500/30 mb-1">
          <span className="text-white text-xs font-black">ML</span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-col gap-1 flex-1 w-full px-2">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              title={item.label}
              className={`
                group relative flex flex-col items-center justify-center py-3 px-1 rounded-xl
                transition-all duration-300 ease-out cursor-pointer
                ${isActive
                  ? "bg-gradient-to-br from-violet-600 to-purple-700 shadow-lg shadow-violet-500/40 scale-105"
                  : "hover:bg-slate-800 hover:scale-105"
                }
              `}
            >
              {/* Active indicator bar */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-violet-300 rounded-r-full" />
              )}

              {/* Icon */}
              <span className={`text-lg leading-none transition-all duration-300 ${isActive ? "grayscale-0" : "grayscale opacity-60 group-hover:opacity-100"}`}>
                {item.icon}
              </span>

              {/* Label */}
              <span className={`text-[9px] mt-1 font-semibold tracking-wide transition-colors duration-300 ${isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200"}`}>
                {item.label}
              </span>

              {/* Tooltip on hover */}
              <span className="absolute left-full ml-3 px-2 py-1 bg-slate-800 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl border border-slate-700 z-50">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Bottom user avatar */}
      <div className="mt-auto">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold shadow-lg cursor-pointer hover:scale-110 transition-transform duration-200">
          AD
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
