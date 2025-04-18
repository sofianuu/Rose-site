import { useState, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const location = useLocation();

  // Simulare produse
  const dummyProducts = [
    { id: 1, name: 'Rochie lungă de vară', price: 149.99, category: 'women', displayCategory: 'Femei', subCategory: 'dresses', image: '/src/assets/images/dress.jpg' },
    { id: 2, name: 'Bluză din bumbac', price: 79.99, category: 'women', displayCategory: 'Femei', subCategory: 'tops', image: '/src/assets/images/top.jpg' },
    { id: 3, name: 'Cămașă albă', price: 99.99, category: 'men', displayCategory: 'Bărbați', subCategory: 'shirts', image: '/src/assets/images/men_shirt.jpg' },
    { id: 4, name: 'Pantaloni de stofă', price: 179.99, category: 'men', displayCategory: 'Bărbați', subCategory: 'pants', image: '/src/assets/images/men_jeans.jpg' },
    { id: 5, name: 'Geacă de piele', price: 249.99, category: 'men', displayCategory: 'Bărbați', subCategory: 'jackets', image: '/src/assets/images/jacheta_barbati.jpg' },
    { id: 6, name: 'Fustă plisată', price: 129.99, category: 'women', displayCategory: 'Femei', subCategory: 'skirts', image: '/src/assets/images/dress.jpg' },
    { id: 7, name: 'Pulover cu guler înalt', price: 159.99, category: 'men', displayCategory: 'Bărbați', subCategory: 'sweaters', image: '/src/assets/images/palton5.jpg' },
    { id: 8, name: 'Sacou elegant', price: 199.99, category: 'men', displayCategory: 'Bărbați', subCategory: 'jackets', image: '/src/assets/images/kids/pantaloni_leopard.jpg' },
  ];

  // Verificăm dacă există parametri de căutare în URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryParam = searchParams.get('q');
    
    if (queryParam) {
      setSearchQuery(queryParam);
    }
  }, [location.search]);

  // Efectuează căutarea
  useEffect(() => {
    if (searchQuery.length > 2) {
      setLoading(true);
      
      // Simulează o întârziere de căutare (ar fi un API call în aplicația reală)
      const timer = setTimeout(() => {
        const results = dummyProducts.filter(product => {
          const matchesQuery = product.name.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
          
          return matchesQuery && matchesCategory;
        });
        
        setSearchResults(results);
        setLoading(false);
        
        // Salvează căutarea în istoricul recent
        if (searchQuery.trim() && !recentSearches.includes(searchQuery.trim())) {
          setRecentSearches(prev => [searchQuery, ...prev].slice(0, 5));
        }
      }, 500);
      
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, selectedCategory, recentSearches]);

  // Extrage categoriile unice
  useEffect(() => {
    const uniqueCategories = [...new Set(dummyProducts.map(product => product.category))];
    setCategories(uniqueCategories);
  }, []);

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleRecentSearchClick = (query) => {
    setSearchQuery(query);
  };

  const handleClearRecentSearches = () => {
    setRecentSearches([]);
  };

  // Funcție pentru a trimite formularul de căutare
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    // Căutarea este deja gestionată de effect-ul ce se declanșează când searchQuery se schimbă
  };

  return (
    <div className="min-h-screen bg-white pt-4 sm:pt-6 md:pt-8 pb-8 sm:pb-12 md:pb-16">
      <div className="container mx-auto px-4">
        {/* Filtru categorii - responsive */}
        <div className="flex justify-center flex-wrap gap-2 sm:gap-4 md:space-x-6 mb-6 sm:mb-8 overflow-x-auto">
          <button 
            className={`px-2 sm:px-3 md:px-4 py-1 sm:py-2 text-xs sm:text-sm ${selectedCategory === 'all' 
              ? 'font-medium border-b-2 border-black' 
              : 'text-gray-500 hover:text-black transition-colors'}`}
            onClick={() => setSelectedCategory('all')}
          >
            TOATE
          </button>
          {categories.map(category => (
            <button
              key={category}
              className={`px-2 sm:px-3 md:px-4 py-1 sm:py-2 text-xs sm:text-sm ${selectedCategory === category 
                ? 'font-medium border-b-2 border-black' 
                : 'text-gray-500 hover:text-black transition-colors'}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'women' ? 'FEMEI' : category === 'men' ? 'BĂRBAȚI' : category.toUpperCase()}
            </button>
          ))}
        </div>
        
        {/* Bara de căutare - responsive */}
        <div className="relative w-full max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12">
          <form onSubmit={handleSubmitSearch}>
            <div className="flex items-center border-b-2 border-gray-300 focus-within:border-black transition-colors">
              <FiSearch className="text-gray-400 mr-2 sm:mr-3" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Caută produse..."
                className="w-full py-2 sm:py-3 focus:outline-none text-base sm:text-lg"
              />
              {searchQuery && (
                <button type="button" onClick={handleClearSearch} className="text-gray-400 hover:text-black">
                  <FiX size={20} />
                </button>
              )}
            </div>
          </form>
          
          {/* Căutări recente - responsive */}
          {recentSearches.length > 0 && !searchQuery && (
            <div className="mt-3 sm:mt-4">
              <div className="flex justify-between items-center mb-1 sm:mb-2">
                <h3 className="text-xs sm:text-sm text-gray-500">Căutări recente</h3>
                <button 
                  onClick={handleClearRecentSearches}
                  className="text-xs text-gray-500 hover:text-black"
                >
                  Șterge tot
                </button>
              </div>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {recentSearches.map((query, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentSearchClick(query)}
                    className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm bg-gray-100 hover:bg-gray-200 rounded-full"
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Rezultate căutare - responsive */}
        {loading ? (
          <div className="text-center py-6 sm:py-8 md:py-10">
            <div className="inline-block h-6 w-6 sm:h-8 sm:w-8 animate-spin rounded-full border-4 border-solid border-black border-r-transparent"></div>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-500">Se încarcă rezultatele...</p>
          </div>
        ) : (
          <>
            {searchQuery.length > 2 && (
              <div className="mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl font-light mb-4 sm:mb-6">
                  {searchResults.length 
                    ? `${searchResults.length} rezultate pentru "${searchQuery}"`
                    : `Niciun rezultat pentru "${searchQuery}"`
                  }
                </h2>
                
                {searchResults.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                    {searchResults.map(product => (
                      <div key={product.id} className="group">
                        <Link to={`/product/${product.id}`} className="block">
                          <div className="relative mb-2 sm:mb-3 overflow-hidden">
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="w-full h-60 sm:h-60 md:h-72 lg:h-80 object-cover transition-transform duration-700 group-hover:scale-105" 
                            />
                            <div className="absolute inset-0 bg-transparent group-hover:bg-opacity-5 transition-all duration-300"></div>
                            <button className="absolute bottom-0 left-0 right-0 bg-white text-black py-2 sm:py-3 text-xs sm:text-sm font-medium transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                              VIZUALIZEAZĂ
                            </button>
                          </div>
                          <h3 className="text-xs sm:text-sm font-medium mb-1">{product.name}</h3>
                          <p className="text-xs sm:text-sm font-semibold">{product.price} Lei</p>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
                
                {searchResults.length === 0 && (
                  <div className="text-center py-6 sm:py-8 md:py-10">
                    <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6">Nu am găsit niciun produs care să corespundă căutării tale.</p>
                    <div className="max-w-md mx-auto">
                      <h3 className="text-sm sm:text-base font-medium mb-3 sm:mb-4">Sugestii:</h3>
                      <ul className="text-xs sm:text-sm text-gray-600 space-y-1 sm:space-y-2">
                        <li>Verifică ortografia cuvintelor introduse</li>
                        <li>Folosește cuvinte cheie mai generale</li>
                        <li>Încearcă o altă categorie</li>
                        <li>Explorează colecțiile noastre pentru a găsi produse similare</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Produse populare când nu există nicio căutare - responsive */}
            {searchQuery.length <= 2 && (
              <div>
                <h2 className="text-lg sm:text-xl font-light mb-4 sm:mb-6">Produse populare</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                  {dummyProducts
                    .filter(product => selectedCategory === 'all' || product.category === selectedCategory)
                    .slice(0, 8)
                    .map(product => (
                    <div key={product.id} className="group">
                      <Link to={`/product/${product.id}`} className="block">
                        <div className="relative mb-2 sm:mb-3 overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-60 sm:h-60 md:h-72 lg:h-80 object-cover transition-transform duration-700 group-hover:scale-105" 
                          />
                          <div className="absolute inset-0 bg-transparent group-hover:bg-opacity-5 transition-all duration-300"></div>
                          <button className="absolute hover:bg-black hover:text-white bottom-0 left-0 right-0 bg-white text-black py-2 sm:py-3 text-xs sm:text-sm font-medium transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 cursor-pointer">
                            VIZUALIZEAZĂ
                          </button>
                        </div>
                        <h3 className="text-xs sm:text-sm font-medium mb-1">{product.name}</h3>
                        <p className="text-xs sm:text-sm font-semibold">{product.price} Lei</p>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Search;
