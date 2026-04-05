import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

// 🔥 CONTADOR
function useCountUp(target: number, inView: boolean, duration = 2000) {
  const [value, setValue] = useState(0);
  const start = useRef<number | null>(null);

  useEffect(() => {
    if (!inView) return;

    let frame: number;

    const animate = (t: number) => {
      if (!start.current) start.current = t;

      const progress = Math.min((t - start.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);

      setValue(Math.floor(eased * target));

      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target, inView]);

  return value;
}

// 🔥 PARTICULAS LIGERAS (sin librerías)
function Particles() {
  const particles = Array.from({ length: 12 });

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-amber-400/30 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * 300,
            opacity: 0,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}

// 🔥 ITEM
function StatItem({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const numericValue = parseInt(value.replace(/\D/g, "") || "0");
  const suffix = value.replace(/[0-9]/g, "");

  const count = useCountUp(numericValue, inView);

  // 🧲 MAGNETIC
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMove = (e: any) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    x.set((e.clientX - rect.left - rect.width / 2) / 10);
    y.set((e.clientY - rect.top - rect.height / 2) / 10);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  // 🌈 GRADIENT
  const gradient = useTransform(
    x,
    [-40, 40],
    [
      "linear-gradient(90deg,#fbbf24,#f59e0b,#fbbf24)",
      "linear-gradient(90deg,#f59e0b,#fbbf24,#f59e0b)",
    ]
  );

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="relative group cursor-pointer"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      {/* glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
        <div className="absolute inset-0 bg-amber-400/20 blur-3xl rounded-full" />
      </div>

      <motion.div
        className="relative text-4xl md:text-5xl font-bold mb-2"
        style={{
          backgroundImage: gradient,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        animate={
          inView && count === numericValue
            ? { scale: [1, 1.15, 1] }
            : {}
        }
        transition={{ duration: 0.4 }}
      >
        {count}
        {suffix}
      </motion.div>

      <div className="text-gray-400">{label}</div>
    </motion.div>
  );
}

// 🔥 DATA
const stats = [
  { value: "10000+", label: "Lectores impactados" },
  { value: "24", label: "Ebooks creados" },
  { value: "4", label: "Idiomas disponibles" },
  { value: "98%", label: "Satisfacción" },
];

export function Stats() {
  return (
    <section className="py-28 bg-gradient-to-b from-[#0f0f1a] to-gray-900 text-white relative overflow-hidden">

      {/* 🌌 fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,180,0,0.08),transparent_70%)]" />

      {/* 🔥 partículas */}
      <Particles />

      <div className="relative max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
        {stats.map((item, i) => (
          <StatItem key={i} value={item.value} label={item.label} />
        ))}
      </div>
    </section>
  );
}