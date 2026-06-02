import { motion, AnimatePresence } from 'framer-motion';

interface RouteLoaderProps {
  loading: boolean;
}

export function RouteLoader({
  loading,
}: RouteLoaderProps) {
  return (
    <AnimatePresence>

      {loading && (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}

          className="
            pointer-events-none

            fixed
            inset-0
            z-[999999]

            flex
            items-center
            justify-center

            bg-black/30
            backdrop-blur-xl
          "
        >

          <motion.div
            animate={{
              opacity: [0.4, 1, 0.4],
              scale: [0.98, 1, 0.98],
            }}

            transition={{
              repeat: Infinity,
              duration: 2,
              ease: 'easeInOut',
            }}

            className="
              h-24
              w-24

              rounded-full

              border
              border-primary/20

              bg-primary/10

              shadow-[0_0_80px_rgba(214,164,92,0.18)]
            "
          />

        </motion.div>

      )}

    </AnimatePresence>
  );
}