
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

// Define navigation structures
const mainNavLinks: Array<{ href: string; label: string }> = [
  { href: '/', label: 'Home' },
  { href: '/contact', label: 'Contact Us' },
];

// This array is specifically for the "Menu" dropdown on desktop.
// It should NOT contain "Contact Us" or "Get a Quote".
const dropdownNavLinks: Array<{ href?: string; label: string; subItems?: Array<{ href: string; label: string }> }> = [
  { href: '/practice', label: 'Practice' },
  {
    label: 'Services', // This is a group label for the submenu
    subItems: [
      { href: '/products/web-development', label: 'Web Solutions' },
      { href: '/products/digital-marketing', label: 'Marketing' },
    ],
  },
  { href: '/products/verify', label: 'Verify' },
  { href: '/products/modify', label: 'Modify' },
  { href: '/products/docs', label: 'Docs' },
];

const ctaLink = { href: '/contact', label: 'Get a Quote' };

// For mobile menu, combine all items.
const allNavItemsForMobile = [
  ...mainNavLinks,
  ...dropdownNavLinks,
  ctaLink,
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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {mainNavLinks.map((link) => (
            <Button key={link.label} variant="ghost" asChild className="text-sm font-medium text-foreground hover:text-primary px-3 py-2">
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-sm font-medium text-foreground hover:text-primary px-3 py-2 flex items-center">
                Menu <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <ul className="list-none p-0 m-0">
                {dropdownNavLinks.map((item) => ( // This maps ONLY dropdownNavLinks
                  item.subItems ? (
                    <li key={item.label} className="outline-none"> {/* Key for "Services" group label */}
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="w-full justify-between px-2 py-1.5 text-sm rounded-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent hover:text-accent-foreground flex items-center">
                          <span>{item.label}</span>
                          <ChevronRight className="ml-auto h-4 w-4" />
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <ul className="list-none p-0 m-0">
                              {item.subItems.map((subItem) => (
                                <li key={subItem.href} className="outline-none"> {/* Key for service sub-item href */}
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
                     // Key for top-level dropdown item (e.g., Practice, Verify). item.label should be unique here.
                    <li key={item.label} className="outline-none">
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

          <Button asChild className="text-sm font-medium">
            <Link href={ctaLink.href} legacyBehavior passHref>
              <a>{ctaLink.label}</a>
            </Link>
          </Button>
          <ThemeToggle />
        </nav>

        {/* Mobile Menu Trigger and Content */}
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
                {allNavItemsForMobile.flatMap((item) => {
                  // Use item.label as key for top-level items in mobile, as labels should be unique.
                  // For "Services" sub-items, their hrefs are unique.
                  if (item.subItems && item.label === 'Services') { // Specifically handle "Services" group
                    const groupLabel = (
                      <div key={`${item.label}-group-header`} className="px-0 pt-3 pb-1 text-sm font-semibold text-muted-foreground">
                        {item.label}
                      </div>
                    );
                    const subLinks = item.subItems.map(subItem => (
                      <SheetClose asChild key={subItem.href}> {/* subItem.href is unique here */}
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
                  // For other items (Home, Contact Us, Practice, Verify, Modify, Docs, Get a Quote)
                  return (
                    <SheetClose asChild key={item.label}> {/* Use item.label as key */}
                      <Link
                        href={item.href!}
                        className={cn(
                          "block text-lg font-medium text-foreground hover:text-primary transition-colors py-1.5",
                          item.label === "Get a Quote" && "mt-3 pt-3 border-t border-border"
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
