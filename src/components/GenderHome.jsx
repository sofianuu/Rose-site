import { Link } from 'react-router-dom';
import ResponsiveVideo from './ResponsiveVideo';

const GenderHome = ({ gender }) => {
  const isWomen = gender === 'women';

  const popularItems = isWomen
    ? [
        { id: 1, title: 'Rochie lungă', price: 149.99, image: '/src/assets/images/jacket_women.jpg', isNew: true },
        { id: 2, title: 'Bluză bumbac', price: 79.99, image: '/src/assets/images/jacket_women.jpg', isNew: true },
        { id: 3, title: 'Pantaloni wide-leg', price: 129.99, image: '/src/assets/images/jacket_women.jpg', isNew: false },
        { id: 4, title: 'Cămașă oversize', price: 99.99, image: '/src/assets/images/jacket_women.jpg', isNew: true },
      ]
    : [
        { id: 1, title: 'Geacă din piele', price: 249.99, image: '/src/assets/images/david.jpeg', isNew: true },
        { id: 2, title: 'Pulover lână', price: 199.99, image:  '/src/assets/images/david.jpeg', isNew: true },
        { id: 3, title: 'Blugi slim fit', price: 179.99, image:  '/src/assets/images/david.jpeg', isNew: false },
        { id: 4, title: 'Cămașă clasică', price: 119.99, image:  '/src/assets/images/david.jpeg', isNew: true },
      ];

  const categories = isWomen
    ? [
        { id: 1, name: 'Noutăți', image: '/src/assets/images/jacket_women.jpg', link: '/women/New Collection' },
        { id: 2, name: 'Rochii', image: '/src/assets/images/jacket_women.jpg', link: '/women/Rochii' },
        { id: 3, name: 'Topuri & Tricouri', image: '/src/assets/images/jacket_women.jpg', link: '/women/Topuri & Tricouri' },
        { id: 4, name: 'Pantaloni', image: '/src/assets/images/jacket_women.jpg', link: '/women/Pantaloni' },
        { id: 5, name: 'Bluze & Cămăși', image: '/src/assets/images/jacket_women.jpg', link: '/women/Bluze & Cămăși' },
        { id: 6, name: 'Jachete & Paltoane', image: '/src/assets/images/jacket_women.jpg', link: '/women/Jachete & Paltoane' },
      ]
    : [
        { id: 1, name: 'Noutăți', image: '/src/assets/images/new_men.jpg', link: '/men/New Collection' },
        { id: 2, name: 'Tricouri', image: '/src/assets/images/tshirt_men.jpg', link: '/men/Tricouri' },
        { id: 3, name: 'Pantaloni', image: '/src/assets/images/men_jeans.jpg', link: '/men/Pantaloni' },
        { id: 4, name: 'Cămăși', image: '/src/assets/images/men_shirt.jpg', link: '/men/Cămăși' },
        { id: 5, name: 'Pulovere', image: '/src/assets/images/sweater_men.jpg', link: '/men/Pulovere' },
        { id: 6, name: 'Jachete', image: '/src/assets/images/jacket_men.jpg', link: '/men/Jachete' },
      ];

  return (
    <div className="min-h-screen bg-white">
      <ResponsiveVideo gender={gender} />
      <div className="px-2 md:container md:mx-auto md:px-4 py-8 md:py-12">
        <div className="flex justify-between items-center mb-4 md:mb-8 px-2 md:px-0">
          <h2 className="text-xl md:text-2xl font-bold">NOUTĂȚI</h2>
          <Link to={`/${gender}/New Collection`} className="text-sm md:text-base font-semibold underline">
            VEZI TOATE
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 md:gap-4">
          {popularItems.map(item => (
            <div key={item.id} className="group px-1 md:px-0 mb-4 md:mb-0">
              <div className="relative mb-1 md:mb-2">
                <img src={item.image} alt={item.title} className="w-full h-60 md:h-85 object-cover" />
                {item.isNew 
                  // <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs">NOU</div>
                }
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
                <img src={category.image} alt={category.name} className="w-full h-60 md:h-90 object-cover" />
                <Link
                  to={category.link}
                  className="absolute inset-0 flex items-center justify-center bg-transparent bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"
                >
                  <span className="bg-white text-black px-4 py-2 font-semibold transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    {category.name}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenderHome;
