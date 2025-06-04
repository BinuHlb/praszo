
'use client';

import type React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  textAlignment?: 'left' | 'center' | 'right';
  children?: React.ReactNode; // For optional CTAs or other elements alongside text
}

export default function SectionHeader({
  title,
  subtitle,
  className,
  titleClassName,
  subtitleClassName,
  textAlignment = 'center',
  children,
}: SectionHeaderProps) {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className={cn("mb-12 flex flex-col", alignmentClasses[textAlignment], className)}
    >
      <h2 className={cn("text-3xl md:text-4xl font-bold font-headline mb-4", titleClassName)}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn("text-lg text-muted-foreground max-w-2xl text-balance",
          textAlignment === 'center' && 'mx-auto',
          textAlignment === 'left' && 'mr-auto md:max-w-none',
          textAlignment === 'right' && 'ml-auto md:max-w-none',
          subtitleClassName
        )}>
          {subtitle}
        </p>
      )}
      {children && <div className={cn("mt-6", textAlignment === 'center' && 'mx-auto')}>{children}</div>}
    </motion.div>
  );
}
