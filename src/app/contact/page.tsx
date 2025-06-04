import ContactForm from '@/components/shared/contact-form';
import { Mail, Phone, MapPin } from 'lucide-react';
import AnimatedBorderBox from '@/components/ui/animated-border-box';

export default function ContactPage() {
  return (
    <>
      <section className="py-20 md:py-28 bg-gradient-to-b from-primary to-indigo-700 text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6 text-center animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Get in Touch</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-balance">
            We&apos;re here to help and answer any question you might have. We look forward to hearing from you!
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 animate-fade-in">
              <h2 className="text-3xl font-bold font-headline mb-8 text-primary">Send Us a Message</h2>
              <AnimatedBorderBox borderRadius="rounded-xl">
                <div className="p-6 md:p-8 bg-card rounded-xl shadow-xl"> {/* Adjusted padding */}
                  <ContactForm />
                </div>
              </AnimatedBorderBox>
            </div>
            <div className="space-y-8 animate-fade-in" style={{animationDelay: '0.2s'}}>
              <h2 className="text-3xl font-bold font-headline mb-8 text-primary">Contact Information</h2>
              <AnimatedBorderBox borderRadius="rounded-xl">
                <div className="p-6 md:p-8 bg-card rounded-xl shadow-xl space-y-6"> {/* Adjusted padding */}
                  <div>
                    <h3 className="text-xl font-semibold font-headline flex items-center mb-2">
                      <MapPin className="h-6 w-6 mr-3 text-accent" /> Address
                    </h3>
                    <p className="text-muted-foreground">123 Innovation Drive<br />Tech City, TX 75001, USA</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold font-headline flex items-center mb-2">
                      <Mail className="h-6 w-6 mr-3 text-accent" /> Email
                    </h3>
                    <a href="mailto:contact@apexdigital.agency" className="text-muted-foreground hover:text-primary transition-colors">
                      contact@apexdigital.agency
                    </a>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold font-headline flex items-center mb-2">
                      <Phone className="h-6 w-6 mr-3 text-accent" /> Phone
                    </h3>
                    <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors">
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>
              </AnimatedBorderBox>
              <div className="mt-8">
                 <h3 className="text-xl font-semibold font-headline mb-4 text-primary">Business Hours</h3>
                 <p className="text-muted-foreground">Monday - Friday: 9 AM - 6 PM (CST)</p>
                 <p className="text-muted-foreground">Saturday - Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </section>
       <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold font-headline text-center mb-8 text-primary">Our Location</h2>
          <AnimatedBorderBox borderRadius="rounded-xl">
            <div className="aspect-video overflow-hidden rounded-xl shadow-xl">
              {/* In a real app, use @vis.gl/react-google-maps or similar */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3354.906983073769!2d-96.80058968481097!3d32.78159428098099!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e992f0f000001%3A0x0!2sDallas%2C%20TX!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border:0 }}
                allowFullScreen={false}
                loading="lazy"
                title="Apex Digital Location"
                referrerPolicy="no-referrer-when-downgrade"
                data-ai-hint="city map"
              ></iframe>
            </div>
          </AnimatedBorderBox>
        </div>
      </section>
    </>
  );
}
