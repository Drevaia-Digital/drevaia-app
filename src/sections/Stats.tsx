import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useScroll,
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

// 🔊 SONIDO
function useTickSound(trigger: boolean) {
  useEffect(() => {
    if (!trigger) return;

    const audio = new Audio(
      "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3"
    );

    audio.volume = 0.08;
    audio.play().catch(() => {});
  }, [trigger]);
}

// 💡 LUZ GLOBAL
function LightFollower() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const background = useTransform(
    [x, y],
    ([lx, ly]) =>
      `radial-gradient(500px at ${lx}px ${ly}px, rgba(255,180,0,0.08), transparent 70%)`
  );

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0"
      style={{ background }}
    />
  );
}

// ✨ PARTICULAS SUAVES
function Particles() {
  const particles = Array.from({ length: 8 });

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-amber-400/20 rounded-full"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            opacity: 0,
          }}
          animate={{
            y: ["0%", "-30%", "0%"],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}

// 🔥 ITEM CON TIMING REAL
function StatItem({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const numericValue = parseInt(value.replace(/\D/g, "") || "0");
  const suffix = value.replace(/[0-9]/g, "");

  const count = useCountUp(numericValue, inView);

  useTickSound(inView && count === numericValue);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMove = (e: any) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    x.set((e.clientX - rect.left - rect.width / 2) / 12);
    y.set((e.clientY - rect.top - rect.height / 2) / 12);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

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
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={
        inView
          ? {
              opacity: 1,
              y: 0,
              scale: 1,
            }
          : {}
      }
      transition={{
        duration: 0.6,
        delay, // 🔥 SECUENCIA REAL
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {/* glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300">
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
            ? { scale: [1, 1.12, 1] }
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
type Lang = "es" | "en" | "fr" | "pt";

const statsTranslations = {
  es: [
    { value: "10000+", label: "Lectores impactados" },
    { value: "24", label: "Ebooks creados" },
    { value: "4", label: "Idiomas disponibles" },
    { value: "98%", label: "Satisfacción" },
  ],
  en: [
    { value: "10000+", label: "Readers reached" },
    { value: "24", label: "Ebooks created" },
    { value: "4", label: "Languages available" },
    { value: "98%", label: "Satisfaction" },
  ],
  fr: [
    { value: "10000+", label: "Lecteurs touchés" },
    { value: "24", label: "Ebooks créés" },
    { value: "4", label: "Langues disponibles" },
    { value: "98%", label: "Satisfaction" },
  ],
  pt: [
    { value: "10000+", label: "Leitores impactados" },
    { value: "24", label: "Ebooks criados" },
    { value: "4", label: "Idiomas disponíveis" },
    { value: "98%", label: "Satisfação" },
  ],
};

// 🎬 COMPONENTE FINAL
export function Stats({ language = "es" }: { language?: Lang }) {
  const ref = useRef(null);
  const lang = (language || "es") as Lang;
  const stats = statsTranslations[lang] || statsTranslations.es;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 30%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <section
      ref={ref}
      className="py-32 bg-gradient-to-b from-[#0f0f1a] to-gray-900 text-white relative overflow-hidden"
    >
      <LightFollower />

      <motion.div
        style={{ opacity, y }}
        className="relative max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center"
      >
        <Particles />

        {stats.map((item, i) => (
          <StatItem
            key={i}
            value={item.value}
            label={item.label}
            delay={i * 0.15} // 🔥 ESCALONADO REAL
          />
        ))}
      </motion.div>

<div className="relative max-w-6xl mx-auto mt-14 px-6 flex justify-center">
  <button
    onClick={() =>
      window.scrollTo({
        top: 0,
        behavior: "auto",
      })
    }
    className="text-sm text-gray-400 hover:text-white transition flex items-center gap-2 tracking-wide"
  >
    ↑ Volver al inicio
  </button>
</div>

</section>
  );
}