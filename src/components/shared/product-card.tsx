import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Product } from '@/lib/types';
import { ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="h-full flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl"> {/* Transferred h-full, set rounded-xl */}
      <CardHeader className="p-0">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={250}
          className="w-full h-48 object-cover"
          data-ai-hint={product.dataAiHint}
        />
      </CardHeader>
      <CardContent className="p-6 flex flex-col flex-grow">
        <CardTitle className="text-2xl font-headline mb-2">{product.name}</CardTitle>
        <CardDescription className="text-muted-foreground mb-4 flex-grow">{product.tagline}</CardDescription>
        <p className="text-sm mb-6 flex-grow">{product.description}</p>
        <Button asChild className="mt-auto w-full group">
          <Link href={product.type === 'app' ? `/${product.slug}` : `/products/${product.slug}`}>
            <span className="flex items-center justify-center w-full">
              Learn More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
