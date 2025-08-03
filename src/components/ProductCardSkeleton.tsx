
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton = () => {
  return (
    <Card className="group">
      <CardContent className="p-4">
        <div className="aspect-square bg-gray-100 rounded-lg mb-4">
          <Skeleton className="w-full h-full rounded-lg" />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-5 w-16" />
          </div>
          
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          
          <div className="space-y-1">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
          
          <div className="flex items-center gap-2 pt-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <div className="w-full space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-20" />
          </div>
          
          <Skeleton className="h-10 w-full" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCardSkeleton;
