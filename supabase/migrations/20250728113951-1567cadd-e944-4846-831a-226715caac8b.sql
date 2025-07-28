
-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  sale_price DECIMAL(10,2),
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  brand TEXT NOT NULL,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  image_url TEXT,
  part_number TEXT NOT NULL,
  compatible_vehicles TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create diagnose requests table
CREATE TABLE public.diagnose_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  car_make TEXT NOT NULL,
  car_model TEXT NOT NULL,
  car_year INTEGER NOT NULL,
  vin TEXT,
  problem_description TEXT NOT NULL,
  service_type TEXT NOT NULL,
  urgency_level TEXT NOT NULL CHECK (urgency_level IN ('low', 'medium', 'high', 'urgent')),
  images TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'completed')),
  admin_response TEXT,
  recommended_products TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create orders table for future use
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  shipping_address TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create order items table
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diagnose_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for products (public read, admin write)
CREATE POLICY "Anyone can view products" ON public.products
  FOR SELECT TO PUBLIC USING (true);

CREATE POLICY "Authenticated users can insert products" ON public.products
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update products" ON public.products
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete products" ON public.products
  FOR DELETE TO authenticated USING (true);

-- Create RLS policies for diagnose requests
CREATE POLICY "Users can view their own requests" ON public.diagnose_requests
  FOR SELECT USING (auth.uid() = user_id OR auth.uid() IS NULL);

CREATE POLICY "Anyone can insert diagnose requests" ON public.diagnose_requests
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can update requests" ON public.diagnose_requests
  FOR UPDATE TO authenticated USING (true);

-- Create RLS policies for orders
CREATE POLICY "Users can view their own orders" ON public.orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own orders" ON public.orders
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for order items
CREATE POLICY "Users can view their own order items" ON public.order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own order items" ON public.order_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1))
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample products data
INSERT INTO public.products (name, price, sale_price, description, category, brand, stock_quantity, image_url, part_number, compatible_vehicles) VALUES
('Premium Brake Pads - Front', 89.99, NULL, 'High-performance ceramic brake pads for superior stopping power', 'braking', 'Bosch', 25, '/placeholder.svg', 'BP-FRONT-001', 'Toyota Camry 2018-2023, Honda Accord 2016-2022'),
('Air Filter - High Flow', 34.99, NULL, 'Performance air filter for improved engine airflow', 'engine', 'K&N', 15, '/placeholder.svg', 'AF-HF-002', 'Ford F-150 2015-2023, Chevrolet Silverado 2014-2022'),
('Shock Absorber - Rear', 129.99, NULL, 'Heavy-duty shock absorber for smooth ride comfort', 'suspension', 'Monroe', 8, '/placeholder.svg', 'SA-REAR-003', 'Nissan Altima 2019-2023, Hyundai Elantra 2017-2022'),
('LED Headlight Bulbs', 79.99, NULL, 'Ultra-bright LED headlight conversion kit', 'electrical', 'Philips', 20, '/placeholder.svg', 'LED-HL-004', 'BMW 3 Series 2016-2023, Audi A4 2017-2023'),
('Front Bumper Cover', 299.99, NULL, 'OEM-quality replacement front bumper cover', 'body', 'OEM', 5, '/placeholder.svg', 'BC-FRONT-005', 'Honda Civic 2016-2021, Toyota Corolla 2017-2022'),
('Clutch Kit Complete', 249.99, NULL, 'Complete clutch replacement kit with pressure plate', 'transmission', 'LUK', 12, '/placeholder.svg', 'CK-COMP-006', 'Mazda 6 2014-2020, Subaru Impreza 2015-2022');
