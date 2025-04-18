import { useState, useEffect } from 'react';
import { X, ChevronLeft, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, calculateTotal } = useCart();
  
  // State pentru dialogul de confirmare
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showConfirmation) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showConfirmation]);

  // Funcția pentru a iniția procesul de ștergere
  const initiateRemove = (item) => {
    setItemToRemove(item);
    setShowConfirmation(true);
  };

  // Funcția pentru a confirma ștergerea
  const confirmRemove = () => {
    if (itemToRemove) {
      removeFromCart(itemToRemove.id, itemToRemove.size, itemToRemove.color);
      setShowConfirmation(false);
      setItemToRemove(null);
    }
  };

  // Funcția pentru a anula ștergerea
  const cancelRemove = () => {
    setShowConfirmation(false);
    setItemToRemove(null);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const shipping = cartItems.length > 0 ? 15.99 : 0;
  const subtotal = calculateTotal();
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Dialog de confirmare pentru ștergere */}
      {showConfirmation && (
        <>
          {/* Semi-transparent overlay */}
          <div 
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              zIndex: 40
            }}
            onClick={cancelRemove}
          ></div>
          
          {/* Modal content */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-md shadow-xl w-full max-w-md border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Confirmă eliminarea</h3>
                <button 
                  onClick={cancelRemove}
                  className="text-gray-400 hover:text-black transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <p className="text-gray-600 mb-6">
                Ești sigur că dorești să elimini "<span className="font-semibold">{itemToRemove?.title}</span>" din coșul tău?
              </p>
              <div className="flex space-x-3 justify-end">
                <button 
                  onClick={cancelRemove}
                  className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors font-medium rounded-sm"
                >
                  Anulează
                </button>
                <button 
                  onClick={confirmRemove}
                  className="px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors font-medium rounded-sm"
                >
                  Elimină
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="mb-8">
        <h1 className="text-2xl font-light text-center">Coșul meu de cumpărături</h1>
        <div className="w-20 h-0.5 bg-black mx-auto mt-2"></div>
      </div>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-16 max-w-md mx-auto">
          <div className="flex justify-center mb-6">
            <ShoppingBag size={72} className="text-gray-200" />
          </div>
          <h2 className="text-2xl font-light mb-3">Coșul tău este gol</h2>
          <p className="text-gray-500 mb-8">Se pare că nu ai adăugat încă niciun produs în coș.</p>
          <Link to="/" className="inline-flex items-center bg-black text-white hover:bg-gray-800 px-6 py-3 font-medium transition-colors">
            <ChevronLeft size={16} className="mr-1" />
            <span>Continuă cumpărăturile</span>
          </Link>
        </div>
      ) : (
        <div className="lg:grid lg:grid-cols-3 lg:gap-10">
          {/* Produse */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded border border-gray-100 p-6 mb-6">
              <div className="border-b border-gray-100 pb-4 mb-6">
                <h2 className="text-lg font-medium">Produse ({cartItems.length})</h2>
              </div>
              
              <div className="space-y-8">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex flex-col sm:flex-row border-b border-gray-100 pb-8">
                    <div className="sm:w-28 sm:h-36 mb-4 sm:mb-0 flex-shrink-0">
                      <Link to={`/product/${item.id}`} className="block cursor-pointer hover:opacity-80 transition-opacity">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </Link>
                    </div>
                    
                    <div className="flex-grow sm:ml-6">
                      <div className="flex justify-between mb-2">
                        <Link to={`/product/${item.id}`} className="font-medium hover:text-gray-800 transition-colors">
                          {item.title}
                        </Link>
                        <button 
                          onClick={() => initiateRemove(item)}
                          className="text-gray-400 hover:text-black transition-colors"
                          aria-label="Elimină produsul"
                        >
                          <X size={18} />
                        </button>
                      </div>
                      
                      <div className="text-gray-600 text-sm mb-4">
                        <p>Mărime: {item.size}</p>
                        <p>Culoare: {item.color}</p>
                        <p className="font-medium text-black mt-2">{item.price.toFixed(2)} lei</p>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center border border-gray-200 rounded-sm">
                          <button 
                            onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                            aria-label="Scade cantitatea"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                            aria-label="Crește cantitatea"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        
                        <div className="font-semibold">
                          {(item.price * item.quantity).toFixed(2)} lei
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <Link to="/" className="inline-flex items-center text-gray-700 hover:text-black font-medium transition-colors">
                  <ChevronLeft size={16} className="mr-1" />
                  <span>Continuă cumpărăturile</span>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Sumar comandă */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded border border-gray-100 p-6 mb-6">
              <h2 className="text-lg font-medium mb-6">Sumar comandă</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{subtotal.toFixed(2)} lei</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Livrare</span>
                  <span>{shipping.toFixed(2)} lei</span>
                </div>
                <div className="border-t border-gray-100 pt-3 mt-3">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{total.toFixed(2)} lei</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">TVA inclus</p>
                </div>
              </div>
              
              <button 
                onClick={handleCheckout}
                className="w-full bg-black text-white py-3 font-medium hover:bg-gray-800 transition-colors mb-4"
              >
                FINALIZEAZĂ COMANDA
              </button>
              
              <div className="text-xs text-gray-500 mb-4">
                <p>Prin finalizarea comenzii, accepți <Link to="/footer/terms" className="text-gray-600 underline hover:text-black transition">Termenii și Condițiile</Link> site-ului.</p>
              </div>
              
              <div className="border-t border-gray-100 pt-4 mt-4">
                <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Livrare gratuită pentru comenzi peste 250 lei</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Retur gratuit în 30 de zile</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;