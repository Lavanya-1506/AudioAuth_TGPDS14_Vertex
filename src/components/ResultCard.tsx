import { CheckCircle2, AlertTriangle } from "lucide-react";

type Result = {
  prediction: "Human Voice" | "AI Generated";
  confidence: number;
  language: string;
  reasoning: string[];
};

const ResultCard = ({ result }: { result: Result }) => {
  const isHuman = result.prediction === "Human Voice";
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (result.confidence / 100) * circumference;

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
              stroke={isHuman ? "hsl(var(--success))" : "hsl(var(--destructive))"}
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-foreground">{result.confidence}%</span>
          </div>
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Reasoning</p>
        <div className="flex flex-wrap gap-2">
          {result.reasoning.map((tag) => (
            <span
              key={tag}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                isHuman
                  ? "bg-success/10 text-success"
                  : "bg-destructive/10 text-destructive"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
