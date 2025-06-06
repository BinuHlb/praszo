
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
      y: 20, // Slightly more slide
      scale: 0.98, // Slight scale up on enter
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5, // Slightly smoother
        ease: [0.42, 0, 0.58, 1], // A common ease-in-out curve
      },
    },
    exit: {
      opacity: 0,
      y: -20, // Slightly more slide out
      scale: 0.98, // Slight scale down on exit
      transition: {
        duration: 0.4, // Slightly smoother exit
        ease: [0.42, 0, 0.58, 1],
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
