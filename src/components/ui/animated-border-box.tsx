import { cn } from '@/lib/utils';
import type React from 'react';

interface AnimatedBorderBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  borderRadius?: string;
  borderWidth?: string;
  animationDuration?: string;
}

export default function AnimatedBorderBox({
  children,
  className,
  borderRadius = 'rounded-lg',
  borderWidth = 'p-[2px]', // Padding acts as border thickness for the inner content
  animationDuration = '6s', // Corresponds to tailwind.config.ts animation
  ...props
}: AnimatedBorderBoxProps) {
  return (
    <div
      className={cn(
        'relative group overflow-hidden',
        borderRadius,
        className
      )}
      {...props}
    >
      <div
        className={cn(
          'absolute inset-[-1000%] animate-gradient-border-flow bg-[conic-gradient(from_90deg_at_50%_50%,hsl(var(--primary))_0%,hsl(var(--accent))_50%,hsl(var(--primary))_100%)]',
          // Match animationDuration with tailwind config
          // Tailwind doesn't directly support dynamic animation durations in class names like animate-[gradientBorder_Xs_ease_infinite]
          // So we ensure this component's default matches the config, or users provide a class with custom duration
        )}
        style={{ animationDuration }}
      />
      <div className={cn('relative z-10 bg-card text-card-foreground', borderRadius, borderWidth)}>
        {children}
      </div>
    </div>
  );
}
