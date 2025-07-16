import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
const barData = Array.from({ length: 30 }, (_, i) => ({
    day: `Day ${i + 1}`,
    expense: Math.floor(Math.random() * 1500 + 200),
}));

export default function BarChartBox({BarData}) {
    return (
        <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-4">Last 30 Days Expense</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={BarData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#34D399" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

