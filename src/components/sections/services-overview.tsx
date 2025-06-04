import { Zap, BarChart3, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const services = [
  {
    icon: Zap,
    title: 'Innovative Web Development',
    description: 'Custom-built websites and applications that are fast, scalable, and visually stunning.',
  },
  {
    icon: BarChart3,
    title: 'Strategic Digital Marketing',
    description: 'Data-driven marketing campaigns that boost your visibility and ROI.',
  },
  {
    icon: Users,
    title: 'Advanced Project Management',
    description: 'Our NexusFlow PM app streamlines workflows and enhances team collaboration.',
  },
];

export default function ServicesOverview() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-4">Why Choose Apex Digital?</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-balance">
            We combine cutting-edge technology with creative strategies to deliver solutions that not only meet but exceed expectations. Partner with us for digital excellence.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={service.title} 
              className="text-center h-full shadow-lg hover:shadow-xl transition-shadow animate-fade-in rounded-lg" // Transferred classes, ensured rounded-lg
              style={{ animationDelay: `${index * 0.15}s`}}
            >
              <CardHeader>
                <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground mb-4">
                  <service.icon size={32} />
                </div>
                <CardTitle className="text-xl font-headline">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
