import Link from 'next/link';
import { Button } from '@/components/ui/button';
import AnimatedBorderBox from '@/components/ui/animated-border-box';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-background to-secondary">
      <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 animate-slide-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tight text-balance">
            Elevate Your Business with <span className="text-primary">Apex Digital</span> Solutions
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground text-balance">
            We craft innovative digital experiences and powerful software to propel your brand forward. Discover the Apex advantage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link href="/contact">
                Start Your Project <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/products/project-management-app">Explore NexusFlow PM</Link>
            </Button>
          </div>
        </div>
        <div className="animate-fade-in">
          <AnimatedBorderBox borderRadius="rounded-xl">
            <Image
              src="https://placehold.co/600x450.png"
              alt="Digital Agency Concept"
              width={600}
              height={450}
              className="rounded-xl object-cover" /* Matched border radius */
              data-ai-hint="team collaboration"
              priority
            />
          </AnimatedBorderBox>
        </div>
      </div>
    </section>
  );
}
