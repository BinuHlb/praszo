
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { ThemeProvider } from 'next-themes';
// import PageTransition from '@/components/layout/page-transition'; // Removed

export const metadata: Metadata = {
  title: 'Praszo - Innovative Digital Solutions',
  description: 'Praszo offers cutting-edge project management software, bespoke web development, and strategic digital marketing services to elevate your business.',
  keywords: ['digital agency', 'project management', 'web development', 'digital marketing', 'Praszo'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Updated font import: Manrope for headlines, Lato for body */}
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@700;800&family=Lato:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-grow"> {/* Removed position: relative */}
            {/* PageTransition removed from here */}
            {children}
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
