import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Lightbulb, 
  Clock, 
  Wrench, 
  Thermometer, 
  Droplets,
  AlertTriangle
} from "lucide-react";

const CarCareTips = () => {
  const tips = [
    {
      id: 1,
      title: "Engine Oil Change Intervals",
      category: "Maintenance",
      icon: Droplets,
      tip: "Change your engine oil every 5,000-7,500 miles or follow your manufacturer's recommendations. Regular oil changes prevent engine wear and extend vehicle life.",
      difficulty: "Easy",
      timeRequired: "30 mins",
      color: "bg-green-500"
    },
    {
      id: 2,
      title: "Brake System Warning Signs",
      category: "Safety",
      icon: AlertTriangle,
      tip: "Listen for squealing sounds, feel for vibrations, or notice longer stopping distances. These are signs your brake pads or rotors may need replacement.",
      difficulty: "Professional",
      timeRequired: "2 hours",
      color: "bg-red-500"
    },
    {
      id: 3,
      title: "Tire Pressure Check",
      category: "Safety",
      icon: Thermometer,
      tip: "Check tire pressure monthly when tires are cold. Proper pressure improves fuel economy, tire life, and vehicle safety. Use the pressure specified in your owner's manual.",
      difficulty: "Easy",
      timeRequired: "10 mins",
      color: "bg-blue-500"
    },
    {
      id: 4,
      title: "Battery Maintenance",
      category: "Electrical",
      icon: Wrench,
      tip: "Clean battery terminals regularly and check for corrosion. Most car batteries last 3-5 years. Test your battery before winter to avoid unexpected failures.",
      difficulty: "Medium",
      timeRequired: "20 mins",
      color: "bg-yellow-500"
    }
  ];

  const didYouKnow = [
    {
      fact: "A dirty air filter can reduce fuel economy by up to 10%",
      category: "Fuel Economy"
    },
    {
      fact: "Spark plugs should be replaced every 30,000-100,000 miles depending on type",
      category: "Engine"
    },
    {
      fact: "Rotating tires every 5,000-8,000 miles extends their lifespan significantly",
      category: "Tires"
    },
    {
      fact: "Coolant should be flushed every 30,000-50,000 miles to prevent overheating",
      category: "Cooling"
    }
  ];

  return (
    <section id="tips" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-automotive-dark mb-4">
            Car Care Tips & Advice
          </h2>
          <p className="text-xl text-automotive-gray max-w-2xl mx-auto">
            Expert advice to keep your vehicle running smoothly and safely
          </p>
        </div>

        {/* Tips Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {tips.map((tip, index) => (
            <Card 
              key={tip.id}
              className="hover:shadow-automotive transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 ${tip.color} rounded-lg flex items-center justify-center`}>
                      <tip.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-automotive-dark">
                        {tip.title}
                      </CardTitle>
                      <Badge variant="secondary" className="mt-1">
                        {tip.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-automotive-gray mb-4 leading-relaxed">
                  {tip.tip}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-automotive-blue" />
                    <span className="text-automotive-gray">{tip.timeRequired}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Wrench className="w-4 h-4 text-automotive-blue" />
                    <span className="text-automotive-gray">{tip.difficulty}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Did You Know Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg animate-fade-in">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Lightbulb className="w-8 h-8 text-automotive-blue" />
              <h3 className="text-2xl font-bold text-automotive-dark">
                Did You Know?
              </h3>
            </div>
            <p className="text-automotive-gray">
              Interesting facts about automotive maintenance
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {didYouKnow.map((item, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-4 bg-automotive-blue-light rounded-lg"
              >
                <div className="w-2 h-2 bg-automotive-blue rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-automotive-dark font-medium mb-1">
                    {item.fact}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {item.category}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button 
              variant="automotive"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View More Tips
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarCareTips;