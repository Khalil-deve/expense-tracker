import { lazy, Suspense } from "react";
import useTransaction from "../../hooks/useTransaction";
import Loader from "../../src/components/Loader";

// Lazy load heavy components
const StatsOverview = lazy(() => import("../../src/components/StatsOverview"));
const RecentTransactions = lazy(() => import("../../src/components/RecentTransactions"));
const PieChartBox = lazy(() => import("../../src/components/PieChartBox"));
const ExpensePreview = lazy(() => import("../../src/components/ExpensePreview"));
const LineChartBox = lazy(() => import("../../src/components/LineChartBox")); // (optional)
const RecentIncomes = lazy(() => import("../../src/components/RecentIncomes"));
const BarChartBox = lazy(() => import("../../src/components/BarChartBox"));


// Sample Pie Data
const pieData = [
  { name: "Income", value: 85000 },
  { name: "Expense", value: 40000 },
  { name: "Balance", value: 45000 },
];

export default function Home() {
  const [incomes, refetchIncomes] = useTransaction("incomes");
  const [expenses, refetchExpenses] = useTransaction("expenses");

  const simplifiedIncomes = incomes.map((income) => ({
    name: income.name,
    value: income.amount,
  }));

  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const totalIncomes = incomes.reduce((total, income) => total + income.amount, 0);

  const simplifiedExpenses = expenses.map((expense) => ({
    name: expense.name,
    value: expense.amount,
  }));

  return (
    <>
      <Suspense fallback={<Loader />}>
        <StatsOverview totalExpenses={totalExpenses} totalIncomes={totalIncomes} />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<Loader />}>
          <RecentTransactions />
        </Suspense>
        <Suspense fallback={<Loader />}>
          <PieChartBox pieData={pieData} />
        </Suspense>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<Loader />}>
          <ExpensePreview />
        </Suspense>
        <Suspense fallback={<Loader />}>
          <BarChartBox BarData={simplifiedExpenses} />
        </Suspense>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<Loader />}>
          {/* You can enable LineChartBox if needed */}
          {/* <LineChartBox /> */}
          <PieChartBox pieData={simplifiedIncomes} />
        </Suspense>
        <Suspense fallback={<Loader />}>
          <RecentIncomes incomes={incomes} />
        </Suspense>
      </div>
    </>
  );
}
