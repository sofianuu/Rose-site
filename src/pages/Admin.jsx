import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/admin/layout/Sidebar';
import MobileNavigation from '../components/admin/layout/MobileNavigation';
import Dashboard from '../components/admin/dashboard/Dashboard';
import ProductsManager from '../components/admin/products/ProductsManager';
import OrdersManager from '../components/admin/orders/OrdersManager';
import UsersManager from '../components/admin/users/UsersManager';
import SettingsManager from '../components/admin/settings/SettingsManager';
import mockData from '../components/admin/data/mockData';

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Verificăm dacă utilizatorul este autentificat și este administrator
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!isAuthenticated || userData.email !== 'administrator@gmail.com') {
      navigate('/login');
      return;
    }

    setUser(userData);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Funcție care decide ce componentă să fie afișată în funcție de tab-ul activ
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return  <Dashboard products={mockData.products} mockData={mockData} />;
      case 'products':
        return <ProductsManager products={mockData.products} categories={mockData.categories} />;
      case 'orders':
        return <OrdersManager orders={mockData.orders} />;
      case 'users':
        return <UsersManager users={mockData.users} />;
      case 'settings':
        return <SettingsManager />;
      default:
        return <Dashboard mockData={mockData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="md:ml-64 pb-20 md:pb-8">
        <div className="p-3 md:p-6">
          <div className="bg-white rounded-lg shadow-sm p-3 md:p-6">
            {/* Content based on active tab */}
            <div className="space-y-3 md:space-y-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        user={user} 
        handleLogout={handleLogout} 
      />

      {/* Mobile Bottom Navigation */}
      <MobileNavigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
    </div>
  );
};

export default Admin;