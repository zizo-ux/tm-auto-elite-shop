
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { logout } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { 
  LayoutDashboard, 
  Package, 
  MessageSquare, 
  LogOut, 
  Menu, 
  X 
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeSection: 'dashboard' | 'products' | 'requests';
  onSectionChange: (section: 'dashboard' | 'products' | 'requests') => void;
}

const AdminLayout = ({ children, activeSection, onSectionChange }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
    navigate('/login');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'requests', label: 'Diagnose Requests', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-automotive-cream/30">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-white shadow-automotive z-50 transform transition-transform lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 border-b border-automotive-warm-gray/20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-automotive-charcoal">TM Auto Admin</h2>
              <p className="text-sm text-automotive-warm-gray">Management Panel</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSectionChange(item.id as any);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeSection === item.id
                  ? 'bg-gradient-to-r from-automotive-orange to-automotive-red text-white'
                  : 'text-automotive-charcoal hover:bg-automotive-cream/50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-4 right-4">
          <Button
            variant="automotive-outline"
            className="w-full"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b border-automotive-warm-gray/20 p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-gradient-to-br from-automotive-orange to-automotive-red rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-sm font-medium text-automotive-charcoal">Admin User</span>
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
