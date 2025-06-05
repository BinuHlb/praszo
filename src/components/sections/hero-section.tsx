
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const subscriptionFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

const AnimatedBlob = ({ id, gradIdLight, gradIdDark, color1Light, color2Light, color1Dark, color2Dark, className, animationClass, blurStdDeviation = 60, shape = "ellipse" }: {
  id: string;
  gradIdLight: string;
  gradIdDark: string;
  color1Light: string;
  color2Light: string;
  color1Dark: string;
  color2Dark: string;
  className?: string;
  animationClass?: string;
  blurStdDeviation?: number;
  shape?: "ellipse" | "rect";
}) => {
  return (
    <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id={gradIdLight} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color1Light} />
          <stop offset="100%" stopColor={color2Light} />
        </linearGradient>
        <linearGradient id={gradIdDark} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color1Dark} />
          <stop offset="100%" stopColor={color2Dark} />
        </linearGradient>
        <filter id={`blur-${id}`}>
          <feGaussianBlur stdDeviation={blurStdDeviation} />
        </filter>
      </defs>
      {shape === "ellipse" ? (
        <ellipse
          cx="250"
          cy="250"
          rx="200"
          ry="150"
          filter={`url(#blur-${id})`}
          className={`fill-[url(#${gradIdLight})] dark:fill-[url(#${gradIdDark})] ${animationClass}`}
          transform="rotate(30 250 250)"
        />
      ) : (
        <rect
          x="50"
          y="100"
          width="400"
          height="300"
          rx="100"
          filter={`url(#blur-${id})`}
          className={`fill-[url(#${gradIdLight})] dark:fill-[url(#${gradIdDark})] ${animationClass}`}
          transform="rotate(-20 250 250)"
        />
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
    <section className="relative py-20 md:py-32 bg-background overflow-hidden">
      {/* SVG Background Shapes Layer */}
      <div className="absolute inset-0 z-0 opacity-40 dark:opacity-30">
        <AnimatedBlob
          id="blob1"
          gradIdLight="grad1Light"
          gradIdDark="grad1Dark"
          color1Light="hsla(var(--primary), 0.7)" // Use HSL with opacity
          color2Light="hsla(var(--secondary), 0.5)"
          color1Dark="hsla(var(--primary), 0.6)" // Dark theme primary
          color2Dark="hsla(var(--secondary), 0.4)" // Dark theme secondary
          className="absolute -top-1/4 -left-1/4 w-[70%] h-[70%] md:w-1/2 md:h-1/2"
          animationClass="animate-float-slow"
          blurStdDeviation={80}
        />
        <AnimatedBlob
          id="blob2"
          gradIdLight="grad2Light"
          gradIdDark="grad2Dark"
          color1Light="hsla(var(--accent), 0.6)" // Use HSL with opacity
          color2Light="hsla(var(--primary), 0.4)"
          color1Dark="hsla(var(--accent), 0.5)" // Dark theme accent
          color2Dark="hsla(var(--primary), 0.3)" // Dark theme primary
          className="absolute -bottom-1/4 -right-1/4 w-[80%] h-[80%] md:w-2/3 md:h-2/3"
          animationClass="animate-float-slower"
          blurStdDeviation={100}
          shape="rect"
        />
      </div>

      {/* Content Layer */}
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        {/* Glassmorphism Card */}
        <div className="bg-card/60 dark:bg-neutral-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-card/20 dark:border-neutral-700/30">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center p-8 md:p-12 lg:p-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-headline tracking-tight text-balance">
                Elevate Your Business with <span className="text-primary">Praszo</span> Solutions
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground text-balance">
                We craft innovative digital experiences and powerful software to propel your brand forward. Discover the Apex advantage.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="outline" asChild>
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
              className="mt-5 md:mt-0 p-0 md:p-0 border-none" // Adjusted padding/border from original form placement
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-xl font-semibold mb-4 text-foreground text-center md:text-left">Stay Updated With Praszo</h3>
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
                              className="pl-10 h-11 text-base bg-background/70 dark:bg-neutral-700/50 border-border focus:bg-background dark:focus:bg-neutral-700"
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="mt-1 text-sm" />
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
      </div>
    </section>
  );
}
