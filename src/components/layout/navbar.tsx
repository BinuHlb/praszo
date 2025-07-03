
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, ChevronDown, ChevronRight } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect, useRef } from 'react';
import AnimatedLogo from '@/components/icons/animated-logo';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { getProductBySlug } from '@/data/mock-data';
import type { Product } from '@/lib/types';


// Define navigation structures
const mainNavLinks: Array<{ href: string; label: string }> = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact Us' },
];

interface MegaMenuItem {
  href: string;
  label: string;
  image: string;
  dataAiHint: string;
  description: string; // Tagline
}

// Slugs for products/services to be included in the mega menu
const productSlugsForMegaMenu = [
  'practice',
  'web-development',
  'digital-marketing',
  'verify',
  'modify',
  'docs'
];

// Dynamically create mega menu items from product data
const megaMenuItems: MegaMenuItem[] = productSlugsForMegaMenu.map(slug => {
  const product = getProductBySlug(slug);
  if (!product) {
    return {
      href: slug.startsWith('http') ? slug : `/products/${slug}`, // Basic href generation
      label: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), // Generate a label from slug
      image: 'https://placehold.co/150x100.png', // Placeholder image
      dataAiHint: 'placeholder', // Placeholder AI hint
      description: 'Product information coming soon.' // Placeholder description
    };
  }
  return {
    href: `/products/${product.slug}`,
    label: product.name,
    image: product.image,
    dataAiHint: product.dataAiHint,
    description: product.tagline,
  };
}).filter(Boolean) as MegaMenuItem[];


const ctaLink = { href: '/contact', label: 'Get a Quote' };


// Combine all navigation elements for the mobile menu
const navItemsForMobileBase = mainNavLinks.filter(link => {
  // If ctaLink also points to /contact, don't include mainNavLinks's /contact to avoid duplicate labels
  if (link.href === '/contact' && ctaLink.href === '/contact') {
    return false;
  }
  return true;
});

const allNavItemsForMobile = [
  ...navItemsForMobileBase, // Includes Home, About Us. May include Contact Us if ctaLink target is different.
  { label: 'Our Offerings', isGroupLabel: true, href: undefined }, // Group label for products/services
  ...megaMenuItems.map(item => ({ href: item.href, label: item.label })), // All products/services
  ctaLink, // The primary CTA / Contact link for mobile
];


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
    }, 300); // 300ms delay
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial state
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (menuDropdownTimerRef.current) {
        clearTimeout(menuDropdownTimerRef.current);
      }
    };
  }, []);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const pathMatchesMegaMenu = mounted ? megaMenuItems.some(item => pathname === item.href) : false;
  const isMenuDropdownActive = pathMatchesMegaMenu || (mounted && isMenuDropdownOpen);


  return (
    <header className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 h-16 ",
        isScrolled ? "bg-black/80 backdrop-blur-md " : "bg-black"
      )}>
      <div className="container mx-auto flex h-full items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <AnimatedLogo />
        </Link>

        <nav className="hidden md:flex flex-1 items-center justify-between mx-4 sm:mx-6 lg:mx-8">
          {/* Mega Menu Dropdown - Aligned to the left within the nav space */}
          <DropdownMenu open={isMenuDropdownOpen} onOpenChange={setIsMenuDropdownOpen} modal={false}>
            <DropdownMenuTrigger
              onMouseEnter={handleMenuMouseEnter}
              onMouseLeave={handleMenuMouseLeave}
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                "text-sm font-medium text-white/80 px-3 py-2",
                "hover:text-primary hover:bg-transparent", // Only change text color on hover
                mounted && isMenuDropdownActive && "text-primary"
              )}
            >
              <span className="flex items-center">
                 Menu <ChevronDown className="ml-1 h-4 w-4" />
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-screen left-0 bg-background shadow-xl border-t data-[side=bottom]:slide-in-from-top-4"
              sideOffset={4}
              onMouseEnter={handleMenuMouseEnter}
              onMouseLeave={handleMenuMouseLeave}
            >
              <div className="container mx-auto px-4 md:px-6 py-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-8">
                  {megaMenuItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={cn(
                        "group flex flex-col items-start p-3 rounded-lg hover:bg-primary/10 transition-colors",
                        pathname === item.href && "bg-primary/10"
                      )}
                      onClick={() => setIsMenuDropdownOpen(false)}
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
                      <h3 className={cn(
                        "text-md font-semibold font-headline text-popover-foreground group-hover:text-primary mb-1",
                        pathname === item.href && "text-primary"
                      )}>{item.label}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Grouped "Home", "About Us", "Contact Us" links, aligned to the right */}
          <div className="flex items-center space-x-1">
            {mainNavLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'default' }),
                  "text-sm text-white/80 font-medium hover:bg-transparent hover:text-primary", // only text color change on hover
                  pathname === link.href && "text-primary"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
          <Button asChild className="text-sm font-medium">
            <Link href={ctaLink.href}>
              {ctaLink.label}
            </Link>
          </Button>
          <ThemeToggle />
        </div>


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
                  <AnimatedLogo />
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
