
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import Dashboard from '@/components/admin/Dashboard';
import ProductTable from '@/components/admin/ProductTable';
import ProductForm from '@/components/admin/ProductForm';
import { isAuthenticated } from '@/lib/auth';
import { getProducts, getDiagnoseRequests, getDashboardStats } from '@/lib/storage';
import { Product, DashboardStats, DiagnoseRequest } from '@/types';

const Admin = () => {
  const [activeSection, setActiveSection] = useState<'dashboard' | 'products' | 'requests'>('dashboard');
  const [products, setProducts] = useState<Product[]>([]);
  const [requests, setRequests] = useState<DiagnoseRequest[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    total_products: 0,
    low_stock_count: 0,
    total_requests: 0,
    pending_requests: 0,
    categories: {}
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    loadData();
  }, [navigate]);

  const loadData = () => {
    const productsData = getProducts();
    const requestsData = getDiagnoseRequests();
    const statsData = getDashboardStats();
    
    setProducts(productsData);
    setRequests(requestsData);
    setStats(statsData);
  };

  const handleProductFormSuccess = () => {
    setShowProductForm(false);
    setEditingProduct(null);
    loadData();
  };

  const handleProductFormCancel = () => {
    setShowProductForm(false);
    setEditingProduct(null);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowProductForm(true);
  };

  const renderContent = () => {
    if (showProductForm) {
      return (
        <ProductForm
          product={editingProduct}
          onSuccess={handleProductFormSuccess}
          onCancel={handleProductFormCancel}
        />
      );
    }

    switch (activeSection) {
      case 'dashboard':
        return <Dashboard stats={stats} />;
      case 'products':
        return (
          <ProductTable
            products={products}
            onEdit={handleEditProduct}
            onAdd={handleAddProduct}
            onRefresh={loadData}
          />
        );
      case 'requests':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-automotive-charcoal">Diagnose Requests</h1>
            <div className="grid gap-4">
              {requests.map((request) => (
                <div key={request.id} className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-automotive-charcoal">{request.customer_name}</h3>
                      <p className="text-sm text-automotive-warm-gray">{request.email} • {request.phone}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      request.status === 'pending' ? 'bg-automotive-yellow/20 text-automotive-yellow' :
                      request.status === 'in-progress' ? 'bg-automotive-blue/20 text-automotive-blue' :
                      'bg-automotive-green/20 text-automotive-green'
                    }`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-automotive-charcoal">Vehicle:</p>
                      <p className="text-sm text-automotive-warm-gray">
                        {request.car_year} {request.car_make} {request.car_model}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-automotive-charcoal">Service Type:</p>
                      <p className="text-sm text-automotive-warm-gray">{request.service_type}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm font-medium text-automotive-charcoal mb-2">Problem Description:</p>
                    <p className="text-sm text-automotive-warm-gray">{request.problem_description}</p>
                  </div>
                  {request.images.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-automotive-charcoal mb-2">Images:</p>
                      <div className="flex gap-2">
                        {request.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Diagnostic ${index + 1}`}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  <p className="text-xs text-automotive-warm-gray">
                    Submitted: {new Date(request.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
              {requests.length === 0 && (
                <div className="text-center py-8 text-automotive-warm-gray">
                  No diagnostic requests yet
                </div>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AdminLayout
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    >
      {renderContent()}
    </AdminLayout>
  );
};

export default Admin;
