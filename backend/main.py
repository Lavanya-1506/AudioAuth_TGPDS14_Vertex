from fastapi import FastAPI, UploadFile, File
import os
import shutil

app = FastAPI()

# Ensure temp folder exists
TEMP_DIR = "temp"
os.makedirs(TEMP_DIR, exist_ok=True)


@app.get("/")
def home():
    return {"message": "AudioAuth API is running 🚀"}


@app.post("/analyze-audio")
async def analyze_audio(file: UploadFile = File(...)):
    file_path = os.path.join(TEMP_DIR, file.filename)

    # Save uploaded file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "message": "File received and saved successfully",
        "filename": file.filename
    }