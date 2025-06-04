
'use client';

import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const pathname = usePathname();

  const variants = {
    initial: {
      opacity: 0,
      y: 15, // Subtle slide
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4, // Quicker transition
        ease: [0.25, 0.1, 0.25, 1.0], // Bezier curve for smoother feel
      },
    },
    exit: {
      opacity: 0,
      y: -15, // Subtle slide out
      transition: {
        duration: 0.3, // Quicker exit
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname} // Keyed by pathname to trigger animation on route change
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex-grow flex flex-col" // Ensures the motion div expands and can layout children
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
