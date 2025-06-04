
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SectionHeader from '@/components/layout/section-header';
import { ArrowRight, Target, Eye, Zap, Users, ShieldCheck, Briefcase, Award, History, Mountain } from 'lucide-react';

export default function AboutPage() {
  const coreValues = [
    { title: "Innovation", description: "We continuously explore new technologies and creative approaches to deliver cutting-edge solutions.", icon: Zap },
    { title: "Client-Centricity", description: "Our clients' success is our top priority. We listen, understand, and tailor solutions to meet their unique needs.", icon: Users },
    { title: "Integrity", description: "We operate with transparency, honesty, and ethical practices in all our engagements.", icon: ShieldCheck },
    { title: "Collaboration", description: "We believe in the power of teamwork, both internally and with our clients, to achieve the best outcomes.", icon: Briefcase },
    { title: "Excellence", description: "We strive for the highest quality in everything we do, from strategy to execution and support.", icon: Award },
    { title: "Adaptability", description: "In a fast-paced digital world, we embrace change and remain agile to deliver relevant solutions.", icon: Mountain },
  ];

  return (
    <>
      <section className="py-20 md:py-28 bg-gradient-to-b from-primary to-indigo-700 text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6 text-center animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">About Praszo</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-balance">
            Innovating the Future of Digital Excellence. Discover the story, mission, and values that drive Praszo to deliver cutting-edge digital solutions and empower businesses worldwide.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <Image
                src="https://placehold.co/600x450.png"
                alt="Praszo team collaborating"
                width={600}
                height={450}
                className="rounded-xl shadow-2xl object-cover"
                data-ai-hint="office team discussion"
              />
            </div>
            <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <SectionHeader
                title="Our Journey"
                subtitle="Founded on the principles of innovation and client success, Praszo began with a vision to simplify complex digital challenges. Over the years, we've grown into a dynamic agency, helping businesses of all sizes navigate the digital landscape and achieve their strategic objectives. Our commitment to excellence and forward-thinking has been the cornerstone of our evolution."
                textAlignment="left"
                titleClassName="text-primary"
                className="mb-0"
              />
               <p className="text-muted-foreground">
                We believe that technology, when wielded creatively and strategically, can unlock unprecedented opportunities. Our journey is one of continuous learning, adaptation, and a relentless pursuit of delivering impactful results for our partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader
            title="Mission & Vision"
            subtitle="Guiding our strategies and inspiring our actions."
            titleClassName="text-primary"
          />
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="animate-fade-in shadow-lg rounded-lg">
              <CardHeader className="flex-row items-center gap-4">
                <Target className="h-10 w-10 text-accent" />
                <CardTitle className="text-2xl font-headline">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To empower businesses with transformative digital solutions, fostering growth, efficiency, and innovation through expert strategy and state-of-the-art technology. We aim to be a trusted partner, translating complex challenges into impactful digital experiences.
                </p>
              </CardContent>
            </Card>
            <Card className="animate-fade-in shadow-lg rounded-lg" style={{ animationDelay: '0.2s' }}>
              <CardHeader className="flex-row items-center gap-4">
                <Eye className="h-10 w-10 text-accent" />
                <CardTitle className="text-2xl font-headline">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To be a globally recognized leader in digital innovation, shaping the future of how businesses connect, operate, and succeed in an ever-evolving technological landscape. We envision a world where every business can leverage the full potential of digital.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader
            title="Core Values That Define Us"
            subtitle="These principles are at the heart of everything we do at Praszo, guiding our interactions and decisions."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <div key={value.title} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <Card className="h-full shadow-md hover:shadow-xl transition-shadow rounded-lg">
                  <CardHeader className="items-center text-center">
                    <div className="p-3 bg-primary/10 rounded-full mb-3 inline-block">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-headline">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
           <SectionHeader
            title="Meet the Innovators"
            subtitle="Praszo is powered by a diverse team of passionate strategists, creative designers, skilled developers, and dedicated project managers. Our collective expertise and collaborative spirit are the cornerstones of your success."
            titleClassName="text-primary"
          />
          <div className="max-w-3xl mx-auto animate-fade-in rounded-xl overflow-hidden shadow-xl">
            <Image
              src="https://placehold.co/800x400.png"
              alt="Praszo Team"
              width={800}
              height={400}
              className="object-cover w-full"
              data-ai-hint="diverse team working"
            />
          </div>
           <p className="mt-8 text-center text-lg text-muted-foreground max-w-2xl mx-auto">
             While we can't feature everyone here, know that we are committed to continuous learning and pushing the boundaries of digital possibility to bring your vision to life.
           </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6 text-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6">Ready to Partner With Us?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-balance">
            Let's discuss how Praszo's expertise can elevate your next project. We're excited to build something amazing together.
          </p>
          <Button size="lg" variant="secondary" asChild className="text-primary hover:bg-background/90">
            <Link href="/contact">
              <span className="flex items-center">
                Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
