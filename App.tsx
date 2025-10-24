import React, { useState, useEffect, useMemo } from 'react';
import { Customer } from './types';
import { generateCustomerData, getFeatureImportance } from './services/dataService';
import Header from './components/Header';
import KpiCard from './components/KpiCard';
import ChartCard from './components/ChartCard';
import ChurnPrediction from './components/ChurnPrediction';
import ChurnDistributionChart from './components/charts/ChurnDistributionChart';
import DemographicsChart from './components/charts/DemographicsChart';
import FeatureImportanceChart from './components/charts/FeatureImportanceChart';
import ChargesVsTenureChart from './components/charts/ChargesVsTenureChart';
import { UsersIcon, ChartPieIcon, CurrencyDollarIcon, ExclamationTriangleIcon } from './components/icons';

const App: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [featureImportance, setFeatureImportance] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    const data = generateCustomerData(200);
    setCustomers(data);
    setFeatureImportance(getFeatureImportance());
  }, []);

  const kpiData = useMemo(() => {
    if (customers.length === 0) {
      return { totalCustomers: 0, churnRate: 0, avgMonthlyCharges: 0, churnedCustomers: 0 };
    }
    const churnedCustomers = customers.filter(c => c.Churn === 'Yes').length;
    const totalCustomers = customers.length;
    const churnRate = totalCustomers > 0 ? (churnedCustomers / totalCustomers) * 100 : 0;
    const avgMonthlyCharges = customers.reduce((acc, c) => acc + c.MonthlyCharges, 0) / totalCustomers;
    return {
      totalCustomers,
      churnRate: parseFloat(churnRate.toFixed(1)),
      avgMonthlyCharges: parseFloat(avgMonthlyCharges.toFixed(2)),
      churnedCustomers
    };
  }, [customers]);

  const churnByContract = useMemo(() => {
    const data = customers.reduce((acc, customer) => {
        const contract = customer.Contract;
        if (!acc[contract]) {
            acc[contract] = { name: contract, total: 0, churned: 0 };
        }
        acc[contract].total++;
        if (customer.Churn === 'Yes') {
            acc[contract].churned++;
        }
        return acc;
    }, {} as Record<string, { name: string, total: number, churned: number }>);
    return Object.values(data);
  }, [customers]);


  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <Header />
      <main className="mt-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <KpiCard title="Total Customers" value={kpiData.totalCustomers.toString()} icon={<UsersIcon />} />
          <KpiCard title="Churn Rate" value={`${kpiData.churnRate}%`} icon={<ChartPieIcon />} />
          <KpiCard title="Avg. Monthly Charges" value={`$${kpiData.avgMonthlyCharges}`} icon={<CurrencyDollarIcon />} />
          <KpiCard title="Total Churned" value={kpiData.churnedCustomers.toString()} icon={<ExclamationTriangleIcon />} />
        </div>

        {/* Main Dashboard Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Churn Prediction Section */}
          <div className="lg:col-span-3">
             <ChurnPrediction customers={customers} />
          </div>

          {/* Charts */}
          <ChartCard title="Churn Distribution">
            <ChurnDistributionChart data={customers} />
          </ChartCard>

          <ChartCard title="Churn by Contract Type">
            <DemographicsChart data={churnByContract} />
          </ChartCard>

          <ChartCard title="Key Churn Predictors (Feature Importance)">
            <FeatureImportanceChart data={featureImportance} />
          </ChartCard>
          
          <div className="lg:col-span-3">
            <ChartCard title="Monthly Charges vs. Tenure">
                <ChargesVsTenureChart data={customers} />
            </ChartCard>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;