
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
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

export default function HeroSection() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof subscriptionFormSchema>>({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof subscriptionFormSchema>) {
    // Simulate API call
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
    <section className="py-20 md:py-32 bg-gradient-to-br from-background to-secondary overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center">
       
        
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tight text-balance">
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
            <Button size="lg" variant="outline" asChild>
              <Link href="/products/practice">
                Explore Practice
              </Link>
            </Button>
          </div>

         
        </motion.div>
      {/* Subscription Form */}
      <motion.div 
            className="mt-5 p-8 border-t md:border-none border-border/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold mb-3 text-foreground">Stay Updated With Praszo</h3>
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
                            className="pl-10 h-11 text-base" // Adjusted for icon
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
            <p className="text-xs text-muted-foreground mt-2">
              No spam, ever. Unsubscribe at any time.
            </p>
          </motion.div>

      </div>
    </section>
  );
}
