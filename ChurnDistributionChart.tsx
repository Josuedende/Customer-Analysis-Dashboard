
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Customer } from '../../types';

interface ChurnDistributionChartProps {
  data: Customer[];
}

const ChurnDistributionChart: React.FC<ChurnDistributionChartProps> = ({ data }) => {
  const chartData = useMemo(() => {
    const churned = data.filter(c => c.Churn === 'Yes').length;
    const notChurned = data.length - churned;
    return [
      { name: 'Retained', value: notChurned },
      { name: 'Churned', value: churned },
    ];
  }, [data]);

  const COLORS = ['#4F46E5', '#EF4444']; // Indigo-600, Red-500

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius="80%"
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
             const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
             const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
             const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
             return (
               <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                 {`${(percent * 100).toFixed(0)}%`}
               </text>
             );
          }}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => [value, 'Customers']} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ChurnDistributionChart;
