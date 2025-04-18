import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ResponsiveVideo from '../components/ResponsiveVideo';
import { kidsData } from '../data/kidsData';
import GenderHome from './GenderHome';
import ProductCard from '../components/ProductCard';
import { useState, useEffect } from 'react';

function Kids() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  // Funcție pentru navigare la pagina specifică genului
  const handleGenderSelect = (gender) => {
    navigate(gender === 'FETE' ? '/kids/girls' : '/kids/boys');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section cu ResponsiveVideo */}
      <ResponsiveVideo gender="kids" />
      
      {/* Category Selection */}
      <div className="px-4 md:container md:mx-auto py-16 md:py-24">
        <motion.h2 
          className="text-2xl md:text-3xl font-normal tracking-wide text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          ALEGE CATEGORIA
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {kidsData.childCategories.map((category) => (
            <motion.div
              key={category.id}
              className="relative overflow-hidden group cursor-pointer"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeInUp}
              onClick={() => handleGenderSelect(category.gender)}
            >
              <div className="overflow-hidden relative">
                <img 
                  src={category.image} 
                  alt={category.gender} 
                  className="w-full h-[500px] md:h-[600px] object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
                <h3 className="text-2xl md:text-3xl  mb-3">{category.gender}</h3>
                <div 
                  className="inline-block bg-white text-black px-8 py-3 font-medium text-sm hover:bg-black hover:text-white transition-colors duration-300"
                >
                  DESCOPERĂ
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Age Categories */}
      <div className="py-10 bg-gray-50">
        <div className="px-4 md:container md:mx-auto">
          <motion.h2 
            className="text-2xl md:text-3xl font-normal tracking-wide text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            CATEGORII PE VÂRSTE
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {kidsData.filters.ageGroups.map((age, index) => (
              <motion.div 
                key={index}
                className="relative overflow-hidden group"
              >
                <Link to={`/kids/age/${index + 1}/All`} className="block">
                  <div className="overflow-hidden aspect-ratio-4/3">
                    <img 
                      src={`/src/assets/images/kids_age_${index + 1}.jpg`} 
                      alt={age} 
                      className="w-full h-120 object-cover" 
                    />
                    <div className="absolute inset-0 bg-transparent bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <div className="text-center p-6">
                        <span className="bg-white text-black px-6 py-3 font-light text-lg md:text-xl hover:bg-black hover:text-white transition-colors duration-300 inline-block">
                          {age}
                        </span>
    
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Featured Products */}
      <div className="py-16 md:py-24">
        <div className="px-4 md:container md:mx-auto">
          <motion.div 
            className="flex justify-between items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-normal tracking-wide text-gray-800">PRODUSE RECOMANDATE</h2>
            
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {kidsData.featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={fadeInUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <ProductCard 
                  item={{
                    id: product.id,
                    title: product.name,
                    price: product.salePrice || product.price,
                    image: product.image,
                    isNew: product.isNew || false,
                    sizes: { 
                      '2-3Y': true, 
                      '4-5Y': true, 
                      '6-7Y': true, 
                      '8-9Y': true, 
                      '10-11Y': true 
                    }
                  }}
                  isMobile={isMobile}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Folosim GenderHome pentru paginile specifice genului
export const KidsGenderPage = ({ gender }) => {
  const genderParam = gender === 'girls' ? 'girl' : 'boy';
  return <GenderHome gender={genderParam} />;
};

export default Kids;
