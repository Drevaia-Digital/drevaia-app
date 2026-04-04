import { motion } from "framer-motion";

type Props = {
  id: string | number;
  title: string;
  cover: string;
  author?: string;
  price?: string | number;
  onClick?: () => void;
};

export function EbookCard({
  id,
  title,
  cover,
  author,
  price,
  onClick,
}: Props) {
  return (
    <motion.div
      layout
      layoutId={`ebook-${id}`}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{
        layout: {
          type: "spring",
          stiffness: 320,
          damping: 30,
        },
        default: {
          type: "spring",
          stiffness: 260,
          damping: 20,
        },
      }}
      className="group cursor-pointer outline-none"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Abrir ebook ${title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      style={{
        willChange: "transform",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-[#1a1a2e] shadow-md hover:shadow-xl transition-shadow duration-300">

        {/* IMAGEN */}
        <div className="aspect-[3/4] overflow-hidden">
          <motion.img
            layoutId={`ebook-image-${id}`}
            src={cover}
            alt={title}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* CONTENIDO */}
        <div className="p-3 space-y-1">
          <motion.h3
            layoutId={`ebook-title-${id}`}
            className="text-sm font-semibold text-white line-clamp-2"
          >
            {title}
          </motion.h3>

          {author && (
            <p className="text-xs text-gray-400">{author}</p>
          )}

          {price && (
            <p className="text-xs text-indigo-400 font-medium">
              ${price}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}