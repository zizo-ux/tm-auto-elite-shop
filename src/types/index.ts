export interface Product {
  id: string;
  name: string;
  price: number;
  sale_price?: number;
  description: string;
  category: string;
  brand: string;
  stock_quantity: number;
  image_url: string;
  part_number: string;
  compatible_vehicles: string;
  created_at: string;
  updated_at: string;
}

export interface DiagnoseRequest {
  id: string;
  customer_name: string;
  email: string;
  phone: string;
  address: string;
  car_make: string;
  car_model: string;
  car_year: number;
  vin?: string;
  problem_description: string;
  service_type: string;
  urgency_level: 'low' | 'medium' | 'high' | 'urgent';
  images: string[];
  status: 'pending' | 'in-progress' | 'completed';
  admin_response?: string;
  recommended_products?: string[];
  created_at: string;
  updated_at: string;
}

export interface User {
  username: string;
  token: string;
  expires_at: number;
}

export interface DashboardStats {
  total_products: number;
  low_stock_count: number;
  total_requests: number;
  pending_requests: number;
  categories: { [key: string]: number };
}
