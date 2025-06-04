import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';
import AnimatedLogo from '@/components/icons/animated-logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <AnimatedLogo className="h-10 w-10 text-primary" />
              <span className="text-2xl font-bold font-headline text-primary">Apex Digital</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Elevating businesses with innovative digital solutions and strategic insights.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold font-headline mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/project-management-app" className="hover:text-primary transition-colors">NexusFlow PM</Link></li>
              <li><Link href="/products/web-development" className="hover:text-primary transition-colors">Web Solutions</Link></li>
              <li><Link href="/products/digital-marketing" className="hover:text-primary transition-colors">Digital Marketing</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold font-headline mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <Link href="#" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors"><Github size={24} /></Link>
              <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin size={24} /></Link>
              <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors"><Twitter size={24} /></Link>
            </div>
            <p className="text-sm">123 Innovation Drive, Tech City, TX 75001</p>
            <p className="text-sm">contact@apexdigital.agency</p>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Apex Digital. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
