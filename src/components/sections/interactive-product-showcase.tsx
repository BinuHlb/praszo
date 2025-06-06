
'use client';

import type { Product } from '@/lib/types';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface InteractiveProductShowcaseProps {
  products: Product[];
}

const SCROLL_DURATION_PER_PRODUCT_VH = 120; 

const SvgBackgroundShapes = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden opacity-50 dark:opacity-30">
      <motion.div
        className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%]"
        animate={{ y: ['0%', '5%', '0%'], x: ['0%', '-3%', '0%'], rotate: [0, 2, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <radialGradient id="gradShape1Interactive" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="hsla(var(--primary), 0.2)" />
              <stop offset="100%" stopColor="hsla(var(--primary), 0)" />
            </radialGradient>
            <filter id="blurShape1Interactive">
              <feGaussianBlur stdDeviation="40" />
            </filter>
          </defs>
          <circle cx="250" cy="250" r="200" fill="url(#gradShape1Interactive)" filter="url(#blurShape1Interactive)" />
        </svg>
      </motion.div>
      <motion.div
        className="absolute -bottom-1/4 -right-1/4 w-full h-full"
        animate={{ y: ['0%', '-7%', '0%'], x: ['0%', '4%', '0%'], rotate: [0, -3, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="gradShape2Interactive" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsla(var(--accent), 0.25)" />
              <stop offset="100%" stopColor="hsla(var(--accent), 0.05)" />
            </linearGradient>
          </defs>
          <rect x="50" y="50" width="200" height="200" rx="50" fill="url(#gradShape2Interactive)" transform="rotate(30 150 150)" />
        </svg>
      </motion.div>
    </div>
  );
};

export default function InteractiveProductShowcase({ products }: InteractiveProductShowcaseProps) {
  const showcaseRootRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: showcaseRootRef,
    offset: ['start start', 'end end'], // Scroll progress from when top of showcaseRoot hits top of viewport to when bottom hits bottom
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const numProducts = products.length;
      if (numProducts === 0) {
        setActiveIndex(0);
        return;
      }
      // Ensure index is always within bounds [0, numProducts - 1]
      // latest can sometimes slightly exceed 1 due to scroll momentum, or be slightly less than 0
      const rawIndex = latest * numProducts;
      const newIndex = Math.max(0, Math.min(numProducts - 1, Math.floor(rawIndex)));
      
      // Handle the very end of the scroll to ensure the last item remains active
      if (latest >= 1.0) {
        setActiveIndex(numProducts - 1);
      } else {
        setActiveIndex(newIndex);
      }
    });
  }, [scrollYProgress, products.length]);

  const currentProduct = products[activeIndex];
  const showcaseHeight = products.length > 0 ? `${products.length * SCROLL_DURATION_PER_PRODUCT_VH}vh` : '0px';

  const imageVariants = {
    initial: { opacity: 0, scale: 0.92, y: 15 }, // Start slightly smaller, lower, and faded
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { duration: 0.7, ease: [0.42, 0, 0.58, 1] } // Smoother custom cubic-bezier ease, longer duration
    },
    exit: { 
      opacity: 0, 
      scale: 0.92, 
      y: -15, // Exit slightly smaller, higher, and faded
      transition: { duration: 0.5, ease: [0.42, 0, 0.58, 1] } // Consistent easing, slightly shorter exit
    },
  };

  const contentVariants = {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "circOut" } },
    exit: { opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.4, ease: "circIn" } },
  };


  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div
      ref={showcaseRootRef}
      className="relative bg-background z-[5]"
      style={{ height: showcaseHeight }}
    >
      {/* This div is sticky within the tall showcaseRootRef */}
      <div className="sticky top-16 h-[calc(100vh-4rem)] flex flex-col md:flex-row items-center overflow-hidden bg-background dark:bg-neutral-900/30 z-30">
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-8 md:p-12 lg:p-16 overflow-hidden">
          <SvgBackgroundShapes />
          <AnimatePresence initial={false}>
            <motion.div
              key={currentProduct?.id || 'placeholder-image'}
              className="relative z-10 w-full max-w-md aspect-[3/4] shadow-2xl rounded-xl overflow-hidden"
              variants={imageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Image
                src={currentProduct?.image || "https://placehold.co/600x800.png"}
                alt={currentProduct?.name || "Product Image"}
                fill
                priority={activeIndex === 0}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                data-ai-hint={currentProduct?.dataAiHint || "product image"}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-4 md:p-8 overflow-hidden">
          <div className="w-full max-w-md relative flex flex-col justify-center text-center md:text-left">
            <AnimatePresence initial={false}>
              {currentProduct && (
                <motion.div
                  key={currentProduct.id}
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute w-full" 
                >
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline font-bold text-primary mb-3 md:mb-4 text-balance">
                    {currentProduct.name}
                  </h2>
                  <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 min-h-[4.5rem] md:min-h-[5.25rem] text-balance line-clamp-3">
                    {currentProduct.tagline}
                  </p>
                  <Button variant="link" size="lg" asChild className="group text-lg text-primary hover:text-primary/80 px-0">
                    <Link href={`/products/${currentProduct.slug}`}>
                      Learn More <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
