import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlayCircle } from 'lucide-react';

interface InteractiveDemoPlaceholderProps {
  title: string;
  description: string;
  imageUrl?: string;
  dataAiHint?: string;
  link?: string;
}

export default function InteractiveDemoPlaceholder({ title, description, imageUrl, dataAiHint, link }: InteractiveDemoPlaceholderProps) {
  return (
    <Card className="overflow-hidden shadow-xl rounded-lg"> {/* Ensured rounded-lg consistent with Card default */}
      {imageUrl && (
        <div className="relative aspect-video">
          <Image 
            src={imageUrl} 
            alt={title || "Interactive Demo"} 
            layout="fill" 
            objectFit="cover" 
            data-ai-hint={dataAiHint || "technology interface"}
          />
          {link && (
             <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <Button variant="secondary" size="lg" asChild>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  <span className="flex items-center">
                    <PlayCircle className="mr-2 h-6 w-6" /> Launch Demo
                  </span>
                </a>
              </Button>
            </div>
          )}
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-2xl font-headline">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-4">{description}</CardDescription>
        {!link && !imageUrl && (
          <div className="p-8 border-2 border-dashed border-border rounded-md text-center text-muted-foreground">
            <PlayCircle size={48} className="mx-auto mb-2" />
            <p>Interactive demo coming soon!</p>
          </div>
        )}
        {link && !imageUrl && (
           <Button variant="default" asChild>
              <a href={link} target="_blank" rel="noopener noreferrer">
                <span className="flex items-center">
                  <PlayCircle className="mr-2 h-5 w-5" /> Try Interactive Demo
                </span>
              </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
