from fastapi import FastAPI, UploadFile, File, Form
import os
import shutil
<<<<<<< HEAD
from model import predict_audio
=======
from prediction import extract_features, classify_audio
>>>>>>> 331cf8dc7bd094dc68a060a9886b1dff5055911b

app = FastAPI()

TEMP_DIR = "temp"
os.makedirs(TEMP_DIR, exist_ok=True)


@app.get("/")
def home():
    return {"message": "AudioAuth API is running 🚀"}


def _analyze_file(file: UploadFile, language: str) -> dict:
    file_path = os.path.join(TEMP_DIR, file.filename)

    # Save file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

<<<<<<< HEAD
    # Predict
    result = predict_audio(file_path)

    return {
        "filename": file.filename,
        "prediction": result
    }
=======
    features = extract_features(file_path)
    prediction, confidence, reasoning = classify_audio(features)

    return {
        "prediction": prediction,
        "confidence": confidence,
        "language": language,
        "reasoning": reasoning,
    }


@app.post("/analyze")
async def analyze_audio(
    file: UploadFile = File(...),
    language: str = Form(default="English"),
):
    return _analyze_file(file, language)


@app.post("/analyze-audio")
async def analyze_audio_legacy(
    file: UploadFile = File(...),
    language: str = Form(default="English"),
):
    return _analyze_file(file, language)
>>>>>>> 331cf8dc7bd094dc68a060a9886b1dff5055911b
