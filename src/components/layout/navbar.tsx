
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, ChevronDown, ChevronRight } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button'; // Import buttonVariants
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
  // Fallback for cases where product might not be found, though ideally all slugs are valid
  if (!product) {
    return { 
      href: slug.startsWith('http') ? slug : (product?.type === 'app' ? `/${slug}` : `/products/${slug}`), // Basic href generation
      label: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), // Generate a label from slug
      image: 'https://placehold.co/150x100.png', // Placeholder image
      dataAiHint: 'placeholder', // Placeholder AI hint
      description: 'Product information coming soon.' // Placeholder description
    };
  }
  return {
    href: product.type === 'app' ? `/${product.slug}` : `/products/${product.slug}`,
    label: product.name,
    image: product.image,
    dataAiHint: product.dataAiHint,
    description: product.tagline,
  };
}).filter(Boolean) as MegaMenuItem[]; // Ensure no undefined items if any slug fails


const ctaLink = { href: '/contact', label: 'Get a Quote' };


// For mobile menu - combine all items.
const mobileDropdownNavLinks: Array<{ href?: string; label:string; subItems?: Array<{ href: string; label: string }> }> = [
  { href: '/practice', label: 'Practice' },
  {
    label: 'Services', // Group label for mobile
    subItems: [ // These match some of the mega menu items but are structured for mobile
      { href: '/products/web-development', label: 'Web Solutions' },
      { href: '/products/digital-marketing', label: 'Marketing' },
    ],
  },
  { href: '/products/verify', label: 'Verify' },
  { href: '/products/modify', label: 'Modify' },
  { href: '/products/docs', label: 'Docs' },
];


// Combine all navigation elements for the mobile menu
const allNavItemsForMobile = [
  ...mainNavLinks.filter(link => link.href !== '/contact'), // Avoid duplicate "Contact Us" if CTA link is different
  ...mobileDropdownNavLinks.flatMap(item => {
    if (item.subItems) {
      // For items with subItems (like "Services"), create a group label then list subItems
      return [{ label: item.label, isGroupLabel: true, href: undefined }, ...item.subItems];
    }
    return [item]; // For direct links
  }),
  // Add "Contact Us" if it wasn't already added (e.g., if CTA link is different)
  ...(mainNavLinks.some(link => link.href === '/contact' && ctaLink.href !== '/contact') ? [{href: '/contact', label: 'Contact Us'}] : []),
  ctaLink, // Add the CTA link at the end
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

  // Delay application of active state based on client-side info until mounted
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const pathMatchesMegaMenu = mounted ? megaMenuItems.some(item => pathname === item.href) : false;
  const isMenuDropdownActive = pathMatchesMegaMenu || (mounted && isMenuDropdownOpen);
  

  return (
    <header className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 h-16",
        isScrolled ? "bg-card/80 backdrop-blur-md shadow-lg border-b border-border/30" : "bg-transparent"
      )}>
      <div className="container mx-auto flex h-full items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <AnimatedLogo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 items-center justify-between mx-4 sm:mx-6 lg:mx-8">
          {/* Mega Menu Dropdown - Aligned to the left within the nav space */}
          <DropdownMenu open={isMenuDropdownOpen} onOpenChange={setIsMenuDropdownOpen} modal={false}>
            <DropdownMenuTrigger
              onMouseEnter={handleMenuMouseEnter}
              onMouseLeave={handleMenuMouseLeave}
              className={cn(
                buttonVariants({ variant: 'ghost' }), // Get base button styles
                "text-sm font-medium text-foreground hover:text-primary hover:bg-transparent px-3 py-2", // Specific overrides and original classes
                isMenuDropdownActive && "text-primary"
              )}
            >
              Menu <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-screen left-0 bg-background shadow-xl border-t data-[side=bottom]:slide-in-from-top-4" 
              sideOffset={4} 
              onMouseEnter={handleMenuMouseEnter}
              onMouseLeave={handleMenuMouseLeave}
            >
              <div className="container mx-auto px-4 md:px-6 py-6"> {/* Container for content alignment */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-8">
                  {megaMenuItems.map((item) => (
                    <Link
                      key={item.label} 
                      href={item.href}
                      className={cn(
                        "group flex flex-col items-start p-3 rounded-lg hover:bg-accent/50 transition-colors",
                        pathname === item.href && "bg-accent/50" 
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

          {/* Grouped Home and Contact Us links - Aligned to the right within the nav space */}
          <div className="flex items-center space-x-1">
            {mainNavLinks.length > 0 && (
              <Link
                key={mainNavLinks[0].label} // Home
                href={mainNavLinks[0].href}
                className={cn(
                  "text-sm font-medium text-foreground hover:text-primary hover:bg-transparent px-3 py-2 rounded-md transition-colors",
                  pathname === mainNavLinks[0].href && "text-primary"
                )}
              >
                {mainNavLinks[0].label}
              </Link>
            )}
            {mainNavLinks.length > 1 && (
              <Link
                key={mainNavLinks[1].label} // Contact Us
                href={mainNavLinks[1].href}
                className={cn(
                  "text-sm font-medium text-foreground hover:text-primary hover:bg-transparent px-3 py-2 rounded-md transition-colors",
                  pathname === mainNavLinks[1].href && "text-primary"
                )}
              >
                {mainNavLinks[1].label}
              </Link>
            )}
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
                  // Check if item is a group label (for 'Services' in mobile)
                  if ((item as any).isGroupLabel) { 
                    return (
                      <div key={`${item.label}-group-header`} className="px-0 pt-3 pb-1 text-sm font-semibold text-muted-foreground">
                        {item.label}
                      </div>
                    );
                  }
                  // Regular link item
                  return (
                    <SheetClose asChild key={item.label}>
                      <Link
                        href={item.href!} // Assert href is present for link items
                        className={cn(
                          "block text-lg font-medium text-foreground hover:text-primary transition-colors py-1.5",
                           item.href && pathname === item.href && "text-primary", // Active link styling
                           item.label === ctaLink.label && "mt-3 pt-3 border-t border-border" // Special styling for CTA
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

    