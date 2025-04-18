import { Link } from 'react-router-dom';
import ResponsiveVideo from '../components/ResponsiveVideo';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useState, useEffect } from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import SizeSelector from '../components/SizeSelector';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const GenderHome = ({ gender }) => {
  const navigate = useNavigate();
  const isWomen = gender === 'women';
  const isGirl = gender === 'girl';
  const isBoy = gender === 'boy';
  const isMen = gender === 'men';
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [addedToCart, setAddedToCart] = useState(null);
  const [showSizeSelectorForProduct, setShowSizeSelectorForProduct] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determinăm ce date să afișăm în funcție de genul primit ca props
  let popularItems;
  let categories;
  let baseLink;

  if (isWomen) {
    popularItems = [
      { 
        id: 1, 
        title: 'Sacou cu două rânduri de nasturi', 
        price: 149.99, 
        image: '/src/assets/images/sacou/sacou1.jpg', 
        isNew: true,
        sizes: { XS: true, S: true, M: true, L: true, XL: true }
      },
      { 
        id: 2, 
        title: 'Palton elegant din lâna', 
        price: 79.99, 
        image: '/src/assets/images/palton5.jpg', 
        isNew: true,
        sizes: { XS: true, S: true, M: true, L: false, XL: false }
      },
      { 
        id: 3, 
        title: 'Pantaloni din in', 
        price: 129.99, 
        image: '/src/assets/images/pantaloni.jpg', 
        isNew: true,
        sizes: { XS: false, S: true, M: true, L: true, XL: false }
      },
      { 
        id: 4, 
        title: 'Bluză cu fronșeuri', 
        price: 92.99, 
        image: '/src/assets/images/bluza_fronseuri.jpg', 
        isNew: true,
        sizes: { XS: false, S: true, M: true, L: true, XL: true }
      },
      { 
        id: 5, 
        title: 'Fustă plisată', 
        price: 119.99, 
        image: '/src/assets/images/top.jpg', 
        isNew: false,
        sizes: { XS: true, S: true, M: true, L: true, XL: false }
      },
      { 
        id: 6, 
        title: 'Blazer elegant', 
        price: 189.99, 
        image: '/src/assets/images/coats.jpg', 
        isNew: false,
        sizes: { XS: false, S: true, M: true, L: true, XL: true }
      },
      { 
        id: 7, 
        title: 'Rochie de seară', 
        price: 249.99, 
        image: '/src/assets/images/dress.jpg', 
        isNew: false,
        sizes: { XS: true, S: true, M: true, L: true, XL: true }
      },
      { 
        id: 8, 
        title: 'Rochie', 
        price: 159.99, 
        image: '/src/assets/images/dress.jpg', 
        isNew: false,
        sizes: { 36: true, 37: true, 38: true, 39: true, 40: true }
      }
    ];

    categories = [
      { id: 1, name: 'Noutăți', image: '/src/assets/images/new.jpg', link: '/women/New Collection' },
      { id: 2, name: 'Rochii', image: '/src/assets/images/dress.jpg', link: '/women/Rochii' },
      { id: 3, name: 'Topuri & Tricouri', image: '/src/assets/images/top.jpg', link: '/women/Topuri & Tricouri' },
      { id: 4, name: 'Pantaloni', image: '/src/assets/images/trousers2.jpg', link: '/women/Pantaloni' },
      { id: 5, name: 'Bluze & Cămăși', image: '/src/assets/images/shirt.jpg', link: '/women/Bluze & Cămăși' },
      { id: 6, name: 'Jachete & Paltoane', image: '/src/assets/images/coats.jpg', link: '/women/Jachete & Paltoane' },
    ];
    
    baseLink = '/women';
  } 
  else if (isMen) {
    popularItems = [
      { 
        id: 1, 
        title: 'Geacă în stil worker din denim', 
        price: 249.99, 
        image: '/src/assets/images/geaca_tip_worker.jpg', 
        isNew: true,
        sizes: { S: true, M: true, L: true, XL: true, XXL: true }
      },
      { 
        id: 2, 
        title: 'Pulover cu guler', 
        price: 199.99, 
        image: '/src/assets/images/pulover_guler.jpg', 
        isNew: true,
        sizes: { S: false, M: true, L: true, XL: true, XXL: false }
      },
      { 
        id: 3, 
        title: 'Blugi slim fit', 
        price: 179.99, 
        image: '/src/assets/images/men_jeans.jpg', 
        isNew: false,
        sizes: { S: true, M: true, L: true, XL: false, XXL: false }
      },
      { 
        id: 4, 
        title: 'Cămașă casual', 
        price: 119.99, 
        image: '/src/assets/images/camasa_barbat.jpg', 
        isNew: true,
        sizes: { S: true, M: true, L: true, XL: true, XXL: true }
      },
      { 
        id: 5, 
        title: 'Costum business', 
        price: 599.99, 
        image: '/src/assets/images/sweater_men.jpg', 
        isNew: false,
        sizes: { S: false, M: true, L: true, XL: true, XXL: true }
      },
      { 
        id: 6, 
        title: 'Pantofi din piele', 
        price: 229.99, 
        image: '/src/assets/images/sweater_men.jpg', 
        isNew: false,
        sizes: { 40: true, 41: true, 42: true, 43: true, 44: true }
      },
      { 
        id: 7, 
        title: 'Tricou polo', 
        price: 89.99, 
        image: '/src/assets/images/sweater_men.jpg', 
        isNew: false,
        sizes: { S: true, M: true, L: true, XL: true, XXL: false }
      },
      { 
        id: 8, 
        title: 'Hanorac cu guler', 
        price: 129.99, 
        image: '/src/assets/images/hanorac_barbat.jpg', 
        isNew: true,
        sizes: { S: true, M: true, L: true, XL: true, XXL: true }
      }
    ];

    categories = [
      { id: 1, name: 'Noutăți', image: '/src/assets/images/noutati_barbati.jpg', link: '/men/New Collection' },
      { id: 2, name: 'Tricouri', image: '/src/assets/images/tricou_barbati.jpg', link: '/men/Tricouri' },
      { id: 3, name: 'Pantaloni', image: '/src/assets/images/men_jeans.jpg', link: '/men/Pantaloni' },
      { id: 4, name: 'Cămăși', image: '/src/assets/images/camasa_barbati.jpg', link: '/men/Cămăși' },
      { id: 5, name: 'Pulovere', image: '/src/assets/images/pulover_barbati.jpg', link: '/men/Pulovere' },
      { id: 6, name: 'Jachete', image: '/src/assets/images/jacheta_barbati.jpg', link: '/men/Jachete' },
    ];
    
    baseLink = '/men';
  }
  else if (isGirl) {
    popularItems = [
      { 
        id: 101, 
        title: 'Rochie de bumbac', 
        price: 89.99, 
        image: '/src/assets/images/kids/rochie_bumbac.jpg', 
        isNew: true,
        sizes: { '2-3Y': true, '4-5Y': true, '6-7Y': true, '8-9Y': true, '10-11Y': true }
      },
      { 
        id: 102, 
        title: 'Pantaloni scurți leopard', 
        price: 59.99, 
        image: '/src/assets/images/kids/pantaloni_leopard.jpg', 
        isNew: true,
        sizes: { '2-3Y': true, '4-5Y': true, '6-7Y': true, '8-9Y': false, '10-11Y': false }
      },
      { 
        id: 103, 
        title: 'Tricou cu imprimeu', 
        price: 79.99, 
        image: '/src/assets/images/kids/tricou_flori.jpg', 
        isNew: false,
        sizes: { '2-3Y': false, '4-5Y': true, '6-7Y': true, '8-9Y': true, '10-11Y': true }
      },
      { 
        id: 104, 
        title: 'Pijama de bumbac', 
        price: 109.99, 
        image: '/src/assets/images/kids/pijama_bumbac.jpg', 
        isNew: true,
        sizes: { '2-3Y': false, '4-5Y': true, '6-7Y': true, '8-9Y': true, '10-11Y': true }
      },
      { 
        id: 105, 
        title: 'Fustă cu pliuri', 
        price: 69.99, 
        image: '/src/assets/images/girl.jpg', 
        isNew: false,
        sizes: { '2-3Y': true, '4-5Y': true, '6-7Y': true, '8-9Y': true, '10-11Y': false }
      },
      { 
        id: 106, 
        title: 'Set pantaloni și bluză', 
        price: 119.99, 
        image: '/src/assets/images/girl.jpg', 
        isNew: false,
        sizes: { '2-3Y': true, '4-5Y': true, '6-7Y': true, '8-9Y': true, '10-11Y': true }
      },
      { 
        id: 107, 
        title: 'Rochie de petrecere', 
        price: 129.99, 
        image: '/src/assets/images/kids/rochie_petrecere.jpg', 
        isNew: true,
        sizes: { '2-3Y': false, '4-5Y': true, '6-7Y': true, '8-9Y': true, '10-11Y': true }
      },
      { 
        id: 108, 
        title: 'Adidași colorați', 
        price: 89.99, 
        image: '/src/assets/images/girl.jpg', 
        isNew: false,
        sizes: { '28': true, '29': true, '30': true, '31': true, '32': true, '33': true }
      }
    ];

    categories = [
      { id: 1, name: 'Noutăți', image: '/src/assets/images/kids/noutati_fete.jpg', link: '/kids/girls/New Collection' },
      { id: 2, name: 'Rochii', image: '/src/assets/images/kids/rochie.jpg', link: '/kids/girls/Rochii' },
      { id: 3, name: 'Tricouri', image: '/src/assets/images/kids/tricou_fete.jpg', link: '/kids/girls/Tricouri' },
      { id: 4, name: 'Pantaloni', image: '/src/assets/images/kids/pantaloni_fete.jpg', link: '/kids/girls/Pantaloni' },
      { id: 5, name: 'Fuste', image: '/src/assets/images/kids/fusta.jpg', link: '/kids/girls/Fuste' },
      { id: 6, name: 'Pulovere', image: '/src/assets/images/kids/pulover_fete.jpg', link: '/kids/girls/Pulovere' },
    ];
    
    baseLink = '/kids/girls';
  }
  else if (isBoy) {
    popularItems = [
      { 
        id: 201, 
        title: 'Tricou cu imprimeu', 
        price: 49.99, 
        image: '/src/assets/images/kids/tricou_mickey.jpg', 
        isNew: true,
        sizes: { '2-3Y': true, '4-5Y': true, '6-7Y': true, '8-9Y': true, '10-11Y': true }
      },
      { 
        id: 202, 
        title: 'Loose fit jeans', 
        price: 89.99, 
        image: '/src/assets/images/kids/blugi_baieti.jpg', 
        isNew: true,
        sizes: { '2-3Y': true, '4-5Y': true, '6-7Y': true, '8-9Y': true, '10-11Y': false }
      },
      { 
        id: 203, 
        title: 'Hanorac cu glugă', 
        price: 99.99, 
        image: '/src/assets/images/boys.jpg', 
        isNew: false,
        sizes: { '2-3Y': false, '4-5Y': true, '6-7Y': true, '8-9Y': true, '10-11Y': true }
      },
      { 
        id: 204, 
        title: 'Geacă vătuită hidrofugă', 
        price: 129.99, 
        image: '/src/assets/images/kids/geaca_baieti.jpg', 
        isNew: true,
        sizes: { '2-3Y': false, '4-5Y': true, '6-7Y': true, '8-9Y': true, '10-11Y': true }
      },
      { 
        id: 205, 
        title: 'Set tricou și pantaloni', 
        price: 119.99, 
        image: '/src/assets/images/boys.jpg', 
        isNew: false,
        sizes: { '2-3Y': true, '4-5Y': true, '6-7Y': true, '8-9Y': true, '10-11Y': false }
      },
      { 
        id: 206, 
        title: 'Pantaloni trening', 
        price: 69.99, 
        image: '/src/assets/images/boys.jpg', 
        isNew: false,
        sizes: { '2-3Y': true, '4-5Y': true, '6-7Y': true, '8-9Y': true, '10-11Y': true }
      },
      { 
        id: 207, 
        title: 'Cămașă cu dungi', 
        price: 79.99, 
        image: '/src/assets/images/kids/camasa_baieti.jpg', 
        isNew: true,
        sizes: { '2-3Y': false, '4-5Y': true, '6-7Y': true, '8-9Y': true, '10-11Y': true }
      },
      { 
        id: 208, 
        title: 'Ghete impermeabile', 
        price: 109.99, 
        image: '/src/assets/images/boys.jpg', 
        isNew: false,
        sizes: { '28': true, '29': true, '30': true, '31': true, '32': true, '33': true }
      }
    ];

    categories = [
      { id: 1, name: 'Noutăți', image: '/src/assets/images/kids/noutati_baieti.jpg', link: '/kids/boys/New Collection' },
      { id: 2, name: 'Tricouri', image: '/src/assets/images/kids/tricouri_baieti.jpg', link: '/kids/boys/Tricouri' },
      { id: 3, name: 'Pantaloni scurți', image: '/src/assets/images/kids/pantaloni_baieti.jpg', link: '/kids/boys/Pantaloni' },
      { id: 4, name: 'Hanorace', image: '/src/assets/images/kids/hanorace_baieti.jpg', link: '/kids/boys/Hanorace' },
      { id: 5, name: 'Cămăși', image: '/src/assets/images/kids/camasa_baieti.jpg', link: '/kids/boys/Cămăși' },
      { id: 6, name: 'Blugi', image: '/src/assets/images/kids/blugi_baieti2.jpg', link: '/kids/boys/Blugi' },
    ];
    
    baseLink = '/kids/boys';
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const handleSizeSelect = (itemId, size) => {
    setSelectedSizes(prev => ({
      ...prev,
      [itemId]: size
    }));
  };

  const handleAddToCart = (item) => {
    const selectedSize = selectedSizes[item.id];
    
    if (!selectedSize) {
      return;
    }
    
    const productToAdd = {
      id: item.id,
      title: item.title,
      price: item.price,
      image: `/src/assets/images/${item.id}.jpg`,
      quantity: 1,
      size: selectedSize,
      color: "Default"
    };
    
    addToCart(productToAdd);
    setAddedToCart(item.id);
    setShowSizeSelectorForProduct(null);
    
    setTimeout(() => {
      setAddedToCart(null);
    }, 2000);
  };

  const handleToggleFavorite = (e, itemId) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(itemId);
  };

  return (
    <div className="min-h-screen bg-white">
      <ResponsiveVideo gender={gender} />
      
      {/* Featured Collection */}
      <div className="px-4 md:container md:mx-auto  py-10">
        <motion.div 
          className="flex justify-between items-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-normal tracking-wide text-gray-800">NOUTĂȚI</h2>
          <Link 
            to={`${baseLink}/New Collection`} 
            className="text-sm md:text-base font-medium text-gray-800 transition-colors relative group"
          >
            VEZI TOATE
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black group-hover:w-full transition-all duration-300"></span>
          </Link>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {popularItems.filter(item => item.isNew).map(item => (
            <motion.div key={item.id} variants={fadeInUp}>
              <ProductCard item={item} isMobile={isMobile} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Categories */}
      <div >
        <div className="px-4 md:container md:mx-auto">
          <motion.h2 
            className="text-2xl md:text-3xl font-normal tracking-wide mb-8 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            CATEGORII
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {categories.map(category => (
              <motion.div 
                key={category.id}
                className="relative overflow-hidden"
                variants={fadeInUp}
              >
                <div className="overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-80 md:h-[500px] object-cover transition-transform duration-700 hover:scale-105" 
                  />
                </div>
                <Link
                  to={category.link}
                  className="absolute inset-0 flex items-center justify-center hover:bg-transparent hover:bg-opacity-20 transition-all duration-300"
                >
                  <span className="bg-white text-black min-w-[150px] md:min-w-[180px] h-12 md:h-14 px-4 py-3 font-medium text-sm md:text-base hover:bg-black hover:text-white transition-colors duration-300 flex items-center justify-center whitespace-normal text-center line-clamp-2">
                    {category.name.toUpperCase()}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Popular Products Section (replacing Editorial Section) */}
      <motion.div 
        className="py-16 md:py-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="px-4 md:container md:mx-auto">
          <motion.div 
            className="flex justify-between items-center mb-8 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-normal tracking-wide text-gray-800">PRODUSE POPULARE</h2>
            
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {popularItems.map(item => (
              <motion.div key={item.id} variants={fadeInUp}>
                <ProductCard item={item} isMobile={isMobile} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default GenderHome;
