
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/types';

interface CartItem extends Product {
  quantity: number;
}

interface ProductContextType {
  products: Product[];
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  searchProducts: (query: string) => Product[];
  getProductsByCategory: (category: string) => Product[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

// Updated sample automotive parts data with correct interface
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Brake Pads - Front',
    description: 'High-performance ceramic brake pads for superior stopping power',
    price: 89.99,
    category: 'braking',
    brand: 'Bosch',
    stock_quantity: 25,
    part_number: 'BP-FRONT-001',
    compatible_vehicles: 'Toyota Camry 2018-2023, Honda Accord 2016-2022',
    image_url: '/placeholder.svg',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Air Filter - High Flow',
    description: 'Performance air filter for improved engine airflow',
    price: 34.99,
    category: 'engine',
    brand: 'K&N',
    stock_quantity: 15,
    part_number: 'AF-HF-002',
    compatible_vehicles: 'Ford F-150 2015-2023, Chevrolet Silverado 2014-2022',
    image_url: '/placeholder.svg',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Shock Absorber - Rear',
    description: 'Heavy-duty shock absorber for smooth ride comfort',
    price: 129.99,
    category: 'suspension',
    brand: 'Monroe',
    stock_quantity: 8,
    part_number: 'SA-REAR-003',
    compatible_vehicles: 'Nissan Altima 2019-2023, Hyundai Elantra 2017-2022',
    image_url: '/placeholder.svg',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    name: 'LED Headlight Bulbs',
    description: 'Ultra-bright LED headlight conversion kit',
    price: 79.99,
    category: 'electrical',
    brand: 'Philips',
    stock_quantity: 20,
    part_number: 'LED-HL-004',
    compatible_vehicles: 'BMW 3 Series 2016-2023, Audi A4 2017-2023',
    image_url: '/placeholder.svg',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '5',
    name: 'Front Bumper Cover',
    description: 'OEM-quality replacement front bumper cover',
    price: 299.99,
    category: 'body',
    brand: 'OEM',
    stock_quantity: 5,
    part_number: 'BC-FRONT-005',
    compatible_vehicles: 'Honda Civic 2016-2021, Toyota Corolla 2017-2022',
    image_url: '/placeholder.svg',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '6',
    name: 'Clutch Kit Complete',
    description: 'Complete clutch replacement kit with pressure plate',
    price: 249.99,
    category: 'transmission',
    brand: 'LUK',
    stock_quantity: 12,
    part_number: 'CK-COMP-006',
    compatible_vehicles: 'Mazda 6 2014-2020, Subaru Impreza 2015-2022',
    image_url: '/placeholder.svg',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(sampleProducts);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('tm_auto_cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tm_auto_cart', JSON.stringify(cartItems));
  }, [cartItems]);

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

  const searchProducts = (query: string) => {
    if (!query.trim()) return products;
    
    const lowercaseQuery = query.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.part_number.toLowerCase().includes(lowercaseQuery) ||
      product.compatible_vehicles.toLowerCase().includes(lowercaseQuery)
    );
  };

  const getProductsByCategory = (category: string) => {
    return products.filter(product => product.category === category);
  };

  return (
    <ProductContext.Provider value={{
      products,
      cartItems,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      getCartTotal,
      getCartItemCount,
      searchProducts,
      getProductsByCategory
    }}>
      {children}
    </ProductContext.Provider>
  );
};
