
import { useState, useMemo, useEffect, useCallback, useReducer } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Loader2 } from "lucide-react";
import { useProducts } from "@/contexts/ProductContext";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { Product } from "@/types";

// State management optimization using useReducer
interface FiltersState {
  searchQuery: string;
  selectedCategory: string;
  sortBy: string;
  currentPage: number;
}

type FiltersAction = 
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'SET_SORT'; payload: string }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'RESET_FILTERS' };

const filtersReducer = (state: FiltersState, action: FiltersAction): FiltersState => {
  switch (action.type) {
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload, currentPage: 1 };
    case 'SET_CATEGORY':
      return { ...state, selectedCategory: action.payload, currentPage: 1 };
    case 'SET_SORT':
      return { ...state, sortBy: action.payload, currentPage: 1 };
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };
    case 'RESET_FILTERS':
      return { searchQuery: "", selectedCategory: "all", sortBy: "name", currentPage: 1 };
    default:
      return state;
  }
};

const ITEMS_PER_PAGE = 12;

const ProductsSection = () => {
  const { products, loading, error } = useProducts();
  const [filters, dispatchFilters] = useReducer(filtersReducer, {
    searchQuery: "",
    selectedCategory: "all", 
    sortBy: "name",
    currentPage: 1
  });
  const [isSearching, setIsSearching] = useState(false);

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "engine", label: "Engine Parts" },
    { value: "suspension", label: "Suspension" },
    { value: "braking", label: "Braking System" },
    { value: "electrical", label: "Electrical" },
    { value: "body", label: "Body Parts" },
    { value: "transmission", label: "Transmission" }
  ];

  // Optimized search with debouncing
  const debouncedSearch = useCallback((query: string) => {
    setIsSearching(true);
    const timeoutId = setTimeout(() => {
      setIsSearching(false);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (filters.searchQuery.trim()) {
      const cleanup = debouncedSearch(filters.searchQuery);
      return cleanup;
    }
  }, [filters.searchQuery, debouncedSearch]);

  // Optimized filtering and sorting with pagination
  const { filteredProducts, totalPages } = useMemo(() => {
    let filtered = products;
    
    // Client-side search for better performance with small datasets
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.part_number.toLowerCase().includes(query) ||
        product.compatible_vehicles.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query)
      );
    }
    
    if (filters.selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === filters.selectedCategory);
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        case "stock":
          return b.stock_quantity - a.stock_quantity;
        default:
          return 0;
      }
    });

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const startIndex = (filters.currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedProducts = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return { filteredProducts: paginatedProducts, totalPages };
  }, [products, filters]);

  if (loading) {
    return (
      <section id="products" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-automotive-dark mb-4">
              Our Product Catalog
            </h2>
            <p className="text-xl text-automotive-gray max-w-2xl mx-auto">
              Browse our extensive collection of high-quality automotive parts
            </p>
          </div>

          {/* Search and Filter Controls Skeleton */}
          <div className="bg-automotive-cream p-6 rounded-lg mb-8">
            <div className="grid md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-10 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          </div>

          {/* Products Grid Skeleton */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="products" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <Button 
              variant="automotive"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-automotive-dark mb-4">
            Our Product Catalog
          </h2>
          <p className="text-xl text-automotive-gray max-w-2xl mx-auto">
            Browse our extensive collection of high-quality automotive parts
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-automotive-cream p-6 rounded-lg mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-automotive-gray w-4 h-4" />
                <Input
                  placeholder="Search parts, part numbers, or compatible vehicles..."
                  value={filters.searchQuery}
                  onChange={(e) => dispatchFilters({ type: 'SET_SEARCH', payload: e.target.value })}
                  className="pl-10"
                />
                {isSearching && (
                  <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 animate-spin" />
                )}
              </div>
            </div>
            
            <Select 
              value={filters.selectedCategory} 
              onValueChange={(value) => dispatchFilters({ type: 'SET_CATEGORY', payload: value })}
            >
              <SelectTrigger>
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select 
              value={filters.sortBy} 
              onValueChange={(value) => dispatchFilters({ type: 'SET_SORT', payload: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Sort by Name</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="stock">Stock Quantity</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-automotive-gray">
            Showing {Math.min(ITEMS_PER_PAGE, filteredProducts.length)} of {
              products.filter(p => {
                let matches = true;
                if (filters.searchQuery.trim()) {
                  const query = filters.searchQuery.toLowerCase();
                  matches = matches && (
                    p.name.toLowerCase().includes(query) ||
                    p.description.toLowerCase().includes(query) ||
                    p.part_number.toLowerCase().includes(query) ||
                    p.compatible_vehicles.toLowerCase().includes(query) ||
                    p.brand.toLowerCase().includes(query)
                  );
                }
                if (filters.selectedCategory !== "all") {
                  matches = matches && p.category === filters.selectedCategory;
                }
                return matches;
              }).length
            } products
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4">
            <Button
              variant="automotive-outline"
              size="sm"
              onClick={() => dispatchFilters({ type: 'SET_PAGE', payload: Math.max(1, filters.currentPage - 1) })}
              disabled={filters.currentPage === 1}
            >
              Previous
            </Button>
            
            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (filters.currentPage <= 3) {
                  pageNum = i + 1;
                } else if (filters.currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = filters.currentPage - 2 + i;
                }
                
                return (
                  <Button
                    key={pageNum}
                    variant={filters.currentPage === pageNum ? "automotive" : "outline"}
                    size="sm"
                    onClick={() => dispatchFilters({ type: 'SET_PAGE', payload: pageNum })}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            
            <Button
              variant="automotive-outline"
              size="sm"
              onClick={() => dispatchFilters({ type: 'SET_PAGE', payload: Math.min(totalPages, filters.currentPage + 1) })}
              disabled={filters.currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-automotive-gray mb-4">
              No products found matching your criteria
            </p>
            <Button 
              variant="automotive-outline"
              onClick={() => dispatchFilters({ type: 'RESET_FILTERS' })}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
