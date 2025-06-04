import type { SVGProps } from 'react';

export default function AnimatedLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      {...props}
      aria-label="Apex Digital Logo"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <style>
        {`
          .triangle-path {
            animation: pulsePath 3s infinite ease-in-out;
            transform-origin: center;
          }
          @keyframes pulsePath {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.8; }
          }
        `}
      </style>
      <path
        className="triangle-path"
        fill="url(#logoGradient)"
        d="M50 10 L90 80 L10 80 Z"
      />
      <circle cx="50" cy="50" r="15" fill="hsl(var(--background))" />
      <circle cx="50" cy="50" r="10" fill="url(#logoGradient)" />
    </svg>
  );
}
