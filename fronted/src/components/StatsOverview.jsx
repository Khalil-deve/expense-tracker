export default function StatsOverview({totalExpenses, totalIncomes}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <Card label="Total Income" value={totalIncomes} color="green" />
      <Card label="Total Expense" value={totalExpenses} color="red" />
      <Card label="Balance" value={totalIncomes - totalExpenses} color="blue"/>
    </div>
  );
};

const Card = ({ label, value, color}) => {
  return (
    <div className={`p-4 rounded shadow bg-gray-200 border-l-4 border-${color}-500`}>
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`text-xl font-bold text-${color}-600`}>{value}</p>
    </div>
  );
};

