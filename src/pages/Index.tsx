import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCategories from "@/components/ProductCategories";
import VinSearch from "@/components/VinSearch";
import CarCareTips from "@/components/CarCareTips";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <ProductCategories />
      <VinSearch />
      <CarCareTips />
      <Contact />
      
      {/* Footer */}
      <footer className="bg-automotive-dark text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-automotive-blue rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">TM</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">TM Auto Express</h3>
                  <p className="text-sm text-gray-400">Premium Auto Parts</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Your trusted partner for high-quality automotive spare parts and accessories since 2022.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#categories" className="hover:text-white transition-colors">Product Categories</a></li>
                <li><a href="#vin-search" className="hover:text-white transition-colors">VIN Search</a></li>
                <li><a href="#tips" className="hover:text-white transition-colors">Car Care Tips</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Engine Parts</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Brake Systems</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Suspension</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Electrical</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Phone: +1-800-TM-AUTO</li>
                <li>Email: support@tmautoexpress.com</li>
                <li>Hours: Mon-Fri 8AM-8PM EST</li>
                <li className="text-automotive-blue font-medium">We Deliver Nationwide</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 TM Auto Express. All rights reserved. | Quality Parts • Fast Delivery • Expert Support</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;