
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar Skeleton */}
      <header className="sticky top-0 z-50 w-full h-16 bg-card/80 backdrop-blur-md shadow-lg border-b border-border/30">
        <div className="container mx-auto flex h-full items-center justify-between px-4 md:px-6">
          <Skeleton className="h-8 w-28" /> {/* Logo */}
          <nav className="hidden md:flex flex-1 items-center justify-between mx-4 sm:mx-6 lg:mx-8">
            <Skeleton className="h-6 w-20" /> {/* Menu Dropdown Trigger */}
            <div className="flex items-center space-x-1">
              <Skeleton className="h-6 w-16" /> {/* Home */}
              <Skeleton className="h-6 w-20" /> {/* About Us */}
              <Skeleton className="h-6 w-24" /> {/* Contact Us */}
            </div>
          </nav>
          <div className="hidden md:flex items-center space-x-2">
            <Skeleton className="h-10 w-28" /> {/* Get a Quote Button */}
            <Skeleton className="h-10 w-10 rounded-md" /> {/* Theme Toggle */}
          </div>
          <div className="md:hidden flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-md" /> {/* Theme Toggle Mobile */}
            <Skeleton className="h-8 w-8" /> {/* Mobile Menu Trigger */}
          </div>
        </div>
      </header>

      {/* Main Content Skeleton */}
      <main className="flex-grow">
        {/* Hero Section Skeleton */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-background to-secondary">
          <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-5/6" />
              <div className="flex flex-col sm:flex-row gap-4">
                <Skeleton className="h-12 w-48" />
                <Skeleton className="h-12 w-40" />
              </div>
              <div className="mt-8 pt-6 border-t border-border/50">
                <Skeleton className="h-6 w-1/2 mb-3" />
                <div className="flex flex-col sm:flex-row gap-3 items-start">
                  <Skeleton className="h-11 flex-grow" />
                  <Skeleton className="h-11 w-32" />
                </div>
                <Skeleton className="h-4 w-1/3 mt-2" />
              </div>
            </div>
            <div>
              <Skeleton className="aspect-[4/3] w-full rounded-xl" />
            </div>
          </div>
        </section>

        {/* Product List Skeleton */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-12 text-center">
              <Skeleton className="h-10 w-1/2 mx-auto mb-4" />
              <Skeleton className="h-6 w-3/4 mx-auto" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="rounded-xl border bg-card p-0 overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-6 space-y-3">
                    <Skeleton className="h-7 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-10 w-full mt-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Overview Skeleton */}
        <section className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-12 text-center">
              <Skeleton className="h-10 w-1/2 mx-auto mb-4" />
              <Skeleton className="h-6 w-3/4 mx-auto" />
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="rounded-xl border bg-card p-6 text-center">
                  <Skeleton className="h-16 w-16 rounded-full mx-auto mb-4" />
                  <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
                  <Skeleton className="h-4 w-full mx-auto" />
                  <Skeleton className="h-4 w-5/6 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Placeholder for other sections like Interactive Demo / Questionnaire */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-12 text-center">
              <Skeleton className="h-10 w-1/2 mx-auto mb-4" />
              <Skeleton className="h-6 w-3/4 mx-auto" />
            </div>
            <div className="max-w-3xl mx-auto">
                <Skeleton className="h-96 w-full rounded-xl" />
            </div>
          </div>
        </section>


      </main>

      {/* Footer Skeleton */}
      <footer className="bg-accent text-accent-foreground py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            <div className="space-y-4">
              <Skeleton className="h-10 w-32 mb-2" /> {/* Logo */}
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <div className="flex space-x-3 pt-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </div>
            <div>
              <Skeleton className="h-6 w-1/3 mb-4" />
              <div className="space-y-2.5">
                {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-4 w-3/4" />)}
              </div>
            </div>
            <div>
              <Skeleton className="h-6 w-1/2 mb-4" />
              <div className="space-y-3 mb-6">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
              <Skeleton className="h-5 w-1/4 mb-3" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          </div>
          <div className="border-t border-accent-foreground/20 pt-8 text-center">
            <Skeleton className="h-5 w-1/2 mx-auto" />
          </div>
        </div>
      </footer>
    </div>
  );
}

    