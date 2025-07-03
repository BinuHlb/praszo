
import Link from 'next/link';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Product } from '@/lib/types';
import { ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
   <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg hover:bg-primary/10  transition-shadow duration-300 rounded-xl">
  <CardContent className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
    
    {/* Title + Description Group */}
    <div className="md:col-span-3 flex flex-col">
      <CardTitle className="text-2xl text-primary font-headline mb-2">{product.name}</CardTitle>
      <p className="text-lg">{product.description}</p>
    </div>

    {/* Button */}
    <div className="flex justify-end h-full items-center">
      <Button asChild className="group">
        <Link href={`/products/${product.slug}`} legacyBehavior passHref>
          <a>
            <span className="flex items-center justify-end">
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
        </Link>
      </Button>
    </div>
    
  </CardContent>
</Card>


  );
}
