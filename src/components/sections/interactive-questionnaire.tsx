'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import SectionHeader from '@/components/layout/section-header';
import { ArrowRight, CheckCircle, Mail, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const questions = [
  {
    id: 'q1',
    text: 'How would you describe your current project tracking methods?',
    options: [
      { value: 'manual', label: 'Mostly manual (e.g., notes, emails, memory)' },
      { value: 'spreadsheets', label: 'Primarily using Spreadsheets or Docs' },
      { value: 'basic_tools', label: 'Using Basic To-Do List Apps' },
      { value: 'current_pm_tool', label: 'Using a dedicated PM tool, but looking for alternatives' },
    ],
  },
  {
    id: 'q2',
    text: 'What\'s your biggest pain point in team collaboration for projects?',
    options: [
      { value: 'communication', label: 'Miscommunication & Lack of Clarity' },
      { value: 'file_sharing', label: 'Inefficient File Sharing & Version Control' },
      { value: 'visibility', label: 'Lack of Task Visibility & Progress Tracking' },
      { value: 'alignment', label: 'Keeping Everyone Aligned on Goals & Deadlines' },
    ],
  },
  {
    id: 'q3',
    text: 'Are you looking for a solution that can help your team...?',
    options: [
      { value: 'efficiency', label: 'Improve Overall Project Efficiency & Reduce Wasted Time' },
      { value: 'teamwork', label: 'Enhance Team Collaboration & Centralize Communication' },
      { value: 'overview', label: 'Get Clearer Project Overviews & Insightful Reporting' },
      { value: 'all_above', label: 'All of the Above, and More!' },
    ],
  },
];

type Answers = {
  [key: string]: string;
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const subscriptionFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

export default function InteractiveQuestionnaire() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined);
  const { toast } = useToast();

  const subscriptionForm = useForm<z.infer<typeof subscriptionFormSchema>>({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (value: string) => {
    setSelectedOption(value);
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const handleNext = () => {
    if (!selectedOption) return;

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(undefined);
    } else {
      setQuizCompleted(true);
    }
  };

  async function onSubscriptionSubmit(values: z.infer<typeof subscriptionFormSchema>) {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    console.log('Quiz Subscription email:', values.email);
    toast({
      title: 'Subscribed!',
      description: "Thanks for joining! We'll keep you in the loop.",
      variant: 'default',
    });
    subscriptionForm.reset();
  }

  if (quizCompleted) {
    return (
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <SectionHeader
            title="Thanks for Your Insights!"
            subtitle="Based on your answers, a comprehensive project management tool like Practice could be a great fit to streamline your workflows, enhance collaboration, and boost team productivity."
            titleClassName="text-accent-vibrant"
            subtitleClassName="text-secondary-foreground/90"
          />
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="mt-8"
          >
            <CheckCircle className="h-20 w-20 md:h-24 md:w-24 text-accent-vibrant mx-auto mb-6" />
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-balance text-secondary-foreground/90">
              Ready to see how Practice can transform your project management and help you achieve your goals?
            </p>
            <Button size="lg" asChild className="text-lg py-6 px-8 mb-12">
              <Link href="/products/practice">
                <span className="flex items-center">
                  Discover Practice <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              </Link>
            </Button>

            <div className="mt-12 border-t border-secondary-foreground/20 pt-10">
              <h3 className="text-2xl font-headline font-semibold mb-4 text-accent-vibrant">Stay Updated!</h3>
              <p className="text-md text-secondary-foreground/80 mb-6 max-w-lg mx-auto text-balance">
                Subscribe to our newsletter for the latest updates, tips, and insights from Praszo.
              </p>
              <Form {...subscriptionForm}>
                <form onSubmit={subscriptionForm.handleSubmit(onSubscriptionSubmit)} className="max-w-md mx-auto space-y-3">
                  <div className="relative">
                    <FormField
                      control={subscriptionForm.control}
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
                                className="pl-10 pr-[150px] h-14 text-base bg-background/20 dark:bg-input/50 text-secondary-foreground placeholder:text-secondary-foreground/70 border-border focus:bg-background/40 dark:focus:bg-input"
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="mt-1 text-sm text-red-300 dark:text-destructive" />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      variant="default" // Explicitly default, or choose another contrasting variant like 'outline' with light text if needed
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 h-11 px-5 flex items-center bg-accent-vibrant hover:bg-accent-vibrant/90 text-accent-vibrant-foreground"
                      disabled={subscriptionForm.formState.isSubmitting}
                    >
                      {subscriptionForm.formState.isSubmitting ? (
                        'Subscribing...'
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Subscribe
                        </>
                      )}
                    </Button>
                  </div>
                   <p className="text-xs text-secondary-foreground/70 pt-1">
                    No spam, ever. Unsubscribe anytime.
                  </p>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          title="Is Practice Right For You?"
          subtitle="Answer a few quick questions to see how our project management solution, Practice, can address your team's specific challenges and goals."
        />
        <motion.div
          className="max-w-2xl mx-auto"
          key={currentQuestionIndex} 
          variants={cardVariants}
          initial="hidden"
          animate="visible" 
          viewport={{ once: true }} 
        >
          <Card className="shadow-xl rounded-xl overflow-hidden">
            <CardHeader className="bg-muted/50">
              <CardTitle className="text-xl md:text-2xl font-headline text-primary">
                Question {currentQuestionIndex + 1} of {questions.length}
              </CardTitle>
              <CardDescription className="text-base md:text-lg pt-2 text-foreground/80">{currentQuestion.text}</CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <RadioGroup value={selectedOption} onValueChange={handleAnswerSelect} className="space-y-4">
                {currentQuestion.options.map((option) => (
                  <Label
                    key={option.value}
                    htmlFor={`${currentQuestion.id}-${option.value}`}
                    className={`flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer
                                ${selectedOption === option.value ? 'bg-primary/10 border-primary ring-2 ring-primary' : 'border-border'}`}
                  >
                    <RadioGroupItem value={option.value} id={`${currentQuestion.id}-${option.value}`} className="border-primary text-primary focus:ring-primary" />
                    <span className="flex-1 text-sm md:text-base text-foreground">
                      {option.label}
                    </span>
                  </Label>
                ))}
              </RadioGroup>
              <div className="mt-8 flex justify-end">
                <Button onClick={handleNext} disabled={!selectedOption} size="lg" className="text-base py-5 px-7">
                  <span className="flex items-center">
                    {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'See Your Solution'}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </Button>
              </div>
              <div className="mt-6 h-2.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500 ease-out"
                  style={{ width: `${((currentQuestionIndex + (selectedOption ? 1 : 0.5)) / questions.length) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
