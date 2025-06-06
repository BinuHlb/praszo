
'use client';

import type { Product } from '@/lib/types';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  const { scrollYProgress } = useScroll(); // Use a default scrollYProgress or pass one if needed for more specific control

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
            <radialGradient id="gradShape1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="hsla(var(--primary), 0.2)" />
              <stop offset="100%" stopColor="hsla(var(--primary), 0)" />
            </radialGradient>
            <filter id="blurShape1">
              <feGaussianBlur stdDeviation="40" />
            </filter>
          </defs>
          <circle cx="250" cy="250" r="200" fill="url(#gradShape1)" filter="url(#blurShape1)" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute -bottom-1/4 -right-1/4 w-full h-full"
        style={{ y: fastParallax }}
      >
        <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="gradShape2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsla(var(--accent), 0.25)" />
              <stop offset="100%" stopColor="hsla(var(--accent), 0.05)" />
            </linearGradient>
          </defs>
          <rect x="50" y="50" width="200" height="200" rx="50" fill="url(#gradShape2)" transform="rotate(30 150 150)" />
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
    offset: ['start start', 'end end'], // Animate throughout the container's scroll
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const newIndex = Math.min(products.length - 1, Math.floor(latest * products.length));
      setActiveIndex(newIndex);
    });
  }, [scrollYProgress, products.length]);

  const cardHeightEstimate = 300; // Estimate or measure actual card height for more precision
  const contentY = useTransform(scrollYProgress, latest => {
    // This transformation attempts to keep the active card somewhat centered.
    // It's a common pattern but might need fine-tuning based on card height and viewport.
    const targetY = -(activeIndex * cardHeightEstimate) + (window.innerHeight / 2) - (cardHeightEstimate / 2);
    return `${targetY}px`;
  });


  return (
    <div className="h-full relative"> {/* This component is already inside a tall wrapper from page.tsx */}
      <div className="sticky top-16 h-[calc(100vh-4rem)] flex flex-col md:flex-row items-center overflow-hidden bg-background dark:bg-neutral-900/30">
        {/* Left Column: Image and SVG Background */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-8 md:p-12 lg:p-16 overflow-hidden">
          <SvgBackgroundShapes />
          <motion.div
            className="relative z-10 w-full max-w-md aspect-[3/4] shadow-2xl rounded-xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "circOut", delay: 0.2 }}
          >
            <Image
              src={products[activeIndex]?.image || "https://placehold.co/600x800.png"}
              alt={products[activeIndex]?.name || "Product Image"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              data-ai-hint={products[activeIndex]?.dataAiHint || "product image"}
              key={products[activeIndex]?.id} // Add key to force re-render on image change
            />
          </motion.div>
        </div>

        {/* Right Column: Product Vertical Carousel */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-4 md:p-8 overflow-hidden">
          <motion.div className="w-full max-w-md space-y-6 md:space-y-8 relative" style={{ y: contentY }}>
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0.5, scale: 0.9 }}
                animate={{
                  opacity: index === activeIndex ? 1 : 0.6,
                  scale: index === activeIndex ? 1 : 0.92,
                  y: index === activeIndex ? 0 : (index < activeIndex ? -10 : 10),
                  transition: { duration: 0.4, ease: "easeInOut" }
                }}
                className={cn(
                  "transition-all duration-300 ease-in-out transform",
                  index === activeIndex ? "z-10" : "z-0"
                )}
              >
                <Card className={cn(
                  "shadow-lg hover:shadow-xl rounded-xl w-full",
                  index === activeIndex ? "border-primary ring-2 ring-primary bg-card" : "bg-card/70 border-transparent"
                )}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-2xl md:text-3xl font-headline text-primary">
                      {product.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm md:text-base text-muted-foreground mb-4 line-clamp-3">{product.tagline}</p>
                    <Button variant="outline" size="sm" asChild className="group">
                      <Link href={`/products/${product.slug}`}>
                        Learn More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
