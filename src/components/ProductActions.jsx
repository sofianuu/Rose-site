// src/components/ProductPage/ProductActions.jsx
import { ShoppingBag } from "lucide-react";

const ProductActions = ({ 
  quantity, 
  onQuantityChange, 
  onAddToCart, 
  addedToCart, 
  disabled 
}) => {
  return (
    <div>
      {/* Cantitate */}
      <div className="mt-8">
        <p className="font-medium text-sm mb-3">CANTITATE:</p>
        <div className="flex items-center border border-gray-300 w-32">
          <button
            onClick={() => onQuantityChange(-1)}
            className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100"
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="flex-1 text-center">{quantity}</span>
          <button
            onClick={() => onQuantityChange(1)}
            className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100"
            disabled={quantity >= 10}
          >
            +
          </button>
        </div>
      </div>
      
      {/* Buton adaugă în coș */}
      <div className="mt-8">
        <button
          onClick={onAddToCart}
          className="w-full py-3 px-6 bg-black text-white hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
          disabled={disabled}
        >
          <ShoppingBag size={18} />
          <span>{addedToCart ? "ADĂUGAT ÎN COȘ ✓" : "ADAUGĂ ÎN COȘ"}</span>
        </button>
      </div>
    </div>
  );
};

export default ProductActions;