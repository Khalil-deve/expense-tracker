import { useNavigate } from "react-router-dom";

export default function RecentIncomes({ incomes }) {
    const navigate = useNavigate();

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Recent Incomes</h3>
        <button
          onClick={() => navigate("/dashboard/expense")}
          className="bg-blue-300 text-white py-1.5 px-3 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition shadow-md hover:shadow-lg"
        >
          See all
        </button>
      </div>
      <ul className="space-y-2">
        {incomes.slice(0, 4).map((i) => (
          <div className={`flex justify-between items-center p-4 rounded shadow bg-gray-100 border-l-4 border-green-500`}>
            <p className="text-sm text-gray-500">{i.name}</p>
            <p className={`font-semibold text-green-500`}>Rs {i.amount}</p>
          </div>
        ))}
      </ul>
    </div>
  );
};