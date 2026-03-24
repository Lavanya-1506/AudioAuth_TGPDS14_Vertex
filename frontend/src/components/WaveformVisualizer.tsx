import { useMemo } from "react";

const WaveformVisualizer = ({ isActive }: { isActive: boolean }) => {
  const bars = useMemo(() => Array.from({ length: 48 }, (_, i) => i), []);

  return (
    <div className="glass-card rounded-2xl p-6 h-40 flex items-center justify-center gap-[3px]">
      {bars.map((i) => (
        <div
          key={i}
          className={`w-1.5 rounded-full transition-all duration-300 ${
            isActive ? "bg-primary" : "bg-border"
          }`}
          style={{
            height: isActive
              ? `${20 + Math.sin(i * 0.4) * 30 + Math.random() * 30}%`
              : `${10 + Math.sin(i * 0.3) * 8}%`,
            animation: isActive
              ? `waveform ${0.8 + Math.random() * 0.8}s ease-in-out infinite`
              : "none",
            animationDelay: `${i * 30}ms`,
            opacity: isActive ? 0.7 + Math.random() * 0.3 : 0.3,
          }}
        />
      ))}
    </div>
  );
};

export default WaveformVisualizer;
