import { useEffect, useState } from "react";
import { CheckCircle2, AlertTriangle } from "lucide-react";

import { AnalyzeResponse } from '../../lib/api';

type Result = AnalyzeResponse & {
  confidenceNum: number;
};

const ResultCard = ({ result }: { result: Result }) => {
  const isHuman = result.prediction === "Human Voice";
  const confidenceNum = parseFloat(result.confidence.replace('%', ''));
  const circumference = 2 * Math.PI * 40;
  const [animatedConfidence, setAnimatedConfidence] = useState(0);

  useEffect(() => {
    let rafId = 0;
    const durationMs = 900;
    const start = performance.now();
    const target = confidenceNum;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const value = Math.round(target * progress * 10) / 10;
      setAnimatedConfidence(value);
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    setAnimatedConfidence(0);
    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [result.confidence, result.prediction]);

  const offset = circumference - (animatedConfidence / 100) * circumference;

  const isStrong = confidenceNum > 80;
  const isWarning = confidenceNum >= 50 && confidenceNum <= 80;
  const ringColorClass = isStrong
    ? (isHuman ? "text-success" : "text-destructive")
    : isWarning
      ? "text-amber-500"
      : "text-muted-foreground";

  const badgeClass = isStrong
    ? (isHuman ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive")
    : isWarning
      ? "bg-amber-500/10 text-amber-600"
      : "bg-muted text-muted-foreground";

  const iconClass = isStrong
    ? (isHuman ? "text-success" : "text-destructive")
    : isWarning
      ? "text-amber-500"
      : "text-muted-foreground";

  // Backend returns string, frontend expects array
  const reasoningList = Array.isArray(result.reasoning) ? result.reasoning : [result.reasoning as string];

  return (
    <div className="glass-card rounded-2xl p-6 space-y-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isHuman ? "bg-success/10" : "bg-destructive/10"}`}>
            {isHuman ? (
              <CheckCircle2 className="text-success" size={20} />
            ) : (
              <AlertTriangle className="text-destructive" size={20} />
            )}
          </div>
          <div>
            <p className={`font-semibold ${isHuman ? "text-success" : "text-destructive"}`}>
              {result.prediction}
            </p>
            <p className="text-xs text-muted-foreground">{result.language}</p>
          </div>
        </div>

        {/* Circular progress */}
        <div className="relative w-20 h-20">
          <svg className="w-20 h-20 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
            <circle
              cx="50" cy="50" r="40" fill="none"
              stroke="currentColor"
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className={`transition-all duration-1000 ease-out ${ringColorClass}`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-foreground">{animatedConfidence.toFixed(1)}%</span>
          </div>
        </div>
      </div>

      {confidenceNum < 50 && (
        <div className="rounded-xl border border-border bg-muted/40 px-4 py-2 text-xs text-muted-foreground">
          Low confidence warning: consider re-recording in a quieter environment.
        </div>
      )}

      <div>
        <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Reasoning</p>
        <ul className="space-y-2">
          {reasoningList.map((reasoning, index) => (
            <li key={index} className="flex items-center gap-2 text-sm">
              {isHuman ? (
                <CheckCircle2 size={14} className={iconClass} />
              ) : (
                <AlertTriangle size={14} className={iconClass} />
              )}
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${badgeClass}`}>
                {reasoning}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResultCard;

