import React, { useState, useEffect } from 'react';
import { User, Clock, Heart, Package, CreditCard, Settings, LogOut, ChevronRight, Edit, MapPin, Bell, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [activeTab, setActiveTab] = useState(() => {
    // Verificăm dacă există un tab setat în sessionStorage
    const savedTab = window.sessionStorage.getItem('profileTab');
    // Dacă există, îl folosim, altfel folosim 'profile' ca valoare implicită
    if (savedTab) {
      // Ștergem tab-ul din sessionStorage pentru a nu persista între sesiuni
      window.sessionStorage.removeItem('profileTab');
      return savedTab;
    }
    return 'profile';
  });
  const navigate = useNavigate();

  // Adăugăm un listener pentru evenimentul de schimbare a tab-ului
  useEffect(() => {
    const handleTabChange = () => {
      const newTab = window.sessionStorage.getItem('profileTab');
      if (newTab) {
        setActiveTab(newTab);
        window.sessionStorage.removeItem('profileTab');
      }
    };

    window.addEventListener('profileTabChange', handleTabChange);

    return () => {
      window.removeEventListener('profileTabChange', handleTabChange);
    };
  }, []);

  // Funcție pentru deconectare
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    // În mod normal, aici ar fi logica de logout (eliminarea token-ului, etc.)
    // După deconectare, redirecționăm utilizatorul către pagina principală
    navigate('/');
  };

  // Date exemplu utilizator
  const user = {
    name: 'Maria Popescu',
    email: 'maria.popescu@email.com',
    phone: '+40 723 456 789',
    address: 'Strada Florilor 123, București, România',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  };

  // Date exemplu comenzi
  const orders = [
    { id: 'ORD-2458', date: '15 Mar 2025', status: 'Livrată', total: '350 RON', items: 3 },
    { id: 'ORD-2357', date: '28 Feb 2025', status: 'În procesare', total: '520 RON', items: 2 },
    { id: 'ORD-2256', date: '10 Feb 2025', status: 'Livrată', total: '180 RON', items: 1 }
  ];

  // Date exemplu lista de dorințe
  const wishlist = [
    { id: 1, name: 'Rochie de vară cu flori', price: '220 RON', image: '../assets/images/jacket_women.jpg' },
    { id: 2, name: 'Bluză elegantă', price: '150 RON', image: '../assets/images/jacket_men.jpg' },
    { id: 3, name: 'Pantaloni casual', price: '180 RON', image: '../assets/images/jacket_women.jpg' }
  ];

  // Handlerul pentru navigare la pagina de favorite
  const handleTabClick = (tabId) => {
    if (tabId === 'wishlist') {
      navigate('/favorites');
    } else {
      setActiveTab(tabId);
    }
  };

  // Componenta pentru taburi
  const TabButton = ({ label, icon, id }) => (
    <button 
      className={`flex items-center px-5 py-3.5 rounded-xl w-full text-left transition-all duration-200 ${
        activeTab === id 
          ? 'bg-gradient-to-r from-gray-50 to-gray-100 text-black font-medium shadow-sm' 
          : 'text-gray-700 hover:bg-gray-50'
      }`}
      onClick={() => handleTabClick(id)}
    >
      <div className={`${activeTab === id ? 'text-black' : 'text-gray-400'} transition-colors duration-200`}>
        {icon}
      </div>
      <span className="ml-3.5">{label}</span>
      {activeTab === id && (
        <div className="ml-auto bg-black w-1.5 h-1.5 rounded-full"></div>
      )}
    </button>
  );

  // Funcție pentru generarea salutului în funcție de ora din zi
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return 'Bună dimineața';
    } else if (hour >= 12 && hour < 18) {
      return 'Bună ziua';
    } else {
      return 'Bună seara';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-12">{getGreeting()}, {user.name.split(' ')[0]}</h1>
      
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-1/4 mb-6 lg:mb-0">
          <div className="bg-white rounded-lg shadow p-4 mb-4 sm:mb-6">
            <div className="space-y-1">
              <TabButton 
                id="profile" 
                label="Informații profil" 
                icon={<User size={20} />} 
              />
              <TabButton 
                id="orders" 
                label="Comenzile mele" 
                icon={<Package size={20} />} 
              />
              <button 
                className="flex items-center px-5 py-3.5 rounded-xl w-full text-left transition-all duration-200 text-gray-700 hover:bg-gray-50 group"
                onClick={() => navigate('/favorites')}
              >
                <div className="text-gray-400 group-hover:text-black transition-colors duration-200">
                  <Heart size={20} />
                </div>
                <span className="ml-3.5 group-hover:text-black">Lista de dorințe</span>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight size={18} className="text-black" />
                </div>
              </button>
              <TabButton 
                id="settings" 
                label="Setări cont" 
                icon={<Settings size={20} />} 
              />
            </div>
          </div>
          
          <button 
            className="w-full flex items-center justify-center px-4 py-3 rounded-md text-gray-700 hover:bg-gray-50 border border-gray-200 hover:text-red-600 transition-colors"
            onClick={handleLogout}
          >
            <LogOut size={20} className="mr-2" />
            <span>Deconectare</span>
          </button>
        </div>
        
        {/* Content */}
        <div className="w-full lg:w-3/4">
          <div className="bg-white rounded-lg shadow">
            {/* Profilul */}
            {activeTab === 'profile' && (
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
                  <h2 className="text-xl font-semibold">Informații personale</h2>
                  <button 
                    className="flex items-center justify-center px-3 py-2 text-sm rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors w-full sm:w-auto"
                    onClick={() => setActiveTab('edit-profile')}
                  >
                    <Edit size={16} className="mr-2" />
                    Editează
                  </button>
                </div>
                
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Nume complet</h3>
                    <p className="mt-1 text-base sm:text-lg break-words">{user.name}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p className="mt-1 text-base sm:text-lg break-words">{user.email}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Telefon</h3>
                    <p className="mt-1 text-base sm:text-lg">{user.phone}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Adresă de livrare</h3>
                    <p className="mt-1 text-base sm:text-lg flex items-start">
                      <MapPin size={18} className="mr-1 mt-1 flex-shrink-0 text-gray-400" />
                      <span className="break-words">{user.address}</span>
                    </p>
                  </div>
                </div>
                
                <div className="mt-8 sm:mt-10">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                    <h2 className="text-xl font-semibold flex items-center">
                      <CreditCard size={20} className="mr-2" />
                      Metode de plată
                    </h2>
                    <button 
                      className="text-sm text-black font-medium hover:text-black transition-colors"
                      onClick={() => setActiveTab('payment-methods')}
                    >
                      + Adaugă
                    </button>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex items-center">
                        <div className="w-12 h-8 bg-gradient-to-r from-black to-black rounded-md mr-4 flex items-center justify-center text-white text-xs font-bold">ROSE</div>
                        <div>
                          <p className="font-medium">•••• •••• •••• 4589</p>
                          <p className="text-sm text-gray-500">Expiră 03/2026</p>
                        </div>
                      </div>
                      <button 
                        className="text-gray-500 hover:text-gray-700 transition-colors sm:mt-0 mt-2"
                        onClick={() => setActiveTab('edit-payment')}
                      >
                        <Edit size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Comenzile */}
            {activeTab === 'orders' && (
              <div className="p-4 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center">
                    <span className="bg-green-100 text-green-600 p-2 rounded-lg mr-3">
                      <Package size={20} />
                    </span>
                    Comenzile mele
                  </h2>
                  <div className="relative w-full sm:w-auto">
                    <input
                      type="text"
                      placeholder="Caută comenzi..."
                      className="pl-10 pr-4 py-2 rounded-none border-0 border-b border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500 text-sm bg-transparent transition-colors w-full"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                
                {orders.length > 0 ? (
                  <div className="space-y-4 sm:space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-gray-100 rounded-xl hover:shadow-md transition-all duration-200 bg-white overflow-hidden group">
                        <div className="p-4 sm:p-5">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                            <div>
                              <p className="font-bold text-lg text-gray-800">{order.id}</p>
                              <div className="flex items-center mt-1">
                                <Clock size={14} className="text-gray-400 mr-1.5" />
                                <p className="text-sm text-gray-500">{order.date}</p>
                              </div>
                            </div>
                            <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                              order.status === 'Livrată' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            } mt-2 sm:mt-0`}>
                              {order.status}
                            </span>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-3 border-t border-gray-100 gap-3">
                            <p className="text-gray-500 flex items-center">
                              <Package size={16} className="mr-1.5 text-gray-400" />
                              <span>{order.items} produse</span>
                            </p>
                            <div className="flex items-center justify-between sm:justify-start">
                              <p className="font-bold text-lg mr-5 text-gray-800">{order.total}</p>
                              <button 
                                className="flex items-center text-black group-hover:text-black font-medium transition-colors"
                                onClick={() => navigate(`/orders/${order.id}`)}
                              >
                                Detalii
                                <ChevronRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 sm:py-16 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <Package size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 mb-4">Nu ai nicio comandă încă.</p>
                    <button 
                        className="mt-2 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors shadow-sm hover:shadow font-medium"
                      onClick={() => navigate('/shop')}
                    >
                      Începe cumpărăturile
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {/* Setări cont */}
            {activeTab === 'settings' && (
              <div className="p-4 sm:p-6">
                <h2 className="text-xl font-semibold mb-4 sm:mb-6">Setări cont</h2>
                
                <div className="space-y-6 sm:space-y-8">
                  <div className="bg-gray-50 p-4 sm:p-5 rounded-lg border border-gray-200">
                    <h3 className="text-base sm:text-lg font-medium mb-4">Preferințe comunicare</h3>
                    
                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <p className="font-medium">Newsletter și oferte</p>
                          <p className="text-sm text-gray-500">Primește ultimele tendințe și reduceri</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer mt-2 sm:mt-0">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-black peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                        </label>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <p className="font-medium">Statusul comenzilor</p>
                          <p className="text-sm text-gray-500">Notificări despre comenzile tale</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer mt-2 sm:mt-0">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-black peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 sm:p-5 rounded-lg border border-gray-200">
                    <h3 className="text-base sm:text-lg font-medium mb-4">Schimbă parola</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Parola actuală</label>
                        <input 
                          type="password" 
                          placeholder="••••••••" 
                          className="w-full px-3 py-2 border-0 border-b border-gray-300 rounded-none focus:outline-none focus:ring-0 focus:border-black bg-transparent transition-colors"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Parola nouă</label>
                        <input 
                          type="password" 
                          placeholder="••••••••" 
                          className="w-full px-3 py-2 border-0 border-b border-gray-300 rounded-none focus:outline-none focus:ring-0 focus:border-black bg-transparent transition-colors"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirmă parola nouă</label>
                        <input 
                          type="password" 
                          placeholder="••••••••" 
                          className="w-full px-3 py-2 border-0 border-b border-gray-300 rounded-none focus:outline-none focus:ring-0 focus:border-black bg-transparent transition-colors"
                        />
                      </div>
                      
                      <button 
                        className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors w-full sm:w-auto"
                        onClick={() => alert('Parola a fost actualizată cu succes!')}
                      >
                        Actualizează parola
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-red-50 p-4 sm:p-5 rounded-lg border border-red-100">
                    <h3 className="text-base sm:text-lg font-medium text-red-600 mb-2">Ștergere cont</h3>
                    <p className="text-gray-700 mb-4">Această acțiune este permanentă și va duce la ștergerea definitivă a contului tău și a tuturor datelor asociate.</p>
                    <button 
                      className="px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-100 transition-colors w-full sm:w-auto"
                      onClick={() => {
                        if (window.confirm('Ești sigur că dorești să ștergi contul? Această acțiune este ireversibilă.')) {
                          alert('Contul a fost șters cu succes!');
                          navigate('/');
                        }
                      }}
                    >
                      Șterge contul
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Edit Profile Tab */}
            {activeTab === 'edit-profile' && (
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3">
                  <h2 className="text-xl font-semibold">Editare profil</h2>
                  <button 
                    className="flex items-center justify-center px-3 py-2 text-sm rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 w-full sm:w-auto"
                    onClick={() => setActiveTab('profile')}
                  >
                    <ChevronRight size={16} className="mr-1 transform rotate-180" />
                    Înapoi
                  </button>
                </div>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nume complet</label>
                    <input 
                      type="text" 
                      defaultValue={user.name}
                      className="w-full px-3 py-2 border-0 border-b border-gray-300 rounded-none focus:outline-none focus:ring-0 focus:border-black bg-transparent transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      defaultValue={user.email}
                      className="w-full px-3 py-2 border-0 border-b border-gray-300 rounded-none focus:outline-none focus:ring-0 focus:border-black bg-transparent transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                    <input 
                      type="tel" 
                      defaultValue={user.phone}
                      className="w-full px-3 py-2 border-0 border-b border-gray-300 rounded-none focus:outline-none focus:ring-0 focus:border-blue-500 bg-transparent transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Adresă</label>
                    <textarea 
                      defaultValue={user.address}
                      rows={3}
                      className="w-full px-3 py-2 border-0 border-b border-gray-300 rounded-none focus:outline-none focus:ring-0 focus:border-blue-500 bg-transparent transition-colors"
                    />
                  </div>
                  
                  <div className="pt-4 flex flex-col sm:flex-row gap-3">
                    <button 
                      className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors w-full sm:w-auto order-2 sm:order-1"
                      onClick={() => {
                        alert('Profilul a fost actualizat cu succes!');
                        setActiveTab('profile');
                      }}
                    >
                      Salvează modificările
                    </button>
                    <button 
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors w-full sm:w-auto order-1 sm:order-2"
                      onClick={() => setActiveTab('profile')}
                    >
                      Anulează
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Edit Payment Method Tab */}
            {activeTab === 'edit-payment' || activeTab === 'payment-methods' && (
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3">
                  <h2 className="text-xl font-semibold">
                    {activeTab === 'edit-payment' ? 'Editare metodă de plată' : 'Adaugă metodă de plată'}
                  </h2>
                  <button 
                    className="flex items-center justify-center px-3 py-2 text-sm rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 w-full sm:w-auto"
                    onClick={() => setActiveTab('profile')}
                  >
                    <ChevronRight size={16} className="mr-1 transform rotate-180" />
                    Înapoi
                  </button>
                </div>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Număr card</label>
                    <input 
                      type="text" 
                      placeholder="1234 5678 9012 3456"
                      defaultValue={activeTab === 'edit-payment' ? '4111 1111 1111 4589' : ''}
                      className="w-full px-3 py-2 border-0 border-b border-gray-300 rounded-none focus:outline-none focus:ring-0 focus:border-blue-500 bg-transparent transition-colors"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Data expirării</label>
                      <input 
                        type="text" 
                        placeholder="MM/YY"
                        defaultValue={activeTab === 'edit-payment' ? '03/26' : ''}
                        className="w-full px-3 py-2 border-0 border-b border-gray-300 rounded-none focus:outline-none focus:ring-0 focus:border-black bg-transparent transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                      <input 
                        type="text" 
                        placeholder="123"
                        className="w-full px-3 py-2 border-0 border-b border-gray-300 rounded-none focus:outline-none focus:ring-0 focus:border-black bg-transparent transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nume pe card</label>
                    <input 
                      type="text" 
                      placeholder="MARIA POPESCU"
                      defaultValue={activeTab === 'edit-payment' ? 'MARIA POPESCU' : ''}
                      className="w-full px-3 py-2 border-0 border-b border-gray-300 rounded-none focus:outline-none focus:ring-0 focus:border-black bg-transparent transition-colors"
                    />
                  </div>
                  
                  <div className="pt-4 flex flex-col sm:flex-row gap-3">
                    <button 
                      className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors w-full sm:w-auto order-2 sm:order-1"
                      onClick={() => {
                        alert('Metoda de plată a fost ' + (activeTab === 'edit-payment' ? 'actualizată' : 'adăugată') + ' cu succes!');
                        setActiveTab('profile');
                      }}
                    >
                      {activeTab === 'edit-payment' ? 'Salvează modificările' : 'Adaugă metoda de plată'}
                    </button>
                    <button 
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors w-full sm:w-auto order-1 sm:order-2"
                      onClick={() => setActiveTab('profile')}
                    >
                      Anulează
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;