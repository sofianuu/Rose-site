// src/components/ProductPage/ProductOptions.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import FloatingLabelInput from "./FloatingLabelInput";

const SizeGuideModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('corp');
  const [activeSize, setActiveSize] = useState('XS');
  const [useMetric, setUseMetric] = useState(true);
  
  // Sample size data (could be passed as props in a real application)
  const sizeData = {
    XS: { piept: 81.0, talie: 62.0, solduri: 91.0 },
    S: { piept: 85.0, talie: 66.0, solduri: 95.0 },
    M: { piept: 89.0, talie: 70.0, solduri: 99.0 },
    L: { piept: 93.0, talie: 74.0, solduri: 103.0 },
    XL: { piept: 97.0, talie: 78.0, solduri: 107.0 }
  };
  
  // Convert to inches if not using metric
  const convertToInches = (cm) => {
    return (cm / 2.54).toFixed(1);
  };
  
  // Current size measurements
  const currentSizeMeasurements = sizeData[activeSize];
  
  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center overflow-auto">
      <div className="bg-white rounded-lg shadow-lg p-5 w-full max-w-lg max-h-[90vh] overflow-y-auto mx-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold">DIMENSIUNI</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        <div>
          <div className="flex border-b border-gray-200 mb-3">
            <button 
              className={`text-sm py-2 px-3 ${activeTab === 'produs' ? 'text-black border-b-2 border-black font-medium' : 'text-gray-400'}`}
              onClick={() => setActiveTab('produs')}
            >
              PRODUS
            </button>
            <button 
              className={`text-sm py-2 px-3 ${activeTab === 'corp' ? 'text-black border-b-2 border-black font-medium' : 'text-gray-400'}`}
              onClick={() => setActiveTab('corp')}
            >
              CORP
            </button>
          </div>
          
          <div className="grid grid-cols-5 gap-1 mb-4">
            {['XS', 'S', 'M', 'L', 'XL'].map(size => (
              <button 
                key={size}
                className={`border ${activeSize === size ? 'border-black' : 'border-gray-300'} py-1.5 px-1 text-center text-sm`}
                onClick={() => setActiveSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
          
          <div className="flex justify-end items-center mb-3">
            <span className="mr-2 text-xs">CM</span>
            <button 
              className={`w-10 h-5 rounded-full flex items-center p-0.5 ${useMetric ? 'bg-black' : 'bg-gray-300'}`}
              onClick={() => setUseMetric(!useMetric)}
              aria-label="Toggle between centimeters and inches"
            >
              <div className={`w-4 h-4 bg-white rounded-full transform transition-transform ${useMetric ? 'translate-x-0' : 'translate-x-5'}`}></div>
            </button>
            <span className="ml-2 text-xs">IN</span>
          </div>
          
          <div className="bg-gray-50 p-3 mb-3 text-sm">
            <div className="flex justify-between py-1.5">
              <div>A - Piept</div>
              <div>{useMetric ? `${currentSizeMeasurements.piept.toFixed(1)} CM` : `${convertToInches(currentSizeMeasurements.piept)} IN`}</div>
            </div>
            <div className="flex justify-between py-1.5">
              <div>B - Talie</div>
              <div>{useMetric ? `${currentSizeMeasurements.talie.toFixed(1)} CM` : `${convertToInches(currentSizeMeasurements.talie)} IN`}</div>
            </div>
            <div className="flex justify-between py-1.5">
              <div>C - Șolduri</div>
              <div>{useMetric ? `${currentSizeMeasurements.solduri.toFixed(1)} CM` : `${convertToInches(currentSizeMeasurements.solduri)} IN`}</div>
            </div>
          </div>
          
          <h4 className="font-medium mb-2 text-sm">CUM SĂ TE MĂSORI</h4>
          
          <div className="mb-2 text-xs">
            <div className="flex items-start mb-1">
              <span className="font-medium mr-1">A</span>
              <span>Piept</span>
            </div>
            <p className="text-gray-700">
              Așază metrul de croitorie orizontal la nivelul cel mai proeminent al bustului.
            </p>
          </div>
          
          <div className="mb-2 text-xs">
            <div className="flex items-start mb-1">
              <span className="font-medium mr-1">B</span>
              <span>Talie</span>
            </div>
            <p className="text-gray-700">
              Măsoară circumferința taliei la cel mai îngust punct, ținând metrul orizontal.
            </p>
          </div>
          
          <div className="mb-2 text-xs">
            <div className="flex items-start mb-1">
              <span className="font-medium mr-1">C</span>
              <span>Șolduri</span>
            </div>
            <p className="text-gray-700">
              Măsoară circumferința șoldurilor la cel mai lat punct, ținând metrul orizontal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const SizeNotificationModal = ({ 
  size, 
  onClose, 
  onNotify 
}) => {
  const [email, setEmail] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Check if user is logged in on mount
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
      // Extract email from user data if needed
      const userData = JSON.parse(user);
      setEmail(userData.email || '');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // For login flow
      if (showLogin) {
        // Simulate a login request
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Store user data in localStorage after successful login
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify({ email, name: email.split('@')[0] }));
        
        setIsLoggedIn(true);
        setShowLogin(false);
      } else if (isLoggedIn) {
        // If user is logged in, directly register for notification
        await onNotify(email, size);
        onClose(); // Close the modal after successful notification registration
      } else {
        // Validate email
        if (!email) {
          setError('Vă rugăm să introduceți adresa de email');
          setLoading(false);
          return;
        }

        // Show login screen for non-logged users
        setShowLogin(true);
      }
    } catch (err) {
      setError(err.message || 'A apărut o eroare. Te rugăm să încerci din nou.');
    } finally {
      setLoading(false);
    }
  };

  // Login Form
  if (showLogin) {
    return (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Conectare</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            <FloatingLabelInput 
              id="email-login"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Adresă de email"
              autoComplete="email"
            />
            
            <FloatingLabelInput 
              id="password-login"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Parolă"
              autoComplete="current-password"
            />
            
            <div className="text-sm text-right">
              <a href="#" className="font-medium text-black hover:underline">
                Ai uitat parola?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              Conectează-te
            </button>
          </form>
          
          <div className="mt-4 text-center text-sm">
            <span className="text-gray-600">Nu ai cont?</span>{' '}
            <Link to="/register" className="font-medium text-black hover:underline">
              Înregistrează-te
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Notification Form
  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Notificare stoc</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-700">
            Stoc momentan indisponibil pentru mărimea <strong>{size}</strong>.
            <br />
            Doriți să vă anunțăm când revine în stoc?
          </p>
        </div>
        
        {!isLoggedIn && (
          <div className="mb-4">
            <FloatingLabelInput 
              id="email-notify"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Adresă de email"
              autoComplete="email"
            />
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            ANUNȚĂ-MĂ
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductOptions = ({ 
  product, 
  selectedColor, 
  selectedSize, 
  onColorSelect, 
  onSizeSelect 
}) => {
  const [showSizeNotification, setShowSizeNotification] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [unavailableSize, setUnavailableSize] = useState(null);

  const handleSizeClick = (size, available) => {
    if (available) {
      onSizeSelect(size);
    } else {
      setUnavailableSize(size);
      setShowSizeNotification(true);
    }
  };

  const handleCloseModal = () => {
    setShowSizeNotification(false);
    setUnavailableSize(null);
  };

  const handleCloseSizeGuide = () => {
    setShowSizeGuide(false);
  };

  const handleNotify = async (email, size) => {
    // Here you would normally send a request to your backend to register the notification
    console.log(`Registered notification for size ${size} to email: ${email}`);
    
    // Simulate API request
    return new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <div>
      {/* Culori */}
      <div className="mt-1">
        <p className="font-medium text-sm mb-3">CULOARE: {selectedColor || "Neselectată"}</p>
        <div className="flex flex-wrap gap-2">
          {product.colors.map((color) => (
            <button
              key={color.name}
              onClick={() => onColorSelect(color.name)}
              className={`border ${
                selectedColor === color.name
                  ? "border-black"
                  : "border-gray-300"
              } transition-all w-20 h-28 overflow-hidden`}
              aria-label={`Culoare ${color.name}`}
            >
              <div className="w-full h-full relative">
                <img 
                  src={product.images[0]} 
                  alt={`${product.title} - culoare ${color.name}`}
                  className="w-full h-full object-cover"
                />
                {/* Overlay cu culoarea - aplicăm un strat transparent de culoare peste imagine */}
                {color.name !== "Negru" && color.name !== "Alb" && (
                  <div 
                    className="absolute inset-0 opacity-30 mix-blend-overlay"
                    style={{ backgroundColor: color.code }}
                  ></div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Mărimi */}
      <div className="mt-8">
        <div className="flex justify-between">
          <p className="font-medium text-sm mb-3">MĂRIME: {selectedSize || "Neselectată"}</p>
          <button 
            className="text-gray-500 text-xs underline hover:text-black cursor-pointer"
            onClick={() => setShowSizeGuide(true)}
          >
            Ghid mărimi
          </button>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {Object.entries(product.sizes).map(([size, available]) => (
            <button
              key={size}
              onClick={() => handleSizeClick(size, available)}
              className={`py-2 px-1 border w-full font-medium text-sm transition-colors ${
                selectedSize === size
                  ? "border-black bg-black text-white"
                  : "border-gray-300 hover:border-gray-800"
              } ${!available ? "opacity-40 bg-gray-100" : ""}`}
              aria-label={`Mărime ${size}${
                !available ? " - indisponibilă" : ""
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Size notification modal */}
      {showSizeNotification && unavailableSize && (
        <SizeNotificationModal
          size={unavailableSize}
          onClose={handleCloseModal}
          onNotify={handleNotify}
        />
      )}

      {/* Size guide modal */}
      {showSizeGuide && (
        <SizeGuideModal
          onClose={handleCloseSizeGuide}
        />
      )}
    </div>
  );
};

export default ProductOptions;