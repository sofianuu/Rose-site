import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Package, Clock, CreditCard, ChevronRight, Truck, Check, MapPin } from 'lucide-react';

const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);

  // Simulate fetching order data
  useEffect(() => {
    // In a real app, you would fetch the order data from an API
    const fetchOrder = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock order data
        const mockOrder = {
          id: orderId,
          date: orderId === 'ORD-2458' ? '15 Mar 2025' : 
                orderId === 'ORD-2357' ? '28 Feb 2025' : '10 Feb 2025',
          status: orderId === 'ORD-2357' ? 'În procesare' : 'Livrată',
          total: orderId === 'ORD-2458' ? '350 RON' : 
                 orderId === 'ORD-2357' ? '520 RON' : '180 RON',
          paymentMethod: 'Card credit/debit',
          shippingAddress: 'Strada Florilor 123, București, România, 012345',
          items: [
            {
              id: 1,
              name: 'Rochie de vară cu flori',
              price: 149.99,
              quantity: 1,
              size: 'M',
              color: 'Albastru',
              image: '/src/assets/images/jacket_women.jpg'
            },
            {
              id: 2,
              name: 'Sacou elegant din lână',
              price: 199.99,
              quantity: 1,
              size: 'L',
              color: 'Negru',
              image: '/src/assets/images/jacket_men.jpg'
            }
          ],
          trackingNumber: 'AWB123456789',
          estimatedDelivery: '17 Mar 2025'
        };
        
        setOrder(mockOrder);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrder();
  }, [orderId]);

  // Steps for order progress
  const getOrderSteps = () => {
    // Different steps based on order status
    if (order.status === 'Livrată') {
      return [
        { label: 'Comandă plasată', date: order.date, completed: true },
        { label: 'Procesare comandă', date: '', completed: true },
        { label: 'În curs de livrare', date: '', completed: true },
        { label: 'Comandă livrată', date: '', completed: true }
      ];
    } else {
      return [
        { label: 'Comandă plasată', date: order.date, completed: true },
        { label: 'Procesare comandă', date: '', completed: true },
        { label: 'În curs de livrare', date: '', completed: false },
        { label: 'Comandă livrată', date: '', completed: false }
      ];
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center py-16">
          <h2 className="text-2xl font-light mb-3">Comandă negăsită</h2>
          <p className="text-gray-500 mb-8">Nu am putut găsi comanda cu ID-ul {orderId}.</p>
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center justify-center mx-auto bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Înapoi
          </button>
        </div>
      </div>
    );
  }

  const orderSteps = getOrderSteps();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header with back button */}
      <div className="mb-8">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-gray-600 hover:text-black transition-colors mb-4"
        >
          <ArrowLeft size={16} className="mr-1" />
          <span>Înapoi la comenzi</span>
        </button>
        <h1 className="text-2xl sm:text-3xl font-semibold">Detalii comandă {order.id}</h1>
        <div className="flex items-center mt-2">
          <Clock size={16} className="text-gray-500 mr-1.5" />
          <p className="text-gray-500">Plasată pe {order.date}</p>
        </div>
      </div>

      {/* Order status and tracking */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <div>
            <h2 className="text-lg font-medium mb-1">Status comandă</h2>
            <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
              order.status === 'Livrată' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {order.status}
            </span>
          </div>
          
          {order.status === 'Livrată' ? (
            <div className="bg-green-50 border border-green-100 rounded-md px-4 py-2 flex items-center">
              <Check size={18} className="text-green-600 mr-2" />
              <span className="text-green-800 font-medium">Livrată cu succes</span>
            </div>
          ) : (
            <div className="bg-blue-50 border border-blue-100 rounded-md px-4 py-2 flex items-center">
              <Truck size={18} className="text-blue-600 mr-2" />
              <span className="text-blue-800 font-medium">Livrare estimată: {order.estimatedDelivery}</span>
            </div>
          )}
        </div>
        
        {/* Order progress steps */}
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-between items-center">
              {orderSteps.map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className={`flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full ${
                    step.completed ? 'bg-green-600' : 'bg-gray-200'
                  }`}>
                    {step.completed ? (
                      <Check size={16} className="text-white" />
                    ) : (
                      <span className="text-gray-500 text-sm">{index + 1}</span>
                    )}
                  </div>
                  <div className="mt-3 text-center">
                    <h3 className={`text-xs font-medium ${step.completed ? 'text-green-600' : 'text-gray-500'}`}>
                      {step.label}
                    </h3>
                    {step.date && (
                      <p className="text-xs text-gray-500 mt-0.5">{step.date}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Tracking information */}
        {order.trackingNumber && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h3 className="text-sm font-medium">Număr de urmărire</h3>
                <p className="text-lg font-medium">{order.trackingNumber}</p>
              </div>
              <a 
                href={`https://www.google.com/search?q=tracking+${order.trackingNumber}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-black font-medium transition-colors hover:text-gray-600"
              >
                Urmărește comanda
                <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </div>
        )}
      </div>
      
      {/* Order items */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-lg font-medium mb-6">Produse comandate</h2>
        
        <div className="space-y-6">
          {order.items.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
              <div className="sm:w-24 sm:h-24 mb-4 sm:mb-0 flex-shrink-0">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-grow sm:ml-6">
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <div className="text-gray-500 text-sm mt-1">
                      <p>Mărime: {item.size} | Culoare: {item.color}</p>
                      <p>Cantitate: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="font-medium mt-2 sm:mt-0">
                    {item.price.toFixed(2)} lei
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>{parseFloat(order.total).toFixed(2)} lei</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Livrare</span>
              <span>15.99 lei</span>
            </div>
            <div className="border-t border-gray-100 pt-2 mt-2">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{order.total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Order and shipping details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-medium mb-4">Detalii comandă</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Număr comandă</h3>
              <p className="mt-1">{order.id}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Data plasării</h3>
              <p className="mt-1">{order.date}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Metodă de plată</h3>
              <p className="mt-1 flex items-center">
                <CreditCard size={16} className="mr-1.5 text-gray-400" />
                {order.paymentMethod}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-medium mb-4">Adresă de livrare</h2>
          
          <div className="flex items-start">
            <MapPin size={18} className="mr-2 mt-0.5 text-gray-400 flex-shrink-0" />
            <p className="text-gray-800">
              {order.shippingAddress}
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <Link 
            to="/Profile" 
              onClick={() => {
                try {
                  window.sessionStorage.setItem('profileTab', 'orders');
                  if (window.location.pathname.includes('/Profile')) {
                    window.dispatchEvent(new Event('profileTabChange'));
                  }
                } catch (error) {
                  console.error("Error setting orders tab:", error);
                }
              }}
               className="border border-gray-300 px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors">
              Înapoi la comenzi
            </Link>
      </div>
    </div>
  );
};

export default OrderDetail; 