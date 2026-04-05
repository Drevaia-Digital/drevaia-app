import { motion, useInView, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// 🔥 Hook contador SUPREMO
function useCountUp(target: number, inView: boolean, duration = 2000) {
  const [value, setValue] = useState(0);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    if (!inView) return;

    let frame: number;

    const animate = (time: number) => {
      if (!startTime.current) startTime.current = time;

      const progress = Math.min((time - startTime.current) / duration, 1);

      // 🔥 easing Apple (ultra suave)
      const eased = 1 - Math.pow(1 - progress, 4);

      setValue(Math.floor(eased * target));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, inView]);

  return value;
}

// 🔥 Item PRO
function StatItem({ value, label }: { value: string; label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const numericValue = parseInt(value.replace(/\D/g, "") || "0");
  const suffix = value.replace(/[0-9]/g, "");

  const count = useCountUp(numericValue, inView);

  // 🔥 micro parallax
  const y = useSpring(0, { stiffness: 80, damping: 20 });

  useEffect(() => {
    if (!inView) return;
    y.set(-10);
    setTimeout(() => y.set(0), 300);
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* 🔥 Glow dinámico */}
      <div className="absolute inset-0 blur-2xl opacity-30 bg-amber-400 rounded-full scale-75 pointer-events-none" />

      {/* 🔥 Número */}
      <motion.div
        className="relative text-4xl md:text-5xl font-bold text-amber-400 mb-2"
        animate={
          inView && count === numericValue
            ? { scale: [1, 1.1, 1] } // 💥 pulso final
            : {}
        }
        transition={{ duration: 0.4 }}
      >
        {count}
        {suffix}
      </motion.div>

      {/* 🔥 Label */}
      <div className="text-gray-400 tracking-wide">
        {label}
      </div>
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

      {/* 🔥 fondo sutil tipo Apple */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,180,0,0.08),transparent_70%)] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">

        {stats.map((item, i) => (
          <StatItem key={i} value={item.value} label={item.label} />
        ))}

      </div>
    </section>
  );
}