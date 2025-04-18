// src/components/ProductPage/ProductInfo.jsx
import { Heart } from "lucide-react";
import Rating from "./ui/Rating";

const ProductInfo = ({ 
  product, 
  isFavorite, 
  onToggleFavorite, 
  isDesktop = false 
}) => {
  const { title, gender, category, rating, reviewCount, price, oldPrice, id, inStock } = product;

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-start">
        <div>
          <h1 className={`${isDesktop ? 'text-2xl' : 'text-xl'} font-light`}>{title.toUpperCase()}</h1>
        
          <div className="mt-2">
            <Rating rating={rating} reviewCount={reviewCount} />
          </div>
        </div>

        {/* Buton favorit */}
        <button 
          onClick={onToggleFavorite}
          className={`${isDesktop ? 'w-12 h-12 flex items-center justify-center' : 'p-2 rounded-full'}`}
          aria-label={isFavorite ? "Elimină de la favorite" : "Adaugă la favorite"}
          >
          <Heart
          size={isDesktop ? 26 : 24}
          className={`${isFavorite ? "fill-red-600 text-red-600" : "text-gray-500"} hover:fill-red-600 hover:text-black`}
          />
      </button>

      </div>

      {/* Preț */}
      <div className={`${isDesktop ? 'mb-6' : 'mt-4'} flex items-baseline`}>
        <span className={`${isDesktop ? 'text-xl' : 'text-2xl'} `}>
          {price.toFixed(2)} Lei
        </span>
        {oldPrice && (
          <span className="ml-2 text-gray-500 line-through text-base">
            {oldPrice.toFixed(2)} Lei
          </span>
        )}
      </div>

      {/* Disponibilitate - doar pe mobile */}
      {!isDesktop && (
        <div className="mt-3">
          {inStock ? (
            <span className="text-green-600 font-medium">✓ În stoc</span>
          ) : (
            <span className="text-red-600 font-medium">✗ Stoc epuizat</span>
          )}
        </div>
      )}

      {/* Cod produs - doar pe desktop */}
      {/* {isDesktop && (
        <p className="text-xs text-gray-500 mb-6">
          Cod produs: {id < 10 ? `YS12${id}-30X` : `YS1${id}-30X`}
        </p>
      )} */}
    
    </div>
  );
};

export default ProductInfo;