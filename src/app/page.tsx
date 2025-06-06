
'use client'; // Required for framer-motion

import HeroSection from '@/components/sections/hero-section';
import ProductList from '@/components/sections/product-list';
import ServicesOverview from '@/components/sections/services-overview';
import InteractiveDemoPlaceholder from '@/components/sections/interactive-demo-placeholder';
import InteractiveQuestionnaire from '@/components/sections/interactive-questionnaire';
import PartnerLogos from '@/components/sections/partner-logos';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/layout/section-header';
import { getProductBySlug, products as allProducts } from '@/data/mock-data';
import { motion } from 'framer-motion';
import PageTransition from '@/components/layout/page-transition';
import InteractiveProductShowcase from '@/components/sections/interactive-product-showcase';
import MarketplaceIntroSection from '@/components/sections/marketplace-intro-section';
import React from 'react';

export default function HomePage() {
  const practiceProduct = getProductBySlug('practice');

  // Use all products for the showcase
  const showcaseProducts = allProducts;


  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } },
  };

  return (
    <>
      {/* Wrapper for Hero and Marketplace Intro to manage sticky hero unsticking */}
      <div className="relative">
        <HeroSection /> {/* HeroSection is sticky top-0 h-screen z-10 */}
        <MarketplaceIntroSection /> {/* MarketplaceIntro is relative z-20, scrolls over Hero */}
      </div>

      {showcaseProducts && showcaseProducts.length > 0 && (
        <InteractiveProductShowcase products={showcaseProducts} />
      )}

      <PageTransition>
        <>
          <ProductList />
          <ServicesOverview />
          <motion.section
            className="py-16 md:py-24 bg-background"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <div className="container mx-auto px-4 md:px-6">
              <SectionHeader
                title="Experience Our Solutions"
                subtitle="Dive deeper into how our flagship project management tool, Practice, can revolutionize your workflow."
              />
              <motion.div
                className="max-w-3xl mx-auto"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <InteractiveDemoPlaceholder
                  title="Practice: Visualize Your Success"
                  description="Get a hands-on feel for Practice's intuitive interface and powerful features. See how it simplifies complex project management tasks and boosts team productivity."
                  imageUrl="https://placehold.co/800x450.png"
                  dataAiHint="project dashboard"
                  link={practiceProduct?.interactiveDemo?.link}
                  videoUrl={practiceProduct?.interactiveDemo?.videoUrl}
                />
              </motion.div>
            </div>
          </motion.section>
          <InteractiveQuestionnaire />
          <PartnerLogos />
          <motion.section
            className="py-16 md:py-24 bg-primary text-primary-foreground"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <div className="container mx-auto px-4 md:px-6 text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6">Ready to Transform Your Business?</h2>
              <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-balance">
                Let's discuss how Praszo can help you achieve your goals.
              </p>
              <Button size="lg" variant="secondary" asChild className="text-primary hover:bg-background/90">
                <Link href="/contact">
                    <span className="flex items-center">
                      Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
                    </span>
                </Link>
              </Button>
            </div>
          </motion.section>
        </>
      </PageTransition>
    </>
  );
}
