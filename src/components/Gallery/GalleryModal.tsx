import { motion, AnimatePresence } from 'framer-motion';

interface GalleryModalProps {
  open: boolean;
  onClose: () => void;

  image: string;
  caption: string;
  platform: string;
}

export function GalleryModal({
  open,
  onClose,
  image,
  caption,
  platform,
}: GalleryModalProps) {
  return (
    <AnimatePresence>

      {open && (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}

          onClick={onClose}

          className="
            fixed
            inset-0
            z-[99999]

            flex
            items-center
            justify-center

            bg-black/80
            backdrop-blur-xl

            p-4
          "
        >

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.94,
              y: 20,
            }}

            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}

            exit={{
              opacity: 0,
              scale: 0.96,
              y: 10,
            }}

            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}

            onClick={(e) => e.stopPropagation()}

            className="
              relative
              overflow-hidden

              rounded-3xl

              border
              border-white/10

              bg-[#050505]

              shadow-[0_0_80px_rgba(214,164,92,0.12)]

              max-w-5xl
              w-full
            "
          >

            {/* Image */}
            <div className="relative">

              <img
                src={image}
                alt={caption}
                className="
                  max-h-[78vh]
                  w-full
                  object-cover
                "
              />

              {/* Overlay */}
              <div
                className="
                  absolute
                  inset-0

                  bg-gradient-to-t
                  from-black/90
                  via-transparent
                  to-transparent
                "
              />

            </div>

            {/* Content */}
            <div
              className="
                absolute
                bottom-0
                left-0
                right-0

                space-y-4

                p-6
                md:p-8
              "
            >

              <span
                className="
                  inline-flex
                  rounded-full

                  border
                  border-primary/20

                  bg-primary/10

                  px-3
                  py-1

                  text-xs
                  uppercase
                  tracking-[0.18em]

                  text-primary
                "
              >
                {platform}
              </span>

              <p
                className="
                  max-w-3xl
                  text-sm
                  leading-relaxed
                  text-white/85

                  md:text-base
                "
              >
                {caption}
              </p>

            </div>

          </motion.div>

        </motion.div>
      )}

    </AnimatePresence>
  );
}