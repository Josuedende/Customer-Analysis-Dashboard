
import { GoogleGenAI, Type } from "@google/genai";
import { Customer, PredictionResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        prediction: {
            type: Type.STRING,
            description: 'Predicted churn status, must be either "Yes" or "No".',
        },
        confidence: {
            type: Type.NUMBER,
            description: 'Confidence level of the prediction, a value between 0.0 and 1.0.',
        },
        reason: {
            type: Type.STRING,
            description: 'A brief, data-driven explanation for the prediction based on the provided customer profile.',
        },
    },
    required: ['prediction', 'confidence', 'reason'],
};


export const predictChurn = async (customer: Customer): Promise<PredictionResult> => {
    const prompt = `
    Analyze the following customer profile and predict if they will churn.
    - Customer ID: ${customer.customerID}
    - Gender: ${customer.gender}
    - Age: ${customer.Age}
    - Tenure (months): ${customer.Tenure}
    - Contract: ${customer.Contract}
    - Payment Method: ${customer.PaymentMethod}
    - Monthly Charges: $${customer.MonthlyCharges.toFixed(2)}
    - Total Charges: $${customer.TotalCharges.toFixed(2)}
    - Services Used: ${customer.NumOfProducts}
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: {
                systemInstruction: "You are an expert data scientist specializing in customer churn prediction. Your task is to analyze customer data and predict the likelihood of churn. Provide a clear prediction (Yes or No), a confidence score (0-1), and a concise, data-driven reason for your prediction. Respond ONLY with the JSON object defined in the schema.",
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.2, // Lower temperature for more deterministic, factual responses
            },
        });
        
        const jsonString = response.text.trim();
        const result = JSON.parse(jsonString);

        if (result.prediction && (result.prediction === 'Yes' || result.prediction === 'No') && typeof result.confidence === 'number' && typeof result.reason === 'string') {
            return result as PredictionResult;
        } else {
             throw new Error("Invalid response format from API.");
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get prediction from Gemini API.");
    }
};
