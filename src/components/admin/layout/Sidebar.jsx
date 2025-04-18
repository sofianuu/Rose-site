import { BarChart2, Package, ShoppingCart, Users, Settings, LogOut } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, user, handleLogout }) => {
  const adminMenuItems = [
    { id: 'dashboard', icon: <BarChart2 size={20} />, label: 'Dashboard' },
    { id: 'products', icon: <Package size={20} />, label: 'Produse' },
    { id: 'orders', icon: <ShoppingCart size={20} />, label: 'Comenzi' },
    { id: 'users', icon: <Users size={20} />, label: 'Utilizatori' },
    { id: 'settings', icon: <Settings size={20} />, label: 'Setări' },
  ];

  return (
    <div className="hidden md:fixed md:inset-y-0 md:left-0 md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow bg-white shadow-lg">
        {/* Header */}
        {/* <div className="p-4">
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          <p className="text-sm text-gray-500">Bine ai venit, {user?.name || 'Administrator'}</p>
        </div> */}

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2 py-25 overflow-y-auto">
          {adminMenuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-gray-50 text-black'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>Deconectare</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;