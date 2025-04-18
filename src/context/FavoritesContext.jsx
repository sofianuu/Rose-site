import { createContext, useState, useContext, useEffect } from 'react';

const FavoritesContext = createContext();

// Hook custom pentru a accesa contextul favoritelor
export const useFavorites = () => {
  return useContext(FavoritesContext);
};

// Provider pentru funcționalitatea favoritelor
export const FavoritesProvider = ({ children }) => {
  // Verificare dacă utilizatorul este autentificat
  const isAuthenticated = () => {
    return localStorage.getItem('isAuthenticated') === 'true';
  };

  // Inițializăm starea favoritelor, în funcție de statusul autentificării
  const [favorites, setFavorites] = useState(() => {
    // Dacă utilizatorul este autentificat, încărcăm din localStorage
    if (isAuthenticated()) {
      const savedFavorites = localStorage.getItem('favorites');
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    }
    // Dacă nu este autentificat, începem cu un array gol (va exista doar în sesiunea curentă)
    return [];
  });
  
  // Actualizăm localStorage doar dacă utilizatorul este autentificat
  useEffect(() => {
    if (isAuthenticated()) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites]);
  
  // Ascultăm schimbările de autentificare
  useEffect(() => {
    const handleAuthChange = () => {
      if (isAuthenticated()) {
        // Dacă utilizatorul s-a autentificat, încărcăm favoritele din localStorage
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        }
      } else {
        // La delogare, favoritele rămân în memorie, dar nu mai sunt salvate în localStorage
      }
    };

    // Adăugăm un event listener pentru a detecta schimbările de autentificare
    window.addEventListener('authChange', handleAuthChange);
    
    return () => {
      // Curățăm event listener-ul la unmount
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);
  
  // Funcție pentru adăugarea/eliminarea unui produs din favorite
  const toggleFavorite = (product) => {
    setFavorites(prevFavorites => {
      const existingIndex = prevFavorites.findIndex(item => item.id === product.id);
      
      if (existingIndex !== -1) {
        // Dacă produsul există, îl eliminăm
        return prevFavorites.filter(item => item.id !== product.id);
      } else {
        // Dacă produsul nu există, îl adăugăm
        return [...prevFavorites, product];
      }
    });
  };
  
  // Funcție pentru verificarea dacă un produs este în favorite
  const isFavorite = (productId) => {
    return favorites.some(item => item.id === productId);
  };
  
  // Funcție pentru obținerea tuturor produselor favorite
  const getAllFavorites = () => {
    return favorites;
  };
  
  // Funcție pentru a goli lista de favorite
  const clearFavorites = () => {
    setFavorites([]);
    if (isAuthenticated()) {
      localStorage.removeItem('favorites');
    }
  };
  
  // Valoarea contextului
  const value = {
    favorites,
    toggleFavorite,
    isFavorite,
    getAllFavorites,
    clearFavorites
  };
  
  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext; 