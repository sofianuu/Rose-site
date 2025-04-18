import React, { useState, useEffect } from 'react';
import { Search, Filter, X, Check } from 'lucide-react';
import OrdersList from './OrdersList';
import OrdersCards from './OrdersCards';

const OrdersManager = ({ orders }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredOrders, setFilteredOrders] = useState(orders);
  
  // Filtre
  const [filters, setFilters] = useState({
    status: [],
    dateRange: {
      from: '',
      to: ''
    },
    priceRange: {
      min: '',
      max: ''
    }
  });

  // Lista de statusuri unice
  const statusOptions = ['Livrat', 'În procesare', 'În livrare', 'Anulat'];

  // Aplică filtrele când se schimbă
  useEffect(() => {
    applyFilters();
  }, [searchTerm, filters, orders]);

  // Funcție pentru aplicarea filtrelor și a căutării
  const applyFilters = () => {
    let result = [...orders];
    
    // Aplicăm căutarea
    if (searchTerm.trim()) {
      result = result.filter(order => 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filtrare după status
    if (filters.status.length > 0) {
      result = result.filter(order => filters.status.includes(order.status));
    }
    
    // Filtrare după data
    if (filters.dateRange.from) {
      const fromDate = new Date(filters.dateRange.from);
      result = result.filter(order => new Date(order.date) >= fromDate);
    }
    
    if (filters.dateRange.to) {
      const toDate = new Date(filters.dateRange.to);
      toDate.setHours(23, 59, 59, 999); // Setăm la sfârșitul zilei
      result = result.filter(order => new Date(order.date) <= toDate);
    }
    
    // Filtrare după preț
    if (filters.priceRange.min) {
      result = result.filter(order => order.total >= parseFloat(filters.priceRange.min));
    }
    
    if (filters.priceRange.max) {
      result = result.filter(order => order.total <= parseFloat(filters.priceRange.max));
    }
    
    setFilteredOrders(result);
  };

  // Resetare filtre
  const resetFilters = () => {
    setFilters({
      status: [],
      dateRange: {
        from: '',
        to: ''
      },
      priceRange: {
        min: '',
        max: ''
      }
    });
    setSearchTerm('');
  };

  // Verifică dacă sunt filtre active
  const hasActiveFilters = () => {
    return filters.status.length > 0 || 
           filters.dateRange.from || 
           filters.dateRange.to || 
           filters.priceRange.min || 
           filters.priceRange.max;
  };

  // Toggle status în filtre
  const toggleStatusFilter = (status) => {
    if (filters.status.includes(status)) {
      setFilters({
        ...filters,
        status: filters.status.filter(s => s !== status)
      });
    } else {
      setFilters({
        ...filters,
        status: [...filters.status, status]
      });
    }
  };

  // Actualizare filtru preț
  const updatePriceFilter = (field, value) => {
    setFilters({
      ...filters,
      priceRange: {
        ...filters.priceRange,
        [field]: value
      }
    });
  };

  // Actualizare filtru dată
  const updateDateFilter = (field, value) => {
    setFilters({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Caută comenzi..."
            className="pl-10 pr-4 py-2 border rounded-lg w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        <div className="flex space-x-2 w-full sm:w-auto">
          <button 
            className={`flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50 w-full sm:w-auto justify-center ${
              hasActiveFilters() ? 'border-blue-500 text-blue-600' : ''
            }`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} className="mr-2" />
            {hasActiveFilters() ? `Filtre (${filters.status.length + 
              (filters.dateRange.from || filters.dateRange.to ? 1 : 0) + 
              (filters.priceRange.min || filters.priceRange.max ? 1 : 0)})` : 'Filtrează'}
          </button>
          {hasActiveFilters() && (
            <button 
              className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50"
              onClick={resetFilters}
            >
              <X size={18} className="mr-2" />
              Resetează
            </button>
          )}
        </div>
      </div>

      {/* Filtru expandabil */}
      {showFilters && (
        <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
          <h3 className="text-lg font-medium mb-2">Filtre</h3>
          
          {/* Status */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Status comandă</h4>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map(status => (
                <button
                  key={status}
                  onClick={() => toggleStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-sm flex items-center ${
                    filters.status.includes(status) 
                      ? 'bg-blue-100 text-blue-700 border border-blue-300' 
                      : 'bg-gray-100 text-gray-600 border border-gray-200'
                  }`}
                >
                  {filters.status.includes(status) && <Check size={14} className="mr-1" />}
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Interval de preț */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Preț total (RON)</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="number"
                  placeholder="Minim"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={filters.priceRange.min}
                  onChange={(e) => updatePriceFilter('min', e.target.value)}
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Maxim"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={filters.priceRange.max}
                  onChange={(e) => updatePriceFilter('max', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Interval de dată */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Dată comandă</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="date"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={filters.dateRange.from}
                  onChange={(e) => updateDateFilter('from', e.target.value)}
                />
              </div>
              <div>
                <input
                  type="date"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={filters.dateRange.to}
                  onChange={(e) => updateDateFilter('to', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Afișare număr de rezultate */}
      <div className="text-sm text-gray-600">
        Se afișează {filteredOrders.length} din {orders.length} comenzi
      </div>

      {/* Lista de comenzi */}
      <div className="hidden md:block">
        <OrdersList orders={filteredOrders} />
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <OrdersCards orders={filteredOrders} />
      </div>
    </div>
  );
};

export default OrdersManager;