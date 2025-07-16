import { useState, lazy, Suspense } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Plus } from "lucide-react";
import useTransaction from "../../hooks/useTransaction";
import { Toaster } from "react-hot-toast";
import downloadExcel from "../../utils/downloadExcel";
import Loader from "../../src/components/Loader";

// Lazy-loaded components
const PopUpModel = lazy(() => import("../../src/components/PopUpModel"));
const ModelList = lazy(() => import("../../src/components/inputs/ModelList"));


export default function Expense() {
  const [showModal, setShowModal] = useState(false);
  const [expenses, refetchExpenses] = useTransaction("expenses");
  const [filterMonth, setFilterMonth] = useState(""); // format: "YYYY-MM"

  const addExpense = (expense) => {
    refetchExpenses();
    setShowModal(false);
  };

  const filteredExpenses = expenses.filter((e) => {
    if (!filterMonth) return true;
    const expenseMonth = new Date(e.date).toISOString().slice(0, 7);
    return expenseMonth === filterMonth;
  });

  return (
    <div className="p-6">
      <Toaster position="top-right" />

      {/* Header with Button */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-center sm:text-left">Expense Overview</h2>
        <button
          className="flex items-center justify-center bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          onClick={() => setShowModal(true)}
        >
          <Plus className="mr-2" /> Add Expense
        </button>
      </div>

      {/* Line Chart */}
      <div className="w-full h-64 mb-8 bg-white shadow rounded p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredExpenses}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#F87171" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Filter & Download */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
        <input
          type="month"
          className="border p-2 rounded w-full sm:w-auto"
          value={filterMonth}
          placeholder="Filter by month"
          onChange={(e) => setFilterMonth(e.target.value)}
        />
        <button
          onClick={() => downloadExcel(filteredExpenses)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Download
        </button>
      </div>

      {/* Expense Cards */}
      <Suspense fallback={<Loader />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ModelList items={filteredExpenses} modelName="Expense" />
        </div>
      </Suspense>

      {/* Modal */}
      {showModal && (
        <Suspense fallback={<Loader />}>
          <PopUpModel
            onClose={() => setShowModal(false)}
            ModelName="Expense"
            onSave={addExpense}
            apiRoute="/dash/expenses"
          />
        </Suspense>
      )}
    </div>
  );
}
