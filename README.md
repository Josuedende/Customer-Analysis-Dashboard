# Customer Churn Analysis Dashboard

An interactive dashboard to analyze customer churn. It visualizes key metrics, explores demographic and behavioral data, and uses a predictive model to identify at-risk customers, providing actionable insights for retention strategies.

## Features

- **Key Performance Indicators (KPIs):** At-a-glance metrics for Total Customers, Churn Rate, Average Monthly Charges, and Total Churned Customers.
- **Interactive Visualizations:** A suite of charts to explore the data:
    - **Churn Distribution:** A pie chart showing the overall percentage of churned vs. retained customers.
    - **Churn by Contract Type:** A stacked bar chart illustrating how contract length impacts churn.
    - **Key Churn Predictors:** A horizontal bar chart displaying the most influential factors in predicting churn.
    - **Monthly Charges vs. Tenure:** A scatter plot to identify patterns between customer tenure, monthly costs, and churn status.
- **AI-Powered Churn Predictor:**
    - Select a specific customer profile from a searchable list.
    - Receive a real-time churn prediction (`Yes` or `No`), confidence score, and a data-driven reason for the prediction, powered by the Google Gemini API.
- **Customer Search:** Quickly filter the customer list by ID to find a specific profile for analysis.
- **Responsive Design:** The dashboard is fully responsive and works seamlessly on desktop, tablet, and mobile devices.

## Technology Stack

- **Frontend:** React, TypeScript
- **Styling:** Tailwind CSS
- **Charting:** Recharts
- **AI/ML:** Google Gemini API for predictive modeling

## Getting Started

This project is designed to run in a self-contained web environment, so no local installation of dependencies is required.

### Prerequisites

- A valid Google Gemini API Key. The application is configured to use an API key from the environment variables (`process.env.API_KEY`).

### Running the Application

1.  Ensure your API key is correctly configured in the environment where the application is hosted.
2.  Open the `index.html` file in a web browser.
3.  The application will load and be ready to use.

## How to Use the Dashboard

1.  **Analyze KPIs:** Review the main metrics at the top of the dashboard for a high-level overview.
2.  **Explore Charts:** Interact with the charts to understand trends. Hover over data points to see detailed tooltips.
3.  **Predict Churn:**
    - Navigate to the **AI Churn Predictor** section.
    - Use the search bar to find a customer by their ID (e.g., `CUST-1024`).
    - Select the customer from the dropdown list. Their details will be displayed.
    - Click the **"Predict Churn"** button to get an AI-powered prediction.
    - The result will show the predicted churn status, a confidence score, and the reasoning behind the prediction.
    - Use the **"Clear"** button to reset the prediction area.

## File Structure

```
.
├── index.html              # Main HTML entry point
├── index.tsx               # React application root
├── App.tsx                 # Main application component and layout
├── types.ts                # TypeScript type definitions (e.g., Customer, PredictionResult)
├── README.md               # Project documentation
│
├── components/
│   ├── ChartCard.tsx       # Wrapper for chart components
│   ├── ChurnPrediction.tsx # The AI prediction component
│   ├── Header.tsx          # Dashboard header
│   ├── KpiCard.tsx         # Component for displaying a single KPI
│   ├── icons.tsx           # SVG icon components
│   └── charts/
│       ├── ChargesVsTenureChart.tsx
│       ├── ChurnDistributionChart.tsx
│       ├── DemographicsChart.tsx
│       └── FeatureImportanceChart.tsx
│
└── services/
    ├── dataService.ts      # Generates mock customer data
    └── geminiService.ts    # Handles API calls to the Google Gemini API
```
