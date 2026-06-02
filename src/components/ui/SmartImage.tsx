import { useState } from 'react';

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function SmartImage({
  src,
  alt,
  className = '',
}: SmartImageProps) {

  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative overflow-hidden">

      {/* Skeleton */}
      <div
        className={`
          absolute
          inset-0

          animate-pulse

          bg-white/[0.04]
          backdrop-blur-xl

          transition-opacity
          duration-700

          ${loaded ? 'opacity-0' : 'opacity-100'}
        `}
      />

      <img
        src={src}
        alt={alt}
        loading="lazy"

        onLoad={() => setLoaded(true)}

        className={`
          transition-all
          duration-700

          ${loaded
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-[1.02]'
          }

          ${className}
        `}
      />

    </div>
  );
}