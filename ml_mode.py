import pickle
import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder

df = pd.read_csv("magicbricks_cleaned_properties.csv")
pickle_in = open('regression_model.pkl', 'rb')
reg = pickle.load(pickle_in)

city_encoder = LabelEncoder()
df['Encoded_City'] = city_encoder.fit_transform(df['City'])

region_encoder = LabelEncoder()
df['Encoded_Region'] = region_encoder.fit_transform(df['Region'])

region_mapping = df[['Region', 'Encoded_Region']].drop_duplicates().set_index('Region')['Encoded_Region'].to_dict()

def estimate_carpet_area(region, bedrooms):
    filtered_df = df[(df['Region'] == region) & (df['Bedroom'] == bedrooms)]
    mean_area = filtered_df['Carpet Area'].mean()

    if not np.isnan(mean_area):
        return mean_area
    else:
        global_mean_area = df[df['Bedroom'] == bedrooms]['Carpet Area'].mean()
        if not np.isnan(global_mean_area):
            return global_mean_area
        else:
            raise ValueError(f"No data available for {bedrooms} bedroom(s) to estimate carpet area.")

def calculate_rate_per_sqft(region):
    avg_rate_per_sqft = df[df['Region'] == region]['Rate per Sqft'].mean()
    if not np.isnan(avg_rate_per_sqft):
        return avg_rate_per_sqft
    else:
        return df['Rate per Sqft'].mean()

def predict_price(City, Bedroom, Region, Transaction_Type):
    if Region not in region_mapping:
        raise ValueError(f"Region '{Region}' not found in the mapping.")

    encoded_region = region_mapping[Region]
    encoded_city = city_encoder.transform([City])[0]

    Carpet_Area = estimate_carpet_area(Region, Bedroom)
    Carpet_Area = Carpet_Area.round(2)

    Rate_per_SqFt = calculate_rate_per_sqft(Region)
    Rate_per_SqFt = Rate_per_SqFt.round(2)
    
    input_data = pd.DataFrame({
        'Encoded_City': [encoded_city],
        'Bedroom': [Bedroom],
        'Encoded_Region': [encoded_region],
        'Rate per Sqft': [Rate_per_SqFt],
        'Carpet Area': [Carpet_Area],
        'Transaction Type': [Transaction_Type],
    })

    input_data_encoded = pd.get_dummies(input_data, columns=['Transaction Type'], drop_first=True)
    input_data_final = input_data_encoded.reindex(columns=reg.feature_names_in_, fill_value=0)

    predicted_price = reg.predict(input_data_final)[0]

    output_data = {
        'Predicted Price': predicted_price,
        'Input Features': {
            'City': City,
            'Bedroom': Bedroom,
            'Region': Region,
            'Rate per Sqft': Rate_per_SqFt,
            'Carpet Area': Carpet_Area,
            'Transaction Type': Transaction_Type,
            'Encoded City': encoded_city,
            'Encoded Region': encoded_region
        }
    }
    
    return output_data

def predict_test():
    City = "Mumbai"
    Bedroom = 2.0
    Region = 'Subhash Nagar Chembur Mumbai'
    Transaction_Type = "New Property"

    prediction_result = predict_price(City, Bedroom, Region, Transaction_Type)

    print(f'The predicted price is: {prediction_result["Predicted Price"].round(2)} Lakhs')
    print("Input Features Used for Prediction:")
    for key, value in prediction_result['Input Features'].items():
        print(f"{key}: {value}")

if __name__ == '__main__':
    predict_test()
