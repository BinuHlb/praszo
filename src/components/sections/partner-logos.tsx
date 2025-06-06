
'use client';

import React from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeader from '@/components/layout/section-header';
import { motion } from 'framer-motion';

const partnerLogosList = [
  { src: 'https://picsum.photos/seed/partner1/100/80', alt: 'Partner Logo 1', dataAiHint: 'company logo' },
  { src: 'https://picsum.photos/seed/partner2/100/80', alt: 'Partner Logo 2', dataAiHint: 'company logo' },
  { src: 'https://picsum.photos/seed/partner3/100/80', alt: 'Partner Logo 3', dataAiHint: 'company logo' },
  { src: 'https://picsum.photos/seed/partner4/100/80', alt: 'Partner Logo 4', dataAiHint: 'company logo' },
  { src: 'https://picsum.photos/seed/partner5/100/80', alt: 'Partner Logo 5', dataAiHint: 'company logo' },
  { src: 'https://picsum.photos/seed/partner6/100/80', alt: 'Partner Logo 6', dataAiHint: 'company logo' },
  { src: 'https://picsum.photos/seed/partner7/100/80', alt: 'Partner Logo 7', dataAiHint: 'company logo' },
  { src: 'https://picsum.photos/seed/partner8/100/80', alt: 'Partner Logo 8', dataAiHint: 'company logo' },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } },
};

export default function PartnerLogos() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 'auto',
  });

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <motion.section
      className="py-12 md:py-20 bg-secondary"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          title="Trusted By Leading Companies"
          titleClassName="text-primary"
          className="mb-10"
        />
        <div className="relative">
          <div className="overflow-hidden py-4" ref={emblaRef}>
            <div className="flex -ml-4">
              {partnerLogosList.map((logo, index) => (
                <div
                  key={index}
                  className="relative flex-[0_0_auto] min-w-0 pl-4 basis-1/4 sm:basis-1/8"
                >
                  <div className="flex items-center justify-center h-[100px] p-3 rounded-lg duration-300 ease-in-out transform hover:scale-105">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={100}
                      height={80}
                      className="object-contain max-h-full max-w-full"
                      data-ai-hint={logo.dataAiHint}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 transform -translate-x-4 md:-translate-x-6 z-10 rounded-full bg-card hover:bg-muted hidden sm:flex"
            onClick={scrollPrev}
            aria-label="Previous partner logos"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 transform translate-x-4 md:translate-x-6 z-10 rounded-full bg-card hover:bg-muted hidden sm:flex"
            onClick={scrollNext}
            aria-label="Next partner logos"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </motion.section>
  );
}
