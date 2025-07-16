import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const lineData = Array.from({ length: 60 }, (_, i) => ({
    day: `Day ${i + 1}`,
    income: Math.floor(Math.random() * 3000 + 1000),
}));

export default function LineChartBox() {
    return (
        <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-4">Last 60 Days Income</h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineData}>
                    <XAxis dataKey="day" hide />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
