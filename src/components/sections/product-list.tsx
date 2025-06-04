
'use client';

import ProductCard from '@/components/shared/product-card';
import { products } from '@/data/mock-data';
import SectionHeader from '@/components/layout/section-header';
import { motion } from 'framer-motion';

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

export default function ProductList() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          title="Our Core Offerings"
          subtitle="Discover our suite of products and services designed to empower your business and drive success in the digital landscape."
        />
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
