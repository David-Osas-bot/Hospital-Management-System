// ─── Placeholder Page ─────────────────────────────────────────────────────────
// Used for routes that haven't been built yet (Staff, Lab, Ward, etc.)

const PlaceholderPage = ({ pageName }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      
      {/* Animated icon */}
      <div className="w-20 h-20 rounded-3xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center mb-5 animate-bounce-slow">
        <span className="text-4xl">🏗️</span>
      </div>

      <h2 className="text-2xl font-black text-white mb-2">{pageName}</h2>
      <p className="text-slate-500 text-sm max-w-xs">
        This section is under construction. Navigate to{" "}
        <span className="text-violet-400 font-semibold">Pharmacy</span> to see the full dashboard.
      </p>

      {/* Decorative pills */}
      <div className="flex gap-2 mt-6">
        {["Coming Soon", "Under Development", "MedLab"].map((t) => (
          <span
            key={t}
            className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-500 text-xs"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PlaceholderPage;
