// ─── Recent Medicines Table ───────────────────────────────────────────────────
// Displays the most recent medicine records with status badges and actions

import { useState } from "react";
import { recentMedicines } from "../../data/pharmacyData";

// Status badge configuration
const STATUS_CONFIG = {
  "In Stock": {
    bg: "bg-emerald-500/15",
    text: "text-emerald-400",
    dot: "bg-emerald-400",
    border: "border-emerald-500/30",
  },
  "Low Stock": {
    bg: "bg-amber-500/15",
    text: "text-amber-400",
    dot: "bg-amber-400",
    border: "border-amber-500/30",
  },
  "Out of Stock": {
    bg: "bg-red-500/15",
    text: "text-red-400",
    dot: "bg-red-400",
    border: "border-red-500/30",
  },
};

const StatusBadge = ({ status }) => {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG["In Stock"];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} animate-pulse`} />
      {status}
    </span>
  );
};

const RecentMedicinesTable = () => {
  const [sortField, setSortField] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");

  // Toggle sort on column click
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  // Filter + sort medicines
  const filtered = recentMedicines
    .filter((m) =>
      m.drugName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.medicineGroup.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      const valA = a[sortField];
      const valB = b[sortField];
      const cmp = typeof valA === "number" ? valA - valB : String(valA).localeCompare(String(valB));
      return sortDir === "asc" ? cmp : -cmp;
    });

  const SortIcon = ({ field }) => (
    <span className={`ml-1 text-[9px] ${sortField === field ? "text-violet-400" : "text-slate-600"}`}>
      {sortField === field ? (sortDir === "asc" ? "▲" : "▼") : "⇅"}
    </span>
  );

  return (
    <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 hover:border-violet-500/20 transition-all duration-300">
      
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white font-semibold text-sm">Recent Medicines</h3>
          <p className="text-slate-500 text-xs mt-0.5">{filtered.length} records found</p>
        </div>

        {/* Search input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search medicine..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-slate-900/70 border border-slate-700 text-slate-300 text-xs rounded-lg pl-8 pr-3 py-2 w-44 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-all duration-200 placeholder-slate-600"
          />
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs">🔍</span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-700/60">
              {[
                { label: "#", field: "id" },
                { label: "Drug Name", field: "drugName" },
                { label: "Expire Date", field: "expireDate" },
                { label: "Medicine Group", field: "medicineGroup" },
                { label: "Price", field: "price" },
                { label: "QTY", field: "qty" },
                { label: "Status", field: "status" },
              ].map(({ label, field }) => (
                <th
                  key={field}
                  onClick={() => handleSort(field)}
                  className="pb-2.5 pr-4 text-xs font-semibold text-slate-400 uppercase tracking-wider cursor-pointer hover:text-violet-400 transition-colors select-none whitespace-nowrap"
                >
                  {label}
                  <SortIcon field={field} />
                </th>
              ))}
              <th className="pb-2.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((med, i) => (
              <tr
                key={med.id}
                className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors duration-150 group"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <td className="py-3 pr-4 text-slate-500 text-xs">{med.id}</td>
                <td className="py-3 pr-4">
                  <span className="text-white text-xs font-medium">{med.drugName}</span>
                </td>
                <td className="py-3 pr-4 text-slate-400 text-xs">{med.expireDate}</td>
                <td className="py-3 pr-4">
                  <span className="text-slate-300 text-xs bg-slate-700/50 px-2 py-0.5 rounded-md">{med.medicineGroup}</span>
                </td>
                <td className="py-3 pr-4 text-cyan-400 text-xs font-semibold">{med.price}</td>
                <td className="py-3 pr-4 text-slate-300 text-xs font-mono">{med.qty}</td>
                <td className="py-3 pr-4">
                  <StatusBadge status={med.status} />
                </td>
                <td className="py-3">
                  {/* Action buttons - visible on row hover */}
                  <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button className="w-7 h-7 rounded-lg bg-violet-500/20 hover:bg-violet-500/40 text-violet-400 text-xs flex items-center justify-center transition-colors" title="Edit">
                      ✏️
                    </button>
                    <button className="w-7 h-7 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-400 text-xs flex items-center justify-center transition-colors" title="Delete">
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-8 text-slate-500 text-sm">
            No medicines match your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentMedicinesTable;
