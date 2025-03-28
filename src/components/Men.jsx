import React from 'react';
import { Link } from 'react-router-dom';

const Men = () => {
  // Produse pentru bărbați - acestea ar putea veni dintr-un API sau state manager
  const menProducts = [
    {
      id: 1,
      title: 'Cămașă casual din bumbac',
      price: 159,
      image: '/src/assets/images/women_cover.jpg', // Înlocuiți cu imagini pentru bărbați
      rating: 4.0,
      category: 'shirts'
    },
    {
      id: 2,
      title: 'Tricou modern cu imprimeu',
      price: 89,
      image: '/src/assets/images/women_cover2.jpg', // Înlocuiți cu imagini pentru bărbați
      rating: 4.5,
      category: 'tshirts'
    },
    {
      id: 3,
      title: 'Pantaloni jeans slim fit',
      price: 179,
      image: '/src/assets/images/women_cover_mobile.jpg', // Înlocuiți cu imagini pentru bărbați
      rating: 5.0,
      category: 'pants'
    },
    {
      id: 4,
      title: 'Adidași sport pentru alergare',
      price: 249,
      image: '/src/assets/images/women_cover.jpg', // Înlocuiți cu imagini pentru bărbați
      rating: 4.2,
      category: 'shoes'
    }
    // Puteți adăuga mai multe produse aici
  ];

  // Categorii pentru bărbați
  const menCategories = [
    { id: 1, name: 'Cămăși', image: '/src/assets/images/women_cover.jpg', link: '/men/shirts' },
    { id: 2, name: 'Tricouri & Polo', image: '/src/assets/images/women_cover2.jpg', link: '/men/tshirts' },
    { id: 3, name: 'Pantaloni', image: '/src/assets/images/women_cover_mobile.jpg', link: '/men/pants' },
    { id: 4, name: 'Încălțăminte', image: '/src/assets/images/women_cover.jpg', link: '/men/shoes' },
    { id: 5, name: 'Jachete & Paltoane', image: '/src/assets/images/women_cover2.jpg', link: '/men/jackets' },
    { id: 6, name: 'Accesorii', image: '/src/assets/images/women_cover_mobile.jpg', link: '/men/accessories' },
  ];

  // Funcție pentru renderarea stelelor de rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star text-yellow-400"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt text-yellow-400"></i>);
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star text-yellow-400"></i>);
    }

    return stars;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative bg-blue-50">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Colecția pentru Bărbați</h1>
          <p className="text-lg text-gray-600 mb-8">Descoperă cele mai noi tendințe în modă pentru bărbați</p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md transition duration-300">
            Descoperă colecția
          </button>
        </div>
      </div>

      {/* Categories Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Categorii</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {menCategories.map(category => (
            <div key={category.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
              <div className="h-64 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.name}</h3>
                <Link
                  to={category.link}
                  className="inline-block text-blue-500 hover:text-blue-600 font-medium"
                >
                  Vezi produse →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Produse Populare</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {menProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
                <div className="relative group">
                  <div className="h-64 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                    <button className="bg-white text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-blue-500 hover:text-white transition duration-300">
                      Adaugă în coș
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.title}</h3>
                  <p className="text-blue-500 font-bold mb-2">{product.price} Lei</p>
                  <div className="flex items-center">
                    {renderStars(product.rating)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-blue-100 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Abonează-te la newsletter</h2>
          <p className="text-gray-600 mb-6">Primește ultimele noutăți și oferte exclusive direct în inbox-ul tău.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <input
              type="email"
              placeholder="Adresa ta de email"
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md transition duration-300">
              Abonează-te
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Men;