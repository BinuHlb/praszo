
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import SectionHeader from '@/components/layout/section-header';
import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } },
};

export default function MarketplaceIntroSection() {
  return (
    <motion.section
      className="h-screen bg-card z-20 flex flex-col justify-center" // Ensured sticky, top-0, h-screen, z-20
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <SectionHeader
          title="A Hub of Digital Excellence"
          subtitle="Praszo is your one-stop marketplace for a diverse range of cutting-edge digital products and expert services. We empower your business to thrive in the digital age."
          titleClassName="text-primary text-4xl sm:text-5xl md:text-6xl lg:text-5xl"
          subtitleClassName="text-lg sm:text-xl md:text-xl text-foreground/80"
          textAlignment="center"
        />
        
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-1 text-primary mb-2">
            <Star className="h-6 w-6 fill-primary" />
            <Star className="h-6 w-6 fill-primary" />
            <Star className="h-6 w-6 fill-primary" />
            <Star className="h-6 w-6 fill-primary" />
            <Star className="h-6 w-6 fill-primary" />
          </div>
          <p className="text-sm text-muted-foreground mt-1 mb-6">
            Trusted by 1,000+ businesses for unparalleled quality and innovation.
          </p>

          <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto mb-8 text-balance">
            From our flagship <Link href="/products/practice" className="font-medium text-primary hover:underline">Practice project management tool</Link> to bespoke <Link href="/products/web-development" className="font-medium text-primary hover:underline">web development</Link> and strategic <Link href="/products/digital-marketing" className="font-medium text-primary hover:underline">digital marketing</Link>, our platform connects you with the solutions designed for growth and efficiency. Explore what Praszo has to offer.
          </p>
          <Button size="lg" asChild className="text-lg py-6 px-8">
            <Link href="/about">
              <span className="flex items-center">
                Discover Praszo <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </motion.section>
  );
}
