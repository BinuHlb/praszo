
'use client';

import Link from 'next/link';
import Image from 'next/image'; // Added for mega menu
import { Menu, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  // DropdownMenuSub, // No longer needed for desktop mega menu
  // DropdownMenuSubTrigger, // No longer needed for desktop mega menu
  // DropdownMenuSubContent, // No longer needed for desktop mega menu
  // DropdownMenuPortal, // No longer needed for desktop mega menu
} from "@/components/ui/dropdown-menu";
import { useState, useEffect, useRef } from 'react';
import AnimatedLogo from '@/components/icons/animated-logo';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { getProductBySlug } from '@/data/mock-data'; // Added
import type { Product } from '@/lib/types'; // Added

// Define navigation structures
const mainNavLinks: Array<{ href: string; label: string }> = [
  { href: '/', label: 'Home' },
  { href: '/contact', label: 'Contact Us' },
];

// For Mobile Menu - keeping the original dropdown structure for "Services"
const mobileDropdownNavLinks: Array<{ href?: string; label: string; subItems?: Array<{ href: string; label: string }> }> = [
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
];

const ctaLink = { href: '/contact', label: 'Get a Quote' };

// For mobile menu, combine all items.
const allNavItemsForMobile = [
  ...mainNavLinks,
  ...mobileDropdownNavLinks.flatMap(item => item.subItems ? [{label: item.label, isGroupLabel: true, href: undefined}, ...item.subItems] : [item]),
  ctaLink,
];

interface MegaMenuItem {
  href: string;
  label: string;
  image: string;
  dataAiHint: string;
  description: string;
}

const productSlugsForMegaMenu = [
  'practice',
  'web-development',
  'digital-marketing',
  'verify',
  'modify',
  'docs'
];

const megaMenuItems: MegaMenuItem[] = productSlugsForMegaMenu.map(slug => {
  const product = getProductBySlug(slug);
  if (!product) {
    return { 
      href: `/${slug}`, 
      label: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), // Basic title case
      image: 'https://placehold.co/150x100.png', 
      dataAiHint: 'placeholder', 
      description: 'Product information coming soon.' 
    };
  }
  return {
    href: product.type === 'app' ? `/${product.slug}` : `/products/${product.slug}`,
    label: product.name,
    image: product.image,
    dataAiHint: product.dataAiHint,
    description: product.tagline,
  };
}).filter(Boolean) as MegaMenuItem[];


export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const [isMenuDropdownOpen, setIsMenuDropdownOpen] = useState(false);
  const menuDropdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMenuMouseEnter = () => {
    if (menuDropdownTimerRef.current) {
      clearTimeout(menuDropdownTimerRef.current);
    }
    setIsMenuDropdownOpen(true);
  };

  const handleMenuMouseLeave = () => {
    menuDropdownTimerRef.current = setTimeout(() => {
      setIsMenuDropdownOpen(false);
    }, 300);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (menuDropdownTimerRef.current) {
        clearTimeout(menuDropdownTimerRef.current);
      }
    };
  }, []);

  const isMenuDropdownActive = megaMenuItems.some(item => pathname === item.href);

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
            <Button
              key={link.label}
              variant="ghost"
              asChild
              className={cn(
                "text-sm font-medium text-foreground hover:text-primary hover:bg-transparent px-3 py-2",
                pathname === link.href && "text-primary"
              )}
            >
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}

          <DropdownMenu open={isMenuDropdownOpen} onOpenChange={setIsMenuDropdownOpen}>
            <DropdownMenuTrigger asChild
              onMouseEnter={handleMenuMouseEnter}
              onMouseLeave={handleMenuMouseLeave}
            >
              <Button
                variant="ghost"
                asChild
                className={cn(
                  "text-sm font-medium text-foreground hover:text-primary hover:bg-transparent px-3 py-2",
                  (isMenuDropdownActive || isMenuDropdownOpen) && "text-primary"
                )}
              >
                <a> {/* Button asChild makes this 'a' take button's role */}
                  Menu <ChevronDown className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-screen max-w-lg md:max-w-xl lg:max-w-2xl p-6 shadow-xl rounded-xl" // Adjusted for mega menu
              onMouseEnter={handleMenuMouseEnter}
              onMouseLeave={handleMenuMouseLeave}
              align="start" // Align to the start of the trigger
              sideOffset={10} // Give some space from the trigger
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8">
                {megaMenuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex flex-col items-start p-3 rounded-lg hover:bg-accent transition-colors"
                    onClick={() => setIsMenuDropdownOpen(false)} // Close menu on click
                  >
                    <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden mb-3 shadow-md">
                      <Image
                        src={item.image}
                        alt={item.label}
                        layout="fill"
                        objectFit="cover"
                        data-ai-hint={item.dataAiHint}
                        className="group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-md font-semibold font-headline text-popover-foreground group-hover:text-primary mb-1">{item.label}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                  </Link>
                ))}
              </div>
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
                {allNavItemsForMobile.map((item) => {
                  if ((item as any).isGroupLabel) {
                    return (
                      <div key={`${item.label}-group-header`} className="px-0 pt-3 pb-1 text-sm font-semibold text-muted-foreground">
                        {item.label}
                      </div>
                    );
                  }
                  return (
                    <SheetClose asChild key={item.label}>
                      <Link
                        href={item.href!}
                        className={cn(
                          "block text-lg font-medium text-foreground hover:text-primary transition-colors py-1.5",
                           item.href && pathname === item.href && "text-primary",
                           item.label === ctaLink.label && "mt-3 pt-3 border-t border-border"
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
