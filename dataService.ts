
import { Customer } from '../types';

const random = (min: number, max: number) => Math.random() * (max - min) + min;
const randomInt = (min: number, max: number) => Math.floor(random(min, max + 1));
const randomChoice = <T,>(arr: T[]): T => arr[randomInt(0, arr.length - 1)];

const LOCATIONS: ('Urban' | 'Rural')[] = ['Urban', 'Rural'];
const GENDERS: ('Male' | 'Female')[] = ['Male', 'Female'];
const CONTRACTS: ('Month-to-month' | 'One year' | 'Two year')[] = ['Month-to-month', 'One year', 'Two year'];
const PAYMENT_METHODS: ('Electronic check' | 'Mailed check' | 'Bank transfer (automatic)' | 'Credit card (automatic)')[] = ['Electronic check', 'Mailed check', 'Bank transfer (automatic)', 'Credit card (automatic)'];

export const generateCustomerData = (count: number): Customer[] => {
  const customers: Customer[] = [];
  for (let i = 0; i < count; i++) {
    const tenure = randomInt(1, 72);
    const contract = randomChoice(CONTRACTS);
    const monthlyCharges = random(20, 120);

    // Factors influencing churn
    let churnProbability = 0.1; // Base probability
    if (contract === 'Month-to-month') churnProbability += 0.3;
    if (contract === 'Two year') churnProbability -= 0.15;
    if (tenure <= 6) churnProbability += 0.2;
    if (tenure > 48) churnProbability -= 0.1;
    if (monthlyCharges > 90) churnProbability += 0.15;

    const churn = Math.random() < Math.max(0.05, Math.min(0.95, churnProbability)) ? 'Yes' : 'No';

    customers.push({
      customerID: `CUST-${1000 + i}`,
      gender: randomChoice(GENDERS),
      Age: randomInt(18, 80),
      Location: randomChoice(LOCATIONS),
      Tenure: tenure,
      Contract: contract,
      PaymentMethod: randomChoice(PAYMENT_METHODS),
      MonthlyCharges: parseFloat(monthlyCharges.toFixed(2)),
      TotalCharges: parseFloat((monthlyCharges * tenure * random(0.95, 1.05)).toFixed(2)),
      NumOfProducts: randomInt(1, 5),
      Churn: churn,
    });
  }
  return customers;
};

export const getFeatureImportance = (): { name: string; value: number }[] => {
    return [
        { name: 'Contract Type', value: 0.45 },
        { name: 'Tenure', value: 0.35 },
        { name: 'Monthly Charges', value: 0.10 },
        { name: 'Payment Method', value: 0.05 },
        { name: 'Age', value: 0.03 },
        { name: 'Services Used', value: 0.02 },
    ];
};
