import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

// Hook custom pentru a accesa contextul coșului
export const useCart = () => {
  return useContext(CartContext);
};

// Provider pentru funcționalitatea coșului
export const CartProvider = ({ children }) => {
  // Verificare dacă utilizatorul este autentificat
  const isAuthenticated = () => {
    return localStorage.getItem('isAuthenticated') === 'true';
  };

  // Inițializăm starea coșului, în funcție de statusul autentificării
  const [cartItems, setCartItems] = useState(() => {
    // Dacă utilizatorul este autentificat, încărcăm din localStorage
    if (isAuthenticated()) {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    // Dacă nu este autentificat, începem cu un array gol (va exista doar în sesiunea curentă)
    return [];
  });
  
  // Salvăm coșul în localStorage doar dacă utilizatorul este autentificat
  useEffect(() => {
    if (isAuthenticated()) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);
  
  // Ascultăm schimbările de autentificare
  useEffect(() => {
    const handleAuthChange = () => {
      if (isAuthenticated()) {
        // Dacă utilizatorul s-a autentificat, încărcăm coșul din localStorage
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      } else {
        // La delogare, coșul rămâne în memorie, dar nu mai este salvat în localStorage
      }
    };

    // Adăugăm un event listener pentru a detecta schimbările de autentificare
    window.addEventListener('authChange', handleAuthChange);
    
    return () => {
      // Curățăm event listener-ul la unmount
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);
  
  // Funcție pentru adăugarea unui produs în coș
  const addToCart = (product) => {
    setCartItems(prevItems => {
      // Verificăm dacă produsul există deja în coș
      const existingItemIndex = prevItems.findIndex(
        item => item.id === product.id && 
               item.size === product.size && 
               item.color === product.color
      );
      
      if (existingItemIndex !== -1) {
        // Dacă produsul există, actualizăm cantitatea
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + product.quantity
        };
        return updatedItems;
      } else {
        // Dacă produsul nu există, îl adăugăm la coș
        return [...prevItems, { ...product, quantity: product.quantity || 1 }];
      }
    });
  };
  
  // Funcție pentru a actualiza cantitatea unui produs din coș
  const updateQuantity = (productId, size, color, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => prevItems.map(item => 
      (item.id === productId && item.size === size && item.color === color) 
        ? { ...item, quantity: newQuantity } 
        : item
    ));
  };
  
  // Funcție pentru a șterge un produs din coș
  const removeFromCart = (productId, size, color) => {
    setCartItems(prevItems => prevItems.filter(item => 
      !(item.id === productId && item.size === size && item.color === color)
    ));
  };
  
  // Funcție pentru calculul totalului
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  // Funcție pentru a afla numărul total de produse din coș
  const getCartItemsCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };
  
  // Funcție pentru a goli coșul
  const clearCart = () => {
    setCartItems([]);
    if (isAuthenticated()) {
      localStorage.removeItem('cart');
    }
  };
  
  // Valoarea contextului
  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    calculateTotal,
    getCartItemsCount,
    clearCart
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext; 