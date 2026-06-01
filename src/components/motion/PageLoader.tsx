import { motion } from 'framer-motion';

export function PageLoader() {
  return (
    <div className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">

      {/* Ambient Glow */}
      <div
        className="
          absolute
          h-64
          w-64
          rounded-full
          bg-primary/10
          blur-3xl
        "
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 flex flex-col items-center gap-6"
      >

        {/* Loader Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 2.4,
            ease: 'linear',
          }}
          className="
            h-14
            w-14
            rounded-full
            border
            border-primary/20
            border-t-primary
          "
        />

        {/* Text */}
        <div className="space-y-2 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-primary/70">
            Drevaia
          </p>

          <p className="text-xs text-muted-foreground">
            Preparing cinematic experience...
          </p>
        </div>

      </motion.div>
    </div>
  );
}