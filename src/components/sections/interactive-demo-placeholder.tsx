
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlayCircle, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';

interface InteractiveDemoPlaceholderProps {
  title: string;
  description: string;
  imageUrl?: string;
  dataAiHint?: string;
  link?: string;
  videoUrl?: string;
}

export default function InteractiveDemoPlaceholder({ title, description, imageUrl, dataAiHint, link, videoUrl }: InteractiveDemoPlaceholderProps) {
  const [showVideo, setShowVideo] = useState(false);
  const finalImageUrl = imageUrl || "https://placehold.co/1200x675.png";
  const finalDataAiHint = dataAiHint || "technology interface";

  const videoPlayerContainerRef = useRef<HTMLDivElement>(null); // Ref for the div that contains the video or image
  const videoRef = useRef<HTMLVideoElement>(null); // Ref for the video element itself
  
  // isInView will track the visibility of videoPlayerContainerRef
  // amount: 0.5 means 50% of the element needs to be visible to trigger true
  // once: false means it will keep updating as visibility changes
  const isInView = useInView(videoPlayerContainerRef, { amount: 0.5, once: false });

  useEffect(() => {
    if (showVideo && videoRef.current && videoUrl) {
      if (isInView) {
        videoRef.current.play().catch(error => {
          console.error("Video autoplay failed:", error);
          // Autoplay can be blocked by browsers if not muted or due to other policies.
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView, showVideo, videoUrl]);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow rounded-lg">
      {showVideo && videoUrl ? (
        <div ref={videoPlayerContainerRef} className="relative aspect-video">
          <video 
            ref={videoRef}
            src={videoUrl} 
            controls 
            muted // Mute for better autoplay compatibility
            loop // Loop the video for continuous demo
            className="w-full h-full object-cover bg-black"
          >
            Your browser does not support the video tag.
          </video>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full p-1"
            onClick={() => setShowVideo(false)}
            aria-label="Close video"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      ) : ( 
        <div ref={videoPlayerContainerRef} className="relative aspect-video">
          <Image 
            src={finalImageUrl} 
            alt={title || "Interactive Demo"} 
            fill 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
            className="object-cover" 
            data-ai-hint={finalDataAiHint}
          />
          {(videoUrl || link) && (
             <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              {videoUrl ? (
                <Button variant="secondary" size="lg" onClick={() => setShowVideo(true)}>
                  <PlayCircle className="mr-2 h-6 w-6" /> Play Demo
                </Button>
              ) : link ? (
                <Button variant="secondary" size="lg" asChild>
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    <PlayCircle className="mr-2 h-6 w-6" /> Launch Demo
                  </a>
                </Button>
              ) : null}
            </div>
          )}
        </div>
      )}

      <CardHeader>
        <CardTitle className="text-2xl font-headline">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-4">{description}</CardDescription>
        {!finalImageUrl && !showVideo && ( 
          videoUrl ? (
            <Button variant="default" onClick={() => setShowVideo(true)}>
              <PlayCircle className="mr-2 h-5 w-5" /> Play Demo
            </Button>
          ) : link ? (
            <Button variant="default" asChild>
              <a href={link} target="_blank" rel="noopener noreferrer">
                <span className="flex items-center">
                  <PlayCircle className="mr-2 h-5 w-5" /> Try Interactive Demo
                </span>
              </a>
            </Button>
          ) : (
            <div className="p-8 border-2 border-dashed border-border rounded-md text-center text-muted-foreground">
              <PlayCircle size={48} className="mx-auto mb-2" />
              <p>Interactive demo coming soon!</p>
            </div>
          )
        )}
      </CardContent>
    </Card>
  );
}
