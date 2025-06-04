import { getProductBySlug } from '@/data/mock-data';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import TestimonialCard from '@/components/shared/testimonial-card';
import CaseStudyCard from '@/components/shared/case-study-card';
import InteractiveDemoPlaceholder from '@/components/sections/interactive-demo-placeholder';
import AnimatedBorderBox from '@/components/ui/animated-border-box';

interface ProductPageProps {
  params: { productId: string };
}

export async function generateStaticParams() {
  // In a real app, fetch slugs from a CMS or database
  const { products } = await import('@/data/mock-data');
  return products.filter(p => p.type === 'service').map((product) => ({
    productId: product.slug,
  }));
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.productId);

  if (!product) {
    return <div className="container mx-auto py-12 px-4 md:px-6 text-center">Product or Service not found.</div>;
  }

  return (
    <>
      <section className="py-20 md:py-28 bg-gradient-to-br from-secondary to-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-up">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">{product.type === 'app' ? 'Application' : 'Service'}</span>
              <h1 className="text-4xl md:text-5xl font-bold font-headline">{product.name}</h1>
              <p className="text-lg md:text-xl text-muted-foreground text-balance">{product.tagline}</p>
              <Button size="lg" asChild>
                <Link href={`/contact?product=${encodeURIComponent(product.name)}`}>
                  Inquire About {product.name}
                </Link>
              </Button>
            </div>
            <div className="animate-fade-in">
               <AnimatedBorderBox borderRadius="rounded-xl">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={600}
                  height={400}
                  className="rounded-lg object-cover shadow-xl"
                  data-ai-hint={product.dataAiHint}
                />
              </AnimatedBorderBox>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto space-y-6 mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-center text-primary">Detailed Overview</h2>
            <p className="text-lg text-muted-foreground text-center text-balance">{product.longDescription}</p>
          </div>

          {product.features && product.features.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl md:text-3xl font-bold font-headline text-center mb-10">Key Features & Benefits</h3>
              <div className="grid sm:grid-cols-2 gap-8">
                {product.features.map((feature, index) => (
                  <div key={feature.title} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s`}}>
                    <Card className="h-full shadow-lg hover:shadow-xl transition-shadow">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                           {feature.icon ? <feature.icon className="h-7 w-7 text-accent" /> : <CheckCircle className="h-7 w-7 text-accent" /> }
                          <CardTitle className="text-xl font-headline">{feature.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          )}

          {product.interactiveDemo && (
            <section id="demo" className="mb-16">
              <h3 className="text-2xl md:text-3xl font-bold font-headline text-center mb-10">Interactive Experience</h3>
              <div className="max-w-3xl mx-auto animate-fade-in">
                <InteractiveDemoPlaceholder 
                  title={product.interactiveDemo.title}
                  description={product.interactiveDemo.description}
                  imageUrl={product.interactiveDemo.imageUrl}
                  dataAiHint={product.interactiveDemo.dataAiHint}
                  link={product.interactiveDemo.link}
                />
              </div>
            </section>
          )}

          {product.caseStudies && product.caseStudies.length > 0 && (
            <section className="mb-16">
              <h3 className="text-2xl md:text-3xl font-bold font-headline text-center mb-10">Success Stories</h3>
              <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
                {product.caseStudies.map((study, index) => (
                  <div key={study.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s`}}>
                     <CaseStudyCard caseStudy={study} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {product.testimonials && product.testimonials.length > 0 && (
            <section>
              <h3 className="text-2xl md:text-3xl font-bold font-headline text-center mb-10">Client Testimonials</h3>
              <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
                {product.testimonials.map((testimonial, index) => (
                  <div key={testimonial.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s`}}>
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>
    </>
  );
}
