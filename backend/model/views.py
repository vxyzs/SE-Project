from rest_framework.views import APIView
from rest_framework.response import Response
import pickle
import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from rest_framework import status
from .models import RealEstate  
from .serializers import RealEstateDataSerializer


def get_data_from_db():
    """Fetch data from the MySQL database."""
    return pd.DataFrame.from_records(RealEstate.objects.values())


def predict_price(city, bhk, location, area):
    df = get_data_from_db()

    if city == "Mumbai":
        pipe_Mumbai = pickle.load(open("Mumbai.pkl", "rb"))
        input_data = pd.DataFrame([[location, area, bhk]], columns=["location", "area", "bhk"])
        prediction = pipe_Mumbai.predict(input_data)[0]

    elif city == "Bangalore":
        pipe_Bangalore = pickle.load(open("Bangalore.pkl", "rb"))
        input_data = pd.DataFrame([[location, area, bhk]], columns=["location", "area", "bhk"])
        prediction = pipe_Bangalore.predict(input_data)[0]

    elif city == "Chennai":
        pipe_Chennai = pickle.load(open("Chennai.pkl", "rb"))
        input_data = pd.DataFrame([[location, area, bhk]], columns=["location", "area", "bhk"])
        prediction = pipe_Chennai.predict(input_data)[0]

    elif city == "Delhi":
        pipe_Delhi = pickle.load(open("delhi.pkl", "rb"))
        input_data = pd.DataFrame([[location, area, bhk]], columns=["location", "area", "bhk"])
        prediction = pipe_Delhi.predict(input_data)[0]
    
    else:
        return "City not recognized."

    location_data = df[df['location'] == location]
    city_data = df[df['city'] == city]

    if location_data.empty:
        return f"No data available for the specified location: {location}"

    avg_price = location_data['price'].mean()
    min_price = location_data['price'].min()
    max_price = location_data['price'].max()
    median_price = location_data['price'].median()
    print(location_data.head())
    price_per_sqft = prediction / area if area > 0 else None

    property_count = location_data.shape[0]

    avg_price_per_bhk_location = location_data.groupby('bhk')['price'].mean().to_dict()
    avg_price_per_bhk_city = city_data.groupby('bhk')['price'].mean().to_dict()

    avg_price_per_bhk = {}
    overall_city_avg = city_data['price'].mean()

    for bhk_level in range(1, 6):
        avg_price_per_bhk[bhk_level] = (
            avg_price_per_bhk_location.get(bhk_level) or
            avg_price_per_bhk_city.get(bhk_level) or
            overall_city_avg
        )

    def make_json_compliant(value):
        if isinstance(value, (np.float64, np.float32, float)):
            if not np.isfinite(value):
                return None
            return float(value)
        return value

    avg_area = city_data['area'].mean()
    area_min = city_data['area'].min()
    area_max = city_data['area'].max()


    prediction = abs(prediction / 100000)

    output_data = {
        'Predicted_Price': prediction.round(2),
        'Avg_Price': make_json_compliant(avg_price),
        'Min_Price': make_json_compliant(min_price),
        'Max_Price': make_json_compliant(max_price),
        'Median_Price': make_json_compliant(median_price),
        'Price_Per_SqFt': make_json_compliant(price_per_sqft),
        'Property_Count': property_count,
        'Avg_Price_Per_BHK': {k: make_json_compliant(v) for k, v in avg_price_per_bhk.items()},
        'Avg_Area': avg_area,
        'Min_Area': area_min,
        'Max_Area': area_max,
        'Input_Features': {
            'City': city,
            'BHK': bhk,
            'Location': location,
            'Area': area,
        }
    }

    return output_data





class Predict(APIView):
    def post(self, request):
        data = request.data
        print(data)
        city = data['city']
        bhk = data['bhk']
        location = data['location']
        area = data['area']
        prediction_result = predict_price(city, bhk, location, area)

        return Response(data=prediction_result)

class GetDetails(APIView):
    def get(self, request):
        """This endpoint returns the list of cities or regions based on the query parameter."""
        df = get_data_from_db()

        # Check if a city is provided in the query params
        city = request.query_params.get('city', None)

        if city:
            # Return list of regions for the provided city
            locations = df[df['city'] == city]['location'].unique().tolist()
            locations.sort()
            return Response(data={"locations": locations})
        else:
            # Return list of unique cities
            cities = df['city'].unique().tolist()
            return Response(data={"cities": cities})

class PushCSVData(APIView):
    def post(self, request):
        try:
            df = pd.read_csv('merged_file.csv')
        except Exception as e:
            print(e)
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        for _, row in df.iterrows():
            serializer = RealEstateDataSerializer(data=row.to_dict())
            if serializer.is_valid():
                serializer.save()
            else:
                print(serializer.errors)
                return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"message": "Data pushed to MySQL successfully."}, status=status.HTTP_201_CREATED)
