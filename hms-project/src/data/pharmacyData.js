// ─── Mock Data for MedLab Pharmacy Management ───────────────────────────────

export const stats = [
  { label: "Total Customer", value: 53, icon: "👥", color: "from-violet-500 to-purple-600" },
  { label: "Total Medicines", value: 25, icon: "💊", color: "from-cyan-500 to-blue-600" },
  { label: "Total Manufacturers", value: 14, icon: "🏭", color: "from-emerald-500 to-teal-600" },
];

// Sales data for the line chart (Patient Returns)
export const patientReturnData = [
  { month: "25 Oct", value: 30 },
  { month: "28 Oct", value: 55 },
  { month: "1 Nov", value: 40 },
  { month: "4 Nov", value: 80 },
  { month: "7 Nov", value: 60 },
  { month: "10 Nov", value: 90 },
  { month: "13 Nov", value: 70 },
  { month: "16 Nov", value: 110 },
];

// Sales report data for pie/donut chart
export const salesReportData = [
  { label: "Paracetamol", value: 35, color: "#8B5CF6" },
  { label: "Amoxicillin", value: 25, color: "#06B6D4" },
  { label: "Ibuprofen", value: 20, color: "#10B981" },
  { label: "Metformin", value: 12, color: "#F59E0B" },
  { label: "Others", value: 8, color: "#EF4444" },
];

// Stock reports bar chart
export const stockReportData = [
  { month: "Jan", inStock: 120, lowStock: 40, outStock: 10 },
  { month: "Feb", inStock: 98, lowStock: 55, outStock: 18 },
  { month: "Mar", inStock: 145, lowStock: 30, outStock: 8 },
  { month: "Apr", inStock: 110, lowStock: 60, outStock: 22 },
  { month: "May", inStock: 160, lowStock: 25, outStock: 5 },
  { month: "Jun", inStock: 135, lowStock: 45, outStock: 15 },
];

// Recent medicines table
export const recentMedicines = [
  {
    id: 1,
    drugName: "Paracetamol 500mg",
    expireDate: "12/2025",
    medicineGroup: "Analgesic",
    price: "$2.50",
    qty: 120,
    status: "In Stock",
  },
  {
    id: 2,
    drugName: "Amoxicillin 250mg",
    expireDate: "06/2025",
    medicineGroup: "Antibiotic",
    price: "$5.80",
    qty: 45,
    status: "Low Stock",
  },
  {
    id: 3,
    drugName: "Ibuprofen 400mg",
    expireDate: "09/2026",
    medicineGroup: "NSAID",
    price: "$3.20",
    qty: 0,
    status: "Out of Stock",
  },
  {
    id: 4,
    drugName: "Metformin 500mg",
    expireDate: "03/2026",
    medicineGroup: "Antidiabetic",
    price: "$4.10",
    qty: 200,
    status: "In Stock",
  },
  {
    id: 5,
    drugName: "Atorvastatin 20mg",
    expireDate: "11/2025",
    medicineGroup: "Statin",
    price: "$7.90",
    qty: 30,
    status: "Low Stock",
  },
];

// Navigation items for the sidebar
export const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "⊞" },
  { id: "staff", label: "Staff", icon: "👤" },
  { id: "lab", label: "Lab", icon: "🔬" },
  { id: "ward", label: "Ward", icon: "🛏" },
  { id: "treatment", label: "Treatment", icon: "💉" },
  { id: "pharmacy", label: "Pharmacy", icon: "💊" },
  { id: "patient", label: "Patient", icon: "🏥" },
];
