
'use client';

import { Zap, BarChart3, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SectionHeader from '@/components/layout/section-header';
import { motion } from 'framer-motion';

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
    description: 'Our Practice app streamlines workflows and enhances team collaboration.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    },
  },
};

export default function ServicesOverview() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          title="Why Choose Praszo?"
          subtitle="We combine cutting-edge technology with creative strategies to deliver solutions that not only meet but exceed expectations. Partner with us for digital excellence."
          titleClassName="text-accent-vibrant"
          subtitleClassName="text-secondary-foreground/90"
        />
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="h-full" // Ensure motion.div takes full height for card inside
            >
              <Card
                className="text-center h-full hover:shadow-lg transition-shadow rounded-lg media-object"
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

