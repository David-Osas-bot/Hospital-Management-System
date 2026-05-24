import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";

const purchaseData = [
  { day: "Mon 14", value: 2000 },
  { day: "Tue 15", value: 3200 },
  { day: "Wed 16", value: 2800 },
  { day: "Thu 17", value: 5000 },
  { day: "Fri 18", value: 2212 },
  { day: "Sat 19", value: 3800 },
  { day: "Sun 20", value: 2900 },
];

const salesData = [
  { name: "Chrome", value: 38, color: "#4ade80" },
  { name: "Int", value: 20, color: "#f97316" },
  { name: "Firefox", value: 15, color: "#a855f7" },
  { name: "Safari", value: 17, color: "#facc15" },
  { name: "Opera", value: 10, color: "#3b82f6" },
];

const stockData = [
  { name: "Firefox", value: 83222, color: "#06b6d4" },
  { name: "Chrome", value: 65000, color: "#f97316" },
  { name: "Opera", value: 72000, color: "#ef4444" },
  { name: "Safari", value: 58000, color: "#3b82f6" },
  { name: "IE", value: 40000, color: "#22c55e" },
];

const medicines = [
  { id: 1, name: "Vitamin C", expiry: "2029-04-19", manufacture: "2021-12-13", price: 1080.0, qty: 108, status: "Available" },
  { id: 2, name: "Paracetamol", expiry: "2029-05-12", manufacture: "2022-04-04", price: 4580.0, qty: 226, status: "Out Of Stock" },
  { id: 3, name: "Advil", expiry: "2026-01-16", manufacture: "2026-06-80", price: 5060.0, qty: 40, status: "Available" },
  { id: 4, name: "Amoxillin", expiry: "2028-12-19", manufacture: "2021-01-15", price: 1280.0, qty: 276, status: "Out Of Stock" },
];

const navItems = [
  { label: "Dashboard", icon: "⊞", active: true },
  { label: "Staff", icon: "👥", active: false },
  { label: "Lab", icon: "🧪", active: false },
  { label: "Ward", icon: "🏥", active: false },
  { label: "Treatment", icon: "💊", active: false },
  { label: "Pharmary", icon: "🏪", active: false },
  { label: "Patient", icon: "🧑‍⚕️", active: false },
];

export default function PharmacyDashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");

  return (
    <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
      {/* Sidebar */}
      <div className="w-44 bg-gradient-to-b from-purple-700 via-purple-600 to-indigo-700 flex flex-col py-4 shadow-xl">
        <div className="flex items-center justify-center mb-6 px-3">
          <div className="w-7 h-7 bg-white bg-opacity-20 rounded flex items-center justify-center mr-2">
            <span className="text-white text-xs">☰</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 bg-purple-300 rounded-full flex items-center justify-center">
              <span className="text-purple-800 text-xs font-bold">M</span>
            </div>
            <span className="text-white text-xs font-semibold">Madhusha</span>
          </div>
        </div>

        <nav className="flex flex-col gap-1 px-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveNav(item.label)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                activeNav === item.label
                  ? "bg-white bg-opacity-20 text-white font-semibold"
                  : "text-purple-200 hover:bg-white hover:bg-opacity-10 hover:text-white"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white shadow-sm px-6 py-3 flex items-center justify-between">
          <div />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">M</span>
            </div>
            <span className="text-sm font-semibold text-gray-700">MediLab Hospital</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Prasad</span>
            <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">P</span>
            </div>
          </div>
        </div>

        {/* Dashboard Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <h1 className="text-lg font-bold text-gray-800">Pharmacy Management</h1>

          {/* Stat Cards */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Total Customer", value: 25 },
              { label: "Total Medicine", value: 25 },
              { label: "Total Manufactures", value: 25 },
            ].map((card) => (
              <div key={card.label} className="bg-white rounded-xl shadow p-4 text-center">
                <p className="text-sm text-gray-500 mb-1">{card.label}</p>
                <p className="text-2xl font-bold text-gray-800">{card.value}</p>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-4">
            {["Create Invoice", "Supplier", "Medicine"].map((btn) => (
              <button
                key={btn}
                className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2.5 rounded-xl font-semibold text-sm shadow hover:opacity-90 transition"
              >
                {btn}
              </button>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Purchase Reports */}
            <div className="bg-white rounded-xl shadow p-4">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-sm font-semibold text-gray-700">Purches Reports</h2>
                <span className="text-xs text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">7 days ▾</span>
              </div>
              <p className="text-xs text-gray-400 mb-2">14.10.2021 – 20.10.2021</p>
              <ResponsiveContainer width="100%" height={130}>
                <AreaChart data={purchaseData}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" tick={{ fontSize: 9 }} />
                  <YAxis tick={{ fontSize: 9 }} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#7c3aed"
                    strokeWidth={2}
                    fill="url(#colorVal)"
                    dot={{ r: 3, fill: "#7c3aed" }}
                    activeDot={{ r: 5 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
              <div className="flex gap-4 mt-2 text-center">
                {[{ label: "All time", val: "41 234" }, { label: "30 days", val: "41 234" }, { label: "7 days", val: "41 234" }].map((s) => (
                  <div key={s.label}>
                    <p className="text-xs text-gray-400">{s.label}</p>
                    <p className="text-xs font-bold text-gray-700">{s.val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sells Reports */}
            <div className="bg-white rounded-xl shadow p-4">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-sm font-semibold text-gray-700">Sells Reports</h2>
                <span className="text-xs text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">All ▾</span>
              </div>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie
                    data={salesData}
                    cx="45%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    dataKey="value"
                    label={({ name, value }) => `${value}%`}
                    labelLine={false}
                  >
                    {salesData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                    iconSize={8}
                    formatter={(val) => <span className="text-xs text-gray-600">{val}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Stock Reports */}
          <div className="bg-white rounded-xl shadow p-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-sm font-semibold text-gray-700">Stock Reports</h2>
              <span className="text-xs text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">7 days ▾</span>
            </div>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={stockData} barSize={30}>
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {stockData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-1 justify-center flex-wrap">
              {stockData.map((s) => (
                <div key={s.name} className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-xs text-gray-500">{s.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Out of Stock Table */}
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-sm font-semibold text-gray-700 mb-1">Out of Stock</h2>
            <p className="text-xs text-gray-400 mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-gray-500 border-b">
                    <th className="py-2 px-2 text-left font-semibold">ID</th>
                    <th className="py-2 px-2 text-left font-semibold">Drug Name</th>
                    <th className="py-2 px-2 text-left font-semibold">Expire Date</th>
                    <th className="py-2 px-2 text-left font-semibold">Manufacture Date</th>
                    <th className="py-2 px-2 text-left font-semibold">Price</th>
                    <th className="py-2 px-2 text-left font-semibold">QTY</th>
                    <th className="py-2 px-2 text-left font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {medicines.map((med) => (
                    <tr key={med.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="py-2 px-2 text-gray-600">{med.id}</td>
                      <td className="py-2 px-2 text-gray-700 font-medium">{med.name}</td>
                      <td className="py-2 px-2 text-gray-600">{med.expiry}</td>
                      <td className="py-2 px-2 text-gray-600">{med.manufacture}</td>
                      <td className="py-2 px-2 text-gray-600">{med.price.toFixed(2)}</td>
                      <td className="py-2 px-2 text-gray-600">{med.qty}</td>
                      <td className="py-2 px-2">
                        <span
                          className={`px-2 py-0.5 rounded-full font-semibold ${
                            med.status === "Available"
                              ? "text-green-600 bg-green-50"
                              : "text-red-500 bg-red-50"
                          }`}
                        >
                          {med.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}