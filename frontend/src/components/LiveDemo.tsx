import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upload, FileAudio, Loader2 } from "lucide-react";
import WaveformVisualizer from "./WaveformVisualizer";
import ResultCard from "./ResultCard";

const languages = ["English", "Hindi", "Tamil", "Telugu", "Malayalam"];

type Result = {
  prediction: "Human Voice" | "AI Generated";
  confidence: number;
  language: string;
  reasoning: string[];
};

const mockResults: Result[] = [
  {
    prediction: "AI Generated",
    confidence: 92.4,
    language: "Hindi",
    reasoning: ["Unnatural pitch variation", "Lack of breathing patterns", "Robotic cadence detected"],
  },
  {
    prediction: "Human Voice",
    confidence: 97.8,
    language: "English",
    reasoning: ["Natural breathing detected", "Micro-pitch variations", "Emotional tonality present"],
  },
];

const LiveDemo = () => {
  const [selectedLang, setSelectedLang] = useState("English");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const validateFile = (file: File) => {
    const validTypes = ["audio/wav", "audio/x-wav", "audio/mpeg", "audio/flac", "audio/x-flac"];
    const maxBytes = 10 * 1024 * 1024;
    if (!validTypes.includes(file.type)) {
      return "Unsupported file type. Please upload WAV, MP3, or FLAC.";
    }
    if (file.size > maxBytes) {
      return "File too large. Maximum size is 10MB.";
    }
    return null;
  };

  const handleFileSelect = (file: File | null) => {
    if (!file) return;
    const error = validateFile(file);
    if (error) {
      setSelectedFile(null);
      setFileError(error);
      return;
    }
    setFileError(null);
    setSelectedFile(file);
  };

  const handleAnalyze = () => {
    if (!selectedFile) {
      setFileError("Please select an audio file first.");
      return;
    }
    setIsAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      const picked = mockResults[Math.random() > 0.5 ? 0 : 1];
      setResult({ ...picked, language: selectedLang });
      setIsAnalyzing(false);
    }, 2500);
  };

  return (
    <section id="demo" className="section-padding">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Try It <span className="gradient-text">Live</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Upload an audio file and see the detection in real-time.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Upload */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                const file = e.dataTransfer.files?.[0] ?? null;
                handleFileSelect(file);
              }}
              className={`glass-card rounded-2xl p-8 border-2 border-dashed transition-all duration-300 text-center ${
                dragOver ? "border-primary bg-primary/5" : "border-border"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".wav,.mp3,.flac,audio/*"
                className="hidden"
                onChange={(e) => handleFileSelect(e.target.files?.[0] ?? null)}
              />
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Upload className="text-primary" size={28} />
              </div>
              <p className="font-medium text-foreground mb-1">Drop audio file here</p>
              <p className="text-sm text-muted-foreground mb-4">WAV, MP3, FLAC up to 10MB</p>
              <Button variant="outline" size="sm" onClick={handleBrowseClick}>
                <FileAudio size={16} />
                Browse Files
              </Button>

              {selectedFile && (
                <p className="mt-3 text-xs text-muted-foreground truncate">
                  Selected: <span className="font-medium text-foreground">{selectedFile.name}</span>
                </p>
              )}
              {fileError && (
                <p className="mt-3 text-xs text-destructive">{fileError}</p>
              )}
            </div>

            <div className="glass-card rounded-2xl p-6 space-y-4">
              <label className="text-sm font-medium text-foreground">Language</label>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLang(lang)}
                    className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                      selectedLang === lang
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <Button
              variant="hero"
              size="lg"
              className="w-full"
              onClick={handleAnalyze}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Analyzing acoustic patterns...
                </>
              ) : (
                "Analyze Audio"
              )}
            </Button>
          </motion.div>

          {/* Right Panel - Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <WaveformVisualizer isActive={isAnalyzing} />

            <AnimatePresence mode="wait">
              {result && (
                <motion.div
                  key={result.prediction}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <ResultCard result={result} />
                </motion.div>
              )}
            </AnimatePresence>

            {isAnalyzing && (
              <div className="glass-card rounded-2xl p-12 text-center">
                <p className="text-muted-foreground">Analyzing acoustic patterns...</p>
              </div>
            )}

            {!result && !isAnalyzing && (
              <div className="glass-card rounded-2xl p-12 text-center">
                <p className="text-muted-foreground">Results will appear here after analysis</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LiveDemo;

