import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import { FiUser } from "react-icons/fi";
import { LuHeart } from "react-icons/lu";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { User, Package, Heart, Settings, LogIn } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";

function Nav({isOpen, toggleMenu}) {
  const [activePreview, setActivePreview] = useState(null);
  const [preventHideTimeout, setPreventHideTimeout] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  
  // Safely access cart context with fallbacks
  const cartContext = useCart();
  const getCartItemsCount = cartContext?.getCartItemsCount || (() => 0);
  const cartItems = cartContext?.cartItems || [];
  const calculateTotal = cartContext?.calculateTotal || (() => 0);

  // Safely access favorites context with fallbacks
  const favoritesContext = useFavorites();
  const getAllFavorites = favoritesContext?.getAllFavorites || (() => []);
  
  // Verificăm starea de autentificare la încărcarea componentei
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
    
    // Detectăm dacă este mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Verificăm la încărcare
    checkIfMobile();
    
    // Adăugăm event listener pentru redimensionare
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  // Funcția pentru navigare către profil sau login în funcție de starea de autentificare
  const handleProfileNavigation = () => {
    if (isAuthenticated) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
    // Închide meniul mobil dacă este deschis
    if (isOpen) {
      toggleMenu();
    }
  };
  
  // Funcția pentru a arăta preview-ul - doar pe desktop
  const showPreview = (id) => {
    if (isMobile) return; // Nu arăta preview pe mobile
    
    if (preventHideTimeout) {
      clearTimeout(preventHideTimeout);
      setPreventHideTimeout(null);
    }
    setActivePreview(id);
  };
  
  // Funcția pentru a ascunde preview-ul cu o mică întârziere
  const hidePreviewWithDelay = (id) => {
    if (isMobile) return; // Nu procesa pe mobile
    
    const timeout = setTimeout(() => {
      if (activePreview === id) {
        setActivePreview(null);
      }
    }, 100); // O scurtă întârziere pentru a permite trecerea de la icoană la preview
    
    setPreventHideTimeout(timeout);
  };
  
  // Funcție pentru a procesa căutarea
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/Search?q=${encodeURIComponent(searchQuery.trim())}`);
      setActivePreview(null); // Închide preview-ul după căutare
    }
  };

  // Funcție pentru a procesa căutarea din link-urile predefinite
  const handlePopularSearch = (term) => {
    navigate(`/Search?q=${encodeURIComponent(term)}`);
    setActivePreview(null);
  };

  // Funcție pentru schimbarea stării de autentificare (simulare)
  const toggleAuth = () => {
    const newAuthState = !isAuthenticated;
    setIsAuthenticated(newAuthState);
    localStorage.setItem('isAuthenticated', newAuthState);
    
    // Declanșăm un eveniment pentru a notifica alte componente despre schimbarea stării de autentificare
    const authChangeEvent = new Event('authChange');
    window.dispatchEvent(authChangeEvent);
  };
  
  // Curățăm timeout-ul la demontarea componentei
  useEffect(() => {
    return () => {
      if (preventHideTimeout) {
        clearTimeout(preventHideTimeout);
      }
    };
  }, [preventHideTimeout]);

  // Numărul de produse din coș
  const cartItemsCount = getCartItemsCount();

  // Helper function to safely close menu
  const closeMenu = () => {
    if (isOpen && toggleMenu) {
      toggleMenu();
    }
  };

  const navItems = [
    { 
      id: 1, 
      component: <FiUser size={20} />, 
      slug: isAuthenticated ? '/Profile' : '/Login',
      onClick: handleProfileNavigation,
      previewContent: isAuthenticated ? (
        <div className="w-80 p-5">
          <div className="mb-4 pb-4 border-b border-gray-100">
            <div>
              <h3 className="font-medium">Maria Popescu</h3>
              <p className="text-sm text-gray-900">maria.popescu@email.com</p>
            </div>
          </div>
          
          <div className="space-y-3 mb-4">
            <Link 
              to="/Profile" 
              onClick={() => {
                try {
                  // Setăm tab-ul în sessionStorage 
                  window.sessionStorage.setItem('profileTab', 'profile');
                  // Dacă suntem deja pe pagina de profil, forțăm o actualizare
                  if (window.location.pathname.includes('/Profile')) {
                    window.dispatchEvent(new Event('profileTabChange'));
                  }
                } catch (error) {
                  console.error("Error setting profile tab:", error);
                }
              }}
              className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
            >
              <User size={18} className="mr-3 text-gray-400" />
              <span className="text-sm">Informații profil</span>
            </Link>
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
              className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
            >
              <Package size={18} className="mr-3 text-gray-400" />
              <span className="text-sm">Comenzile mele</span>
            </Link>
            <Link 
              to="/Favorites" 
              className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
            >
              <Heart size={18} className="mr-3 text-gray-400" />
              <span className="text-sm">Produse favorite</span>
            </Link>
            <Link 
              to="/Profile" 
              onClick={() => {
                try {
                  window.sessionStorage.setItem('profileTab', 'settings');
                  if (window.location.pathname.includes('/Profile')) {
                    window.dispatchEvent(new Event('profileTabChange'));
                  }
                } catch (error) {
                  console.error("Error setting orders tab:", error);
                }
              }}
              className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
            >
              <Settings size={18} className="mr-3 text-gray-400" />
              <span className="text-sm">Setări</span>
            </Link>
          </div>
          
          <div className="flex flex-col space-y-2">
            <button 
              onClick={toggleAuth}
              className="w-full border border-gray-300 text-gray-800 py-2 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Deconectare
            </button>
          </div>
        </div>
      ) : (
        <div className="w-72 p-5">
          <h3 className="font-medium mb-4">Autentificare</h3>
          <p className="text-sm text-gray-900 mb-2">Conectează-te pentru a accesa contul tău și a gestiona comenzile.</p>          
          <div className="flex flex-col space-y-2">
            <p className="text-sm text-gray-900 mb-2">Ai deja un cont? Conectează-te.</p>
            <Link to="/Login" className="block w-full">
              <button className="w-full bg-black text-white py-2 text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer">
                Conectare
              </button>
            </Link>

            <p className="text-sm text-gray-900 mb-2 mt-3">Nu ai cont? Înregistrează-te.</p>
            <Link to="/Register" className="block w-full">
              <button className="w-full border border-black text-black py-2 text-sm font-medium hover:bg-gray-100 transition-colors cursor-pointer">
                Înregistrare
              </button>
            </Link>
          </div>
        </div>
      )
    },
    { 
      id: 2, 
      component: <LuHeart size={20} />, 
      slug: '/Favorites',
      previewContent: (
        <div className="w-72 p-4">
          <h3 className="font-medium mb-3">Produse favorite</h3>
          <p className="text-sm text-gray-900 mb-3">Salvează produsele favorite pentru a le găsi mai ușor.</p>
          
          <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
            {getAllFavorites().length > 0 ? (
              getAllFavorites().map(product => (
                <div key={product.id} className="flex items-center gap-3 border-b border-gray-100 pb-3">
                  <div className="w-14 h-14 bg-gray-100 flex-shrink-0">
                    {product.image && <img src={product.image} alt={product.title} className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-medium truncate">{product.title || 'Produs'}</p>
                    <p className="text-xs text-gray-900 mt-1">Preț: {product.price || 0} lei</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-900">Nu ai produse favorite încă.</p>
            )}
          </div>
          
          {getAllFavorites().length > 0 && (
            <Link to="/Favorites" className="block w-full">
              <button className="w-full bg-black text-white py-2 text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer">
                Vezi toate produsele favorite
              </button>
            </Link>
          )}
        </div>
      )
    },
    { 
      id: 3, 
      component: <div className="relative">
        <HiOutlineShoppingBag size={20} />
        {cartItemsCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            {cartItemsCount}
          </span>
        )}
      </div>, 
      slug: '/Cart',
      previewContent: (
        <div className="w-80 p-4">
          <h3 className="font-medium mb-3">Coșul tău de cumpărături</h3>
          
          <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div key={index} className="flex items-center gap-3 border-b border-gray-100 pb-3">
                  <div className="w-14 h-14 bg-gray-100 flex-shrink-0">
                    {item.image && <img src={item.image} alt={item.title || 'Produs'} className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-medium truncate">{item.title || 'Produs'}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Mărime: {item.size || 'N/A'} | Cantitate: {item.quantity || 1}
                    </p>
                    <p className="text-sm font-medium mt-1">{item.price || 0} lei</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-900">Coșul tău este gol.</p>
            )}
          </div>
          
          {cartItems.length > 0 && (
            <>
              <div className="flex items-center justify-between text-sm border-t border-gray-100 pt-3 mb-3">
                <span>Total ({cartItemsCount} produse):</span>
                <span className="font-medium">{calculateTotal()} lei</span>
              </div>
              
              <div className="flex gap-2">
                <Link to="/Cart" className="block flex-1">
                  <button className="w-full bg-black text-white py-2 text-sm font-medium hover:bg-gray-800 transition-colors">
                    Vezi coșul
                  </button>
                </Link>
                <Link to="/Checkout" className="block flex-1">
                  <button className="w-full border border-black bg-white text-black py-2 text-sm font-medium hover:bg-gray-50 transition-colors">
                    Finalizează
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      )
    },
    { 
      id: 4, 
      component: <IoIosSearch size={20} />, 
      slug: '/Search',
      previewContent: (
        <div className="w-72 p-4">
          <h3 className="font-medium mb-3">Caută produse</h3>
          
          <form onSubmit={handleSearch} className="mb-3">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Ce cauți?" 
                className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-black "
              >
                <IoIosSearch size={18} />
              </button>
            </div>
          </form>
          
          <p className="text-xs text-gray-900 mb-3">Căutări populare:</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <button 
              onClick={() => handlePopularSearch("rochie")}
              className="px-3 py-1 bg-gray-100 text-xs hover:bg-gray-200 transition-colors"
            >
              rochii
            </button>
            <button 
              onClick={() => handlePopularSearch("palton")}
              className="px-3 py-1 bg-gray-100 text-xs hover:bg-gray-200 transition-colors"
            >
              palton
            </button>
            <button 
              onClick={() => handlePopularSearch("bluză")}
              className="px-3 py-1 bg-gray-100 text-xs hover:bg-gray-200 transition-colors"
            >
              bluze
            </button>
            <button 
              onClick={() => handlePopularSearch("jachetă")}
              className="px-3 py-1 bg-gray-100 text-xs hover:bg-gray-200 transition-colors"
            >
              jachetă
            </button>
            <button 
              onClick={() => handlePopularSearch("pulover")}
              className="px-3 py-1 bg-gray-100 text-xs hover:bg-gray-200 transition-colors"
            >
              pulover
            </button>
          </div>
          
          <div className="space-y-2 mb-3">
            <Link to="/Category/women" className="block text-sm hover:underline">Noutăți femei</Link>
            <Link to="/Category/men" className="block text-sm hover:underline">Noutăți bărbați</Link>
            <Link to="/Category/kids" className="block text-sm hover:underline">Noutăți copii</Link>
          </div>
        </div>
      )
    },
  ];

  // If any required context is missing, render a simplified version
  if (!cartContext || !favoritesContext) {
    return (
      <div className="flex items-center justify-end space-x-1 md:space-x-4">
        <Link to="/login" className="flex flex-col items-center text-black hover:scale-110 transition-transform p-1">
          <span className="mb-0.5"><FiUser size={20} /></span>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-end space-x-1 md:space-x-4">
      {/* Butoane navigare */}
      {navItems.map((item) => (
        <div 
          key={item.id} 
          className="relative"
          onMouseEnter={() => showPreview(item.id)}
          onMouseLeave={() => hidePreviewWithDelay(item.id)}
        >
          {/* Pentru mobile, afișăm doar link-ul simplu */}
          {isMobile ? (
            <Link 
              to={item.slug} 
              onClick={item.onClick || closeMenu}
              className="flex flex-col items-center text-black hover:scale-110 active:scale-95 transition-transform p-1"
            >
              <span>{item.component}</span>
            </Link>
          ) : (
            // Pentru desktop, păstrăm comportamentul cu preview
            <>
              <button
                onClick={item.onClick || (() => navigate(item.slug))}
                className="flex flex-col items-center text-black hover:scale-110 active:scale-95 transition-transform p-1"
              >
                <span>{item.component}</span>
              </button>

              {/* Preview-uri - Doar pe desktop */}
              {activePreview === item.id && item.previewContent && (
                <div className="absolute right-0 top-full mt-1 bg-white shadow-lg z-50 rounded-sm">
                  {item.previewContent}
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}

Nav.propTypes = {
  isOpen: PropTypes.bool,
  toggleMenu: PropTypes.func
};

export default Nav;