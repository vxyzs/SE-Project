'use client';
import { useEffect, useState } from "react";
import Instance from '@/utils/axios';
import { Button } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import toast from "react-hot-toast";

const PredictForm = ({ setPredictionResult, setLoading }) => {
  const [cities, setCities] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [bedrooms, setBedrooms] = useState(1);
  const [area, setArea] = useState(600); 

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await Instance.get("/model/get-details/");
        setCities(response.data.cities); 
        console.log(response.data.cities);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  const handleCityChange = async (city) => {
    setSelectedCity(city);
    setSelectedLocation(""); // Reset selected location

    if (city) {
      console.log(city);
      try {
        const response = await Instance.get(`/model/get-details/?city=${city}`);
        setLocations(response.data.locations); // Assuming the API returns locations for the city
        console.log(response.data.locations);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    } else {
      setLocations([]);
    }
  };

  const handleSubmit = async (e) => {
    console.log(selectedLocation.currentKey)
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        city: selectedCity,
        location: selectedLocation.currentKey,
        bhk: bedrooms,
        area: area,
      };
      const response = await Instance.post("/model/predict/", data);
      setPredictionResult(response.data); 
      toast.success("Prediction successful");
    } catch (error) {
      console.error("Error making prediction:", error);
      toast.error("Prediction failed");
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 3000)
    }
  };

  return (
    <section id="predict" className="overflow-hidden py-8">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s">
            <form onSubmit={handleSubmit}>
            <div className="-mx-4 flex flex-wrap">
                {/* City Dropdown */}
                <div className="w-full px-4 md:w-1/2 mb-8">
                <label htmlFor="city" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                    Select City
                </label>
                <Select
                  aria-label="Select City"
                  value={selectedCity}
                  onChange={(e) => handleCityChange(e.target.value)} // Pass the city value directly
                  placeholder="Select a City"
                  className="border-stroke w-full rounded-sm border bg-[#f8f8f8] text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                >
                  <SelectItem value="">Select a City</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </Select>

                </div>

                {/* Location Dropdown */}
                <div className="w-full px-4 md:w-1/2 mb-8">
                  <label htmlFor="location" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                      Select Location
                  </label>
                  <Select
                    aria-label="Select Location"
                    isDisabled={!selectedCity}
                    value={selectedLocation}
                    onSelectionChange={(value) => setSelectedLocation(value)}
                    placeholder="Select a Location"
                    className="w-full border-stroke rounded-sm border justify-center bg-[#f8f8f8] text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                  >
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </Select>
                </div>

                {/* Bedrooms Dropdown */}
                <div className="w-full px-4 md:w-1/2 mb-8">
                <label htmlFor="bedrooms" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                    Number of Bedrooms
                </label>
                <Input
                    value={bedrooms} 
                    onChange={(e) => setBedrooms(Number(e.target.value))}
                    placeholder="Select Number of Bedrooms"
                    min={0}
                    type="number"
                    max={6}
                    className="border-stroke w-full rounded-sm border bg-[#f8f8f8] text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                />
                </div>

                {/* Area Input */}
                <div className="w-full px-4 md:w-1/2 mb-8">
                <label htmlFor="area" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                    Area (in Sq. Ft.)
                </label>
                <Input
                    value={area} 
                    onChange={(e) => setArea(Number(e.target.value))}
                    placeholder="Enter Area in Sq. Ft."
                    min={200} // Set a reasonable minimum area
                    type="number"
                    className="border-stroke w-full rounded-sm border bg-[#f8f8f8] text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                />
                </div>


                {/* Submit Button */}
                <div className="flex flex-col items-center w-full px-4 mb-8">
                <Button
                    type="submit"
                    className="w-40 rounded bg-blue-600 px-6 py-3 text-white transition duration-300 hover:bg-blue-700"
                >
                    Predict Price
                </Button>
                </div>
            </div>
            </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PredictForm;
