
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Plus, Minus, Trash2, X } from "lucide-react";
import { useProducts } from "@/contexts/ProductContext";
import { useToast } from "@/hooks/use-toast";

interface ShoppingCartProps {
  children?: React.ReactNode;
}

const ShoppingCartComponent = ({ children }: ShoppingCartProps) => {
  const { cartItems, updateCartQuantity, removeFromCart, getCartTotal, getCartItemCount } = useProducts();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateCartQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: string, productName: string) => {
    removeFromCart(productId);
    toast({
      title: "Item Removed",
      description: `${productName} has been removed from your cart`,
    });
  };

  const handleCheckout = () => {
    toast({
      title: "Checkout",
      description: "Redirecting to checkout page...",
    });
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {children || (
          <Button variant="automotive-outline" size="icon" className="relative">
            <ShoppingCart className="w-4 h-4" />
            {getCartItemCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-automotive-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getCartItemCount()}
              </span>
            )}
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Shopping Cart ({getCartItemCount()} items)
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-4 max-h-[calc(100vh-200px)] overflow-auto">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
              <Button 
                variant="automotive" 
                className="mt-4"
                onClick={() => setIsOpen(false)}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="flex items-start gap-4">
                    <img 
                      src={item.image_url} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg bg-gray-100"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{item.name}</h3>
                      <p className="text-xs text-gray-500 mb-2">{item.part_number}</p>
                      <p className="font-bold text-automotive-orange">R{item.price.toFixed(2)}</p>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500 hover:text-red-700 ml-2"
                          onClick={() => handleRemoveItem(item.id, item.name)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
              
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-2xl font-bold text-automotive-orange">
                    R{getCartTotal().toFixed(2)}
                  </span>
                </div>
                <Button 
                  variant="automotive" 
                  className="w-full"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCartComponent;
