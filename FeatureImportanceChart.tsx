import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface FeatureImportanceChartProps {
  data: { name: string; value: number }[];
}

const FeatureImportanceChart: React.FC<FeatureImportanceChartProps> = ({ data }) => {
  const sortedData = [...data].sort((a, b) => a.value - b.value);
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        layout="vertical"
        data={sortedData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
        <XAxis type="number" hide />
        <YAxis dataKey="name" type="category" width={100} tick={{ fill: '#333333' }} fontSize={12} />
        <Tooltip
          cursor={{ fill: 'rgba(75, 85, 99, 0.1)' }}
          contentStyle={{
            backgroundColor: '#ffffff',
            borderColor: '#cccccc',
            color: '#333333',
            borderRadius: '0.5rem'
          }}
          formatter={(value: number) => [value.toFixed(3), 'Importance']}
        />
        <Bar dataKey="value" fill="#8B5CF6" name="Importance" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default FeatureImportanceChart;