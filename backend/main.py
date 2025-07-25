from fastapi import FastAPI, File, UploadFile, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from keras.models import load_model  # TensorFlow is required for Keras to work
from keras.preprocessing.image import img_to_array
from PIL import Image
import io
import numpy as np
import pickle
from weights.const import plant_diseases, plant_diseases_dict

crop_optimal_model_path = 'weights/Crop Optimal Requirements/dtc_model.pkl'
crop_suitability_model_path = 'weights/Crop Suitability Geospatial/models_crops_mappings.pkl'
plant_disease_model_path = 'weights/Plant Disease/plant_disease_model_inception.keras'
fertilizer_recommendation_model_path = 'weights/Recommend Fertilizer/ferilizer_classifier.pkl'
fertilizers_crops_soil_path = 'weights/Recommend Fertilizer/fertilizers_crops_soil.pkl'
IMAGE_SIZE = (224, 224) 

# Load the model and label encoder
try:
    with open(crop_optimal_model_path, 'rb') as model_file:
        crop_optimal_classifier, crop_optimal_label_encoder = pickle.load(model_file)

    with open(crop_suitability_model_path, 'rb') as model_file:
        crop_suitability_model, crops, suitability_mapping = pickle.load(model_file)

    with open(fertilizer_recommendation_model_path, 'rb') as model_file:
        fertilizer_recommendation_model = pickle.load(model_file)
    
    with open(fertilizers_crops_soil_path, 'rb') as model_file:
        fertilizers, fertlizer_crops_encoder, fertlizer_soil_encoder = pickle.load(model_file)
        
    # Load the plant disease model
    plant_disease_model = load_model(plant_disease_model_path)
    
except FileNotFoundError:
    raise RuntimeError("Model file 'dtc_model.pkl' not found. Please ensure the file is present.")
except pickle.UnpicklingError:
    raise RuntimeError("Error occurred while loading the model. The file may be corrupted or incompatible.")


# FastAPI app instance
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,  # Allow cookies and credentials
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all HTTP headers
)

# Define input schema
class CropPredictionInput(BaseModel):
    # medium (50-150 cm), deep (>>150 cm), shallow (20-50 cm)
    soilDepth: str
    # medium, light, heavy, organic, wide
    soilTexture: str
    # moderate, high, low
    soilFertility: str
    # low (<4 dS/m), medium (4-10 dS/m), high (>10 dS/m)), none
    soilSalinity: str
    # low (<4 dS/m), medium (4-10 dS/m), high (>10 dS/m)), none
    soilDrainage: str
    temperature: float
    rainfall: float
    # very bright, clear skies, cloudy skies, light shade, heavy shade
    lightIntensity: str
    # 0 - 14
    soilPH: float
    

# Define route for predicting crops
@app.post("/predict-crop")
async def predict_crop(input_data: CropPredictionInput):
    try:
        # Prepare the input data
        sample = np.array([
            input_data.soilDepth,
            input_data.soilTexture,
            input_data.soilFertility,
            input_data.soilSalinity,
            input_data.soilDrainage,
            input_data.temperature,
            input_data.rainfall,
            input_data.lightIntensity,
            input_data.soilPH
        ])

        # Non-numeric column indices
        non_numeric_cols = [0, 1, 2, 3, 4, 7]

        # Transform non-numeric values using label encoder
        for idx in non_numeric_cols:
            try:
                transformed_val = crop_optimal_label_encoder.transform([sample[idx]])
                sample[idx] = transformed_val[0]
            except Exception as e:
                raise HTTPException(status_code=400, detail=f"Invalid input for column {idx}: {sample[idx]}.")

        # Convert sample to the correct type for prediction
        sample = sample.astype(float)

        # Predict the crop
        prediction = crop_optimal_classifier.predict([sample])[0]
        # Return the predicted crop
        return {"predicted_crop": prediction}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error occurred during prediction: {str(e)}")



# Define input schema for geospatial coordinates
class GeospatialCoordinates(BaseModel):
    lon: float
    lat: float

# Define route for predicting crop suitability
@app.post("/predict-suitability")
async def predict_suitability(coordinates:GeospatialCoordinates):
    try:
        # Predict the crop suitability
        prediction = crop_suitability_model.predict([[coordinates.lon, coordinates.lat]])
        crop_suitability = []

        for i, crop in enumerate(crops):
            # Get the predicted suitability value for the current crop
            predicted_value = int(prediction[0][i])
            # Map the predicted integer back to the suitability label
            suitability_label = [k for k, v in suitability_mapping.items() if v == predicted_value][0]
            # Append the crop name and suitability label to the list
            crop_suitability.append((crop, suitability_label))

        
        crop_suitability_array = np.array(crop_suitability)

        # Return the predicted crop suitability
        return {"predicted_suitability": crop_suitability_array}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error occurred during prediction: {str(e)}")
    

class FertilizerRecommendationInput(BaseModel):
    crop: str
    N: float
    P: float
    K: float
    moisture: float
    temperature: float
    humidity: float
    soilType: str

@app.post("/recommend-fertilizer")
async def recommend_fertilizer(input_data: FertilizerRecommendationInput):
    try:
        soil = fertlizer_soil_encoder.transform([input_data.soilType])[0]
        crop = fertlizer_crops_encoder.transform([input_data.crop])[0]

        input_sample = [int(input_data.temperature), int(input_data.humidity), int(input_data.moisture), int(soil), int(crop), int(input_data.N), int(input_data.K), int(input_data.P)]
        result = fertilizers.classes_[fertilizer_recommendation_model.predict([input_sample])]
        
        return {"fertilizer": result[0]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error occurred during recommendation: {str(e)}")

@app.post("/predict-disease")
async def predict_disease(file: UploadFile = File(...)):
    try:
        # Check if the uploaded file is an image
        if not file.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="File is not an image.")
        # Read the content
        contents = await file.read()
        # Load the image
        image = Image.open(io.BytesIO(contents))
        image = image.convert("RGB")  # Ensure image is in RGB mode
        image = image.resize(IMAGE_SIZE)  # Resize the image

        image_array = img_to_array(image)
        image_array = np.expand_dims(image_array, axis=0)  # Add batch dimension
        image_array = image_array / 255.0  # Normalize the image (if required)

        # Make prediction
        predictions = plant_disease_model.predict(image_array)
        results = [{"class": plant_diseases[i], "confidence": float(pred)} for i, pred in enumerate(predictions[0])]

        sorted_results = sorted(results, key=lambda x: x["confidence"], reverse=True)
        filtered_results = [result for result in sorted_results if result["confidence"] >= 0.3]
        response = [{**plant_diseases_dict[res["class"]], "confidence": res["confidence"]} for res in filtered_results]
        print(response)
        return {"predictions": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error occurred during prediction: {str(e)}")
    