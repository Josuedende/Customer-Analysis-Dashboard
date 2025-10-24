import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ZAxis } from 'recharts';
import { Customer } from '../../types';

interface ChargesVsTenureChartProps {
  data: Customer[];
}

const ChargesVsTenureChart: React.FC<ChargesVsTenureChartProps> = ({ data }) => {
  const churnedData = data.filter(c => c.Churn === 'Yes');
  const retainedData = data.filter(c => c.Churn === 'No');

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="rgba(128, 128, 128, 0.2)"/>
        <XAxis type="number" dataKey="Tenure" name="Tenure (months)" unit=" months" tick={{ fill: '#333333' }} fontSize={12} />
        <YAxis type="number" dataKey="MonthlyCharges" name="Monthly Charges" unit="$" tick={{ fill: '#333333' }} fontSize={12} />
        <ZAxis type="number" range={[50, 51]} />
        <Tooltip 
            cursor={{ strokeDasharray: '3 3' }} 
            contentStyle={{
                backgroundColor: '#ffffff',
                borderColor: '#cccccc',
                color: '#333333',
                borderRadius: '0.5rem'
            }}
        />
        <Legend />
        <Scatter name="Retained" data={retainedData} fill="#4F46E5" shape="circle" />
        <Scatter name="Churned" data={churnedData} fill="#EF4444" shape="cross" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default ChargesVsTenureChart;