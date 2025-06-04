import Link from 'next/link';
import { Github, Linkedin, Twitter, Phone, Mail, MapPin } from 'lucide-react';
import AnimatedLogo from '@/components/icons/animated-logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {/* Column 1: Apex Digital & Socials */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 mb-2">
              <AnimatedLogo className="h-10 w-10 text-primary" />
              <span className="text-2xl font-bold font-headline text-primary">Apex Digital</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Elevating businesses with innovative digital solutions and strategic insights to achieve market leadership.
            </p>
            <div className="flex space-x-3 pt-2">
              <Link href="#" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10">
                <Github size={22} />
              </Link>
              <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10">
                <Linkedin size={22} />
              </Link>
              <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10">
                <Twitter size={22} />
              </Link>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h3 className="text-lg font-semibold font-headline mb-4 text-primary">Explore</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/project-management-app" className="hover:text-primary transition-colors">NexusFlow PM</Link></li>
              <li><Link href="/products/web-development" className="hover:text-primary transition-colors">Web Solutions</Link></li>
              <li><Link href="/products/digital-marketing" className="hover:text-primary transition-colors">Digital Marketing</Link></li>
              <li><Link href="/project-management-app#demo" className="hover:text-primary transition-colors">Interactive Demo</Link></li>
            </ul>
          </div>

          {/* Column 3: Get In Touch & Legal */}
          <div>
            <h3 className="text-lg font-semibold font-headline mb-4 text-primary">Get In Touch</h3>
            <ul className="space-y-3 text-sm mb-6">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2.5 mt-0.5 text-accent flex-shrink-0" />
                <span className="text-muted-foreground">123 Innovation Drive, <br />Tech City, TX 75001, USA</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2.5 text-accent flex-shrink-0" />
                <a href="mailto:contact@apexdigital.agency" className="text-muted-foreground hover:text-primary transition-colors">
                  contact@apexdigital.agency
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2.5 text-accent flex-shrink-0" />
                <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
            <h3 className="text-md font-semibold font-headline mb-3 text-primary/90">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Apex Digital. All rights reserved. Designed with passion.</p>
        </div>
      </div>
    </footer>
  );
}
