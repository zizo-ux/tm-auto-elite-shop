
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, X, ShoppingCart, Phone, MapPin, Shield } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { isAuthenticated } from "@/lib/auth";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const authenticated = isAuthenticated();

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Categories", href: "#categories" },
    { name: "VIN Search", href: "#vin-search" },
    { name: "Car Care Tips", href: "#tips" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-automotive-blue text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>+1-800-TM-AUTO</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>We Deliver Nationwide</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>Quality Parts • Fast Delivery • Expert Support</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-automotive-blue to-automotive-blue-dark rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">TM</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-automotive-dark">
                TM Auto Express
              </h1>
              <p className="text-sm text-automotive-gray">Premium Auto Parts</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-automotive-dark hover:text-automotive-blue transition-colors font-medium"
              >
                {item.name}
              </a>
            ))}
            {authenticated && (
              <Link
                to="/admin"
                className="flex items-center gap-2 text-automotive-orange hover:text-automotive-red transition-colors font-medium"
              >
                <Shield className="w-4 h-4" />
                Admin
              </Link>
            )}
          </nav>

          {/* Search & Cart */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <Input
                placeholder="Search parts..."
                className="w-48"
              />
              <Button variant="automotive" size="icon">
                <Search className="w-4 h-4" />
              </Button>
            </div>
            
            <Button variant="automotive-outline" size="icon" className="relative">
              <ShoppingCart className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 bg-automotive-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium text-automotive-dark hover:text-automotive-blue transition-colors"
                    >
                      {item.name}
                    </a>
                  ))}
                  {authenticated && (
                    <Link
                      to="/admin"
                      className="flex items-center gap-2 text-lg font-medium text-automotive-orange hover:text-automotive-red transition-colors"
                    >
                      <Shield className="w-4 h-4" />
                      Admin Panel
                    </Link>
                  )}
                  <div className="mt-4 pt-4 border-t">
                    <Input
                      placeholder="Search parts..."
                      className="mb-3"
                    />
                    <Button variant="automotive" className="w-full">
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
