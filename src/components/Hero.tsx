
import { Button } from "@/components/ui/button";
import { Search, Wrench, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-br from-automotive-cream via-automotive-warm-gray/10 to-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-automotive-orange to-automotive-red rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-br from-automotive-blue to-automotive-purple rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-automotive-yellow rounded-full blur-lg"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-automotive-orange via-automotive-red to-automotive-yellow bg-clip-text text-transparent">
                  Premium
                </span>
                <br />
                <span className="text-automotive-charcoal">Auto Parts</span>
                <br />
                <span className="text-automotive-blue">& Service</span>
              </h1>
              
              <p className="text-xl text-automotive-warm-gray leading-relaxed max-w-lg">
                Your trusted partner for high-quality automotive spare parts and expert diagnostic services. 
                We deliver excellence nationwide with unmatched expertise.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="automotive" 
                size="xl"
                className="group"
                asChild
              >
                <Link to="/diagnose-online">
                  <Wrench className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Diagnose Online
                </Link>
              </Button>
              
              <Button 
                variant="automotive-outline" 
                size="xl"
                className="group"
              >
                <Search className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Browse Parts
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              <div className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-warm">
                <div className="w-12 h-12 bg-gradient-to-br from-automotive-green/20 to-automotive-green/10 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-automotive-green" />
                </div>
                <div>
                  <h3 className="font-semibold text-automotive-charcoal">Quality Guaranteed</h3>
                  <p className="text-sm text-automotive-warm-gray">OEM & Premium Parts</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-warm">
                <div className="w-12 h-12 bg-gradient-to-br from-automotive-blue/20 to-automotive-blue/10 rounded-full flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-automotive-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-automotive-charcoal">Expert Diagnostics</h3>
                  <p className="text-sm text-automotive-warm-gray">Professional Analysis</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-warm">
                <div className="w-12 h-12 bg-gradient-to-br from-automotive-orange/20 to-automotive-orange/10 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-automotive-orange" />
                </div>
                <div>
                  <h3 className="font-semibold text-automotive-charcoal">Expert Support</h3>
                  <p className="text-sm text-automotive-warm-gray">24/7 Customer Care</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative animate-scale-in">
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative bg-gradient-to-br from-automotive-orange/10 via-automotive-red/10 to-automotive-yellow/10 rounded-3xl p-8 backdrop-blur-sm border border-automotive-warm-gray/20 shadow-automotive">
                <div className="grid grid-cols-2 gap-6">
                  {/* Top Row */}
                  <div className="space-y-4">
                    <div className="h-24 bg-gradient-to-br from-automotive-blue to-automotive-blue/80 rounded-xl flex items-center justify-center shadow-glow">
                      <span className="text-white font-bold text-lg">Engine</span>
                    </div>
                    <div className="h-16 bg-gradient-to-br from-automotive-red to-automotive-red/80 rounded-lg flex items-center justify-center">
                      <span className="text-white font-medium">Brakes</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-16 bg-gradient-to-br from-automotive-green to-automotive-green/80 rounded-lg flex items-center justify-center">
                      <span className="text-white font-medium">Electrical</span>
                    </div>
                    <div className="h-24 bg-gradient-to-br from-automotive-yellow to-automotive-yellow/80 rounded-xl flex items-center justify-center shadow-glow">
                      <span className="text-white font-bold text-lg">Service</span>
                    </div>
                  </div>
                </div>
                
                {/* Center Badge */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-20 h-20 bg-gradient-to-br from-automotive-orange to-automotive-red rounded-full flex items-center justify-center shadow-automotive border-4 border-white">
                    <span className="text-white font-bold text-2xl">TM</span>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-automotive-purple to-automotive-blue rounded-full flex items-center justify-center shadow-glow animate-pulse">
                <Wrench className="w-8 h-8 text-white" />
              </div>
              
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-automotive-green to-automotive-yellow rounded-full flex items-center justify-center shadow-glow animate-pulse">
                <Shield className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
