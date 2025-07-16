import { Link } from "lucide-react";
import useTransaction from "../../hooks/useTransaction";
import { useNavigate } from "react-router-dom";

export default function ExpensePreview() {
    const [expenses, refetchExpenses] = useTransaction("expenses");
    const navigate = useNavigate();
    return (
        <div className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Recent Expenses</h3>
                <button
                    onClick={() => navigate("/dashboard/income")}
                    className="bg-blue-300 text-white py-1.5 px-3 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition shadow-md hover:shadow-lg"
                >
                    See all
                </button>
            </div>
            <ul className="space-y-2">
                {expenses.slice(0, 5).map((e) => (
                    <div
                        key={e._id}
                        className="flex justify-between items-center p-4 rounded shadow bg-gray-100 border-l-4 border-red-500"
                    >
                        <p className="text-sm text-gray-500">{e.name}</p>
                        <p className="font-semibold text-red-500">Rs {e.amount}</p>
                    </div>
                ))}

            </ul>

        </div>
    );
};
