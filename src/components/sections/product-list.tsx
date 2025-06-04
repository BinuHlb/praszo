import ProductCard from '@/components/shared/product-card';
import { products } from '@/data/mock-data';
import SectionHeader from '@/components/layout/section-header';

export default function ProductList() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader 
          title="Our Core Offerings"
          subtitle="Discover our suite of products and services designed to empower your business and drive success in the digital landscape."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s`}}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
