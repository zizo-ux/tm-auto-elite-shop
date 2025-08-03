
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Car, Calendar, Wrench, Info, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useProducts } from "@/contexts/ProductContext";
import { vinService, VehicleInfo } from "@/services/vinService";
import VinResults from "./VinResults";

const VinSearch = () => {
  const [vinNumber, setVinNumber] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo | null>(null);
  const [vinError, setVinError] = useState("");
  const { toast } = useToast();
  const { products } = useProducts();

  const carMakes = [
    "Toyota", "Honda", "Ford", "Chevrolet", "Nissan", "BMW", "Mercedes-Benz", 
    "Audi", "Volkswagen", "Hyundai", "Kia", "Mazda", "Subaru", "Lexus"
  ];

  const years = Array.from({ length: 30 }, (_, i) => (new Date().getFullYear() - i).toString());

  const findCompatibleParts = (vehicleInfo: VehicleInfo) => {
    return products.filter(product => 
      product.compatible_vehicles.toLowerCase().includes(vehicleInfo.make.toLowerCase()) ||
      product.compatible_vehicles.toLowerCase().includes(vehicleInfo.model.toLowerCase()) ||
      product.compatible_vehicles.toLowerCase().includes(`${vehicleInfo.year}`)
    );
  };

  const handleVinChange = (value: string) => {
    const cleanVin = value.toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g, '');
    setVinNumber(cleanVin);
    setVinError("");
    
    // Real-time validation feedback
    if (cleanVin.length > 0 && cleanVin.length < 17) {
      setVinError("VIN must be 17 characters long");
    } else if (cleanVin.length === 17 && !vinService.validateVin(cleanVin)) {
      setVinError("Invalid VIN format");
    }
  };

  const handleVinSearch = async () => {
    if (!vinNumber || vinNumber.length !== 17) {
      toast({
        title: "Invalid VIN",
        description: "Please enter a valid 17-character VIN number",
        variant: "destructive"
      });
      return;
    }

    if (!vinService.validateVin(vinNumber)) {
      toast({
        title: "Invalid VIN",
        description: "The VIN number format is invalid",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    
    try {
      const decodedVehicle = await vinService.decodeVin(vinNumber);
      const compatibleParts = findCompatibleParts(decodedVehicle);
      
      setVehicleInfo(decodedVehicle);
      setShowResults(true);
      
      toast({
        title: "VIN Decoded Successfully",
        description: `Found ${compatibleParts.length} compatible parts for your ${decodedVehicle.year} ${decodedVehicle.make} ${decodedVehicle.model}`,
      });
    } catch (error) {
      console.error('VIN decoding failed:', error);
      toast({
        title: "VIN Decoding Failed",
        description: error instanceof Error ? error.message : "Failed to decode VIN. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleManualSearch = async () => {
    if (!make || !model || !year) {
      toast({
        title: "Missing Information",
        description: "Please fill in all vehicle details",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    
    // Simulate brief loading for consistency
    setTimeout(() => {
      const vehicleData: VehicleInfo = { make, model, year, engine: "Standard Engine" };
      const compatibleParts = findCompatibleParts(vehicleData);
      
      setVehicleInfo(vehicleData);
      setShowResults(true);
      setIsSearching(false);
      
      toast({
        title: "Search Complete",
        description: `Found ${compatibleParts.length} compatible parts for ${year} ${make} ${model}`,
      });
    }, 500);
  };

  const handleCloseResults = () => {
    setShowResults(false);
    setVehicleInfo(null);
    setVinNumber("");
    setMake("");
    setModel("");
    setYear("");
    setVinError("");
  };

  if (showResults && vehicleInfo) {
    const compatibleParts = findCompatibleParts(vehicleInfo);
    
    return (
      <section id="vin-search" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <VinResults
            vinNumber={vinNumber}
            vehicleInfo={vehicleInfo}
            compatibleParts={compatibleParts}
            onClose={handleCloseResults}
          />
        </div>
      </section>
    );
  }

  return (
    <section id="vin-search" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-automotive-dark mb-4">
            Find Parts for Your Vehicle
          </h2>
          <p className="text-xl text-automotive-gray max-w-2xl mx-auto">
            Enter your VIN number or vehicle details to find compatible parts instantly
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* VIN Search */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-automotive-blue" />
                  VIN Number Search
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-automotive-dark mb-2 block">
                    VIN Number (17 characters)
                  </label>
                  <Input
                    placeholder="1HGBH41JXMN109186"
                    value={vinNumber}
                    onChange={(e) => handleVinChange(e.target.value)}
                    maxLength={17}
                    className={`font-mono text-lg ${vinError ? 'border-red-500' : ''}`}
                  />
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-automotive-gray">
                      Characters entered: {vinNumber.length}/17
                    </p>
                    {vinError && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {vinError}
                      </p>
                    )}
                  </div>
                </div>

                <Button 
                  onClick={handleVinSearch}
                  variant="automotive" 
                  className="w-full"
                  disabled={isSearching || !!vinError || vinNumber.length !== 17}
                >
                  {isSearching ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Decoding VIN...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Decode VIN
                    </>
                  )}
                </Button>

                <div className="bg-automotive-blue-light p-4 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-automotive-blue mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-automotive-dark mb-1">Where to find your VIN:</p>
                      <ul className="text-automotive-gray space-y-1">
                        <li>• Dashboard (driver's side)</li>
                        <li>• Driver's door frame</li>
                        <li>• Vehicle registration</li>
                        <li>• Insurance documents</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Manual Search */}
            <Card className="animate-fade-in" style={{ animationDelay: "200ms" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="w-5 h-5 text-automotive-blue" />
                  Vehicle Details Search
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-automotive-dark mb-2 block">
                      Make
                    </label>
                    <Select value={make} onValueChange={setMake}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select make" />
                      </SelectTrigger>
                      <SelectContent>
                        {carMakes.map((makeName) => (
                          <SelectItem key={makeName} value={makeName}>
                            {makeName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-automotive-dark mb-2 block">
                      Model
                    </label>
                    <Input
                      placeholder="Enter model"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-automotive-dark mb-2 block">
                      Year
                    </label>
                    <Select value={year} onValueChange={setYear}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((yearOption) => (
                          <SelectItem key={yearOption} value={yearOption}>
                            {yearOption}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button 
                  onClick={handleManualSearch}
                  variant="automotive-outline" 
                  className="w-full"
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-automotive-blue mr-2"></div>
                      Searching...
                    </>
                  ) : (
                    <>
                      <Wrench className="w-4 h-4 mr-2" />
                      Find Compatible Parts
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Popular Searches */}
          <div className="mt-12 text-center">
            <h3 className="text-lg font-semibold text-automotive-dark mb-4">Popular Searches</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "2020 Toyota Camry",
                "2019 Honda Civic", 
                "2021 Ford F-150",
                "2018 Chevrolet Silverado",
                "2020 Nissan Altima"
              ].map((search) => (
                <button
                  key={search}
                  className="px-4 py-2 bg-gray-100 hover:bg-automotive-blue-light text-automotive-gray hover:text-automotive-blue rounded-full transition-colors text-sm"
                  onClick={() => {
                    const parts = search.split(' ');
                    if (parts.length >= 3) {
                      setYear(parts[0]);
                      setMake(parts[1]);
                      setModel(parts.slice(2).join(' '));
                    }
                  }}
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VinSearch;
