import { motion } from "framer-motion";
import { Mic, Zap, BarChart3, Shield } from "lucide-react";

const features = [
  {
    icon: Mic,
    title: "Multi-Language Detection",
    description: "Support for English, Hindi, Tamil, Telugu, and Malayalam with native accent understanding.",
  },
  {
    icon: Zap,
    title: "Real-Time Processing",
    description: "Sub-100ms inference latency. Stream audio directly or upload files for instant analysis.",
  },
  {
    icon: BarChart3,
    title: "Confidence Scoring",
    description: "Granular confidence metrics with detailed reasoning tags for every prediction.",
  },
  {
    icon: Shield,
    title: "Fraud Prevention",
    description: "Enterprise-grade protection against voice cloning, deepfakes, and social engineering.",
  },
];

const FeatureCards = () => {
  return (
    <section id="features" className="section-padding gradient-bg">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Built for <span className="gradient-text">Security Teams</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Everything you need to authenticate voices at scale.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card-hover rounded-2xl p-6 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="text-primary" size={22} />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
