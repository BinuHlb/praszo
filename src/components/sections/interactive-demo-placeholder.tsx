
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlayCircle, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface InteractiveDemoPlaceholderProps {
  title: string;
  description: string;
  imageUrl?: string;
  dataAiHint?: string;
  link?: string;
  videoUrl?: string;
}

export default function InteractiveDemoPlaceholder({ title, description, imageUrl, dataAiHint, link, videoUrl }: InteractiveDemoPlaceholderProps) {
  const [userHidVideo, setUserHidVideo] = useState(false);

  const shouldShowVideo = !!videoUrl && !userHidVideo;

  const mediaAreaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(mediaAreaRef, { amount: 0.5, once: false });

  useEffect(() => {
    const videoElement = videoRef.current;
    if (shouldShowVideo && videoElement && videoUrl) {
      if (isInView) {
        videoElement.play().catch(error => {
          console.error("Video autoplay failed:", error);
          // Autoplay can be blocked by browsers if not muted or due to other policies.
        });
      } else {
        videoElement.pause();
      }
    } else if (videoElement) {
      // If video shouldn't be shown (e.g., userHidVideo is true or no videoUrl), ensure it's paused.
      videoElement.pause();
    }
  }, [isInView, shouldShowVideo, videoUrl]);

  const finalImageUrl = imageUrl || "https://placehold.co/1200x675.png";
  const finalDataAiHint = dataAiHint || "technology interface";

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow rounded-lg">
      <div ref={mediaAreaRef} className="relative aspect-video bg-muted"> {/* Common container for ref and fallback bg */}
        {shouldShowVideo ? (
          <>
            <video
              ref={videoRef}
              src={videoUrl} // videoUrl is guaranteed by shouldShowVideo
              controls
              muted
              loop
              playsInline // Important for iOS autoplay
              poster={imageUrl} // Use the original imageUrl as poster
              className="w-full h-full object-cover bg-black"
            >
              Your browser does not support the video tag.
            </video>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full p-1"
              onClick={() => setUserHidVideo(true)}
              aria-label="Close video"
            >
              <X className="h-5 w-5" />
            </Button>
          </>
        ) : (
          <>
            <Image
              src={finalImageUrl}
              alt={title || "Interactive Demo"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              data-ai-hint={finalDataAiHint}
              priority // Consider adding priority if this is often above the fold
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              {videoUrl && userHidVideo && ( // Video exists but user hid it
                <Button variant="secondary" size="lg" onClick={() => setUserHidVideo(false)}>
                  <PlayCircle className="mr-2 h-6 w-6" /> Play Demo
                </Button>
              )}
              {!videoUrl && link && ( // No video, but there's an external link
                <Button variant="secondary" size="lg" asChild>
                  <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <PlayCircle className="mr-2 h-6 w-6" /> Launch Demo
                  </a>
                </Button>
              )}
              {/* If no videoUrl and no link, no interactive element on the image */}
            </div>
          </>
        )}
      </div>

      <CardHeader>
        <CardTitle className="text-2xl font-headline">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-4">{description}</CardDescription>
        {/* Fallback text if nothing is interactive and no image provided by props (though finalImageUrl has a default) */}
        {!videoUrl && !link && !imageUrl && (
            <div className="p-8 border-2 border-dashed border-border rounded-md text-center text-muted-foreground">
              <PlayCircle size={48} className="mx-auto mb-2" />
              <p>Interactive demo or content coming soon!</p>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
