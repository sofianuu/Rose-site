import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import SizeSelector from './SizeSelector';

const ProductCard = ({ 
  item, 
  isMobile,
  onAddToCart,
  onToggleFavorite,
  isFavorite: externalIsFavorite
}) => {
  const [hovered, setHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showSizeSelector, setShowSizeSelector] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Folosește funcțiile furnizate sau cele din context
  const { addToCart: contextAddToCart } = useCart();
  const { toggleFavorite: contextToggleFavorite, isFavorite: contextIsFavorite } = useFavorites();

  const addToCartFn = onAddToCart || contextAddToCart;
  const toggleFavoriteFn = onToggleFavorite || contextToggleFavorite;
  const isFavoriteFn = externalIsFavorite || contextIsFavorite;

  // Folosim array de imagini din proprietățile produsului sau un array implicit
  const images = [
    item.image,
    '/src/assets/images/coats.jpg',
    '/src/assets/images/grey_coat.jpg'
  ];

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Vă rugăm să selectați o mărime');
      return;
    }
    
    addToCartFn({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
      size: selectedSize,
      quantity: 1
    });
    
    setAddedToCart(true);
    setShowSizeSelector(false);
    
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (typeof onToggleFavorite === 'function') {
      onToggleFavorite();
    } else if (typeof toggleFavoriteFn === 'function') {
      toggleFavoriteFn(item);
    }
  };

  const navigateImage = (direction, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (images.length <= 1) return;
    
    setCurrentImageIndex(prevIndex => {
      if (direction === 'next') {
        return (prevIndex + 1) % images.length;
      } else {
        return (prevIndex - 1 + images.length) % images.length;
      }
    });
  };

  // Helper function to check if item is favorite
  const checkIsFavorite = () => {
    if (typeof isFavorite === 'function') {
      return isFavorite();
    } 
    if (typeof isFavoriteFn === 'function') {
      return isFavoriteFn(item.id);
    }
    return false;
  };

  return (
    <div 
      className="group"
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
    >
      <div className="relative mb-3 overflow-hidden">
        <Link to={`/product/${item.id}`} className="block">
          <img 
            src={images[currentImageIndex]} 
            alt={item.title} 
            className="w-full h-80 md:h-[450px] object-cover transition-transform duration-700 group-hover:scale-105 cursor-pointer" 
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity"></div>
          {item.isNew && (
            <div className="absolute top-3 left-3 bg-transparent text-black px-3 py-1 text-xs font-medium">
              NOU
            </div>
          )}
        </Link>

        {/* Navigation arrows - doar dacă avem mai multe imagini */}
        {hovered && images.length > 1 && (
          <>
            <button
              onClick={(e) => navigateImage('prev', e)}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-black font-medium text-lg hover:text-xl z-10 transition-all transform hover:scale-125 cursor-pointer"             
              aria-label="Previous image"
            >
              ←
            </button>
            <button
              onClick={(e) => navigateImage('next', e)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-black font-medium text-lg hover:text-xl z-10 transition-all transform hover:scale-125 cursor-pointer"
              aria-label="Next image"
            >
              →
            </button>
          </>
        )}

        {/* Mobile controls */}
        {isMobile && (
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            <button
              className="p-2 rounded-full bg-white shadow-md"
              onClick={handleToggleFavorite}
            >
              <Heart 
                size={20} 
                className={checkIsFavorite() ? 'fill-black' : 'fill-none'}
              />
            </button>
            <button
              className="p-2 rounded-full bg-white shadow-md"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowSizeSelector(true);
              }}
            >
              <ShoppingBag size={20} />
            </button>
          </div>
        )}
        
        {/* Desktop favorite button */}
        {!isMobile && (
          <button 
            className={`absolute top-3 right-3 p-2 rounded-full bg-white text-black hover:bg-gray-100
            transition-colors shadow-md cursor-pointer`}
            onClick={handleToggleFavorite}
            aria-label={checkIsFavorite() ? "Elimină de la favorite" : "Adaugă la favorite"}
          >
            <Heart 
              size={16} 
              fill={checkIsFavorite() ? "black" : "none"} 
            />
          </button>
        )}
      
        {/* Size selector - shows on hover for desktop, or when triggered for mobile */}
        {((hovered && !isMobile) || showSizeSelector) && (
          <SizeSelector 
            item={item}
            selectedSize={selectedSize}
            handleSizeSelect={handleSizeSelect}
            handleAddToCart={handleAddToCart}
            addedToCart={addedToCart}
            onClose={() => setShowSizeSelector(false)}
            isMobileView={isMobile}
          />
        )}
      </div>
      
      <div className="space-y-1">
        <Link to={`/product/${item.id}`} className="block hover:underline">
          <h3 className="text-sm md:text-base font-light">{item.title}</h3>
        </Link>
        <p className="text-sm md:text-base font-medium">{item.price} Lei</p>
        {selectedSize && (
          <p className="text-xs text-gray-500">Mărime selectată: {selectedSize}</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard; 