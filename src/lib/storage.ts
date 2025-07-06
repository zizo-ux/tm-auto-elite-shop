
import { Product, DiagnoseRequest, DashboardStats } from '@/types';

const PRODUCTS_KEY = 'tm_auto_products';
const REQUESTS_KEY = 'tm_auto_requests';

// Product Management
export const getProducts = (): Product[] => {
  const stored = localStorage.getItem(PRODUCTS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveProduct = (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Product => {
  const products = getProducts();
  const newProduct: Product = {
    ...product,
    id: `product_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  products.push(newProduct);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  return newProduct;
};

export const updateProduct = (id: string, updates: Partial<Product>): Product | null => {
  const products = getProducts();
  const index = products.findIndex(p => p.id === id);
  
  if (index === -1) return null;
  
  products[index] = {
    ...products[index],
    ...updates,
    updated_at: new Date().toISOString()
  };
  
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  return products[index];
};

export const deleteProduct = (id: string): boolean => {
  const products = getProducts();
  const filtered = products.filter(p => p.id !== id);
  
  if (filtered.length === products.length) return false;
  
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(filtered));
  return true;
};

// Diagnose Requests Management
export const getDiagnoseRequests = (): DiagnoseRequest[] => {
  const stored = localStorage.getItem(REQUESTS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveDiagnoseRequest = (request: Omit<DiagnoseRequest, 'id' | 'created_at' | 'updated_at' | 'status'>): DiagnoseRequest => {
  const requests = getDiagnoseRequests();
  const newRequest: DiagnoseRequest = {
    ...request,
    id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    status: 'pending',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  requests.push(newRequest);
  localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests));
  return newRequest;
};

export const updateDiagnoseRequest = (id: string, updates: Partial<DiagnoseRequest>): DiagnoseRequest | null => {
  const requests = getDiagnoseRequests();
  const index = requests.findIndex(r => r.id === id);
  
  if (index === -1) return null;
  
  requests[index] = {
    ...requests[index],
    ...updates,
    updated_at: new Date().toISOString()
  };
  
  localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests));
  return requests[index];
};

// Dashboard Statistics
export const getDashboardStats = (): DashboardStats => {
  const products = getProducts();
  const requests = getDiagnoseRequests();
  
  const categories: { [key: string]: number } = {};
  products.forEach(product => {
    categories[product.category] = (categories[product.category] || 0) + 1;
  });
  
  return {
    total_products: products.length,
    low_stock_count: products.filter(p => p.stock_quantity < 10).length,
    total_requests: requests.length,
    pending_requests: requests.filter(r => r.status === 'pending').length,
    categories
  };
};

// Image Upload Utilities
export const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
