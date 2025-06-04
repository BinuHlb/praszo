
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
import { useState, useEffect, useRef } from 'react';
import AnimatedLogo from '@/components/icons/animated-logo';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

// Define navigation structures
const mainNavLinks: Array<{ href: string; label: string }> = [
  { href: '/', label: 'Home' },
  { href: '/contact', label: 'Contact Us' },
];

const dropdownNavLinks: Array<{ href?: string; label: string; subItems?: Array<{ href: string; label: string }> }> = [
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
  ...dropdownNavLinks.flatMap(item => item.subItems ? [{label: item.label, isGroupLabel: true, href: undefined}, ...item.subItems] : [item]),
  ctaLink,
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
    }, 200); // Adjust delay as needed (e.g., 200ms)
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

  const isMenuDropdownActive = dropdownNavLinks.some(
    (item) =>
      (item.href && pathname === item.href) ||
      (item.subItems && item.subItems.some((subItem) => pathname === subItem.href))
  );

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
                  "text-sm font-medium text-foreground hover:text-primary hover:bg-transparent px-3 py-2 flex items-center",
                  (isMenuDropdownActive || isMenuDropdownOpen) && "text-primary" 
                )}
              >
                <a href="#" onClick={(e) => e.preventDefault()} aria-label="Open menu">
                  Menu <ChevronDown className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="w-56"
              onMouseEnter={handleMenuMouseEnter}
              onMouseLeave={handleMenuMouseLeave}
            >
              <ul className="list-none p-0 m-0">
                {dropdownNavLinks.map((item) =>
                  item.subItems ? (
                    <li key={item.label} className="outline-none">
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger className={cn(
                          "w-full justify-between px-2 py-1.5 text-sm rounded-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent hover:text-accent-foreground flex items-center",
                           item.subItems.some(sub => pathname === sub.href) && "bg-accent text-accent-foreground" // Highlight sub-trigger if a sub-item is active
                        )}>
                          <span>{item.label}</span>
                          {/* ChevronRight is automatically added by DropdownMenuSubTrigger */}
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <ul className="list-none p-0 m-0">
                              {item.subItems.map((subItem) => (
                                <li key={subItem.label} className="outline-none">
                                  <DropdownMenuItem asChild>
                                    <Link 
                                      href={subItem.href} 
                                      className={cn(
                                        "w-full block px-2 py-1.5 text-sm rounded-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent hover:text-accent-foreground",
                                        pathname === subItem.href && "text-primary bg-accent"
                                      )}
                                    >
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
                    <li key={item.label} className="outline-none">
                      <DropdownMenuItem asChild>
                         <Link 
                           href={item.href!} 
                           className={cn(
                            "w-full block px-2 py-1.5 text-sm rounded-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent hover:text-accent-foreground",
                            pathname === item.href && "text-primary bg-accent"
                           )}
                         >
                           {item.label}
                        </Link>
                      </DropdownMenuItem>
                    </li>
                  )
                )}
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

