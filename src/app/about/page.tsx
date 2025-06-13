
'use client'; // Required for framer-motion directly in page or imported motion components

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SectionHeader from '@/components/layout/section-header';
import { ArrowRight, Target, Eye, Zap, Users, ShieldCheck, Briefcase, Award, History, Mountain } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '@/components/layout/page-transition'; // Added

const heroTextVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const contentBlockVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const imageVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.2 } },
};

const cardContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

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
      {/* Hero-like section - outside PageTransition */}
      <section className="py-20 md:py-28 bg-primary bg-grid-lines text-primary-foreground overflow-hidden">
        <motion.div
          className="container mx-auto px-4 md:px-6 text-center"
          initial="hidden"
          animate="visible" 
          viewport={{ once: true }}
          variants={heroTextVariants}
        >
          <h1 className="text-5xl md:text-6xl font-bold font-headline mb-4">About Praszo</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-balance">
            Innovating the Future of Digital Excellence. Discover the story, mission, and values that drive Praszo to deliver cutting-edge digital solutions and empower businesses worldwide.
          </p>
        </motion.div>
      </section>

      <PageTransition>
        <>
          {/* Content sections - inside PageTransition */}
          <section className="py-16 md:py-24 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div variants={imageVariants} initial="hidden" animate="visible" viewport={{ once: true }}>
                  <Image
                    src="/assets/images/about.png"
                    alt="Praszo team collaborating"
                    width={600}
                    height={450}
                    className="rounded-xl shadow-2xl object-cover"
                    data-ai-hint="office team discussion"
                  />
                </motion.div>
                <motion.div className="space-y-6" variants={contentBlockVariants} initial="hidden" animate="visible" viewport={{ once: true }}>
                  <SectionHeader
                    title="Our Journey"
                    subtitle="Founded on the principles of innovation and client success, Praszo began with a vision to simplify complex digital challenges. Over the years, we've grown into a dynamic agency, helping businesses of all sizes navigate the digital landscape and achieve their strategic objectives. Our commitment to excellence and forward-thinking has been the cornerstone of our evolution."
                    textAlignment="left"
                    titleClassName="text-primary"
                    className="mb-0"
                    animateOnLoad={true} 
                  />
                   <p className="text-muted-foreground">
                    We believe that technology, when wielded creatively and strategically, can unlock unprecedented opportunities. Our journey is one of continuous learning, adaptation, and a relentless pursuit of delivering impactful results for our partners.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-24 bg-secondary overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
              <SectionHeader
                title="Mission & Vision"
                subtitle="Guiding our strategies and inspiring our actions."
                titleClassName="text-accent-vibrant"
                animateOnLoad={true} 
              />
              <motion.div
                className="grid md:grid-cols-2 gap-8"
                variants={cardContainerVariants}
                initial="hidden"
                animate="visible" 
                viewport={{ once: true, amount: 0.1 }}
              >
                <motion.div variants={cardItemVariants}>
                  <Card className="shadow-lg rounded-lg h-full">
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
                </motion.div>
                <motion.div variants={cardItemVariants}>
                  <Card className="shadow-lg rounded-lg h-full">
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
                </motion.div>
              </motion.div>
            </div>
          </section>

          <section className="py-16 md:py-24 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
              <SectionHeader
                title="Core Values That Define Us"
                subtitle="These principles are at the heart of everything we do at Praszo, guiding our interactions and decisions."
                animateOnLoad={true} 
              />
              <motion.div
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={cardContainerVariants}
                initial="hidden"
                animate="visible" 
                viewport={{ once: true, amount: 0.1 }}
              >
                {coreValues.map((value) => (
                  <motion.div key={value.title} variants={cardItemVariants}>
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
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          <section className="py-16 md:py-24 bg-muted/30 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
               <SectionHeader
                title="Meet the Innovators"
                subtitle="Praszo is powered by a diverse team of passionate strategists, creative designers, skilled developers, and dedicated project managers. Our collective expertise and collaborative spirit are the cornerstones of your success."
                titleClassName="text-primary"
              />
              <motion.div
                className="max-w-3xl mx-auto rounded-xl overflow-hidden shadow-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Image
                  src="/assets/images/about-2.jpeg"
                  alt="Praszo Team"
                  width={800}
                  height={400}
                  className="object-cover w-full"
                  data-ai-hint="diverse team working"
                />
              </motion.div>
               <motion.p
                className="mt-8 text-center text-lg text-muted-foreground max-w-2xl mx-auto"
                initial={{ opacity:0, y:10 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once: true }}
                transition={{ duration:0.5, delay: 0.2 }}
               >
                 While we can't feature everyone here, know that we are committed to continuous learning and pushing the boundaries of digital possibility to bring your vision to life.
               </motion.p>
            </div>
          </section>

          <section className="py-16 md:py-24 bg-primary text-primary-foreground overflow-hidden">
            <motion.div
              className="container mx-auto px-4 md:px-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6">Ready to Partner With Us?</h2>
              <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-balance">
                Let's discuss how Praszo's expertise can elevate your next project. We're excited to build something amazing together.
              </p>
              <Button size="lg" variant="secondary" asChild className="bg-background hover:bg-accent/90 text-accent  hover:text-accent-foreground">
                <Link href="/contact">
                  <span className="flex items-center">
                    Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </Link>
              </Button>
            </motion.div>
          </section>
        </>
      </PageTransition>
    </>
  );
}
