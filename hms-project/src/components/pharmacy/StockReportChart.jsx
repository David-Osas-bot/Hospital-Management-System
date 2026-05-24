// ─── Stock Report Bar Chart ───────────────────────────────────────────────────
// Grouped bar chart showing in-stock, low-stock, out-of-stock per month

import { useState } from "react";
import { stockReportData } from "../../data/pharmacyData";

const BAR_COLORS = {
  inStock: { fill: "#8B5CF6", label: "In Stock" },
  lowStock: { fill: "#F59E0B", label: "Low Stock" },
  outStock: { fill: "#EF4444", label: "Out Stock" },
};

const StockReportChart = () => {
  const [hovered, setHovered] = useState(null); // { month, key }

  const svgW = 420;
  const svgH = 150;
  const padL = 28;
  const padR = 10;
  const padT = 10;
  const padB = 25;

  const chartW = svgW - padL - padR;
  const chartH = svgH - padT - padB;

  const maxVal = Math.max(...stockReportData.flatMap((d) => [d.inStock, d.lowStock, d.outStock]));

  const barKeys = ["inStock", "lowStock", "outStock"];
  const groupW = chartW / stockReportData.length;
  const barW = (groupW - 8) / 3; // 3 bars per group, with gap

  return (
    <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 flex-1 hover:border-amber-500/30 transition-all duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-white font-semibold text-sm">Stock Report</h3>
          <p className="text-slate-500 text-xs mt-0.5">6-month overview</p>
        </div>
        {/* Legend */}
        <div className="flex items-center gap-3">
          {barKeys.map((k) => (
            <div key={k} className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: BAR_COLORS[k].fill }} />
              <span className="text-slate-500 text-[10px]">{BAR_COLORS[k].label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SVG Bar Chart */}
      <svg
        viewBox={`0 0 ${svgW} ${svgH}`}
        className="w-full overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {barKeys.map((k) => (
            <linearGradient key={k} id={`grad-${k}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={BAR_COLORS[k].fill} stopOpacity="1" />
              <stop offset="100%" stopColor={BAR_COLORS[k].fill} stopOpacity="0.6" />
            </linearGradient>
          ))}
        </defs>

        {/* Y-axis grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
          const y = padT + (1 - t) * chartH;
          const val = Math.round(maxVal * t);
          return (
            <g key={i}>
              <line x1={padL} y1={y} x2={svgW - padR} y2={y} stroke="#334155" strokeWidth="0.5" strokeDasharray="3 3" />
              <text x={padL - 4} y={y + 3} textAnchor="end" fontSize="7" fill="#475569">{val}</text>
            </g>
          );
        })}

        {/* Bars */}
        {stockReportData.map((d, gi) => {
          const groupX = padL + gi * groupW + 4;
          return (
            <g key={d.month}>
              {barKeys.map((k, bi) => {
                const barH = (d[k] / maxVal) * chartH;
                const x = groupX + bi * (barW + 1);
                const y = padT + chartH - barH;
                const isHov = hovered?.month === d.month && hovered?.key === k;

                return (
                  <g key={k}>
                    {/* Bar with rounded top */}
                    <rect
                      x={x}
                      y={y}
                      width={barW}
                      height={barH}
                      rx={3}
                      fill={`url(#grad-${k})`}
                      stroke={isHov ? BAR_COLORS[k].fill : "none"}
                      strokeWidth="1.5"
                      opacity={hovered && !isHov ? 0.4 : 1}
                      className="cursor-pointer transition-opacity duration-150"
                      onMouseEnter={() => setHovered({ month: d.month, key: k })}
                      onMouseLeave={() => setHovered(null)}
                      style={{
                        filter: isHov ? `drop-shadow(0 0 4px ${BAR_COLORS[k].fill})` : "none",
                        transition: "filter 0.15s, opacity 0.15s",
                      }}
                    />
                    {/* Hover tooltip */}
                    {isHov && (
                      <g>
                        <rect x={x - 8} y={y - 22} width={36} height={16} rx={4} fill="#0F172A" stroke={BAR_COLORS[k].fill} strokeWidth="1" />
                        <text x={x + 10} y={y - 11} textAnchor="middle" fontSize="8" fill="white" fontWeight="700">
                          {d[k]}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
              {/* Month label */}
              <text
                x={groupX + (barW * 3 + 2) / 2}
                y={padT + chartH + 14}
                textAnchor="middle"
                fontSize="8"
                fill="#64748B"
              >
                {d.month}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default StockReportChart;
