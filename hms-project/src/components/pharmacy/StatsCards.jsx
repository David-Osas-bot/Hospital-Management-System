// ─── Stats Cards Component ────────────────────────────────────────────────────
// Displays the three top metric cards: Total Customer, Total Medicines, Total Manufacturers

import { stats } from "../../data/pharmacyData";
import { useState, useEffect } from "react";

// Animated counter hook for smooth number reveal
const useCountUp = (target, duration = 1200) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const steps = 40;
    const increment = target / steps;
    const interval = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [target, duration]);

  return count;
};

// Individual stat card with count-up animation
const StatCard = ({ stat, index }) => {
  const count = useCountUp(stat.value, 1000 + index * 200);

  return (
    <div
      className="relative overflow-hidden bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-5 flex-1 min-w-0
        hover:border-violet-500/40 hover:shadow-xl hover:shadow-violet-500/10
        transition-all duration-300 ease-out hover:-translate-y-1 group"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Background gradient glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />

      {/* Top: Icon + Label */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">{stat.label}</p>
        </div>
        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-sm shadow-lg`}>
          {stat.icon}
        </div>
      </div>

      {/* Value */}
      <div className="flex items-end gap-2">
        <span className="text-4xl font-black text-white tabular-nums">{count}</span>
        <span className="text-emerald-400 text-xs font-semibold mb-1 flex items-center gap-0.5">
          ↑ 12%
          <span className="text-slate-500 font-normal">vs last month</span>
        </span>
      </div>

      {/* Mini progress bar */}
      <div className="mt-3 h-1 bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${(stat.value / 60) * 100}%` }}
        />
      </div>
    </div>
  );
};

const StatsCards = () => {
  return (
    <div className="flex gap-4 mb-6">
      {stats.map((stat, i) => (
        <StatCard key={stat.label} stat={stat} index={i} />
      ))}
    </div>
  );
};

export default StatsCards;
