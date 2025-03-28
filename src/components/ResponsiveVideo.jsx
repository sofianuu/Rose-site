import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const ResponsiveVideo = ({ gender }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const videoRefs = [useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    videoRefs.forEach((ref) => {
      if (ref.current) {
        ref.current.play().catch(() => {
          ref.current.muted = true;
          ref.current.play().catch(() => console.log("Nu se poate reda nici mut."));
        });
      }
    });
  }, [videoRefs]);

  const isWomen = gender === "women";
  const videoSrc = isWomen 
    ? "/videos/new_collection_video2.mp4" 
    : "/videos/new_collection_video_men.mp4";  // Înlocuiește cu video pentru bărbați

  return (
    <div className=" bg-black relative w-full overflow-hidden min-h-screen">
      {isMobile ? (
        <video 
          ref={videoRefs[0]}
          className="absolute inset-0 w-full h-full object-contain"
          autoPlay
          loop
          muted
          playsInline
          src={videoSrc}
        />
      ) : (
        <div className="grid grid-cols-3 gap-0 w-full h-full absolute inset-0">
          {videoRefs.map((ref, index) => (
            <video 
              key={index}
              ref={ref}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              src={videoSrc}
            />
          ))}
        </div>
      )}

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 bg-transparent bg-opacity-30">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 px-4 text-center">
          {isWomen ? "Colecția pentru Femei" : "Colecția pentru Bărbați"}
        </h1>
        <p className="text-xl md:text-2xl mb-8 px-4 text-center">
          Descoperă cele mai noi tendințe ale sezonului
        </p>
        <Link to={`/${gender}/New Collection`}>
          <button className="bg-transparent text-black px-6 py-3 text-lg font-semibold hover:bg-gray-100 transition-colors">
            DESCOPERĂ COLECȚIA
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ResponsiveVideo;
