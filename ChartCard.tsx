import React from 'react';

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 h-96 flex flex-col">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="flex-grow">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;