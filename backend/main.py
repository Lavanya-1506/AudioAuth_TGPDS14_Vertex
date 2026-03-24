from fastapi import FastAPI, UploadFile, File
import os
import shutil
from model import predict_audio

app = FastAPI()

TEMP_DIR = "temp"
os.makedirs(TEMP_DIR, exist_ok=True)


@app.get("/")
def home():
    return {"message": "AudioAuth API is running 🚀"}


@app.post("/analyze-audio")
async def analyze_audio(file: UploadFile = File(...)):
    file_path = os.path.join(TEMP_DIR, file.filename)

    # Save file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Predict
    result = predict_audio(file_path)

    return {
        "filename": file.filename,
        "prediction": result
    }