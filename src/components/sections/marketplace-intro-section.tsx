
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/layout/section-header';
import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } },
};

export default function MarketplaceIntroSection() {
  return (
    <motion.section
      className="h-screen bg-card relative z-20 flex flex-col justify-center" // Updated: h-screen, bg-card, flex for centering
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24"> {/* Padding retained on inner container */}
        <SectionHeader
          title="A Hub of Digital Excellence"
          subtitle="Praszo is your one-stop marketplace for a diverse range of cutting-edge digital products and expert services. We empower your business to thrive in the digital age."
          titleClassName="text-primary"
          textAlignment="center"
        />
        <div className="mt-8 text-center">
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-10 text-balance">
            From our flagship 'Practice' project management tool to bespoke web development and strategic digital marketing, our platform connects you with the solutions designed for growth and efficiency. Explore what Praszo has to offer.
          </p>
          <Button size="lg" asChild>
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
