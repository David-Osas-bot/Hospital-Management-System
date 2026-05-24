// ─── Action Buttons Component ─────────────────────────────────────────────────
// The three primary action buttons: Create Invoice, Supplier, Medicine

import { useState } from "react";

const actions = [
  {
    label: "Create Invoice",
    icon: "🧾",
    color: "from-violet-600 to-purple-700",
    shadow: "shadow-violet-500/30",
    hoverShadow: "hover:shadow-violet-500/50",
  },
  {
    label: "Supplier",
    icon: "🚚",
    color: "from-cyan-600 to-blue-700",
    shadow: "shadow-cyan-500/30",
    hoverShadow: "hover:shadow-cyan-500/50",
  },
  {
    label: "Medicine",
    icon: "💊",
    color: "from-emerald-600 to-teal-700",
    shadow: "shadow-emerald-500/30",
    hoverShadow: "hover:shadow-emerald-500/50",
  },
];

const ActionButtons = ({ onAction }) => {
  const [activeBtn, setActiveBtn] = useState(null);

  const handleClick = (label) => {
    setActiveBtn(label);
    // Notify parent if needed
    if (onAction) onAction(label);
    // Reset after animation
    setTimeout(() => setActiveBtn(null), 600);
  };

  return (
    <div className="flex gap-3 mb-6">
      {actions.map((action) => (
        <button
          key={action.label}
          onClick={() => handleClick(action.label)}
          className={`
            flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white
            bg-gradient-to-r ${action.color}
            shadow-lg ${action.shadow} ${action.hoverShadow}
            transition-all duration-200 ease-out
            hover:-translate-y-0.5 hover:scale-105 hover:shadow-xl
            active:scale-95 active:translate-y-0
            ${activeBtn === action.label ? "scale-95 brightness-110" : ""}
          `}
        >
          <span className="text-base">{action.icon}</span>
          <span>{action.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ActionButtons;
