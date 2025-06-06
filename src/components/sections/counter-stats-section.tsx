
'use client';

import StatDisplay from '@/components/shared/stat-display';
import SectionHeader from '@/components/layout/section-header';
import { motion } from 'framer-motion';
import { Briefcase, Smile, CheckCircle, Users } from 'lucide-react';

const stats = [
  {
    id: 'projects',
    value: 150,
    label: 'Projects Delivered',
    suffix: '+',
    icon: Briefcase,
  },
  {
    id: 'satisfaction',
    value: 98,
    label: 'Client Satisfaction',
    suffix: '%',
    icon: Smile,
  },
  {
    id: 'solutions',
    value: 50,
    label: 'Solutions Deployed',
    suffix: '+',
    icon: CheckCircle,
  },
  {
    id: 'experts',
    value: 25,
    label: 'Expert Team Members',
    suffix: '+',
    icon: Users,
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } },
};

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } // Custom ease for a bit of bounce
  },
};

export default function CounterStatsSection() {
  return (
    <motion.section
      className="py-16 md:py-24 bg-secondary"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          title="Our Achievements in Numbers"
          subtitle="We're proud of our journey and the impact we've made. Here's a glimpse of our milestones."
          titleClassName="text-primary"
        />
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {stats.map((stat) => (
            <motion.div key={stat.id} variants={itemVariants}>
              <StatDisplay
                value={stat.value}
                label={stat.label}
                suffix={stat.suffix}
                icon={stat.icon}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
