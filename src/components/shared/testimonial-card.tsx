import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { Testimonial } from '@/lib/types';
import { Quote } from 'lucide-react';
import AnimatedBorderBox from '@/components/ui/animated-border-box';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <AnimatedBorderBox borderRadius="rounded-xl" className="h-full">
      <Card className="h-full flex flex-col justify-between p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div>
          <Quote className="h-8 w-8 text-accent mb-4" />
          <p className="text-lg italic text-muted-foreground mb-6">&quot;{testimonial.quote}&quot;</p>
        </div>
        <div className="flex items-center mt-auto">
          {testimonial.authorImage && (
            <Image
              src={testimonial.authorImage}
              alt={testimonial.author}
              width={50}
              height={50}
              className="rounded-full mr-4"
              data-ai-hint={testimonial.dataAiHint || "profile person"}
            />
          )}
          <div>
            <p className="font-semibold font-headline text-primary">{testimonial.author}</p>
            <p className="text-sm text-muted-foreground">{testimonial.company}</p>
          </div>
        </div>
      </Card>
    </AnimatedBorderBox>
  );
}
