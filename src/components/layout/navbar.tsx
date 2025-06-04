
'use client';

import Link from 'next/link';
import { Menu, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState, useEffect } from 'react';
import AnimatedLogo from '@/components/icons/animated-logo';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { cn } from '@/lib/utils';

const navItems: Array<{ href?: string; label: string; subItems?: Array<{ href: string; label: string }> }> = [
  { href: '/', label: 'Home' },
  { href: '/practice', label: 'Practice' },
  {
    label: 'Services',
    subItems: [
      { href: '/products/web-development', label: 'Web Solutions' },
      { href: '/products/digital-marketing', label: 'Marketing' },
    ],
  },
  { href: '/products/verify', label: 'Verify' },
  { href: '/products/modify', label: 'Modify' },
  { href: '/products/docs', label: 'Docs' },
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
        "sticky top-0 z-50 w-full transition-all duration-300 h-16",
        isScrolled ? "bg-card shadow-lg" : "bg-transparent"
      )}>
      <div className="container mx-auto flex h-full items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <AnimatedLogo className="h-10 w-10" />
          <span className="text-2xl font-bold font-headline text-primary">Apex Digital</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => (
            item.subItems ? (
              <DropdownMenu key={item.label}>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    asChild /* Ensure Button passes props to its child 'a' tag */
                    className="text-sm font-medium text-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-background transition-colors px-3 py-2 rounded-md flex items-center"
                  >
                    {/* This 'a' tag will receive props from Button and DropdownMenuTrigger */}
                    <a href="#" onClick={(e) => e.preventDefault()} 
                       className="flex items-center"> {/* Added flex items-center here too */}
                      {item.label} <ChevronDown className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <ul className="list-none p-0 m-0">
                    {item.subItems.map((subItem) => (
                      <li key={subItem.href} className="outline-none">
                        <DropdownMenuItem asChild>
                          <Link href={subItem.href} legacyBehavior passHref>
                            <a className="w-full block px-2 py-1.5 text-sm rounded-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent hover:text-accent-foreground">
                              {subItem.label}
                            </a>
                          </Link>
                        </DropdownMenuItem>
                      </li>
                    ))}
                  </ul>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" asChild className="text-sm font-medium text-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-background transition-colors px-3 py-2 rounded-md">
                <Link href={item.href!} legacyBehavior passHref>
                  <a>{item.label}</a>
                </Link>
              </Button>
            )
          ))}
           <ThemeToggle />
           <Button asChild className="ml-2">
            <Link href="/contact" legacyBehavior passHref>
              <a>Get a Quote</a>
            </Link>
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
              <div className="mb-6 flex items-center">
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <AnimatedLogo className="h-8 w-8" />
                  <span className="text-xl font-bold font-headline text-primary">Apex Digital</span>
                </Link>
              </div>
              <nav className="flex flex-col space-y-1">
                {navItems.flatMap((item) => {
                  if (item.subItems) {
                    const groupLabel = (
                      <div key={`${item.label}-group-header`} className="px-0 pt-3 pb-1 text-sm font-semibold text-muted-foreground">
                        {item.label}
                      </div>
                    );
                    const subLinks = item.subItems.map(subItem => (
                      <SheetClose asChild key={subItem.href}>
                        <Link
                          href={subItem.href}
                          className="block text-lg font-medium text-foreground hover:text-primary transition-colors py-1.5 pl-4"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subItem.label}
                        </Link>
                      </SheetClose>
                    ));
                    return [groupLabel, ...subLinks];
                  }
                  return (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href!}
                        className="block text-lg font-medium text-foreground hover:text-primary transition-colors py-1.5"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  );
                })}
                <SheetClose asChild>
                  <Button asChild className="mt-4 w-full">
                    <Link href="/contact" legacyBehavior passHref>
                      <a onClick={() => setIsMobileMenuOpen(false)}>Get a Quote</a>
                    </Link>
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
