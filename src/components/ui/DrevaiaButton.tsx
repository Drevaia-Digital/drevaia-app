import type { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface DrevaiaButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export function DrevaiaButton({
  children,
  className,
  variant = 'primary',
  ...props
}: DrevaiaButtonProps) {
  return (
    <button
      className={clsx(

        // Base
        `
          relative
          overflow-hidden
          rounded-full

          px-6
          py-3

          text-sm
          font-medium

          transition-all
          duration-300

          active:scale-[0.98]
        `,

        // Primary
        variant === 'primary' &&
          `
            border
            border-primary/20

            bg-primary
            text-black

            shadow-[0_0_40px_rgba(214,164,92,0.18)]

            hover:scale-[1.03]
            hover:shadow-[0_0_70px_rgba(214,164,92,0.28)]
          `,

        // Secondary
        variant === 'secondary' &&
          `
            border
            border-white/10

            bg-white/5
            text-white

            backdrop-blur-xl

            hover:bg-white/10
          `,

        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}