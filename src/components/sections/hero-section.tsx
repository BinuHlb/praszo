
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
import { useRef, useState, useEffect } from 'react';

const subscriptionFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});




export default function HeroSection() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof subscriptionFormSchema>>({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef, 
    offset: ["start start", "end start"] 
  });

  const yBlobs = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]); 
  const opacityText = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.7, 0]); 

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

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
      ref={sectionRef}
      className="md:sticky bg-grid-lines top-0 h-screen z-10 py-16 md:py-0 bg-primary dark:bg-[hsl(var(--background))]"
    >
      <motion.div
        className="absolute inset-0 overflow-hidden" 
        initial={{ opacity: 0 }}
        animate={{ opacity: isMounted ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        
        
      </motion.div>
      
      <motion.div 
        className="relative z-20 container mx-auto px-4 md:px-6 flex flex-col justify-center h-full text-center"
        style={{ y: yText, opacity: opacityText }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-6 mb-10 md:mb-12" 
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-headline tracking-tight text-balance text-secondary-foreground">
            Elevate Your Business with <span className="text-accent-vibrant">Praszo</span> Solutions
          </h1>
          <p className="text-lg md:text-xl text-secondary-foreground/90 text-balance max-w-3xl mx-auto">
            We craft innovative digital experiences and powerful software to propel your brand forward. Discover the Praszo advantage.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/products/practice">
                Explore Practice <ChevronRight className="ml-2 h-5 w-5 media-object" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">
                Start Your Project
              </Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="mt-5 md:mt-10 max-w-lg mx-auto" 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold mb-4 text-secondary-foreground">Stay Updated With Praszo</h3>
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
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary-foreground/80 z-10" />
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            {...field}
                            className="pl-10 pr-[150px] h-14 text-base bg-white/30 dark:bg-input/50 text-secondary-foreground placeholder:text-secondary-foreground/60 border-border focus:bg-white/50 dark:focus:bg-input media-object" 
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="mt-1 text-sm text-red-300 dark:text-destructive" />
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
              <p className="text-xs text-secondary-foreground/80 mt-2">
                No spam, ever. Unsubscribe at any time.
              </p>
            </form>
          </Form>
        </motion.div>
      </motion.div>
    </section>
  );
}
