import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function DirectorCardSkeleton() {
  return (
    <Card className="w-full overflow-hidden border-border/50 bg-card/50">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Lado Izquierdo (Imagen + Texto) */}
          <div className="flex flex-col border-r border-border/40">
            {/* Imagen Skeleton */}
            <Skeleton className="h-48 w-full rounded-none bg-muted/50" />

            <div className="p-6 space-y-4">
              <div className="flex gap-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-20 w-full" />

              <div className="grid grid-cols-2 gap-3 mt-4">
                <Skeleton className="h-16 w-full rounded-md" />
                <Skeleton className="h-16 w-full rounded-md" />
              </div>
            </div>
          </div>

          {/* Lado Derecho (Datos Técnicos) */}
          <div className="p-6 bg-secondary/10 space-y-6">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
            <Skeleton className="h-10 w-full rounded border border-indigo-500/20" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
