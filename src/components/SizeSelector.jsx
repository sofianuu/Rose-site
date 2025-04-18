import { useState } from 'react';
import { X } from 'lucide-react';

const SizeSelector = ({
  item,
  selectedSize,
  handleSizeSelect,
  handleAddToCart,
  addedToCart,
  onClose,
  isMobileView
}) => {
  const [error, setError] = useState(false);

  const handleSizeClick = (size) => {
    handleSizeSelect(size);
    setError(false);
  };

  const handleAddToCartClick = () => {
    if (!selectedSize) {
      setError(true);
      return;
    }
    handleAddToCart();
  };

  // Desktop version
  if (!isMobileView) {
    return (
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <div className="p-3">
          <p className="text-xs font-medium mb-2">SELECTEAZĂ MĂRIMEA:</p>
          <div className="grid grid-cols-5 gap-1">
            {Object.entries(item.sizes || {}).map(([size, available]) => (
              <button
                key={size}
                onClick={(e) => {
                  e.preventDefault();
                  if (available) handleSizeClick(size);
                }}
                disabled={!available}
                className={`py-1 text-xs border ${
                  !available
                    ? 'opacity-30 cursor-not-allowed bg-gray-50 border-gray-200'
                    : selectedSize === size
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 hover:border-gray-800'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleAddToCartClick();
          }}
          className="w-full bg-black text-white py-3 text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          {addedToCart ? 'ADĂUGAT ÎN COȘ ✓' : 'ADAUGĂ ÎN COȘ'}
        </button>
      </div>
    );
  }

  // Mobile version
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-transparent bg-opacity-50">
      <div className="bg-white w-full max-w-lg rounded-t-3xl p-6 relative">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top  hover:bg-gray-100 rounded-full"
        >
          <X size={24} />
        </button>

        <div className="mb-8">
          <h2 className="text-xl text-center mb-1">Selectează mărimea</h2>
          <div className="w-16 h-0.5 bg-black mx-auto"></div>
        </div>

        {/* Size buttons */}
        <div className="grid grid-cols-1 gap-3 mb-6">
          {Object.entries(item.sizes || {}).map(([size, available]) => (
            <button
              key={size}
              onClick={() => handleSizeClick(size)}
              disabled={!available}
              className={`
                w-full py-4 text-center border rounded-full text-sm font-medium
                ${selectedSize === size 
                  ? 'border-black bg-black text-white' 
                  : available 
                    ? 'border-gray-300 hover:border-black' 
                    : 'border-gray-200 text-gray-300 cursor-not-allowed'
                }
                ${error && !selectedSize ? 'border-red-500' : ''}
                transition-colors duration-200
              `}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Error message */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">
            Te rugăm să selectezi o mărime
          </p>
        )}

        {/* Add to cart button */}
        <button
          onClick={handleAddToCartClick}
          className="w-full bg-black text-white py-4 rounded-full font-medium hover:bg-gray-900 transition-colors duration-200"
        >
          {addedToCart ? 'ADĂUGAT ÎN COȘ ✓' : 'SELECTEAZĂ MĂRIMEA'}
        </button>
      </div>
    </div>
  );
};

export default SizeSelector;
