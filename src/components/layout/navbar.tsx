
'use client';

import Link from 'next/link';
import { Menu, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
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
  { href: '/contact', label: 'Get a Quote' }, // "Get a Quote" is now a regular nav item
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost"
                className="text-sm font-medium text-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-background transition-colors px-3 py-2 rounded-md flex items-center"
              >
                Menu <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <ul className="list-none p-0 m-0">
                {navItems.map((item) => (
                  item.subItems ? (
                    <li key={item.label} className="outline-none">
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="w-full justify-between px-2 py-1.5 text-sm rounded-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent hover:text-accent-foreground flex items-center">
                          <span>{item.label}</span>
                          <ChevronRight className="ml-auto h-4 w-4" />
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <ul className="list-none p-0 m-0">
                              {item.subItems.map((subItem) => (
                                <li key={subItem.href} className="outline-none">
                                  <DropdownMenuItem asChild>
                                    <Link href={subItem.href} className="w-full block px-2 py-1.5 text-sm rounded-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent hover:text-accent-foreground">
                                      {subItem.label}
                                    </Link>
                                  </DropdownMenuItem>
                                </li>
                              ))}
                            </ul>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                    </li>
                  ) : (
                    <li key={item.href || item.label} className="outline-none">
                      <DropdownMenuItem asChild>
                         <Link href={item.href!} className="w-full block px-2 py-1.5 text-sm rounded-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent hover:text-accent-foreground">
                           {item.label}
                        </Link>
                      </DropdownMenuItem>
                    </li>
                  )
                ))}
              </ul>
            </DropdownMenuContent>
          </DropdownMenu>
           <ThemeToggle />
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
                    <SheetClose asChild key={item.href || item.label}>
                      <Link
                        href={item.href!}
                        className={cn(
                          "block text-lg font-medium text-foreground hover:text-primary transition-colors py-1.5",
                          item.label === "Get a Quote" && "mt-3 pt-3 border-t border-border" // Add some styling for "Get a Quote"
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
