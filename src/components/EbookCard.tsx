import { motion } from "framer-motion";
import { memo } from "react";

type Props = {
  id: string | number; // 🔥 IMPORTANTE
  title: string;
  cover: string;
  author?: string;
  price?: string | number;
  onClick?: () => void;
};

function EbookCardComponent({
  id,
  title,
  cover,
  author,
  price,
  onClick,
}: Props) {
  return (
    <motion.article
      layoutId={`ebook-${id}`} // 🔥 ahora sí correcto
      onClick={onClick}
      onMouseEnter={() => {
        const img = new Image();
        img.src = cover;
      }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="group w-full max-w-[220px] select-none transform-gpu cursor-pointer rounded-2xl bg-[#1a1a2e] shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
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
      {/* IMAGEN */}
      <div className="w-full aspect-[3/4] bg-gray-900">
        <img
          style={{ contentVisibility: "auto" }}
          src={cover}
          alt={title}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      {/* CONTENIDO */}
      <div className="p-3 flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2">
          {title}
        </h3>

        {author && (
          <p className="text-xs text-gray-400 line-clamp-1">
            {author}
          </p>
        )}

        {price && (
          <p className="text-xs text-indigo-400 font-medium mt-1">
            ${price}
          </p>
        )}
      </div>
    </motion.article>
  );
}

export const EbookCard = memo(EbookCardComponent);