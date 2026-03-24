import librosa
import numpy as np
import joblib

model = joblib.load("audio_model.pkl")

def extract_features(file_path):
    try:
        audio, sr = librosa.load(file_path, sr=None)
        mfcc = librosa.feature.mfcc(y=audio, sr=sr, n_mfcc=13)
        return np.mean(mfcc.T, axis=0)
    except:
        return None


def predict_audio(file_path):
    features = extract_features(file_path)
    
    if features is None:
        return "Error", 0.0, "Audio processing failed"

    probs = model.predict_proba([features])[0]
    prediction = np.argmax(probs)
    confidence = round(max(probs) * 100, 2)

    label = "AI-generated" if prediction == 1 else "Human"

    # 🔥 Add reasoning logic
    if confidence > 85:
        reasoning = "High confidence based on consistent audio patterns"
    elif confidence > 65:
        reasoning = "Moderate confidence, some mixed characteristics detected"
    else:
        reasoning = "Low confidence, audio characteristics are unclear"

    return label, confidence, reasoning