import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import womenCover from "../assets/images/women_cover.jpg";
import menCover from "../assets/images/men_cover.jpg";
import kidsCover from "../assets/images/kids_cover.jpg";

import womenCoverMobile from "../assets/images/women_cover_mobile.jpg";
import menCoverMobile from "../assets/images/men_cover_mobile.jpg";
import kidsCoverMobile from "../assets/images/kids_cover_mobile.jpg";

function Slideshow() {
  const [curr, setCurr] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const slides = [
    { 
      desktopImage: womenCover,
      mobileImage: womenCoverMobile, 
      text: "FEMEI",
      link: "/women" 
    },
    { 
      desktopImage: menCover,
      mobileImage: menCoverMobile, 
      text: "BARBATI",
      link: "/men"  
    },
    { 
      desktopImage: kidsCover,
      mobileImage: kidsCoverMobile, 
      text: "COPII",
      link: "/kids" 
    }
  ];

  const prev = (e) => {
    e.stopPropagation();
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  };
  
  const next = (e) => {
    e.stopPropagation();
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  };

  return (
    <div className="overflow-hidden relative w-11/12 max-h-[800px] sm:max-h-[700px] mx-auto">
      <div 
        className="flex transition-transform ease-out items-center duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full flex-shrink-0 max-h-[600px]">
            <Link to={slide.link} className="block w-full h-full relative">
              <img 
                src={isMobile ? slide.mobileImage : slide.desktopImage} 
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover max-h-[530px] transition-transform duration-700"
              />
              <div className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 w-full text-center transition-all duration-300">
                <h2 className="text-white font-bold text-6xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl px-4 drop-shadow-lg">
                  {slide.text}
                </h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
      
 
      <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
        <button 
          onClick={prev} 
          className="p-1 rounded-full bg-transparent bg-opacity-10 hover:bg-opacity-20 transition-all duration-300 hover:scale-110 z-30 pointer-events-auto"
        >
          <ChevronLeft size={30} className="text-white" />
        </button>
        <button 
          onClick={next} 
          className="p-1 rounded-full bg-transparent bg-opacity-10 hover:bg-opacity-20 transition-all duration-300 hover:scale-110 z-30 pointer-events-auto"
        >
          <ChevronRight size={30} className="text-white" />
        </button>
      </div>


      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, index) => (
            <div 
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurr(index);
              }}
              className={`transition-all w-2 h-2 md:w-3 md:h-3 lg:w-4 lg:h-3 duration-300 rounded-full cursor-pointer pointer-events-auto ${
                curr === index 
                  ? 'bg-white w-4 md:w-6 lg:w-8' 
                  : 'bg-gray-400 bg-opacity-30'
              }`} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Slideshow;