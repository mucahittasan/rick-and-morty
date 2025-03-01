import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <Skeleton className="mx-auto mb-2 h-10 w-64" />
        <Skeleton className="mx-auto h-5 w-80" />
      </div>

      <div className="mb-8">
        <Skeleton className="h-20 w-full rounded-lg" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="flex flex-col">
            <Skeleton className="aspect-square w-full rounded-t-lg" />
            <div className="space-y-3 p-4">
              <Skeleton className="h-6 w-3/4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
