
import ContactForm from '@/components/shared/contact-form';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import SectionHeader from '@/components/layout/section-header';
import PageTransition from '@/components/layout/page-transition'; // Added

export default function ContactPage() {
  return (
    <>
      {/* Hero-like section - outside PageTransition */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-primary to-indigo-700 text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6 text-center animate-slide-up">
          <h1 className="text-5xl md:text-6xl font-bold font-headline mb-4">Get in Touch</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-balance">
            We&apos;re here to help and answer any question you might have. We look forward to hearing from you!
          </p>
        </div>
      </section>

      <PageTransition>
        <>
          {/* Content sections - inside PageTransition */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
              <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 animate-fade-in">
                  <h2 className="text-3xl font-bold font-headline mb-8 text-primary">Send Us a Message</h2>
                  <Card className="rounded-xl">
                    <CardContent className="p-6 md:p-8">
                      <ContactForm />
                    </CardContent>
                  </Card>
                </div>
                <div className="space-y-8 animate-fade-in" style={{animationDelay: '0.2s'}}>
                  <h2 className="text-3xl font-bold font-headline mb-8 text-primary">Contact Information</h2>
                  <Card className="rounded-xl">
                    <CardContent className="p-6 md:p-8 space-y-6">
                   
                      <div>
                        <h3 className="text-xl font-semibold font-headline flex items-center mb-2">
                          <Mail className="h-6 w-6 mr-3 text-accent" /> Email
                        </h3>
                        <a href="mailto:info@difinitydigital.com" className="text-muted-foreground hover:text-primary transition-colors">
                        info@difinitydigital.com
                        </a>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold font-headline flex items-center mb-2">
                          <Phone className="h-6 w-6 mr-3 text-accent" /> Phone
                        </h3>
                        <a href="tel:+919995099789" className="text-muted-foreground hover:text-primary transition-colors">
                        9995099789
                        </a>
                      </div>
                    </CardContent>
                  </Card>
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
              <SectionHeader title="Our Location" titleClassName="text-primary" />
              <Card className="rounded-xl shadow-xl overflow-hidden">
                <div className="aspect-video">
                  {/* In a real app, use @vis.gl/react-google-maps or similar */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3354.906983073769!2d-96.80058968481097!3d32.78159428098099!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e992f0f000001%3A0x0!2sDallas%2C%20TX!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border:0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    title="Praszo Location"
                    referrerPolicy="no-referrer-when-downgrade"
                    data-ai-hint="city map"
                  ></iframe>
                </div>
              </Card>
            </div>
          </section>
        </>
      </PageTransition>
    </>
  );
}
