import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { CaseStudy } from '@/lib/types';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

export default function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  return (
    <Card className="h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl"> {/* Transferred h-full, set rounded-xl */}
      <CardHeader className="p-0">
        <Image
          src={caseStudy.image}
          alt={caseStudy.title}
          width={400}
          height={250}
          className="w-full h-48 object-cover"
          data-ai-hint={caseStudy.dataAiHint}
        />
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="text-xl font-headline mb-1">{caseStudy.title}</CardTitle>
        <CardDescription className="text-sm text-primary mb-3">Client: {caseStudy.clientName}</CardDescription>
        <div className="space-y-2 text-sm">
          <p><strong>Problem:</strong> {caseStudy.problem}</p>
          <p><strong>Solution:</strong> {caseStudy.solution}</p>
          <p><strong>Results:</strong> <span className="font-semibold text-accent">{caseStudy.results}</span></p>
        </div>
      </CardContent>
    </Card>
  );
}
