
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
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}

const SvgBackgroundShapes = () => {
  const { scrollYProgress } = useScroll(); 

  const slowParallax = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const fastParallax = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden opacity-50 dark:opacity-30">
      <motion.div
        className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%]"
        style={{ y: slowParallax }}
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
        style={{ y: fastParallax }}
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

       <motion.div
        className="absolute top-1/2 left-1/4 w-24 h-24 bg-secondary/20 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, transition: { delay: 0.5, duration: 0.8 } }}
        style={{ x: useTransform(scrollYProgress, [0,1], ['-50px', '50px']), y: useTransform(scrollYProgress, [0,1], ['20px', '-20px']) }}
      />
       <motion.div
        className="absolute top-1/4 right-1/4 w-16 h-16 border-2 border-primary/30 rounded-xl"
        initial={{ rotate: -45, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1, transition: { delay: 0.7, duration: 0.8 } }}
        style={{ x: useTransform(scrollYProgress, [0,1], ['30px', '-30px']), y: useTransform(scrollYProgress, [0,1], ['-40px', '40px']) }}
      />
    </div>
  );
};


export default function InteractiveProductShowcase({ products, scrollContainerRef }: InteractiveProductShowcaseProps) {
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ['start start', 'end end'],
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const newIndex = Math.min(products.length - 1, Math.floor(latest * products.length));
      setActiveIndex(newIndex);
    });
  }, [scrollYProgress, products.length]);

  const currentProduct = products[activeIndex];

  const imageVariants = {
    enter: { opacity: 0, scale: 0.95 },
    center: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3, ease: "easeIn" } },
  };

  const cardVariants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "circOut" },
    },
    exit: (direction: number) => ({
      y: direction < 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.3, ease: "circIn" },
    }),
  };
  
  const [prevIndex, setPrevIndex] = useState(activeIndex);
  useEffect(() => {
    setPrevIndex(activeIndex);
  }, [activeIndex]);
  const direction = activeIndex > prevIndex ? 1 : -1;


  return (
    <div className="h-full relative">
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
                priority={activeIndex === 0} // Prioritize loading the first image
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                data-ai-hint={currentProduct?.dataAiHint || "product image"}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: Product Card Slider */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-4 md:p-8 overflow-hidden">
          <div className="w-full max-w-md relative h-[350px] md:h-[400px]"> {/* Set a fixed height for AnimatePresence container */}
            <AnimatePresence initial={false} custom={direction} mode="wait">
              {currentProduct && (
                <motion.div
                  key={currentProduct.id}
                  custom={direction}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute w-full" // Position cards absolutely for transition
                >
                  <Card className="shadow-xl hover:shadow-2xl rounded-xl w-full border-primary ring-2 ring-primary bg-card transition-shadow duration-300">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-2xl md:text-3xl font-headline text-primary">
                        {currentProduct.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm md:text-base text-muted-foreground mb-4 line-clamp-3 h-12 md:h-16"> {/* Fixed height for tagline */}
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
    </div>
  );
}
