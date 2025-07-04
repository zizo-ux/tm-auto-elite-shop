import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Truck, Shield, Clock } from "lucide-react";

const Hero = () => {
  const features = [
    { icon: CheckCircle, text: "Quality Guaranteed" },
    { icon: Truck, text: "Nationwide Delivery" },
    { icon: Shield, text: "Warranty Protection" },
    { icon: Clock, text: "Fast Processing" },
  ];

  return (
    <section id="home" className="relative min-h-[70vh] bg-gradient-to-br from-automotive-blue via-automotive-blue-dark to-slate-800 overflow-hidden">
      {/* Background Geometric Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rotate-45 transform"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-white/5 rotate-12 transform"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/15 rotate-45 transform"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Premium
                <span className="block text-white/90">Auto Parts</span>
                <span className="block text-white/80">Delivered Fast</span>
              </h1>
              <p className="text-xl text-white/90 max-w-lg">
                Your trusted partner for high-quality automotive spare parts. 
                From engine components to body parts - we've got you covered.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="xl" 
                className="group"
                onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Shop Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="automotive-outline" 
                size="xl" 
                className="bg-white/10 border-white/30 hover:bg-white/20"
                onClick={() => document.getElementById('vin-search')?.scrollIntoView({ behavior: 'smooth' })}
              >
                VIN Search
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 text-white/90">
                  <feature.icon className="w-5 h-5 text-white" />
                  <span className="font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Stats */}
          <div className="space-y-6 animate-slide-up">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center text-white">
                <div className="text-3xl font-bold">50K+</div>
                <div className="text-white/80">Parts Available</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center text-white">
                <div className="text-3xl font-bold">15K+</div>
                <div className="text-white/80">Happy Customers</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center text-white">
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-white/80">Support</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center text-white">
                <div className="text-3xl font-bold">99%</div>
                <div className="text-white/80">Success Rate</div>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center text-white">
              <h3 className="font-bold text-lg mb-2">Trusted Since 2022</h3>
              <p className="text-white/80 leading-relaxed">
                Leading supplier of high-quality automotive spare parts and accessories. 
                Your satisfaction is our commitment to excellence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;