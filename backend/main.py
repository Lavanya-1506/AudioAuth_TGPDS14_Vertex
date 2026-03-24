from fastapi import FastAPI, UploadFile, File, Form
import os
import shutil
from model import predict_audio

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

    # Predict
    label, confidence, reasoning = predict_audio(file_path)

    return {
        "filename": file.filename,
        "prediction": label,                 # ✅ fixed
        "confidence": f"{confidence}%",      # ✅ added
        "language": language,
        "reasoning": reasoning               # ✅ added
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
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or put your friend's frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)