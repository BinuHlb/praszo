'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react'; // Removed X
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useState, useEffect } from 'react';
import AnimatedLogo from '@/components/icons/animated-logo';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/project-management-app', label: 'NexusFlow PM' },
  { href: '/products/web-development', label: 'Web Solutions' },
  { href: '/products/digital-marketing', label: 'Marketing' },
  { href: '/contact', label: 'Contact Us' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-card shadow-lg" : "bg-transparent"
      )}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6"> {/* Reduced height from h-20 to h-16 */}
        <Link href="/" className="flex items-center gap-2">
          <AnimatedLogo className="h-10 w-10" />
          <span className="text-2xl font-bold font-headline text-primary">Apex Digital</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors px-2 py-1 rounded-md"
            >
              {link.label}
            </Link>
          ))}
           <ThemeToggle />
           <Button asChild>
            <Link href="/contact">Get a Quote</Link>
          </Button>
        </nav>

        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-card p-6">
              <div className="mb-6 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <AnimatedLogo className="h-8 w-8" />
                  <span className="text-xl font-bold font-headline text-primary">Apex Digital</span>
                </Link>
                {/* Removed the explicit SheetClose button here, as SheetContent provides one */}
              </div>
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Button asChild className="mt-4">
                    <Link href="/contact">Get a Quote</Link>
                  </Button>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
