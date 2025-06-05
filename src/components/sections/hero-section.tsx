
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight, Mail } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useRef } from 'react';

const subscriptionFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

const AnimatedBlob = ({ id, color1Light, color2Light, color1Dark, color2Dark, className, animationClass, blurStdDeviation = 70, shape = "ellipse" }: {
  id: string;
  color1Light: string;
  color2Light: string;
  color1Dark: string;
  color2Dark: string;
  className?: string;
  animationClass?: string;
  blurStdDeviation?: number;
  shape?: "ellipse" | "rect" | "bubble1" | "bubble2";
}) => {
  const bubble1Path = "M100,200 C50,100 150,50 250,100 C350,150 300,250 200,300 C100,350 50,300 100,200 Z";
  const bubble2Path = "M300,120 C400,80 450,200 400,300 C350,400 250,380 200,300 C150,220 200,160 300,120 Z";

  const internalGradIdLight = `grad-${id}-light`;
  const internalGradIdDark = `grad-${id}-dark`;
  const filterId = `blur-${id}`;

  return (
    <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id={internalGradIdLight} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color1Light} />
          <stop offset="100%" stopColor={color2Light} />
        </linearGradient>
        <linearGradient id={internalGradIdDark} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color1Dark} />
          <stop offset="100%" stopColor={color2Dark} />
        </linearGradient>
        <filter id={filterId}>
          <feGaussianBlur stdDeviation={blurStdDeviation} />
        </filter>
      </defs>
      
      {shape === "ellipse" && (
        <>
          <ellipse
            cx="250"
            cy="250"
            rx="200"
            ry="150"
            filter={`url(#${filterId})`}
            className={`block dark:hidden ${animationClass}`}
            transform="rotate(30 250 250)"
            fill={`url(#${internalGradIdLight})`}
          />
          <ellipse
            cx="250"
            cy="250"
            rx="200"
            ry="150"
            filter={`url(#${filterId})`}
            className={`hidden dark:block ${animationClass}`}
            transform="rotate(30 250 250)"
            fill={`url(#${internalGradIdDark})`}
          />
        </>
      )}
      {shape === "rect" && (
         <>
          <rect
            x="50"
            y="100"
            width="400"
            height="300"
            rx="100"
            filter={`url(#${filterId})`}
            className={`block dark:hidden ${animationClass}`}
            transform="rotate(-20 250 250)"
            fill={`url(#${internalGradIdLight})`}
          />
          <rect
            x="50"
            y="100"
            width="400"
            height="300"
            rx="100"
            filter={`url(#${filterId})`}
            className={`hidden dark:block ${animationClass}`}
            transform="rotate(-20 250 250)"
            fill={`url(#${internalGradIdDark})`}
          />
        </>
      )}
      {shape === "bubble1" && (
        <>
          <path
            d={bubble1Path}
            filter={`url(#${filterId})`}
            className={`block dark:hidden ${animationClass}`}
            fill={`url(#${internalGradIdLight})`}
          />
          <path
            d={bubble1Path}
            filter={`url(#${filterId})`}
            className={`hidden dark:block ${animationClass}`}
            fill={`url(#${internalGradIdDark})`}
          />
        </>
      )}
      {shape === "bubble2" && (
        <>
          <path
            d={bubble2Path}
            filter={`url(#${filterId})`}
            className={`block dark:hidden ${animationClass}`}
            fill={`url(#${internalGradIdLight})`}
          />
          <path
            d={bubble2Path}
            filter={`url(#${filterId})`}
            className={`hidden dark:block ${animationClass}`}
            fill={`url(#${internalGradIdDark})`}
          />
        </>
      )}
    </svg>
  );
};


export default function HeroSection() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof subscriptionFormSchema>>({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"] 
  });

  const yBlobs = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  async function onSubmit(values: z.infer<typeof subscriptionFormSchema>) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Subscription email:', values.email);
    toast({
      title: 'Subscribed!',
      description: "Thanks for joining our newsletter. We'll keep you updated!",
      variant: 'default',
    });
    form.reset();
  }

  return (
    <section 
      ref={heroRef} 
      className="overflow-hidden"
      style={{ backgroundColor: '#7FFFD4', position: 'relative' }} 
    >
      <motion.div 
        className="absolute inset-0 z-0 opacity-60 dark:opacity-50" 
        style={{ y: yBlobs }}
      >
        <AnimatedBlob
          id="blob1"
          color1Light="hsla(var(--primary), 0.95)" 
          color2Light="hsla(var(--secondary), 0.85)" 
          color1Dark="hsla(var(--primary), 0.85)"   
          color2Dark="hsla(var(--accent), 0.75)"   
          className="absolute top-[5%] left-[0%] w-[70%] h-[70%] md:w-[55%] md:h-[55%]"
          animationClass="animate-float-slow"
          blurStdDeviation={50} 
          shape="bubble1"
        />
        <AnimatedBlob
          id="blob2"
          color1Light="hsla(var(--accent), 0.9)" 
          color2Light="hsla(var(--primary), 0.8)" 
          color1Dark="hsla(var(--secondary), 0.8)"   
          color2Dark="hsla(var(--primary), 0.75)" 
          className="absolute bottom-[0%] right-[0%] w-[75%] h-[75%] md:w-[60%] md:h-[60%]"
          animationClass="animate-float-slower"
          blurStdDeviation={55} 
          shape="bubble2"
        />
      </motion.div>

      {/* Glassmorphism Overlay Layer */}
      <div className="absolute inset-0 z-10 bg-white/20 dark:bg-black/20 backdrop-blur-lg"></div>

      {/* Content Layer */}
      <div className="container relative z-20 mx-auto px-4 md:px-6 py-20 md:py-28 lg:py-32">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-headline tracking-tight text-balance text-foreground dark:text-primary-foreground">
                Elevate Your Business with <span className="text-primary">Praszo</span> Solutions
              </h1>
              <p className="text-lg md:text-xl text-foreground/80 dark:text-primary-foreground/90 text-balance">
                We craft innovative digital experiences and powerful software to propel your brand forward. Discover the Apex advantage.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="outline" asChild className="border-foreground/50 text-foreground hover:bg-foreground/10 dark:border-foreground/50 dark:text-foreground dark:hover:bg-foreground/10">
                  <Link href="/contact">
                    <span className="flex items-center">
                      Start Your Project <ChevronRight className="ml-2 h-5 w-5" />
                    </span>
                  </Link>
                </Button>
                <Button size="lg" variant="default" asChild>
                  <Link href="/products/practice">
                    Explore Practice
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="mt-5 md:mt-0" 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-xl font-semibold mb-4 text-foreground dark:text-primary-foreground text-center md:text-left">Stay Updated With Praszo</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3 items-start">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex-grow w-full sm:w-auto">
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                              type="email"
                              placeholder="Enter your email"
                              {...field}
                              className="pl-10 h-11 text-base bg-background/70 dark:bg-input/50 border-border focus:bg-background dark:focus:bg-input"
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="mt-1 text-sm text-destructive" />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" size="lg" className="w-full sm:w-auto h-11" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'Subscribing...' : 'Subscribe'}
                  </Button>
                </form>
              </Form>
              <p className="text-xs text-muted-foreground mt-2 text-center md:text-left">
                No spam, ever. Unsubscribe at any time.
              </p>
            </motion.div>
          </div>
        </div>
    </section>
  );
}
