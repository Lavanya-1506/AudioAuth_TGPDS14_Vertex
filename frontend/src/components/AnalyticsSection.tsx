import { motion } from "framer-motion";
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const scanData = [
  { month: "Jan", scans: 1200 },
  { month: "Feb", scans: 1800 },
  { month: "Mar", scans: 2400 },
  { month: "Apr", scans: 3100 },
  { month: "May", scans: 4200 },
  { month: "Jun", scans: 5800 },
];

const pieData = [
  { name: "Human", value: 62 },
  { name: "AI", value: 38 },
];

const langData = [
  { lang: "EN", count: 4200 },
  { lang: "HI", count: 2800 },
  { lang: "TA", count: 1100 },
  { lang: "TE", count: 900 },
  { lang: "ML", count: 600 },
];

const COLORS = ["hsl(160, 64%, 40%)", "hsl(0, 84%, 60%)"];

const stats = [
  { label: "Total Scans", value: "18,500" },
  { label: "Accuracy", value: "99.2%" },
  { label: "Avg Latency", value: "84ms" },
  { label: "API Calls Today", value: "2,341" },
];

const AnalyticsSection = () => {
  return (
    <section id="analytics" className="section-padding gradient-bg">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Platform <span className="gradient-text">Analytics</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Real-time insights into your voice authentication pipeline.
          </p>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-5 text-center"
            >
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Line chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-6"
          >
            <h3 className="text-sm font-semibold text-foreground mb-4">Scans Over Time</h3>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={scanData}>
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(215, 16%, 47%)" }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    background: "hsl(0, 0%, 100%)",
                    border: "1px solid hsl(220, 13%, 91%)",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                />
                <Line type="monotone" dataKey="scans" stroke="hsl(239, 84%, 67%)" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pie chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-6"
          >
            <h3 className="text-sm font-semibold text-foreground mb-4">AI vs Human</h3>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" strokeWidth={0}>
                  {pieData.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-2">
              {pieData.map((d, i) => (
                <div key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i] }} />
                  {d.name} ({d.value}%)
                </div>
              ))}
            </div>
          </motion.div>

          {/* Bar chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-6"
          >
            <h3 className="text-sm font-semibold text-foreground mb-4">By Language</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={langData}>
                <XAxis dataKey="lang" tick={{ fontSize: 11, fill: "hsl(215, 16%, 47%)" }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    background: "hsl(0, 0%, 100%)",
                    border: "1px solid hsl(220, 13%, 91%)",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="count" fill="hsl(263, 70%, 76%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsSection;
