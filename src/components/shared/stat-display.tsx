
'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, animate, Easing } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { LucideProps } from 'lucide-react'; // For icon type

interface StatDisplayProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  icon?: React.ComponentType<LucideProps>;
  className?: string;
  duration?: number;
  easing?: Easing | Easing[];
}

export default function StatDisplay({
  value,
  label,
  suffix = '',
  prefix = '',
  icon: Icon,
  className,
  duration = 1.5, // Duration of the count-up animation
  easing = 'easeOut', // Easing function for the animation
}: StatDisplayProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px 0px -50px 0px" }); // Trigger when 50px into view

  useEffect(() => {
    if (isInView && ref.current) {
      const node = ref.current;
      const controls = animate(0, value, {
        duration: duration,
        ease: easing,
        onUpdate(latest) {
          node.textContent = prefix + Math.round(latest).toLocaleString() + suffix;
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value, duration, easing, suffix, prefix]);

  return (
    <div className={cn("text-center p-6  transition-shadow duration-300", className)}>
      {Icon && (
        <div className="mb-4 flex justify-center">
          <Icon className="h-12 w-12 text-primary" />
        </div>
      )}
      <h3 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-2">
        {/* The span's content will be updated by the animation effect */}
        <span ref={ref}>{prefix}0{suffix}</span>
      </h3>
      <p className="text-base md:text-lg text-muted-foreground">{label}</p>
    </div>
  );
}
