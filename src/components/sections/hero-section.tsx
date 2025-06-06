
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight, Mail, Send } from 'lucide-react';
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
            className="block dark:hidden" 
            transform="rotate(30 250 250)"
            fill={`url(#${internalGradIdLight})`}
          />
          <ellipse
            cx="250"
            cy="250"
            rx="200"
            ry="150"
            filter={`url(#${filterId})`}
            className="hidden dark:block" 
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
            className="block dark:hidden"
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
            className="hidden dark:block"
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
            className={`block dark:hidden ${animationClass || ''}`}
            fill={`url(#${internalGradIdLight})`}
          />
          <path
            d={bubble1Path}
            filter={`url(#${filterId})`}
            className={`hidden dark:block ${animationClass || ''}`}
            fill={`url(#${internalGradIdDark})`}
          />
        </>
      )}
      {shape === "bubble2" && (
        <>
          <path
            d={bubble2Path}
            filter={`url(#${filterId})`}
            className={`block dark:hidden ${animationClass || ''}`}
            fill={`url(#${internalGradIdLight})`}
          />
          <path
            d={bubble2Path}
            filter={`url(#${filterId})`}
            className={`hidden dark:block ${animationClass || ''}`}
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

  const heroContentRef = useRef<HTMLDivElement>(null); 
  const { scrollYProgress } = useScroll({
    target: heroContentRef, // Target an inner div for scroll progress calculation if needed for internal animations
    offset: ["start start", "end start"] 
  });

  // This transform applies to the blob container, not the HeroSection itself
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
      className="sticky top-0 h-screen z-10" // Main sticky section
      style={{ backgroundColor: 'hsl(var(--secondary))' }} // Base background
    >
      {/* Inner container for overflow control, blobs, and backdrop */}
      <div className="absolute inset-0 overflow-hidden"> {/* Moved overflow-hidden here */}
        <motion.div 
          className="absolute inset-0 z-0 opacity-70 dark:opacity-60" 
          style={{ y: yBlobs }} // Blob parallax
        >
          <AnimatedBlob
            id="blob1"
            color1Light="hsla(0, 0%, 100%, 0.8)" 
            color2Light="hsla(0, 0%, 100%, 0.5)"
            color1Dark="hsla(0, 0%, 100%, 0.3)" 
            color2Dark="hsla(0, 0%, 100%, 0.15)"
            className="absolute top-[-20%] left-[-25%] w-[150%] h-[130%] md:w-[120%] md:h-[110%]"
            animationClass="animate-float-slow"
            blurStdDeviation={60} 
            shape="bubble1"
          />
          <AnimatedBlob
            id="blob2"
            color1Light="hsla(0, 0%, 100%, 0.7)" 
            color2Light="hsla(0, 0%, 100%, 0.9)"
            color1Dark="hsla(0, 0%, 100%, 0.25)" 
            color2Dark="hsla(0, 0%, 100%, 0.4)"
            className="absolute bottom-[-25%] right-[-30%] w-[160%] h-[120%] md:w-[130%] md:h-[100%]"
            animationClass="animate-float-slower"
            blurStdDeviation={55} 
            shape="bubble2"
          />
        </motion.div>
        <div className="absolute inset-0 z-10 bg-white/20 dark:bg-black/20 backdrop-blur-xl"></div> {/* Overlay / Backdrop */}
      </div>
      
      {/* Content container, relative to HeroSection, z-index higher than blobs/backdrop */}
      <div ref={heroContentRef} className="relative z-20 container mx-auto px-4 md:px-6 py-20 md:py-28 lg:py-32 flex flex-col justify-center h-full">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-headline tracking-tight text-balance text-foreground">
                Elevate Your Business with <span className="text-primary">Praszo</span> Solutions
              </h1>
              <p className="text-lg md:text-xl text-foreground/90 text-balance">
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
              <h3 className="text-xl font-semibold mb-4 text-foreground text-center md:text-left">Stay Updated With Praszo</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                  <div className="relative"> 
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative"> 
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                              <Input
                                type="email"
                                placeholder="Enter your email"
                                {...field}
                                className="pl-10 pr-[150px] h-14 text-base bg-background/70 dark:bg-input/50 border-border focus:bg-background dark:focus:bg-input" 
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="mt-1 text-sm text-destructive" />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 h-11 px-5 flex items-center bg-accent hover:bg-accent/90 text-accent-foreground" 
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting ? (
                        'Subscribing...'
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Subscribe
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 text-center md:text-left">
                    No spam, ever. Unsubscribe at any time.
                  </p>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
    </section>
  );
}
