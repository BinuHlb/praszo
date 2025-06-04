import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Skeleton */}
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-32" />
          <div className="hidden md:flex space-x-4">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-10 w-24" />
          </div>
          <Skeleton className="h-8 w-8 md:hidden" />
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-grow container mx-auto px-4 md:px-6 py-12">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <Skeleton className="h-12 w-3/4 mx-auto" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
            <Skeleton className="h-10 w-40 mx-auto mt-4" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Skeleton className="h-64 rounded-lg" />
            <Skeleton className="h-64 rounded-lg" />
            <Skeleton className="h-64 rounded-lg" />
          </div>
          <div>
            <Skeleton className="h-8 w-1/3 mb-4" />
            <Skeleton className="h-48 w-full rounded-lg" />
          </div>
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="bg-secondary py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
          </div>
          <Skeleton className="h-6 w-1/2 mx-auto mt-8" />
        </div>
      </div>
    </div>
  );
}
