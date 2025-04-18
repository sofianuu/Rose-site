import { Package, DollarSign, Users } from 'lucide-react';
import StatCard from './StatCard';


const MainStatistics = ({ totalProducts, activeProducts, dailySales, totalRevenue, activeUsers, totalOrders }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCard 
        title="Total produse" 
        value={totalProducts} 
        subValue={`${activeProducts} active`} 
        icon={Package}
      />
      <StatCard 
        title="Vânzări Zilnice" 
        value={`${dailySales.toFixed(2) || 0} RON`} 
        subValue={`${totalRevenue.toFixed(2)} RON total`} 
        icon={DollarSign}
      />
      <StatCard 
        title="Utilizatori Activi" 
        value={activeUsers} 
        subValue={`${totalOrders} comenzi`} 
        icon={Users}
      />
    </div>
  );
};

export default MainStatistics;