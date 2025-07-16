import { useState, lazy, Suspense } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Plus } from "lucide-react";
import useTransaction from "../../hooks/useTransaction";
import { Toaster } from "react-hot-toast";
import downloadExcel from "../../utils/downloadExcel";
import Loader from "../../src/components/Loader";

// Lazy-loaded components
const PopUpModel = lazy(() => import("../../src/components/PopUpModel"));
const ModelList = lazy(() => import("../../src/components/inputs/ModelList"));


export default function Income() {
  const [showModal, setShowModal] = useState(false);
  const [incomes, refetchIncomes] = useTransaction("incomes");
  const [filterMonth, setFilterMonth] = useState(""); // format: "YYYY-MM"

  const addIncome = (income) => {
    refetchIncomes();
    setShowModal(false);
  };

  const filteredIncomes = incomes.filter(i => {
    if (!filterMonth) return true;
    const incomeMonth = new Date(i.date).toISOString().slice(0, 7);
    return incomeMonth === filterMonth;
  });

  return (
    <div className="p-6">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-center sm:text-left">Income Overview</h2>
        <button
          className="flex items-center justify-center bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          onClick={() => setShowModal(true)}
        >
          <Plus className="mr-2" /> Add Income
        </button>
      </div>

      {/* Bar Chart */}
      <div className="w-full h-64 mb-8 bg-white shadow rounded p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={filteredIncomes}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#34D399" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Filter and Download */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
        <input
          type="month"
          className="border p-2 rounded w-full sm:w-auto"
          value={filterMonth}
          placeholder="Filter by month"
          onChange={(e) => setFilterMonth(e.target.value)}
        />
        <button
          onClick={() => downloadExcel(filteredIncomes)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Download
        </button>
      </div>

      {/* ModelList (Lazy-loaded) */}
      <Suspense fallback={<Loader />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ModelList items={filteredIncomes} modelName="Income" />
        </div>
      </Suspense>

      {/* Modal (Lazy-loaded only when needed) */}
      {showModal && (
        <Suspense fallback={<Loader />}>
          <PopUpModel
            onClose={() => setShowModal(false)}
            onSave={addIncome}
            ModelName="Income"
            apiRoute="/dash/incomes"
          />
        </Suspense>
      )}
    </div>
  );
}
