
'use client';

import type { Product } from '@/lib/types';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  // These shapes can still have some subtle parallax based on their own container's scroll if desired,
  // but the main scrollYProgress for product cycling will come from the parent.
  return (
    <div className="absolute inset-0 z-0 overflow-hidden opacity-50 dark:opacity-30">
      <motion.div
        className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%]"
        initial={{ y: 0 }}
        animate={{ y: ['0%', '5%', '0%'] }}
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
        initial={{ y: 0 }}
        animate={{ y: ['0%', '-7%', '0%'] }}
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
    target: showcaseRootRef, // Target this component's main div for scroll progress
    offset: ['start start', 'end end'], // Progress from component top at viewport top, to component bottom at viewport bottom
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      // Ensure 'latest' is between 0 and 1.
      const clampedLatest = Math.max(0, Math.min(1, latest));
      let newIndex = Math.floor(clampedLatest * products.length);
      // If scrollYProgress is exactly 1, it means we've scrolled to the end.
      // Math.floor(1 * products.length) would be products.length, which is out of bounds.
      // So, cap it at products.length - 1.
      if (newIndex >= products.length) {
        newIndex = products.length - 1;
      }
      setActiveIndex(newIndex);
    });
  }, [scrollYProgress, products.length]);
  

  const currentProduct = products[activeIndex];

  const imageVariants = {
    enter: { opacity: 0, scale: 0.95, y: 10 },
    center: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.3, ease: "easeIn" } },
  };

  const cardVariants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 30 : -30, // Slide from further
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "circOut" },
    },
    exit: (direction: number) => ({
      y: direction < 0 ? 30 : -30,
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.3, ease: "circIn" },
    }),
  };
  
  const [prevIndex, setPrevIndex] = useState(activeIndex);
  useEffect(() => {
    setPrevIndex(activeIndex);
  }, [activeIndex]);
  const direction = activeIndex > prevIndex ? 1 : -1;

  // Each product slide gets 100vh of scroll duration.
  // Navbar height is assumed to be 4rem (16 in tailwind units, or 64px).
  // The sticky content area will occupy calc(100vh - 4rem).
  const scrollDurationPerProductVh = 100; 
  const showcaseHeight = products.length > 0 ? `${products.length * scrollDurationPerProductVh}vh` : '0px';


  return (
    <div
      ref={showcaseRootRef}
      className="relative bg-background" // Removed dark:bg-neutral-900/30 from here
      style={{ height: showcaseHeight }}
    >
      {products.length > 0 && (
        // This inner div is sticky, holding the content that changes
        <div className="sticky top-16 h-[calc(100vh-4rem)] flex flex-col md:flex-row items-center overflow-hidden bg-background dark:bg-neutral-900/30">
          {/* Left Column: Image and SVG Background */}
          <div className="relative w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-8 md:p-12 lg:p-16 overflow-hidden">
            <SvgBackgroundShapes />
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={currentProduct?.id || 'placeholder-image'}
                className="relative z-10 w-full max-w-md aspect-[3/4] shadow-2xl rounded-xl overflow-hidden"
                variants={imageVariants}
                initial="enter"
                animate="center"
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

          {/* Right Column: Product Card Slider */}
          <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-4 md:p-8 overflow-hidden">
            <div className="w-full max-w-md relative h-[350px] md:h-[400px]">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                {currentProduct && (
                  <motion.div
                    key={currentProduct.id}
                    custom={direction}
                    variants={cardVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute w-full"
                  >
                    <Card className="shadow-xl hover:shadow-2xl rounded-xl w-full border-primary ring-2 ring-primary bg-card transition-shadow duration-300">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-2xl md:text-3xl font-headline text-primary">
                          {currentProduct.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm md:text-base text-muted-foreground mb-4 line-clamp-3 min-h-[3.75rem] md:min-h-[4.5rem]"> {/* Fixed height for tagline area */}
                          {currentProduct.tagline}
                        </p>
                        <Button variant="outline" size="sm" asChild className="group">
                          <Link href={`/products/${currentProduct.slug}`}>
                            Learn More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

