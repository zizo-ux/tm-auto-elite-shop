
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/types';
import { productService } from '@/services/productService';
import { useToast } from '@/hooks/use-toast';

interface CartItem extends Product {
  quantity: number;
}

interface ProductContextType {
  products: Product[];
  cartItems: CartItem[];
  loading: boolean;
  error: string | null;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  searchProducts: (query: string) => Promise<Product[]>;
  getProductsByCategory: (category: string) => Promise<Product[]>;
  refreshProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Load products from database
  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getProducts();
      setProducts(data);
    } catch (err) {
      setError('Failed to load products');
      console.error('Error loading products:', err);
      toast({
        title: "Error",
        description: "Failed to load products. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Load cart from localStorage
  const loadCart = () => {
    const savedCart = localStorage.getItem('tm_auto_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (err) {
        console.error('Error loading cart:', err);
        localStorage.removeItem('tm_auto_cart');
      }
    }
  };

  useEffect(() => {
    loadProducts();
    loadCart();
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('tm_auto_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const refreshProducts = async () => {
    await loadProducts();
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const searchProducts = async (query: string): Promise<Product[]> => {
    if (!query.trim()) return products;
    
    try {
      return await productService.searchProducts(query);
    } catch (err) {
      console.error('Error searching products:', err);
      toast({
        title: "Search Error",
        description: "Failed to search products. Please try again.",
        variant: "destructive"
      });
      return [];
    }
  };

  const getProductsByCategory = async (category: string): Promise<Product[]> => {
    try {
      return await productService.getProductsByCategory(category);
    } catch (err) {
      console.error('Error fetching products by category:', err);
      toast({
        title: "Error",
        description: "Failed to fetch products by category. Please try again.",
        variant: "destructive"
      });
      return [];
    }
  };

  return (
    <ProductContext.Provider value={{
      products,
      cartItems,
      loading,
      error,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      getCartTotal,
      getCartItemCount,
      searchProducts,
      getProductsByCategory,
      refreshProducts
    }}>
      {children}
    </ProductContext.Provider>
  );
};
