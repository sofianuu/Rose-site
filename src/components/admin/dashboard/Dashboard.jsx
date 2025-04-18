// Dashboard.jsx
import { useMemo } from 'react';
import MainStatistics from './MainStatistics';
import SalesChart from './SalesChart';
import BestSellingProductsChart from './BestSellingProductsChart';
import OrderStatusChart from './OrderStatusChart';
import LowStockProducts from './LowStockProducts';
import RecentOrders from './RecentOrders';

const Dashboard = ({ products, mockData }) => {
  // Calculate basic statistics
  const totalProducts = products.length;
  const activeProducts = useMemo(() => 
    products.filter(p => p.status === 'Activ').length, 
    [products]
  );
  
  const totalOrders = mockData.orders.length;
  const activeUsers = useMemo(() => 
    mockData.users.filter(u => u.status === 'Activ').length, 
    [mockData.users]
  );
  
  const totalRevenue = useMemo(() => 
    mockData.orders
      .filter(order => order.status !== 'Anulat')
      .reduce((sum, order) => sum + order.total, 0),
    [mockData.orders]
  );
  
  const averageOrderValue = useMemo(() => 
    totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : 0,
    [totalOrders, totalRevenue]
  );

  // Calculate low stock products
  const lowStockProducts = useMemo(() => 
    products.filter(p => p.stock < 10),
    [products]
  );

  // Calculate order status distribution
  const orderStatuses = useMemo(() => ({
    'Livrat': mockData.orders.filter(o => o.status === 'Livrat').length,
    'În procesare': mockData.orders.filter(o => o.status === 'În procesare').length,
    'În livrare': mockData.orders.filter(o => o.status === 'În livrare').length,
    'Anulat': mockData.orders.filter(o => o.status === 'Anulat').length
  }), [mockData.orders]);

  // Prepare data for charts
  const last7Days = useMemo(() => 
    Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse(),
    []
  );

  // Simulare date de vânzări zilnice bazate pe comenzi
  const dailySalesData = useMemo(() => {
    // Folosim datele din ultimele 7 zile din mockData.orders
    // Aici ar trebui să faceți o procesare mai complexă pentru un scenariu real
    // Acest exemplu simplu folosește datele hardcodate doar pentru demonstrație
    return [
      { date: '15 Mar', sales: 549.98, orders: 2, trend: 249.99 },
      { date: '14 Mar', sales: 299.99, orders: 1, trend: -149.99 },
      { date: '13 Mar', sales: 449.98, orders: 2, trend: 149.99 },
      { date: '12 Mar', sales: 199.99, orders: 1, trend: -249.99 },
      { date: '11 Mar', sales: 899.97, orders: 3, trend: 699.98 },
      { date: '10 Mar', sales: 349.98, orders: 1, trend: -549.99 },
      { date: '9 Mar', sales: 249.99, orders: 1, trend: -99.99 }
    ];
  }, []);

  // Calculează produsele cele mai vândute (simulare simplă)
  const bestSellingProducts = useMemo(() => {
    // În realitate, aici ar trebui să faceți o agregare a datelor din comenzi
    // Acest exemplu folosește date hardcodate pentru demonstrație
    return [
      { name: 'Rochie de vară', sales: 45 },
      { name: 'Pantaloni jeans', sales: 38 },
      { name: 'Bluză elegantă', sales: 32 },
      { name: 'Tricou basic', sales: 28 },
      { name: 'Rochie pentru copii', sales: 25 }
    ];
  }, []);

  // Prepare data for pie chart
  const orderStatusData = useMemo(() => 
    Object.entries(orderStatuses).map(([name, value]) => ({
      name,
      value
    })),
    [orderStatuses]
  );

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="space-y-6">
      {/* Main Statistics */}
      <MainStatistics 
        totalProducts={totalProducts}
        activeProducts={activeProducts}
        dailySales={dailySalesData[0]?.sales || 0}
        totalRevenue={totalRevenue}
        activeUsers={activeUsers}
        totalOrders={totalOrders}
      />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <SalesChart dailySalesData={dailySalesData} />

        {/* Best Selling Products Chart */}
        <BestSellingProductsChart bestSellingProducts={bestSellingProducts} />

        {/* Order Status Chart */}
        <OrderStatusChart orderStatusData={orderStatusData} COLORS={COLORS} />

        {/* Low Stock Products */}
        <LowStockProducts lowStockProducts={lowStockProducts} />
      </div>

      {/* Recent Orders */}
      <RecentOrders orders={mockData.orders} />
    </div>
  );
};

export default Dashboard;