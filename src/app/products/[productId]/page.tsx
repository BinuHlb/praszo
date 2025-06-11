
import { getProductBySlug, products as allProductsData } from '@/data/mock-data';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import TestimonialCard from '@/components/shared/testimonial-card';
import CaseStudyCard from '@/components/shared/case-study-card';
import InteractiveDemoPlaceholder from '@/components/sections/interactive-demo-placeholder';
import SectionHeader from '@/components/layout/section-header';
import PageTransition from '@/components/layout/page-transition'; // Added

interface ProductPageProps {
  params: { productId: string };
}

export async function generateStaticParams() {
  // Generate paths for all products (apps and services)
  return allProductsData.map((product) => ({
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
      {/* Hero-like section - outside PageTransition */}
      <section className="py-20 md:py-28 bg-primary bg-grid-lines text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-up">
              <span className="text-sm font-semibold uppercase tracking-wider text-primary-foreground">{product.type === 'app' ? 'Application' : 'Service'}</span>
              <h1 className="text-5xl md:text-6xl font-bold font-headline text-primary-foreground">{product.name}</h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 text-balance">{product.tagline}</p>
              <Button size="lg" variant="secondary" asChild>
                <Link href={`/contact?product=${encodeURIComponent(product.name)}`}>
                  Inquire About {product.name}
                </Link>
              </Button>
            </div>
            <div className="animate-fade-in rounded-xl border-primary-foreground/20 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={600}
                  height={400}
                  className="rounded-xl object-cover w-full h-auto"
                  data-ai-hint={product.dataAiHint}
                />
            </div>
          </div>
        </div>
      </section>

      <PageTransition>
        <>
          {/* Content section - inside PageTransition */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-3xl mx-auto animate-slide-up mb-12">
                <SectionHeader
                  title="Detailed Overview"
                  subtitle={product.longDescription}
                  titleClassName="text-primary"
                  textAlignment="center"
                />
              </div>

              {product.features && product.features.length > 0 && (
                <div className="mb-16">
                  <SectionHeader title="Key Features & Benefits" className="mb-10" />
                  <div className="grid sm:grid-cols-2 gap-8">
                    {product.features.map((feature, index) => (
                      <div key={feature.title} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s`}}>
                        <Card className="h-full hover:shadow-lg transition-shadow">
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
                  <SectionHeader title="Interactive Experience" className="mb-10" />
                  <div className="max-w-3xl mx-auto animate-fade-in">
                    <InteractiveDemoPlaceholder
                      title={product.interactiveDemo.title}
                      description={product.interactiveDemo.description}
                      imageUrl={product.interactiveDemo.imageUrl}
                      dataAiHint={product.interactiveDemo.dataAiHint}
                      link={product.interactiveDemo.link}
                      videoUrl={product.interactiveDemo.videoUrl} // Added videoUrl prop
                    />
                  </div>
                </section>
              )}

              {product.caseStudies && product.caseStudies.length > 0 && (
                <section className="mb-16">
                  <SectionHeader title="Success Stories" className="mb-10" />
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
                  <SectionHeader title="Client Testimonials" className="mb-10" />
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
      </PageTransition>
    </>
  );
}
