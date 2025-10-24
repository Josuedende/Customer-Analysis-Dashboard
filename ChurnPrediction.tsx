import React, { useState, useCallback, useMemo } from 'react';
import { Customer, PredictionResult } from '../types';
import { predictChurn } from '../services/geminiService';
import { SparklesIcon, UserCircleIcon, SearchIcon, ClearIcon } from './icons';

interface ChurnPredictionProps {
  customers: Customer[];
}

const ChurnPrediction: React.FC<ChurnPredictionProps> = ({ customers }) => {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = useMemo(() => {
    if (!searchQuery) {
      return customers;
    }
    return customers.filter(c =>
      c.customerID.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [customers, searchQuery]);

  const selectedCustomer = useMemo(() => {
    return customers.find(c => c.customerID === selectedCustomerId) || null;
  }, [selectedCustomerId, customers]);

  const handlePrediction = useCallback(async () => {
    if (!selectedCustomer) {
      setError("Please select a customer first.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setPrediction(null);
    try {
      const result = await predictChurn(selectedCustomer);
      setPrediction(result);
    } catch (err) {
      setError("Failed to get prediction. Please check the API key and try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCustomer]);

  const handleClear = () => {
    setPrediction(null);
    setError(null);
  };

  const CustomerDetails: React.FC<{ customer: Customer }> = ({ customer }) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-sm">
      <div><strong>Gender:</strong> {customer.gender}</div>
      <div><strong>Age:</strong> {customer.Age}</div>
      <div><strong>Tenure:</strong> {customer.Tenure} months</div>
      <div><strong>Contract:</strong> {customer.Contract}</div>
      <div><strong>Monthly Charge:</strong> ${customer.MonthlyCharges.toFixed(2)}</div>
      <div><strong>Total Charges:</strong> ${customer.TotalCharges.toFixed(2)}</div>
      <div><strong>Services:</strong> {customer.NumOfProducts}</div>
      <div><strong>Actual Churn:</strong> 
        <span className={`font-semibold ${customer.Churn === 'Yes' ? 'text-red-500' : 'text-green-500'}`}>
            {customer.Churn}
        </span>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <SparklesIcon /> <span className="ml-2">AI Churn Predictor</span>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Customer Selection and Action */}
        <div className="md:col-span-1 space-y-4">
          <div>
             <label htmlFor="customer-search" className="block text-sm font-medium text-gray-700">
              Search Customer ID
            </label>
            <div className="relative mt-1">
              <input
                type="text"
                id="customer-search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g., CUST-1024"
                className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <SearchIcon />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="customer-select" className="block text-sm font-medium text-gray-700">
              Select a Customer Profile
            </label>
            <div className="relative mt-1">
              <select
                id="customer-select"
                onChange={(e) => setSelectedCustomerId(e.target.value)}
                value={selectedCustomerId || ''}
                className="appearance-none block w-full bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="" disabled>-- Select a customer --</option>
                {filteredCustomers.map(c => (
                  <option key={c.customerID} value={c.customerID}>{c.customerID}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          <button
            onClick={handlePrediction}
            disabled={!selectedCustomerId || isLoading}
            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Analyzing...' : 'Predict Churn'}
          </button>
        </div>

        {/* Display Area */}
        <div className="md:col-span-2 min-h-[150px] bg-gray-50 rounded-lg p-4 relative">
          {(prediction || error) && (
            <button
              onClick={handleClear}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-colors duration-200"
              aria-label="Clear results"
              title="Clear results"
            >
              <ClearIcon />
            </button>
          )}

          {!selectedCustomer ? (
             <div className="flex items-center justify-center h-full text-gray-500">
                <UserCircleIcon />
                <span className="ml-2">Select a customer to see their details and run a prediction.</span>
             </div>
          ) : (
            <div className="space-y-4">
                <div>
                    <h4 className="font-semibold text-gray-800">Customer Details ({selectedCustomer.customerID})</h4>
                    <div className="mt-2 p-3 bg-gray-100 rounded-md">
                        <CustomerDetails customer={selectedCustomer} />
                    </div>
                </div>
                {isLoading && (
                    <div className="flex justify-center items-center space-x-2 text-indigo-500">
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        <span>Running AI prediction model...</span>
                    </div>
                )}
                {error && <p className="text-red-500 text-sm text-center pt-4">{error}</p>}
                {prediction && (
                    <div className="mt-4 animate-fade-in">
                        <h4 className="font-semibold text-gray-800">Prediction Result</h4>
                        <div className={`mt-2 p-4 rounded-md border-l-4 ${prediction.prediction === 'Yes' ? 'bg-red-50 border-red-500 text-red-800' : 'bg-green-50 border-green-500 text-green-800'}`}>
                            <div className="flex items-center justify-between">
                                <p className="text-lg font-bold">Predicted Churn: {prediction.prediction}</p>
                                <span className="text-sm font-medium">Confidence: {(prediction.confidence * 100).toFixed(0)}%</span>
                            </div>
                            <p className="mt-2 text-sm italic"><strong>Reason:</strong> {prediction.reason}</p>
                        </div>
                    </div>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChurnPrediction;