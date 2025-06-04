
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-background to-secondary overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tight text-balance">
            Elevate Your Business with <span className="text-primary">Praszo</span> Solutions
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground text-balance">
            We craft innovative digital experiences and powerful software to propel your brand forward. Discover the Apex advantage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link href="/contact">
                <span className="flex items-center">
                  Start Your Project <ChevronRight className="ml-2 h-5 w-5" />
                </span>
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/products/practice">
                Explore Practice
              </Link>
            </Button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="rounded-xl overflow-hidden"
        >
          <Image
            src="/assets/images/hero-banner.png"
            alt="Modern digital solutions and teamwork"
            width={600}
            height={450}
            className="rounded-xl object-cover w-full h-auto"
            data-ai-hint="business team collaboration"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
