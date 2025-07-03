
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
<section className="py-16 md:py-24 bg-background ">
  <div className="container grid md:grid-cols-2 lg:grid-cols-2 gap-8 mx-auto px-4 md:px-6">

    {/* Sticky & Vertically Centered SectionHeader */}
    <div className="sticky top-24 h-[80vh] flex items-center self-start">
     <div className=" section-title">
<svg className="logo-part part1" viewBox="0 0 69 90" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M69 31.8139C69 31.8139 69 31.8811 68.9846 32H31.7631L2 0H40.1944C40.1944 0 69.0768 1.05993 68.9949 31.819L69 31.8139Z" fill="#5C49F7"/>
  </svg>

  <svg className="logo-part part2" viewBox="0 0 69 90" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M69 32C68.9084 34.6735 66.2012 65.1516 32 62.8791V32H69Z" fill="#2F248B"/>
  </svg>

  <svg className="logo-part part3" viewBox="0 0 69 90" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 63.5911V90H32V32C14.3305 32 0 46.1478 0 63.5911Z" fill="#A19CFF"/>
  </svg>
  
      <SectionHeader
        textAlignment="left"
        title="Our Core Offerings"
        subtitle="Discover our suite of products and services designed to empower your business and drive success in the digital landscape."
      />
    </div>
</div>
    {/* Product Cards */}
    <motion.div
      className="grid grid-cols-1 gap-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={itemVariants}>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
    
  </div>
</section>


  );
}
