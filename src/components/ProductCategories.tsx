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
      popular: ["Engine Oil", "Air Filters", "Spark Plugs", "Timing Belts"],
      color: "category-engine"
    },
    {
      id: "suspension",
      name: "Suspension Parts", 
      icon: Car,
      description: "Shock absorbers, struts, control arms, and suspension bushes",
      itemCount: "1,800+ items",
      popular: ["Shock Absorbers", "Struts", "Control Arms", "Ball Joints"],
      color: "category-suspension"
    },
    {
      id: "braking",
      name: "Braking System",
      icon: Disc,
      description: "Brake pads, discs, drums, and calipers",
      itemCount: "1,200+ items", 
      popular: ["Brake Pads", "Brake Discs", "Brake Drums", "Calipers"],
      color: "category-braking"
    },
    {
      id: "electrical",
      name: "Electrical Components",
      icon: Zap,
      description: "Alternators, starters, batteries, and sensors",
      itemCount: "3,000+ items",
      popular: ["Alternators", "Starters", "Batteries", "Sensors"],
      color: "category-electrical"
    },
    {
      id: "body",
      name: "Body Parts",
      icon: Wrench,
      description: "Bumpers, fenders, mirrors, and lights",
      itemCount: "2,200+ items",
      popular: ["Bumpers", "Fenders", "Mirrors", "Headlights"],
      color: "category-body"
    },
    {
      id: "transmission",
      name: "Transmission Parts",
      icon: Cog,
      description: "Clutches, gearboxes and drive shafts",
      itemCount: "900+ items",
      popular: ["Clutches", "Gearboxes", "Drive Shafts", "CV Joints"],
      color: "category-transmission"
    }
  ];

  return (
    <section id="categories" className="py-20 bg-automotive-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-automotive-charcoal mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-automotive-warm-gray max-w-2xl mx-auto">
            Find the exact parts you need from our extensive range of automotive components
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Card 
              key={category.id} 
              className="group hover:shadow-automotive transition-all duration-300 hover:scale-105 animate-fade-in border-2 hover:border-automotive-orange/30"
              style={{ 
                animationDelay: `${index * 100}ms`,
                background: `linear-gradient(145deg, white, hsl(var(--${category.color}) / 0.05))`
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300"
                    style={{ 
                      backgroundColor: `hsl(var(--${category.color}) / 0.15)`,
                      border: `2px solid hsl(var(--${category.color}) / 0.3)`
                    }}
                  >
                    <category.icon 
                      className="w-6 h-6 transition-colors duration-300" 
                      style={{ color: `hsl(var(--${category.color}))` }}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-automotive-charcoal">
                      {category.name}
                    </h3>
                    <p className="text-sm text-automotive-warm-gray">
                      {category.itemCount}
                    </p>
                  </div>
                </div>

                <p className="text-automotive-warm-gray mb-4">
                  {category.description}
                </p>

                <div className="mb-6">
                  <p className="text-sm font-medium text-automotive-charcoal mb-2">Popular Items:</p>
                  <div className="flex flex-wrap gap-2">
                    {category.popular.map((item, i) => (
                      <span 
                        key={i}
                        className="text-xs px-2 py-1 rounded-full transition-colors duration-300"
                        style={{ 
                          backgroundColor: `hsl(var(--${category.color}) / 0.1)`,
                          color: `hsl(var(--${category.color}))`,
                          border: `1px solid hsl(var(--${category.color}) / 0.3)`
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <Button 
                  variant="automotive-outline" 
                  className="w-full group-hover:shadow-lg transition-all duration-300"
                  style={{
                    borderColor: `hsl(var(--${category.color}))`,
                    color: `hsl(var(--${category.color}))`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `hsl(var(--${category.color}))`;
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = `hsl(var(--${category.color}))`;
                  }}
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