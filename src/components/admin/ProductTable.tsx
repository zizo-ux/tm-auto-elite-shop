
import React, { useState, useMemo, useCallback, memo } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, Trash2, Search, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from "@/types";
import { productService } from "@/services/productService";
import { useToast } from "@/hooks/use-toast";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onAdd: () => void;
  onRefresh: () => void;
}

const ITEMS_PER_PAGE = 10;

const ProductRow = memo(({ product, onEdit, onDelete }: {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}) => {
  const getCategoryColor = useCallback((category: string) => {
    const colors: Record<string, string> = {
      'engine': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
      'brakes': 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300',
      'braking': 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300',
      'suspension': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
      'electrical': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
      'body': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
      'transmission': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
  }, []);

  return (
    <TableRow>
      <TableCell>
        <div className="w-12 h-12 rounded-md overflow-hidden bg-muted">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=64&h=64&fit=crop&crop=center`;
              }}
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground text-xs">No Image</span>
            </div>
          )}
        </div>
      </TableCell>
      <TableCell>
        <div>
          <div className="font-medium">{product.name}</div>
          <div className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </div>
        </div>
      </TableCell>
      <TableCell className="font-mono text-sm">
        {product.part_number}
      </TableCell>
      <TableCell>
        <Badge className={getCategoryColor(product.category)}>
          {product.category}
        </Badge>
      </TableCell>
      <TableCell>{product.brand}</TableCell>
      <TableCell>
        <div>
          <div className="font-medium">R{product.price}</div>
          {product.sale_price && product.sale_price < product.price && (
            <div className="text-sm text-green-600 dark:text-green-400">
              Sale: R{product.sale_price}
            </div>
          )}
        </div>
      </TableCell>
      <TableCell>
        <Badge variant={product.stock_quantity > 10 ? "default" : product.stock_quantity > 0 ? "secondary" : "destructive"}>
          {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : 'Out of stock'}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="text-sm max-w-48 line-clamp-2">
          {product.compatible_vehicles}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(product)}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(product.id)}
            className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
});

ProductRow.displayName = 'ProductRow';

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onEdit,
  onAdd,
  onRefresh
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  const handleDelete = useCallback(async (id: string) => {
    try {
      await productService.deleteProduct(id);
      toast({
        title: "Product Deleted",
        description: "Product has been successfully deleted.",
      });
      onRefresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive"
      });
      console.error('Error deleting product:', error);
    }
  }, [onRefresh, toast]);

  const { filteredProducts, totalPages, categories } = useMemo(() => {
    // Extract unique categories
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    
    let filtered = products;
    
    // Apply filters
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.part_number.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }
    
    if (categoryFilter) {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    return { 
      filteredProducts: filtered,
      totalPages,
      categories: uniqueCategories
    };
  }, [products, searchTerm, categoryFilter]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, []);

  const handleCategoryChange = useCallback((value: string) => {
    setCategoryFilter(value);
    setCurrentPage(1);
  }, []);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle>Product Management</CardTitle>
          <Button onClick={onAdd} variant="automotive" className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results summary */}
        <div className="text-sm text-muted-foreground">
          Showing {Math.min(ITEMS_PER_PAGE, paginatedProducts.length)} of {filteredProducts.length} products
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Part Number</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Compatible Vehicles</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedProducts.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  onEdit={onEdit}
                  onDelete={handleDelete}
                />
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Improved Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              
              {/* Page numbers */}
              <div className="flex gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductTable;
