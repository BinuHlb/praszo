
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, BarChart3, Users, Settings, Zap, ShieldCheck, MessageSquare } from 'lucide-react';
import { getProductBySlug } from '@/data/mock-data';
import Link from 'next/link';
import TestimonialCard from '@/components/shared/testimonial-card';
import InteractiveDemoPlaceholder from '@/components/sections/interactive-demo-placeholder';
import SectionHeader from '@/components/layout/section-header';
import PageTransition from '@/components/layout/page-transition'; // Added

export default function PracticePage() { // Renamed from ProjectManagementAppPage
  const app = getProductBySlug('practice'); // Updated slug

  if (!app) {
    return <div className="container mx-auto py-12 px-4 md:px-6 text-center">Product not found.</div>;
  }

  const features = app.features || [
    { title: 'Intuitive Dashboard', description: 'Get a clear overview of all your projects at a glance.', icon: BarChart3 },
    { title: 'Advanced Task Management', description: 'Create, assign, and track tasks with ease, including subtasks and dependencies.', icon: Users },
    { title: 'Real-time Collaboration', description: 'Communicate with your team, share files, and get instant updates.', icon: Settings },
    { title: 'Customizable Workflows', description: 'Tailor the app to fit your specific project needs and team processes.', icon: Zap },
    { title: 'Secure & Reliable', description: 'Bank-grade security to keep your project data safe.', icon: ShieldCheck },
    { title: 'Insightful Reporting', description: 'Track progress and make data-driven decisions.', icon: MessageSquare }
  ];

  return (
    <>
      {/* Hero-like section - outside PageTransition */}
      <section className="py-20 md:py-28 bg-primary bg-grid-lines text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6 text-center animate-slide-up">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-headline mb-6">{app.name}</h1> {/* app.name is now "Practice" */}
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-balance">{app.tagline}</p>
          <div className="flex justify-center gap-4">
            <Button size="lg" variant="secondary" asChild className="text-primary hover:bg-accent hover:text-accent-foreground">
              <Link href={`/contact?product=${encodeURIComponent(app.name)}`} legacyBehavior passHref>
                <a>Request a Demoooo</a>
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-[hsl(246,93%,63%)]">
              View Pricing
            </Button>
          </div>
        </div>
      </section>

      <PageTransition>
        <>
          {/* Content sections - inside PageTransition */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="animate-fade-in">
                  <Image
                    src={app.image}
                    alt={app.name}
                    width={600}
                    height={450}
                    className="rounded-xl shadow-2xl object-cover"
                    data-ai-hint={app.dataAiHint}
                  />
                </div>
                <div className="space-y-6 animate-slide-up" style={{animationDelay: '0.2s'}}>
                  <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">The Future of Project Management is Here with Practice</h2> {/* Updated */}
                  <p className="text-lg text-muted-foreground">{app.longDescription}</p>
                  <ul className="space-y-3">
                    {features.slice(0, 3).map(feature => (
                      <li key={feature.title} className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                        <span><strong>{feature.title}:</strong> {feature.description}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-24 bg-secondary">
            <div className="container mx-auto px-4 md:px-6">
              <SectionHeader 
                title="Powerful Features, Effortless Control in Practice" // Updated
                subtitle={`${app.name} is packed with features designed to enhance productivity and collaboration.`} // app.name is Practice
                titleClassName="text-accent-vibrant"
                subtitleClassName="text-secondary-foreground/90"
              />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <div key={feature.title} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s`}}>
                    <Card className="h-full shadow-lg rounded-lg">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          {feature.icon && <feature.icon className="h-8 w-8 text-primary" />}
                          <CardTitle className="text-xl font-headline">{feature.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-secondary-foreground/90">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {app.interactiveDemo && (
            <section id="demo" className="py-16 md:py-24 bg-background">
              <div className="container mx-auto px-4 md:px-6">
                <SectionHeader 
                  title={app.interactiveDemo.title} // This will be "Explore Practice"
                  className="mb-0"
                />
                <div className="max-w-4xl mx-auto animate-fade-in mt-12">
                  <InteractiveDemoPlaceholder 
                    title={`Live Demo: ${app.name}`} // app.name is Practice
                    description={app.interactiveDemo.description}
                    imageUrl={app.interactiveDemo.imageUrl || "https://placehold.co/1200x675.png"}
                    dataAiHint={app.interactiveDemo.dataAiHint || "software dashboard"}
                    link={app.interactiveDemo.link} // This will be /practice#demo
                    videoUrl={app.interactiveDemo.videoUrl} // Added videoUrl
                  />
                </div>
              </div>
            </section>
          )}
          
          {app.testimonials && app.testimonials.length > 0 && (
            <section className="py-16 md:py-24">
              <div className="container mx-auto px-4 md:px-6">
                <SectionHeader title={`What Our ${app.name} Users Say`} /> {/* Updated */}
                <div className="grid md:grid-cols-2 gap-8">
                  {app.testimonials.map((testimonial, index) => (
                     <div key={testimonial.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s`}}>
                      <TestimonialCard testimonial={testimonial} />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      </PageTransition>
    </>
  );
}

