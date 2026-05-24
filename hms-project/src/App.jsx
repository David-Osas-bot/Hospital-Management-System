// ─── App.jsx — Root Component & Router ───────────────────────────────────────
// Manages navigation state and renders the correct page based on active route.
// Uses simple state-based routing (no react-router needed for this SPA).

import { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import PharmacyPage from "./pages/PharmacyPage";
import PlaceholderPage from "./pages/PlaceholderPage";

// Page title map — used in the Topbar breadcrumb
const PAGE_TITLES = {
  dashboard: "Dashboard",
  staff: "Staff Management",
  lab: "Laboratory",
  ward: "Ward Management",
  treatment: "Treatment",
  pharmacy: "Pharmacy Management",
  patient: "Patient Records",
};

const App = () => {
  // Active page/route state — defaults to "pharmacy" to show the built page
  const [activePage, setActivePage] = useState("pharmacy");

  // Render the correct page component based on active route
  const renderPage = () => {
    switch (activePage) {
      case "pharmacy":
        return <PharmacyPage />;
      default:
        return <PlaceholderPage pageName={PAGE_TITLES[activePage]} />;
    }
  };

  return (
    // Dark base background with subtle noise texture effect
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      
      {/* Background ambient glow effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-900/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-900/15 rounded-full blur-3xl" />
      </div>

      {/* Sidebar — always visible on the left */}
      <Sidebar activePage={activePage} onNavigate={setActivePage} />

      {/* Top navigation bar */}
      <Topbar pageTitle={PAGE_TITLES[activePage]} />

      {/* Main content area — offset by sidebar width (w-20 = 80px) and topbar height (h-16 = 64px) */}
      <main className="pl-20 pt-16 relative z-10">
        <div className="p-5 max-w-7xl mx-auto">
          {renderPage()}
        </div>
      </main>
    </div>
  );
};

export default App;
