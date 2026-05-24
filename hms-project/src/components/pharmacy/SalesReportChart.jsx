// ─── Sales Report Donut Chart ─────────────────────────────────────────────────
// SVG donut chart showing sales breakdown by medicine category

import { useState } from "react";
import { salesReportData } from "../../data/pharmacyData";

const SalesReportChart = () => {
  const [hovered, setHovered] = useState(null);

  const size = 130;
  const cx = size / 2;
  const cy = size / 2;
  const outerR = 50;
  const innerR = 30; // Donut hole

  // Calculate total for percentages
  const total = salesReportData.reduce((s, d) => s + d.value, 0);

  // Build SVG arcs for each segment
  let startAngle = -Math.PI / 2; // Start from top
  const segments = salesReportData.map((item, i) => {
    const angle = (item.value / total) * 2 * Math.PI;
    const endAngle = startAngle + angle;

    // Outer arc points
    const x1 = cx + outerR * Math.cos(startAngle);
    const y1 = cy + outerR * Math.sin(startAngle);
    const x2 = cx + outerR * Math.cos(endAngle);
    const y2 = cy + outerR * Math.sin(endAngle);
    // Inner arc points
    const x3 = cx + innerR * Math.cos(endAngle);
    const y3 = cy + innerR * Math.sin(endAngle);
    const x4 = cx + innerR * Math.cos(startAngle);
    const y4 = cy + innerR * Math.sin(startAngle);

    const largeArc = angle > Math.PI ? 1 : 0;

    // Expand segment slightly on hover
    const midAngle = startAngle + angle / 2;
    const expandOffset = hovered === i ? 6 : 0;
    const translateX = expandOffset * Math.cos(midAngle);
    const translateY = expandOffset * Math.sin(midAngle);

    const path = `
      M ${x1} ${y1}
      A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2} ${y2}
      L ${x3} ${y3}
      A ${innerR} ${innerR} 0 ${largeArc} 0 ${x4} ${y4}
      Z
    `;

    const seg = {
      path,
      color: item.color,
      label: item.label,
      value: item.value,
      percent: Math.round((item.value / total) * 100),
      translateX,
      translateY,
    };

    startAngle = endAngle;
    return seg;
  });

  return (
    <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 w-56 hover:border-cyan-500/30 transition-all duration-300">
      
      {/* Header */}
      <div className="mb-3">
        <h3 className="text-white font-semibold text-sm">Sales Report</h3>
        <p className="text-slate-500 text-xs mt-0.5">By medicine category</p>
      </div>

      {/* Donut Chart */}
      <div className="flex justify-center mb-3">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="overflow-visible"
        >
          {segments.map((seg, i) => (
            <path
              key={i}
              d={seg.path}
              fill={seg.color}
              stroke="#1E293B"
              strokeWidth="2"
              transform={`translate(${seg.translateX}, ${seg.translateY})`}
              className="cursor-pointer transition-transform duration-200"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                filter: hovered === i ? `drop-shadow(0 0 6px ${seg.color}80)` : "none",
                transition: "filter 0.2s, transform 0.2s",
              }}
            />
          ))}

          {/* Center label */}
          <text x={cx} y={cy - 4} textAnchor="middle" fontSize="14" fontWeight="800" fill="white">
            {hovered !== null ? `${segments[hovered].percent}%` : total}
          </text>
          <text x={cx} y={cy + 10} textAnchor="middle" fontSize="7" fill="#64748B">
            {hovered !== null ? segments[hovered].label : "Total Sales"}
          </text>
        </svg>
      </div>

      {/* Legend */}
      <div className="space-y-1.5">
        {salesReportData.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between cursor-pointer group"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0 transition-transform duration-200 group-hover:scale-150"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-slate-400 text-[10px] group-hover:text-white transition-colors">{item.label}</span>
            </div>
            <span className="text-slate-300 text-[10px] font-semibold">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesReportChart;
