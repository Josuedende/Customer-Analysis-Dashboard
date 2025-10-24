import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DemographicsChartProps {
    data: { name: string, total: number, churned: number }[];
}

const DemographicsChart: React.FC<DemographicsChartProps> = ({ data }) => {
  
  const formattedData = data.map(item => ({
    ...item,
    retained: item.total - item.churned
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={formattedData}
        margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
        <XAxis dataKey="name" tick={{ fill: '#333333' }} fontSize={12}/>
        <YAxis tick={{ fill: '#333333' }} fontSize={12}/>
        <Tooltip
          cursor={{ fill: 'rgba(75, 85, 99, 0.1)' }}
          contentStyle={{
            backgroundColor: '#ffffff',
            borderColor: '#cccccc',
            color: '#333333',
            borderRadius: '0.5rem'
          }}
        />
        <Legend />
        <Bar dataKey="retained" stackId="a" fill="#4F46E5" name="Retained" />
        <Bar dataKey="churned" stackId="a" fill="#EF4444" name="Churned" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DemographicsChart;