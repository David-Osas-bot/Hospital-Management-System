// ─── Patient Returns Chart ────────────────────────────────────────────────────
// SVG-based smooth line chart showing patient return trends over time

import { useState } from "react";
import { patientReturnData } from "../../data/pharmacyData";

const PatientReturnsChart = () => {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Chart dimensions
  const width = 380;
  const height = 160;
  const padX = 30;
  const padY = 20;

  const maxVal = Math.max(...patientReturnData.map((d) => d.value));
  const minVal = Math.min(...patientReturnData.map((d) => d.value));
  const range = maxVal - minVal || 1;

  // Map data points to SVG coordinates
  const points = patientReturnData.map((d, i) => ({
    x: padX + (i / (patientReturnData.length - 1)) * (width - padX * 2),
    y: padY + (1 - (d.value - minVal) / range) * (height - padY * 2),
    value: d.value,
    month: d.month,
  }));

  // Build smooth SVG path using cubic bezier curves
  const buildPath = (pts) => {
    if (pts.length < 2) return "";
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1];
      const curr = pts[i];
      const cpX = (prev.x + curr.x) / 2;
      d += ` C ${cpX} ${prev.y}, ${cpX} ${curr.y}, ${curr.x} ${curr.y}`;
    }
    return d;
  };

  // Area fill path (close path at bottom)
  const buildAreaPath = (pts) => {
    const linePath = buildPath(pts);
    return `${linePath} L ${pts[pts.length - 1].x} ${height - padY} L ${pts[0].x} ${height - padY} Z`;
  };

  const linePath = buildPath(points);
  const areaPath = buildAreaPath(points);

  return (
    <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 flex-1 hover:border-violet-500/30 transition-all duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-white font-semibold text-sm">Patient Returns</h3>
          <p className="text-slate-500 text-xs mt-0.5">Monthly overview</p>
        </div>
        {/* Legend */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-violet-500 inline-block" />
          <span className="text-slate-400 text-xs">Returns</span>
        </div>
      </div>

      {/* SVG Chart */}
      <div className="relative overflow-visible">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full overflow-visible"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Gradient fill under the line */}
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
            </linearGradient>
            {/* Line glow filter */}
            <filter id="lineGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Grid lines */}
          {[0, 0.33, 0.66, 1].map((t, i) => {
            const y = padY + t * (height - padY * 2);
            return (
              <line
                key={i}
                x1={padX}
                y1={y}
                x2={width - padX}
                y2={y}
                stroke="#334155"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            );
          })}

          {/* Area fill */}
          <path d={areaPath} fill="url(#areaGradient)" />

          {/* Main line */}
          <path
            d={linePath}
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#lineGlow)"
          />

          {/* Data points */}
          {points.map((pt, i) => (
            <g key={i}>
              {/* Outer ring (visible on hover) */}
              <circle
                cx={pt.x}
                cy={pt.y}
                r={hoveredPoint === i ? 8 : 0}
                fill="#8B5CF6"
                fillOpacity="0.2"
                className="transition-all duration-200"
              />
              {/* Inner dot */}
              <circle
                cx={pt.x}
                cy={pt.y}
                r={hoveredPoint === i ? 5 : 3.5}
                fill="#8B5CF6"
                stroke="#1E293B"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => setHoveredPoint(i)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
              {/* Tooltip */}
              {hoveredPoint === i && (
                <g>
                  <rect
                    x={pt.x - 22}
                    y={pt.y - 28}
                    width={44}
                    height={20}
                    rx={5}
                    fill="#312E81"
                    stroke="#6D28D9"
                    strokeWidth="1"
                  />
                  <text
                    x={pt.x}
                    y={pt.y - 14}
                    textAnchor="middle"
                    fontSize="9"
                    fill="white"
                    fontWeight="600"
                  >
                    {pt.value}
                  </text>
                </g>
              )}
            </g>
          ))}

          {/* X-axis labels */}
          {points.map((pt, i) =>
            i % 2 === 0 ? (
              <text
                key={i}
                x={pt.x}
                y={height - 2}
                textAnchor="middle"
                fontSize="8"
                fill="#64748B"
              >
                {pt.month}
              </text>
            ) : null
          )}
        </svg>
      </div>
    </div>
  );
};

export default PatientReturnsChart;
