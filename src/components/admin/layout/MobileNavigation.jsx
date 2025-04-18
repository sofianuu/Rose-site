import { BarChart2, Package, ShoppingCart, Users, Settings } from 'lucide-react';

const MobileNavigation = ({ activeTab, setActiveTab }) => {
  const navigationItems = [
    { id: 'dashboard', icon: <BarChart2 size={18} />, label: 'Dashboard' },
    { id: 'products', icon: <Package size={18} />, label: 'Produse' },
    { id: 'orders', icon: <ShoppingCart size={18} />, label: 'Comenzi' },
    { id: 'users', icon: <Users size={18} />, label: 'Utilizatori' },
    { id: 'settings', icon: <Settings size={18} />, label: 'Setări' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden z-50">
      <div className="grid grid-cols-5 gap-1 px-1 py-1">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-1 rounded-lg ${
              activeTab === item.id
                ? 'text-black '
                : 'text-gray-600'
            }`}
          >
            {item.icon}
            <span className="text-[10px] mt-0.5">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileNavigation;