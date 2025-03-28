import React from 'react';
import { Link } from 'react-router-dom';
import ResponsiveVideoWomen from './ResponsiveVideoWomen';

const Women = () => {
  
  const popularItems = [
    {
      id: 1,
      title: 'Rochie lungă cu imprimeu',
      price: 149.99,
      image: '/src/assets/images/grey_coat.jpg',
      isNew: true,
    },
    {
      id: 2,
      title: 'Bluză din bumbac organic',
      price: 79.99,
      image: '/src/assets/images/bej_coat.jpg',
      isNew: true,
    },
    {
      id: 3,
      title: 'Pantaloni wide-leg',
      price: 129.99,
      image: '/src/assets/images/women_cover_mobile.jpg',
      isNew: false,
    },
    {
      id: 4,
      title: 'Cămașă oversize',
      price: 99.99,
      image: '/src/assets/images/women_cover.jpg',
      isNew: true,
    },
  ];

  const categories = [
    { id: 1, name: 'Noutăți', image: '/src/assets/images/new.jpg', link: '/women/New Collection' },
    { id: 2, name: 'Rochii', image: '/src/assets/images/dress.jpg', link: '/women/Rochii' },
    { id: 3, name: 'Topuri & Tricouri', image: '/src/assets/images/top.jpg', link: '/women/Topuri & Tricouri' },
    { id: 4, name: 'Pantaloni', image: '/src/assets/images/trousers2.jpg', link: '/women/Pantaloni' },
    { id: 5, name: 'Bluze & Cămăși', image: '/src/assets/images/shirt.jpg', link: '/women/Bluze & Cămăși' },
    { id: 6, name: 'Jachete & Paltoane', image: '/src/assets/images/coats.jpg', link: '/women/Jachete & Paltoane' },
  ];

  return (
    <div className="min-h-screen bg-white">
  
      <ResponsiveVideoWomen />
      
      <div className="px-2 md:container md:mx-auto md:px-4 py-8 md:py-12">
        <div className="flex justify-between items-center mb-4 md:mb-8 px-2 md:px-0">
          <h2 className="text-xl md:text-2xl font-bold">NOUTĂȚI</h2>
          <Link to="/women/New Collection" className="text-sm md:text-base font-semibold underline">VEZI TOATE</Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 md:gap-4">
          {popularItems.map(item => (
            <div key={item.id} className="group px-1 md:px-0 mb-4 md:mb-0">
              <div className="relative mb-1 md:mb-2">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-60 md:h-80 object-cover"
                />
                {item.isNew && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs">
                    NOU
                  </div>
                )}
                <button className="absolute bottom-4 left-0 right-0 mx-auto w-4/5 md:w-3/4 bg-white text-black py-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  ADAUGĂ ÎN COȘ
                </button>
              </div>
              <div className="px-1">
                <h3 className="text-xs md:text-sm font-medium truncate">{item.title}</h3>
                <p className="text-xs md:text-sm font-semibold">{item.price} Lei</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 py-8 md:py-12">
        <div className="px-2 md:container md:mx-auto md:px-4">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-8 px-2 md:px-0">CATEGORII</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 md:gap-4">
            {categories.map(category => (
              <div key={category.id} className="relative group px-1 md:px-0 mb-4 md:mb-0">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-54 md:h-90 object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-transparent bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300">
                  <Link 
                    to={category.link} 
                    className="bg-white text-black px-4 md:px-6 py-1 md:py-2 text-sm md:text-base font-semibold transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    {category.name}
                  </Link>
                </div>
                <h3 className="text-base md:text-lg font-semibold mt-1 md:mt-2 px-1">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 md:container md:mx-auto md:px-4 py-10 md:py-16 text-center">
        <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">ABONEAZĂ-TE LA NEWSLETTER</h2>
        <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 max-w-lg mx-auto">
          Fii prima care află despre noile colecții și obține acces exclusiv la oferte speciale.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-4 max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Adresa ta de email"
            className="px-3 md:px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black flex-grow text-sm"
          />
          <button className="bg-black text-white px-4 md:px-6 py-2 font-semibold text-sm hover:bg-gray-800">
            ABONEAZĂ-TE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Women;