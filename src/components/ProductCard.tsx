
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Package } from "lucide-react";
import { Product } from "@/types";
import { useProducts } from "@/contexts/ProductContext";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useProducts();
  const { toast } = useToast();

  const handleAddToCart = () => {
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

  const formatCategory = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <Card className="group hover:shadow-automotive transition-all duration-300 hover:scale-105">
      <CardContent className="p-4">
        <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
          <img 
            src={product.image_url} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-automotive-dark line-clamp-2 flex-1">
              {product.name}
            </h3>
            <Badge className={getCategoryColor(product.category)}>
              {formatCategory(product.category)}
            </Badge>
          </div>
          
          <p className="text-sm text-automotive-gray line-clamp-2">
            {product.description}
          </p>
          
          <div className="text-xs text-automotive-gray">
            <p><strong>Part #:</strong> {product.part_number}</p>
          </div>
          
          <div className="text-xs text-automotive-gray">
            <p><strong>Compatible:</strong> {product.compatible_vehicles}</p>
          </div>
          
          <div className="flex items-center gap-2 pt-2">
            <Package className="w-4 h-4 text-automotive-gray" />
            <span className="text-sm text-automotive-gray">
              {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : 'Out of stock'}
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <div className="w-full space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-automotive-orange">
              R{product.price.toFixed(2)}
            </span>
          </div>
          
          <Button 
            variant="automotive" 
            className="w-full"
            onClick={handleAddToCart}
            disabled={product.stock_quantity === 0}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {product.stock_quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
