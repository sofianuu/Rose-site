import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const CategoryPage = () => {
  const { gender, category } = useParams();
  const [products, setProducts] = useState([]);

  const allItems = [
    // Produse pentru femei
    { id: 1, title: 'Rochie lungă cu imprimeu', price: 149.99, category: 'Rochii', gender: 'women', image: '/src/assets/images/jacket_women.jpg' },
    { id: 2, title: 'Bluză din bumbac organic', price: 79.99, category: 'Topuri & Tricouri', gender: 'women', image: '/src/assets/images/jacket_women.jpg' },
    { id: 3, title: 'Pantaloni wide-leg', price: 129.99, category: 'Pantaloni', gender: 'women', image: '/src/assets/images/jacket_women.jpg' },
    { id: 4, title: 'Cămașă oversize', price: 99.99, category: 'Bluze & Cămăși', gender: 'women', image: '/src/assets/images/jacket_women.jpg' },
    { id: 5, title: 'Palton elegant', price: 299.99, category: 'Jachete & Paltoane', gender: 'women', image: '/src/assets/images/jacket_women.jpg' },
    { id: 6, title: 'Palton elegant', price: 299.99, category: 'New Collection', gender: 'women', image: '/src/assets/images/jacket_women.jpg' },
    { id: 7, title: 'Palton elegant', price: 299.99, category: 'Pantaloni', gender: 'women', image: '/src/assets/images/jacket_women.jpg' },
    { id: 8, title: 'Palton elegant', price: 299.99, category: 'Pantaloni', gender: 'women', image:'/src/assets/images/jacket_women.jpg' },
    { id: 9, title: 'Palton elegant', price: 299.99, category: 'Pantaloni', gender: 'women', image: '/src/assets/images/jacket_women.jpg' },
    


    // Produse pentru bărbați
    { id: 6, title: 'Tricou casual', price: 59.99, category: 'Tricouri', gender: 'men', image: '/src/assets/images/tshirt_men.jpg' },
    { id: 7, title: 'Blugi slim fit', price: 179.99, category: 'Pantaloni', gender: 'men', image: '/src/assets/images/men_jeans.jpg' },
    { id: 8, title: 'Pulover de lână', price: 199.99, category: 'Pulovere', gender: 'men', image: '/src/assets/images/pulover_men.jpg' },
    { id: 9, title: 'Cămașă clasică', price: 119.99, category: 'Cămăși', gender: 'men', image: '/src/assets/images/men_shirt.jpg' },
    { id: 10, title: 'Geacă de piele', price: 349.99, category: 'Jachete', gender: 'men', image: '/src/assets/images/jacket_men.jpg' },
  ];

  useEffect(() => {
    const filteredItems = allItems.filter(
      item => item.category.toLowerCase() === category.toLowerCase() && item.gender === gender
    );
    setProducts(filteredItems);
  }, [gender, category]);

  return (
    <div className="min-h-screen bg-white py-8 md:py-12">
      <div className="px-2 md:container md:mx-auto md:px-4">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-8">{category.toUpperCase()}</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 md:gap-4">
          {products.length > 0 ? (
            products.map(item => (
              <div key={item.id} className="group px-1 md:px-0 mb-4 md:mb-0">
                <div className="relative mb-1 md:mb-2">
                  <Link to={`/product/${item.id}`}>
                    <img src={item.image} alt={item.title} className="w-full h-60 md:h-80 object-cover" />
                  </Link>
                  <button className="absolute bottom-4 left-0 right-0 mx-auto w-4/5 md:w-3/4 bg-white text-black py-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    ADAUGĂ ÎN COȘ
                  </button>
                </div>
                <div className="px-1">
                  <h3 className="text-xs md:text-sm font-medium truncate">{item.title}</h3>
                  <p className="text-xs md:text-sm font-semibold">{item.price} Lei</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-4">Nu am găsit produse în această categorie.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
