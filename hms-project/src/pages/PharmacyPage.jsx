// ─── Pharmacy Management Page ────────────────────────────────────────────────
// Main page view for Pharmacy. Composes all pharmacy-specific components.

import { useState } from "react";
import StatsCards from "../components/pharmacy/StatsCards";
import ActionButtons from "../components/pharmacy/ActionButtons";
import PatientReturnsChart from "../components/pharmacy/PatientReturnsChart";
import SalesReportChart from "../components/pharmacy/SalesReportChart";
import StockReportChart from "../components/pharmacy/StockReportChart";
import RecentMedicinesTable from "../components/pharmacy/RecentMedicinesTable";

const PharmacyPage = () => {
  const [notification, setNotification] = useState(null);

  // Handle action button clicks - show a toast notification
  const handleAction = (actionName) => {
    setNotification(`${actionName} clicked — feature coming soon!`);
    setTimeout(() => setNotification(null), 2500);
  };

  return (
    <div className="relative">
      
      {/* Page heading */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-black text-white tracking-tight">Pharmacy Management</h1>
          <p className="text-slate-500 text-xs mt-0.5">Monitor inventory, sales, and patient data</p>
        </div>
        {/* Date badge */}
        <div className="hidden sm:flex items-center gap-2 bg-slate-800/60 border border-slate-700/50 rounded-xl px-3 py-2">
          <span className="text-slate-500 text-xs">📅</span>
          <span className="text-slate-400 text-xs">
            {new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
          </span>
        </div>
      </div>

      {/* Stats row */}
      <StatsCards />

      {/* Action buttons */}
      <ActionButtons onAction={handleAction} />

      {/* Charts row: Line chart + Donut chart */}
      <div className="flex gap-4 mb-4">
        <PatientReturnsChart />
        <SalesReportChart />
      </div>

      {/* Second row: Bar chart spanning full width */}
      <div className="mb-4">
        <StockReportChart />
      </div>

      {/* Data table */}
      <RecentMedicinesTable />

      {/* Toast notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 bg-slate-800 border border-violet-500/50 text-white text-sm px-4 py-3 rounded-xl shadow-2xl shadow-violet-500/20 z-50 animate-slide-in-right">
          <div className="flex items-center gap-2">
            <span className="text-violet-400">✓</span>
            {notification}
          </div>
        </div>
      )}
    </div>
  );
};

export default PharmacyPage;
