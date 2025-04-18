// src/components/ProductPage/ProductImages.jsx
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SimpleFullscreenSlider = ({ images, currentIndex, onClose }) => {
  const [activeIndex, setActiveIndex] = useState(currentIndex);
  const [slideDirection, setSlideDirection] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // Pentru animația de intrare/ieșire a modalului
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10);
    
    return () => clearTimeout(timer);
  }, []);

  // Pentru navigarea cu tastatura
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex]);

  const nextSlide = () => {
    setSlideDirection('next');
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setSlideDirection('prev');
    setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div 
      className={`fixed inset-0 bg-white z-50 flex items-center justify-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Buton închidere */}
      <button 
        className="absolute top-4 right-4 p-3 hover:bg-gray-100 rounded-full z-10"
        onClick={handleClose}
        aria-label="Închide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Buton înapoi */}
      <button 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 hover:bg-gray-100 rounded-full z-10"
        onClick={prevSlide}
        aria-label="Imaginea anterioară"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Slider imagini */}
      <div className="w-full h-full flex items-center justify-center overflow-hidden relative">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-in-out ${index === activeIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          >
            <img 
              src={img} 
              alt={`Imagine produs ${index + 1}`} 
              className="max-h-full max-w-full object-contain"
            />
          </div>
        ))}
      </div>

      {/* Buton înainte */}
      <button 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 hover:bg-gray-100 rounded-full z-10"
        onClick={nextSlide}
        aria-label="Imaginea următoare"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicator */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center">
        <div className="px-3 py-1 rounded-full text-sm bg-white shadow-sm">
          {activeIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

const ProductImages = ({ images, productTitle, discount }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);
  
  // Numărul de imagini vizibile în carousel
  const imagesPerView = 4;
  // Verificăm dacă avem nevoie de navigare (mai mult de 4 imagini)
  const needNavigation = images.length > imagesPerView;

  const openFullscreen = (index) => {
    setFullscreenIndex(index);
    setShowFullscreen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreen = () => {
    setShowFullscreen(false);
    document.body.style.overflow = 'auto';
  };

  // Navigare la următoarea imagine (shiftare cu o poziție)
  const nextImage = () => {
    if (activeIndex < images.length - imagesPerView) {
      setActiveIndex(activeIndex + 1);
    }
  };

  // Navigare la imaginea anterioară (shiftare cu o poziție)
  const prevImage = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  return (
    <div className="mt-2 mb-8 relative">
      {/* Layout pentru Mobile - Imagini verticale stivuite */}
      <div className="md:hidden">
        <div className="space-y-2">
          {images.map((img, index) => (
            <div
              key={index}
              className="w-full cursor-pointer relative aspect-[3/4]"
              onClick={() => openFullscreen(index)}
            >
              <div className="overflow-hidden w-full h-full relative">
                <img
                  src={img}
                  alt={`${productTitle} - imagine ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Badge reducere doar pe prima imagine */}
                {index === 0 && discount && (
                  <div className="absolute top-0 left-0 bg-white text-black text-xs font-semibold px-2 py-1 z-10">
                    -{discount}%
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Layout pentru Desktop - Carousel horizontal */}
      <div className="hidden md:block relative">
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${activeIndex * (100 / imagesPerView)}%)` }}
          >
            {images.map((img, index) => (
              <div
                key={index}
                className="w-1/4 flex-shrink-0 cursor-pointer relative group aspect-[3/4] p-0.5"
                onClick={() => openFullscreen(index)}
              >
                <div className="overflow-hidden w-full h-full relative ring-2 ring-transparent group-hover:ring-black transition-all duration-200">
                  <img
                    src={img}
                    alt={`${productTitle} - imagine ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                  
                  {/* Badge reducere doar pe prima imagine */}
                  {index === 0 && discount && (
                    <div className="absolute top-0 left-0 bg-white text-black text-xs font-semibold px-2 py-1 z-10">
                      -{discount}%
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Indicator navigare și săgeți (partea dreaptă jos) - doar pentru desktop */}
        <div className="flex justify-between mt-4">
          {/* Indicator navigare de tip buline */}
          {needNavigation && (
            <div className="flex space-x-1">
              {Array.from({length: images.length - imagesPerView + 1}).map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    activeIndex === index 
                      ? "bg-black" 
                      : "bg-gray-300"
                  }`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Navigare la pagina ${index + 1}`}
                />
              ))}
            </div>
          )}
          
          {/* Săgeți de navigare (partea dreaptă jos) */}
          <div className="flex items-center space-x-2">
            <button
              className={`text-black ${activeIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={prevImage}
              disabled={activeIndex === 0}
              aria-label="Imaginea anterioară"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button
              className={`text-black ${activeIndex >= images.length - imagesPerView ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={nextImage}
              disabled={activeIndex >= images.length - imagesPerView}
              aria-label="Imaginea următoare"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Vizualizare fullscreen */}
      {showFullscreen && (
        <SimpleFullscreenSlider 
          images={images}
          currentIndex={fullscreenIndex}
          onClose={closeFullscreen}
        />
      )}
    </div>
  );
};

export default ProductImages;