import { useEffect, useRef, useState, React, useMemo } from 'react';
import Slider from "react-slick";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line
} from 'recharts';
import Card from '@/components/Card';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Button } from '@nextui-org/react';
import Lottie from 'lottie-react';
import animationDataload from '@/components/loading.json';

const PredictionResult = ({ predictionResult, loading }) => {
  const sliderRef = useRef(null);

  if (loading) {
    return (
      <section className="bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Lottie
            animationData={animationDataload}
            style={{ height: '150px', width: '150px' }}
          />
          <p className="text-gray-800 dark:text-gray-200">Predicting...</p>
        </div>
      </section>

    );
  }

  if (!predictionResult || !predictionResult.Input_Features) {
    return (
      <div className="flex justify-center items-center h-96">
        Prediction result will be displayed here
      </div>
    );
  }

  // Prepare data for charts
  const areaDistributionData = [
    { name: 'Mean Area', value: predictionResult.Avg_Area },
    { name: 'Min Area', value: predictionResult.Min_Area },
    { name: 'Max Area', value: predictionResult.Max_Area },
  ];

  const avgPricePerBHKData = Object.entries(predictionResult.Avg_Price_Per_BHK || {}).map(([key, value]) => ({
    name: `${key} BHK`,
    price: value,
  }));

  const priceData = [
    { name: 'Predicted Price', value: predictionResult.Predicted_Price },
    { name: 'Average Price', value: predictionResult.Avg_Price },
    { name: 'Min Price', value: predictionResult.Min_Price },
    { name: 'Max Price', value: predictionResult.Max_Price },
    { name: 'Median Price', value: predictionResult.Median_Price },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };


  const handleOpenLink = (location, City, bhk) => {

      const formattedLocation = location.replace(/\s+/g, '+');
      const formattedCity = City === 'Delhi' ? 'New+Delhi' : City;
      const magicBricksUrl = `https://www.magicbricks.com/property-for-sale/residential-real-estate?bedroom=${bhk}&proptype=Multistorey-Apartment,Builder-Floor-Apartment,Penthouse,Studio-Apartment,Residential-House,Villa&Locality=${formattedLocation}&cityName=${formattedCity}`;
      window.open(magicBricksUrl, '_blank');
};
  return (
    <div className="my-10">
      {/* Display Input Features */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-center">Predicted Price: <strong>Rs.{predictionResult.Predicted_Price.toFixed(2)}</strong> Lakhs</h3>
        <h4 className="text-md text-center">City: {predictionResult.Input_Features.City}, BHK: {predictionResult.Input_Features.BHK}, Location: {predictionResult.Input_Features.Location}, Area: {predictionResult.Input_Features.Area} Sq. Ft.</h4>
      </div>

      <Slider ref={sliderRef} {...settings}>
        {/* Render Charts */}
        <div className="flex justify-center items-center">
          <div className="flex flex-col items-center">
            <Card title="Price Distribution">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={priceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div className="flex flex-col items-center">
            <Card title="Area Distribution">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={areaDistributionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div className="flex flex-col items-center">
            <Card title="Average Price per BHK">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={avgPricePerBHKData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="price" stroke="#FFBB28" />
              </LineChart>
            </ResponsiveContainer>
            </Card>
          </div>
        </div>
      </Slider>


      <div className="flex justify-center gap-2 mt-8 mb-4">
        <button onClick={() => sliderRef.current.slickPrev()} className="bg-blue-500 text-white py-2 px-2 rounded-full"><FaArrowLeft /></button>
        <button onClick={() => sliderRef.current.slickNext()} className="bg-blue-500 text-white py-2 px-2 rounded-full"><FaArrowRight /></button>
      </div>

      <div className="flex justify-center mt-4">
          <Button
            onClick={() => handleOpenLink(predictionResult.Input_Features.Location, predictionResult.Input_Features.City, predictionResult.Input_Features.BHK)}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            View More on MagicBricks
          </Button>
        </div>

    </div>
  );
};

export default PredictionResult;
