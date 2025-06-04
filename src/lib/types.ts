
export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  features?: { title: string, description: string, icon?: React.ElementType }[];
  image: string; // URL
  dataAiHint: string;
  caseStudies?: CaseStudy[];
  testimonials?: Testimonial[];
  interactiveDemo?: {
    title: string;
    description: string;
    imageUrl?: string;
    dataAiHint?: string;
    link?: string; // Link to a demo page or Codepen etc.
  };
  type: 'app' | 'service';
  slug: string;
}

export interface CaseStudy {
  id:string;
  title: string;
  clientName: string;
  problem: string;
  solution: string;
  results: string;
  image: string;
  dataAiHint: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  company: string;
  authorImage?: string;
  dataAiHint?: string;
}
