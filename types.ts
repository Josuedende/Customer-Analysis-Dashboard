
export interface Customer {
  customerID: string;
  gender: 'Male' | 'Female';
  Age: number;
  Location: 'Urban' | 'Rural';
  Tenure: number; // in months
  Contract: 'Month-to-month' | 'One year' | 'Two year';
  PaymentMethod: 'Electronic check' | 'Mailed check' | 'Bank transfer (automatic)' | 'Credit card (automatic)';
  MonthlyCharges: number;
  TotalCharges: number;
  NumOfProducts: number;
  Churn: 'Yes' | 'No';
}

export interface PredictionResult {
  prediction: 'Yes' | 'No';
  confidence: number;
  reason: string;
}
