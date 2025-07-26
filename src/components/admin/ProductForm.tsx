
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/types";
import ImageUpload from "./ImageUpload";

interface ProductFormProps {
  product?: Product;
  onSuccess: () => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSuccess,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    price: product?.price || 0,
    sale_price: product?.sale_price || 0,
    description: product?.description || '',
    category: product?.category || '',
    brand: product?.brand || '',
    stock_quantity: product?.stock_quantity || 0,
    image_url: product?.image_url || '',
    part_number: product?.part_number || '',
    compatible_vehicles: product?.compatible_vehicles || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual product save logic
    console.log('Saving product:', formData);
    onSuccess();
  };

  const handleImageUpload = (images: string[]) => {
    if (images.length > 0) {
      setFormData(prev => ({ ...prev, image_url: images[0] }));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{product ? 'Edit Product' : 'Add New Product'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="part_number">Part Number</Label>
              <Input
                id="part_number"
                value={formData.part_number}
                onChange={(e) => setFormData(prev => ({ ...prev, part_number: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="price">Price (R)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="sale_price">Sale Price (R)</Label>
              <Input
                id="sale_price"
                type="number"
                step="0.01"
                value={formData.sale_price}
                onChange={(e) => setFormData(prev => ({ ...prev, sale_price: parseFloat(e.target.value) }))}
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engine">Engine Parts</SelectItem>
                  <SelectItem value="brakes">Brake Systems</SelectItem>
                  <SelectItem value="suspension">Suspension</SelectItem>
                  <SelectItem value="electrical">Electrical</SelectItem>
                  <SelectItem value="body">Body Parts</SelectItem>
                  <SelectItem value="transmission">Transmission</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="stock_quantity">Stock Quantity</Label>
              <Input
                id="stock_quantity"
                type="number"
                value={formData.stock_quantity}
                onChange={(e) => setFormData(prev => ({ ...prev, stock_quantity: parseInt(e.target.value) }))}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="compatible_vehicles">Compatible Vehicles</Label>
            <Input
              id="compatible_vehicles"
              value={formData.compatible_vehicles}
              onChange={(e) => setFormData(prev => ({ ...prev, compatible_vehicles: e.target.value }))}
              placeholder="e.g., BMW 3 Series, Audi A4, Mercedes C-Class"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              required
            />
          </div>

          <div>
            <Label>Product Image</Label>
            <ImageUpload
              images={formData.image_url ? [formData.image_url] : []}
              onImagesChange={handleImageUpload}
              maxImages={1}
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="automotive">
              {product ? 'Update Product' : 'Add Product'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
