import { useState, useEffect } from 'react';
import { ChevronLeft, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import ProductCard from '../components/ProductCard';

const Favorites = () => {
  const { getAllFavorites } = useFavorites();
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Obținem lista de favorite din context
  const favorites = getAllFavorites();

  // Produse demo pentru afișare în favorites - în aplicația reală ar trebui să vină de la server
  const demoProductDetails = {
    1: { 
      id: 1,
      title: 'Rochie lungă', 
      price: 149.99,  
      image: '/src/assets/images/dress.jpg',
      sizes: { XS: true, S: true, M: true, L: false, XL: false },
      isNew: true
    },
    2: { 
      id: 2,
      title: 'Bluză bumbac', 
      price: 79.99, 
      image: '/src/assets/images/top.jpg',
      sizes: { XS: true, S: true, M: true, L: false, XL: false },
      isNew: true
    },
    3: { 
      id: 3,
      title: 'Pantaloni wide-leg', 
      price: 129.99, 
      image: '/src/assets/images/trousers.jpg',
      sizes: { XS: true, S: true, M: true, L: false, XL: false },
      isNew: true
    },
    4: { 
      id: 4,
      title: 'Cămașă oversize', 
      price: 99.99, 
      image: '/src/assets/images/shirt.jpg',
      sizes: { XS: true, S: true, M: true, L: true, XL: true },
      isNew: true
    },
    5: { 
      id: 5,
      title: 'Geacă din piele', 
      price: 249.99, 
      image: '/src/assets/images/jacket_men.jpg',
      sizes: { XS: true, S: true, M: true, L: true, XL: true },
      isNew: true
    },
    6: { 
      id: 6,
      title: 'Pulover lână', 
      price: 199.99, 
      image: '/src/assets/images/sweater_men.jpg',
      sizes: { XS: true, S: true, M: true, L: true, XL: true },
      isNew: true
    },
    7: { 
      id: 7,
      title: 'Blugi slim fit', 
      price: 179.99, 
      image: '/src/assets/images/men_jeans.jpg',
      sizes: { XS: true, S: true, M: true, L: true, XL: true },
      isNew: false
    },
    8: { 
      id: 8,
      title: 'Cămașă clasică', 
      price: 119.99, 
      image: '/src/assets/images/men_shirt.jpg',
      sizes: { XS: true, S: true, M: true, L: true, XL: true },
      isNew: true
    },
    9: { 
      id: 9,
      title: 'Tricou basic', 
      price: 69.99, 
      image: '/src/assets/images/tshirt_men.jpg',
      sizes: { XS: true, S: true, M: true, L: true, XL: true },
      isNew: true
    }
  };

  useEffect(() => {
    setIsLoading(false);
  }, [favorites]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-6xl flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-pulse flex flex-col items-center">
            <Heart size={64} className="text-gray-300 mb-4" />
            <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-48"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-center">Lista mea de favorite</h1>
        <div className="w-20 h-0.5 bg-black mx-auto mt-2"></div>
      </div>
      
      {favorites.length === 0 ? (
        <div className="text-center py-16 ">
          <div className="flex justify-center mb-4">
            <Heart size={64} className="text-gray-300" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Nu ai produse favorite</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">Nu ai adăugat încă niciun produs la favorite. Explorează colecțiile noastre și adaugă produsele care îți plac.</p>
          <Link to="/" className="inline-flex items-center bg-black  hover:bg-gray-800 text-white px-6 py-3 rounded-md font-medium transition-colors">
            <span>Explorează colecțiile</span>
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <Link to="/" className="inline-flex items-center text-gray-700 hover:text-black font-medium transition-colors">
              <ChevronLeft size={18} className="mr-1" />
              <span>Înapoi la cumpărături</span>
            </Link>
            
            <p className="text-gray-600 mt-2 sm:mt-0">{favorites.length} produse</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {favorites.map((product) => (
              <ProductCard 
                key={product.id}
                item={product}
                isMobile={isMobile}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Favorites;