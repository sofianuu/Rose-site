import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { useFavorites } from '../context/FavoritesContext';

const RelatedProducts = ({ products }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Add detection for mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  if (!products || products.length === 0) return null;

  return (
    <div className="py-8 bg-white">
      <div className="max-w-full mx-4 md:mx-8 lg:mx-16">
        <h2 className="text-2xl font-light mb-8 text-center">Te-ar putea interesa și</h2>
        
        {/* Grid produse folosind ProductCard */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard 
              key={product.id}
              item={{
                id: product.id,
                title: product.title,
                price: product.price,
                oldPrice: product.oldPrice,
                image: product.images[0],
                sizes: product.sizes,
                colors: product.colors
              }}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;