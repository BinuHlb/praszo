
'use client';

import React from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const partnerLogosList = [
  { src: 'https://placehold.co/100x80.png', alt: 'Partner Logo 1', dataAiHint: 'company logo' },
  { src: 'https://placehold.co/100x80.png', alt: 'Partner Logo 2', dataAiHint: 'company logo' },
  { src: 'https://placehold.co/100x80.png', alt: 'Partner Logo 3', dataAiHint: 'company logo' },
  { src: 'https://placehold.co/100x80.png', alt: 'Partner Logo 4', dataAiHint: 'company logo' },
  { src: 'https://placehold.co/100x80.png', alt: 'Partner Logo 5', dataAiHint: 'company logo' },
  { src: 'https://placehold.co/100x80.png', alt: 'Partner Logo 6', dataAiHint: 'company logo' },
  { src: 'https://placehold.co/100x80.png', alt: 'Partner Logo 7', dataAiHint: 'company logo' },
  { src: 'https://placehold.co/100x80.png', alt: 'Partner Logo 8', dataAiHint: 'company logo' },
];

export default function PartnerLogos() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'start',
    slidesToScroll: 1,
  });

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="py-12 md:py-20 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold font-headline text-center mb-10 text-primary">
          Trusted By Leading Companies
        </h2>
        <div className="relative">
          <div className="overflow-hidden py-4" ref={emblaRef}>
            <div className="flex -ml-4"> {/* Embla container: negative margin for gap simulation */}
              {partnerLogosList.map((logo, index) => (
                <div 
                  key={index} 
                  className="relative flex-[0_0_auto] min-w-0 pl-4 md:pl-6" /* Embla slide: pl for gap */
                  style={{ flexBasis: 'calc(50% - 1rem)', md: {flexBasis: 'calc(25% - 1.5rem)'} }} /* Responsive number of items */
                >
                  <div className="flex items-center justify-center h-[100px] p-3 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105">
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
            className="absolute left-0 top-1/2 -translate-y-1/2 transform -translate-x-4 md:-translate-x-6 z-10 rounded-full bg-card hover:bg-muted hidden md:flex"
            onClick={scrollPrev}
            aria-label="Previous partner logos"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 transform translate-x-4 md:translate-x-6 z-10 rounded-full bg-card hover:bg-muted hidden md:flex"
            onClick={scrollNext}
            aria-label="Next partner logos"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
}
