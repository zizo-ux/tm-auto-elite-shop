
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCategories from "@/components/ProductCategories";
import VinSearch from "@/components/VinSearch";
import CarCareTips from "@/components/CarCareTips";
import Contact from "@/components/Contact";

const Index = () => {
  const handleFooterNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
                <li>
                  <button 
                    onClick={() => handleFooterNavClick('#categories')}
                    className="hover:text-white transition-colors text-left"
                  >
                    Product Categories
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleFooterNavClick('#vin-search')}
                    className="hover:text-white transition-colors text-left"
                  >
                    VIN Search
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleFooterNavClick('#tips')}
                    className="hover:text-white transition-colors text-left"
                  >
                    Car Care Tips
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleFooterNavClick('#contact')}
                    className="hover:text-white transition-colors text-left"
                  >
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button className="hover:text-white transition-colors text-left">Engine Parts</button></li>
                <li><button className="hover:text-white transition-colors text-left">Brake Systems</button></li>
                <li><button className="hover:text-white transition-colors text-left">Suspension</button></li>
                <li><button className="hover:text-white transition-colors text-left">Electrical</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Phone: +27 72 542 2814</li>
                <li>Email: tmautoexpress@gmail.com</li>
                <li>Address: 43 Ametis crescent</li>
                <li>Mpumalanga Middleburg</li>
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
