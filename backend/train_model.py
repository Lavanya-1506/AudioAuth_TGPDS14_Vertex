import os
import numpy as np
from model import extract_features
from sklearn.ensemble import RandomForestClassifier
import joblib

X = []
y = []

# Real = 0
for file in os.listdir("../dataset/real"):
    path = "../dataset/real/" + file
    features = extract_features(path)
    if features is not None:
        X.append(features)
        y.append(0)

# Fake = 1
for file in os.listdir("../dataset/fake"):
    path = "../dataset/fake/" + file
    features = extract_features(path)
    if features is not None:
        X.append(features)
        y.append(1)

# Convert to numpy
X = np.array(X)
y = np.array(y)

# Train model
model = RandomForestClassifier()
model.fit(X, y)

# Save model
joblib.dump(model, "audio_model.pkl")

print("✅ Model trained and saved successfully")