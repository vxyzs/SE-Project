'use client';
import { useState, useContext, useRef } from "react";
import PredictForm from "./Form";
import PredictionResult from "./Result";
import { AuthContext } from "@/context/AuthContext";

const Predict = () => {
  const { user } = useContext(AuthContext);
  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const resultRef = useRef(null); // Create a ref for the PredictionResult

  const handlePrediction = (result) => {
    setPredictionResult(result); // Set the prediction result
    setTimeout(() => {
      setLoading(false)
    }, 3000) 
    if (resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto my-10">
        <h1 className="text-2xl font-bold mb-6">Real Estate Price Prediction</h1>
        <p className="text-red-500">You need to be logged in to access this page.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-8">
      <PredictForm setPredictionResult={handlePrediction} setLoading={setLoading} />
      {/* Pass the ref to PredictionResult */}
      <div ref={resultRef}>
        <PredictionResult predictionResult={predictionResult} loading={loading} />
      </div>
    </div>
  );
};

export default Predict;
