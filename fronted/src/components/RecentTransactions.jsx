export default function RecentTransactions() {
    const transactions = [
        { id: 1, name: 'Salary', type: 'Income', amount: 50000 },
        { id: 2, name: 'Groceries', type: 'Expense', amount: -8000 },
        { id: 3, name: 'Bonus', type: 'Income', amount: 10000 },
        { id: 4, name: 'Internet Bill', type: 'Expense', amount: -2000 },
    ];

    return (
        <div className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Recent Transactions</h3>
                <button className="w-ful bg-indigo-300 text-white py-1.5 px-3 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition shadow-md hover:shadow-lg">See all</button>
            </div>
            <ul className="space-y-2">
                {transactions.map((t) => (
                    <div className={`flex justify-between items-center p-4 rounded shadow bg-gray-100 border-l-4 ${t.amount > 0 ? 'border-green-600' : 'border-red-500'}`}>
                        <p className="text-sm text-gray-500">{t.name}</p>
                        <p className={`font-semibold ${t.amount > 0 ? 'text-green-600' : 'text-red-500'}`}> {t.amount > 0 ? '+' : ''}Rs {Math.abs(t.amount)}</p>
                    </div>


                ))}

            </ul>
        </div>
    );
};
