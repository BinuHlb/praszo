import ProductCard from '@/components/shared/product-card';
import { products } from '@/data/mock-data';

export default function ProductList() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Our Core Offerings</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Discover our suite of products and services designed to empower your business and drive success in the digital landscape.
          </p>
        </div>
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
