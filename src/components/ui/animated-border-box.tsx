import { cn } from '@/lib/utils';
import type React from 'react';

interface AnimatedBorderBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  borderRadius?: string;
  borderWidth?: string; // This prop is no longer used by this component for styling
  animationDuration?: string; // This prop is no longer used by this component
}

export default function AnimatedBorderBox({
  children,
  className,
  borderRadius = 'rounded-lg',
  // borderWidth, // No longer directly controls the visual border styling of this box
  // animationDuration, // No longer used
  ...props
}: AnimatedBorderBoxProps) {
  return (
    <div
      className={cn(
        'border', // Apply a standard Tailwind border
        borderRadius, // Apply the passed border-radius
        className     // Apply any other classes like h-full, shadows
      )}
      {...props}
    >
      {children}
    </div>
  );
}
