
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ImageUpload from './ImageUpload';
import { Product } from '@/types';
import { saveProduct, updateProduct } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';

const categories = [
  'Engine Parts', 'Brake Systems', 'Suspension', 'Electrical', 
  'Body Parts', 'Transmission', 'Exhaust', 'Cooling', 'Fuel System'
];

interface ProductFormProps {
  product?: Product;
  onSuccess: () => void;
  onCancel: () => void;
}

const ProductForm = ({ product, onSuccess, onCancel }: ProductFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    sale_price: 0,
    description: '',
    category: '',
    brand: '',
    stock_quantity: 0,
    images: [] as string[]
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        sale_price: product.sale_price || 0,
        description: product.description,
        category: product.category,
        brand: product.brand,
        stock_quantity: product.stock_quantity,
        images: product.images
      });
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (product) {
        updateProduct(product.id, formData);
        toast({
          title: "Product Updated",
          description: "Product has been updated successfully",
        });
      } else {
        saveProduct(formData);
        toast({
          title: "Product Created",
          description: "New product has been created successfully",
        });
      }
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save product",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{product ? 'Edit Product' : 'Add New Product'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="brand">Brand *</Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) => handleInputChange('brand', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sale_price">Sale Price ($)</Label>
              <Input
                id="sale_price"
                type="number"
                step="0.01"
                min="0"
                value={formData.sale_price}
                onChange={(e) => handleInputChange('sale_price', parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock Quantity *</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                value={formData.stock_quantity}
                onChange={(e) => handleInputChange('stock_quantity', parseInt(e.target.value) || 0)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md"
              required
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              required
            />
          </div>

          <ImageUpload
            images={formData.images}
            onImagesChange={(images) => handleInputChange('images', images)}
          />

          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              variant="automotive"
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? 'Saving...' : (product ? 'Update Product' : 'Create Product')}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
