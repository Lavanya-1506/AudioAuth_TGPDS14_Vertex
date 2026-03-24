import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Copy, Check, Key } from "lucide-react";

const codeSnippets = {
  curl: `curl -X POST http://localhost:8000/analyze \\
  -F "file=@/path/to/audio.mp3" \\
  -F "language=Hindi"`,
  response: `{
  "filename": "audio.mp3",
  "prediction": "AI Generated",
  "confidence": "92.4%",
  "language": "Hindi",
  "reasoning": [
    "Unnatural pitch variation",
    "Lack of breathing patterns"
  ]
}`,
};

const APIPanel = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const [tab, setTab] = useState<"curl" | "response">("curl");

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section id="api" className="section-padding">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Developer <span className="gradient-text">API</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Integrate voice authentication into your product in minutes.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* API Key */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass-card rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
                <Key size={16} className="text-primary" />
                API Key
              </div>
              <div className="flex items-center gap-2">
                <code className="flex-1 px-4 py-3 rounded-xl bg-muted text-sm font-mono text-muted-foreground truncate">
                  sk-audioauth-xxxx-xxxx-xxxx-xxxxxxxxxxxx
                </code>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleCopy("key", "sk-audioauth-xxxx-xxxx-xxxx-xxxxxxxxxxxx")}
                >
                  {copied === "key" ? <Check size={14} /> : <Copy size={14} />}
                </Button>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 space-y-3">
              <h3 className="font-semibold text-sm text-foreground">Endpoint</h3>
              <code className="block px-4 py-3 rounded-xl bg-muted text-sm font-mono text-primary">
                POST /v1/analyze
              </code>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Rate limit: 1,000 req/min</p>
                <p>• Max file size: 10MB</p>
                <p>• Supported: WAV, MP3, FLAC, base64</p>
              </div>
            </div>
          </motion.div>

          {/* Code snippets */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl overflow-hidden"
          >
            <div className="flex border-b border-border">
              {(["curl", "response"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-5 py-3 text-sm font-medium transition-colors ${
                    tab === t
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t === "curl" ? "Request" : "Response"}
                </button>
              ))}
              <div className="ml-auto flex items-center pr-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleCopy(tab, codeSnippets[tab])}
                >
                  {copied === tab ? <Check size={14} /> : <Copy size={14} />}
                </Button>
              </div>
            </div>
            <pre className="p-6 text-sm font-mono text-foreground/80 overflow-x-auto leading-relaxed">
              {codeSnippets[tab]}
            </pre>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default APIPanel;
