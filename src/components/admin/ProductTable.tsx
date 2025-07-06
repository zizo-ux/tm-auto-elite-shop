
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Product } from '@/types';
import { deleteProduct } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';
import { Edit, Trash, Search, Plus } from 'lucide-react';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onAdd: () => void;
  onRefresh: () => void;
}

const ProductTable = ({ products, onEdit, onAdd, onRefresh }: ProductTableProps) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const { toast } = useToast();

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
                         product.brand.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !categoryFilter || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(products.map(p => p.category))];

  const handleDelete = async (product: Product) => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      const success = deleteProduct(product.id);
      if (success) {
        toast({
          title: "Product Deleted",
          description: `${product.name} has been deleted successfully`,
        });
        onRefresh();
      } else {
        toast({
          title: "Error",
          description: "Failed to delete product",
          variant: "destructive",
        });
      }
    }
  };

  const formatPrice = (price: number, salePrice?: number) => {
    if (salePrice && salePrice > 0 && salePrice < price) {
      return (
        <div>
          <span className="line-through text-automotive-warm-gray">${price.toFixed(2)}</span>
          <span className="text-automotive-red font-semibold ml-2">${salePrice.toFixed(2)}</span>
        </div>
      );
    }
    return <span>${price.toFixed(2)}</span>;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle>Product Management</CardTitle>
          <Button onClick={onAdd} variant="automotive">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-automotive-warm-gray w-4 h-4" />
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border border-input bg-background rounded-md"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    {product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-automotive-warm-gray/20 rounded-lg flex items-center justify-center">
                        <span className="text-xs text-automotive-warm-gray">No img</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-automotive-cream rounded-full text-xs">
                      {product.category}
                    </span>
                  </TableCell>
                  <TableCell>{formatPrice(product.price, product.sale_price)}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      product.stock_quantity < 10 
                        ? 'bg-automotive-red/20 text-automotive-red' 
                        : 'bg-automotive-green/20 text-automotive-green'
                    }`}>
                      {product.stock_quantity}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="automotive-outline"
                        onClick={() => onEdit(product)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(product)}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-8 text-automotive-warm-gray">
            No products found
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductTable;
