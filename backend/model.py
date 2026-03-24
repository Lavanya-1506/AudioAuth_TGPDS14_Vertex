import librosa
import numpy as np

def extract_features(file_path):
    try:
        audio, sr = librosa.load(file_path, sr=None)
        
        # Extract MFCC features
        mfcc = librosa.feature.mfcc(y=audio, sr=sr, n_mfcc=13)
        
        # Take mean of features
        mfcc_mean = np.mean(mfcc.T, axis=0)
        
        return mfcc_mean
    
    except Exception as e:
        print("Error processing audio:", e)
        return None
    import random

def predict_audio(file_path):
    features = extract_features(file_path)
    
    if features is None:
        return "Error"
    
    # Temporary random prediction (we'll replace with ML later)
    result = random.choice(["Human", "AI-generated"])
    
    return result