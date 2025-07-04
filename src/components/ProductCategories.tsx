import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Settings, 
  Zap, 
  Disc, 
  Car, 
  Wrench, 
  Cog,
  ArrowRight 
} from "lucide-react";

const ProductCategories = () => {
  const categories = [
    {
      id: "engine",
      name: "Engine Parts",
      icon: Settings,
      description: "Pistons, valves, gaskets, timing belts, and motors",
      itemCount: "2,500+ items",
      popular: ["Engine Oil", "Air Filters", "Spark Plugs", "Timing Belts"]
    },
    {
      id: "suspension",
      name: "Suspension Parts", 
      icon: Car,
      description: "Shock absorbers, struts, control arms, and suspension bushes",
      itemCount: "1,800+ items",
      popular: ["Shock Absorbers", "Struts", "Control Arms", "Ball Joints"]
    },
    {
      id: "braking",
      name: "Braking System",
      icon: Disc,
      description: "Brake pads, discs, drums, and calipers",
      itemCount: "1,200+ items", 
      popular: ["Brake Pads", "Brake Discs", "Brake Drums", "Calipers"]
    },
    {
      id: "electrical",
      name: "Electrical Components",
      icon: Zap,
      description: "Alternators, starters, batteries, and sensors",
      itemCount: "3,000+ items",
      popular: ["Alternators", "Starters", "Batteries", "Sensors"]
    },
    {
      id: "body",
      name: "Body Parts",
      icon: Wrench,
      description: "Bumpers, fenders, mirrors, and lights",
      itemCount: "2,200+ items",
      popular: ["Bumpers", "Fenders", "Mirrors", "Headlights"]
    },
    {
      id: "transmission",
      name: "Transmission Parts",
      icon: Cog,
      description: "Clutches, gearboxes and drive shafts",
      itemCount: "900+ items",
      popular: ["Clutches", "Gearboxes", "Drive Shafts", "CV Joints"]
    }
  ];

  return (
    <section id="categories" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-automotive-dark mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-automotive-gray max-w-2xl mx-auto">
            Find the exact parts you need from our extensive range of automotive components
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Card 
              key={category.id} 
              className="group hover:shadow-automotive transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-automotive-blue-light rounded-lg flex items-center justify-center group-hover:bg-automotive-blue transition-colors">
                    <category.icon className="w-6 h-6 text-automotive-blue group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-automotive-dark">
                      {category.name}
                    </h3>
                    <p className="text-sm text-automotive-gray">
                      {category.itemCount}
                    </p>
                  </div>
                </div>

                <p className="text-automotive-gray mb-4">
                  {category.description}
                </p>

                <div className="mb-6">
                  <p className="text-sm font-medium text-automotive-dark mb-2">Popular Items:</p>
                  <div className="flex flex-wrap gap-2">
                    {category.popular.map((item, i) => (
                      <span 
                        key={i}
                        className="text-xs bg-automotive-blue-light text-automotive-blue px-2 py-1 rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <Button 
                  variant="automotive-outline" 
                  className="w-full group-hover:bg-automotive-blue group-hover:text-white"
                  onClick={() => {
                    // Simulate category page navigation
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    // Could be replaced with actual navigation later
                  }}
                >
                  View All Parts
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="automotive" 
            size="lg"
            onClick={() => document.getElementById('vin-search')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View All Categories
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;