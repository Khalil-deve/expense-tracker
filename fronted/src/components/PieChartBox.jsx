import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#10B981', '#EF4444', '#3B82F6', '#F59E0B', '#8B5CF6', '#F472B6'];

export default function PieChartBox({pieData}) {
    console.log(pieData);
    return (

        <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-4">Financial Distribution</h3>
            <PieChart width={300} height={250} className="mx-auto">
                <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                >
                    {pieData.map((_, i) => (
                        <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    )
};
