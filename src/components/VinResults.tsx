
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Car, Wrench, ShoppingCart } from "lucide-react";
import { Product } from "@/types";
import { useProducts } from "@/contexts/ProductContext";
import { useToast } from "@/hooks/use-toast";

interface VinResultsProps {
  vinNumber: string;
  vehicleInfo: {
    make: string;
    model: string;
    year: string;
    engine: string;
  };
  compatibleParts: Product[];
  onClose: () => void;
}

const VinResults = ({ vinNumber, vehicleInfo, compatibleParts, onClose }: VinResultsProps) => {
  const { addToCart } = useProducts();
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'engine': 'bg-red-100 text-red-800',
      'suspension': 'bg-blue-100 text-blue-800',
      'braking': 'bg-orange-100 text-orange-800',
      'electrical': 'bg-yellow-100 text-yellow-800',
      'body': 'bg-green-100 text-green-800',
      'transmission': 'bg-purple-100 text-purple-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Vehicle Information */}
      <Card className="bg-automotive-blue-light border-automotive-blue">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="w-5 h-5 text-automotive-blue" />
            Vehicle Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-automotive-gray">VIN Number</p>
              <p className="font-mono font-semibold">{vinNumber}</p>
            </div>
            <div>
              <p className="text-sm text-automotive-gray">Vehicle</p>
              <p className="font-semibold">{vehicleInfo.year} {vehicleInfo.make} {vehicleInfo.model}</p>
            </div>
            <div>
              <p className="text-sm text-automotive-gray">Engine</p>
              <p className="font-semibold">{vehicleInfo.engine}</p>
            </div>
            <div>
              <p className="text-sm text-automotive-gray">Compatible Parts Found</p>
              <p className="font-semibold text-automotive-blue">{compatibleParts.length} parts</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compatible Parts */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-automotive-dark flex items-center gap-2">
            <Wrench className="w-6 h-6 text-automotive-blue" />
            Compatible Parts
          </h3>
          <Button variant="automotive-outline" onClick={onClose}>
            Search Again
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {compatibleParts.map((product) => (
            <Card key={product.id} className="hover:shadow-automotive transition-all duration-300">
              <CardContent className="p-4">
                <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                  <img 
                    src={product.image_url} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-automotive-dark line-clamp-2 flex-1">
                      {product.name}
                    </h4>
                    <Badge className={getCategoryColor(product.category)}>
                      {product.category}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-automotive-gray line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="text-xs text-automotive-gray">
                    <p><strong>Part #:</strong> {product.part_number}</p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xl font-bold text-automotive-orange">
                      R{product.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-automotive-gray">
                      {product.stock_quantity} in stock
                    </span>
                  </div>
                  
                  <Button 
                    variant="automotive" 
                    className="w-full mt-3"
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock_quantity === 0}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VinResults;
