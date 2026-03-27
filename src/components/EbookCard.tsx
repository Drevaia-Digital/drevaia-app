import { motion } from "framer-motion";

type Props = {
  title: string;
  cover: string;
  author?: string;
  price?: string | number;
  onClick?: () => void;
};

export function EbookCard({ title, cover, author, price, onClick }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-2xl bg-[#1a1a2e] shadow-md hover:shadow-xl transition-all duration-300">

        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={cover}
            alt={title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        <div className="p-3 space-y-1">
          <h3 className="text-sm font-semibold text-white line-clamp-2">
            {title}
          </h3>

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