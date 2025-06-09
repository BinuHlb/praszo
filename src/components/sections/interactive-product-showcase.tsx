
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
    offset: ['start start', 'end end'], // Triggers when showcaseRootRef top hits viewport top, ends when its bottom hits viewport bottom
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !products || products.length === 0) {
      setActiveIndex(0);
      return;
    }

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const numProducts = products.length;
      if (numProducts === 0) return;

      // Ensure progress doesn't go beyond 1, which can happen with some scroll setups.
      const progress = Math.max(0, Math.min(latest, 1));
      
      let newIndex = Math.floor(progress * numProducts);
      
      // Ensure newIndex is clamped to the last valid index, especially when progress is exactly 1.0
      newIndex = Math.min(newIndex, numProducts - 1);
      
      setActiveIndex(newIndex);
    });

    return () => unsubscribe();
  }, [scrollYProgress, products, isMounted]);


  const currentProduct = products[activeIndex];
  
  // Fixed height for the scroll track on desktop, e.g., 200vh.
  // This means the interaction will happen over the user scrolling this much of the placeholder.
  const showcaseDesktopHeight = '200vh';

  const imageVariants = {
    initial: { opacity: 0, scale: 0.92, y: 15 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { duration: 0.7, ease: [0.42, 0, 0.58, 1], delay: 0.05 } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.92, 
      y: -15, 
      transition: { duration: 0.5, ease: [0.42, 0, 0.58, 1] }
    },
  };
  
  const contentVariants = {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "circOut", delay: 0.15 } },
    exit: { opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.4, ease: "circIn" } },
  };


  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div
      ref={showcaseRootRef}
      className="relative bg-transparent z-[25]"
      style={{ height: isMounted ? showcaseDesktopHeight : '0px' }} // Use dynamic height on desktop
    >
      <div className="sticky top-16 h-[calc(100vh-4rem)] flex flex-col md:flex-row items-center overflow-hidden z-30 bg-background dark:bg-background">
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full  items-center justify-center p-8 md:p-12 lg:p-16 bg-primary overflow-hidden">
          <SvgBackgroundShapes />
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={currentProduct?.id || 'placeholder-image'}
              className="relative z-10 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg aspect-[3/4]  rounded-xl overflow-hidden "
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
                sizes="(max-width: 640px) 90vw, (max-width: 768px) 50vw, (max-width: 1024px) 40vw, 33vw"
                className="object-contain" // Changed from object-cover
                data-ai-hint={currentProduct?.dataAiHint || "product image"}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden">
          <div className="w-full max-w-md flex flex-col justify-center text-center md:text-left">
            <AnimatePresence initial={false} mode="wait">
              {currentProduct && (
                <motion.div
                  key={currentProduct.id}
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="w-full" 
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

