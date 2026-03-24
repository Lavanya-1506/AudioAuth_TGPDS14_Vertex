import os
from dataclasses import dataclass
from typing import List, Tuple


@dataclass
class AudioFeatures:
    pitch_variance: float
    has_breathing: bool
    repetition_score: float
    pause_irregularity: bool


def _pseudo_random_unit(seed: int, mod: int = 100) -> float:
    return (seed % mod) / float(mod)


def extract_features(file_path: str) -> AudioFeatures:
    """
    Lightweight, deterministic feature mock based on file metadata.
    This keeps the hackathon flow fast without heavy ML inference.
    """
    size = os.path.getsize(file_path)
    name_seed = sum(ord(ch) for ch in os.path.basename(file_path))
    pitch_variance = _pseudo_random_unit(size + name_seed, 100)
    repetition_score = _pseudo_random_unit(size // 7 + name_seed * 3, 100)
    has_breathing = ((size + name_seed) % 2) == 0
    pause_irregularity = ((size // 3 + name_seed) % 5) == 0

    return AudioFeatures(
        pitch_variance=pitch_variance,
        has_breathing=has_breathing,
        repetition_score=repetition_score,
        pause_irregularity=pause_irregularity,
    )


def generate_reasoning(features: AudioFeatures) -> List[str]:
    reasons: List[str] = []

    if features.pitch_variance < 0.25:
        reasons.append("Flat pitch variation")
    if not features.has_breathing:
        reasons.append("Lack of breathing patterns")
    if features.repetition_score > 0.7:
        reasons.append("Repetitive waveform")
    if features.pause_irregularity:
        reasons.append("Unnatural pauses")

    return reasons


def _human_positive_reasons(features: AudioFeatures) -> List[str]:
    reasons: List[str] = []

    if features.pitch_variance > 0.4:
        reasons.append("Natural pitch variation")
    if features.has_breathing:
        reasons.append("Breathing patterns detected")
    if features.repetition_score < 0.45:
        reasons.append("Organic waveform changes")
    if not features.pause_irregularity:
        reasons.append("Natural pause cadence")

    return reasons


def _confidence_from_strength(strength: float) -> float:
    if strength >= 0.75:
        confidence = 85 + ((strength - 0.75) / 0.25) * 10
    elif strength >= 0.5:
        confidence = 60 + ((strength - 0.5) / 0.25) * 20
    else:
        confidence = 45 + strength * 15

    return max(0.0, min(99.9, confidence))


def classify_audio(features: AudioFeatures) -> Tuple[str, float, List[str]]:
    ai_signals = [
        features.pitch_variance < 0.25,
        not features.has_breathing,
        features.repetition_score > 0.7,
        features.pause_irregularity,
    ]
    human_signals = [
        features.pitch_variance > 0.4,
        features.has_breathing,
        features.repetition_score < 0.45,
        not features.pause_irregularity,
    ]

    ai_score = sum(1 for signal in ai_signals if signal)
    human_score = sum(1 for signal in human_signals if signal)

    if ai_score >= human_score:
        prediction = "AI Generated"
        strength = ai_score / len(ai_signals)
        reasons = generate_reasoning(features)
    else:
        prediction = "Human Voice"
        strength = human_score / len(human_signals)
        reasons = _human_positive_reasons(features)

    if not reasons:
        reasons = ["Mixed acoustic signals"]

    confidence = round(_confidence_from_strength(strength), 1)
    return prediction, confidence, reasons
