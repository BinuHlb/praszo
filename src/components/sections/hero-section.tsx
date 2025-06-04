
import Link from 'next/link';
import { Button } from '@/components/ui/button';
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
              <Link href="/contact" legacyBehavior passHref>
                <a>
                  <span className="flex items-center">
                    Start Your Project <ChevronRight className="ml-2 h-5 w-5" />
                  </span>
                </a>
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/practice" legacyBehavior passHref>
                <a>Explore Practice</a>
              </Link>
            </Button>
          </div>
        </div>
        <div className="animate-fade-in rounded-xl shadow-lg border overflow-hidden">
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            alt="AI-generated concept for digital innovation"
            width={600}
            height={450}
            className="rounded-xl object-cover w-full h-auto"
            data-ai-hint="digital innovation abstract"
            priority
          />
        </div>
      </div>
    </section>
  );
}
