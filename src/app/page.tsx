import HeroSection from '@/components/sections/hero-section';
import ProductList from '@/components/sections/product-list';
import ServicesOverview from '@/components/sections/services-overview';
import InteractiveDemoPlaceholder from '@/components/sections/interactive-demo-placeholder';
import PartnerLogos from '@/components/sections/partner-logos';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/layout/section-header';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductList />
      <ServicesOverview />
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader 
            title="Experience Our Solutions"
            subtitle="Dive deeper into how our flagship project management tool can revolutionize your workflow."
          />
          <div className="max-w-3xl mx-auto animate-fade-in">
            <InteractiveDemoPlaceholder 
              title="NexusFlow PM: Visualize Your Success"
              description="Get a hands-on feel for NexusFlow PM's intuitive interface and powerful features. See how it simplifies complex project management tasks and boosts team productivity."
              imageUrl="https://placehold.co/800x450.png"
              dataAiHint="project dashboard"
              link="/project-management-app#demo"
            />
          </div>
        </div>
      </section>
      <PartnerLogos />
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6 text-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6">Ready to Transform Your Business?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-balance">
            Let's discuss how Apex Digital can help you achieve your goals.
          </p>
          <Button size="lg" variant="secondary" asChild className="text-primary hover:bg-background/90">
            <Link href="/contact">
              Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
