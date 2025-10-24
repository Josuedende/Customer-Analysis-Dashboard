import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
        Customer Churn Analysis Dashboard
      </h1>
      <p className="mt-2 text-md text-gray-600">
        Insights and Predictions to Improve Customer Retention
      </p>
    </header>
  );
};

export default Header;