
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardStats } from '@/types';
import { Package, AlertTriangle, MessageSquare, Clock } from 'lucide-react';

interface DashboardProps {
  stats: DashboardStats;
}

const Dashboard = ({ stats }: DashboardProps) => {
  const statCards = [
    {
      title: 'Total Products',
      value: stats.total_products,
      icon: Package,
      color: 'text-automotive-blue',
      bgColor: 'bg-automotive-blue/10'
    },
    {
      title: 'Low Stock Items',
      value: stats.low_stock_count,
      icon: AlertTriangle,
      color: 'text-automotive-red',
      bgColor: 'bg-automotive-red/10'
    },
    {
      title: 'Total Requests',
      value: stats.total_requests,
      icon: MessageSquare,
      color: 'text-automotive-green',
      bgColor: 'bg-automotive-green/10'
    },
    {
      title: 'Pending Requests',
      value: stats.pending_requests,
      icon: Clock,
      color: 'text-automotive-yellow',
      bgColor: 'bg-automotive-yellow/10'
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-automotive-charcoal">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="hover:shadow-automotive transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-automotive-warm-gray">{stat.title}</p>
                  <p className="text-3xl font-bold text-automotive-charcoal">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(stats.categories).map(([category, count]) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{category}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-automotive-cream rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-automotive-orange to-automotive-red rounded-full"
                        style={{ width: `${(count / stats.total_products) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-automotive-warm-gray w-8 text-right">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-4 bg-automotive-cream/50 rounded-lg">
                <h4 className="font-medium text-automotive-charcoal">Low Stock Alert</h4>
                <p className="text-sm text-automotive-warm-gray">
                  {stats.low_stock_count} items need restocking
                </p>
              </div>
              <div className="p-4 bg-automotive-yellow/10 rounded-lg">
                <h4 className="font-medium text-automotive-charcoal">Pending Diagnoses</h4>
                <p className="text-sm text-automotive-warm-gray">
                  {stats.pending_requests} customer requests awaiting response
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
