
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { HeadphonesIcon, Truck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const QuickActions = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const { toast } = useToast();

  const handleLiveChat = () => {
    toast({
      title: "Live Chat",
      description: "Connecting you to our support team...",
    });
  };

  const handleTrackOrder = () => {
    if (trackingNumber.trim()) {
      toast({
        title: "Order Status",
        description: `Tracking order: ${trackingNumber}. Feature coming soon!`,
      });
      setTrackingNumber("");
    } else {
      toast({
        title: "Please enter a tracking number",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-automotive-blue text-white animate-fade-in" style={{ animationDelay: "400ms" }}>
      <CardContent className="p-6">
        <h3 className="font-bold text-lg mb-4">Need Immediate Help?</h3>
        <div className="space-y-3">
          <Button 
            variant="hero" 
            size="sm" 
            className="w-full justify-start"
            onClick={handleLiveChat}
          >
            <HeadphonesIcon className="w-4 h-4 mr-2" />
            Live Chat Support
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="hero" size="sm" className="w-full justify-start">
                <Truck className="w-4 h-4 mr-2" />
                Track Your Order
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Track Your Order</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Enter Tracking Number
                  </label>
                  <Input
                    placeholder="e.g., TM123456789"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={handleTrackOrder}
                  variant="automotive"
                  className="w-full"
                >
                  Track Order
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
