import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

import { PageTransition } from '@/components/motion/PageTransition';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({
  children,
}: MainLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">

      {/* 🌌 Ambient Background */}
      <div className="pointer-events-none absolute inset-0">

        {/* Cinematic Gradient */}
        <div className="drevaia-gradient absolute inset-0" />

        {/* Glow Top */}
        <div
          className="
            absolute
            left-1/2
            top-[-200px]
            h-[500px]
            w-[500px]
            -translate-x-1/2
            rounded-full
            bg-primary/10
            blur-3xl
          "
        />

        {/* Glow Bottom */}
        <div
          className="
            absolute
            bottom-[-250px]
            right-[-100px]
            h-[400px]
            w-[400px]
            rounded-full
            bg-primary/5
            blur-3xl
          "
        />

      </div>

      {/* 🌟 Main Content */}
      <motion.main
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10"
      >

        <PageTransition>
          {children}
        </PageTransition>

      </motion.main>

    </div>
  );
}
