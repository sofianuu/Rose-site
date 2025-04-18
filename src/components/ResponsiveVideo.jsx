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
  const isKids = gender === "kids";
  const isGirls = gender === "girl";
  const isBoys = gender === "boy";

  // Alegem sursa video în funcție de gen
  let videoSrc;
  if (isWomen) {
    videoSrc = "/videos/new_collection_video2.mp4";
  } else if (isKids) {
    videoSrc = "/videos/new_collection_kids3.mp4"; // Videoclip pentru colecția copii
  } else if (isGirls) {
    videoSrc = "/videos/girls_video.mp4";
  } else if (isBoys) {
    videoSrc = "/videos/boys_video.mp4";
  } else {
    videoSrc = "/videos/new_collection_video_men.mp4";
  }

  // Determinăm titlul și descrierea în funcție de gen
  let title, description;
  if (isWomen) {
    title = "Colecția pentru Femei";
    description = "Descoperă cele mai noi tendințe ale sezonului";
  } else if (isKids) {
    title = "Colecția pentru Copii";
    description = "Confort și stil pentru cei mici";  
  } else if (isGirls) {
    title = "Colecția pentru Fete";
    description = "Descoperă cele mai noi tendințe pentru fete";
  } else if (isBoys) {
    title = "Colecția pentru Băieți";
    description = "Descoperă cele mai noi tendințe pentru băieți";
  } else {
    title = "Colecția pentru Bărbați";
    description = "Descoperă cele mai noi tendințe ale sezonului";
  }

  // Determinăm link-ul colecției în funcție de gen
  let collectionLink;
  if (isWomen) {
    collectionLink = "/women/New Collection";
  } else if (isKids) {
    collectionLink = "/kids"; // Link către pagina principală pentru copii
  } else if (isGirls) {
    collectionLink = "/kids/girls/New Collection";
  } else if (isBoys) {
    collectionLink = "/kids/boys/New Collection";
  } else {
    collectionLink = "/men/New Collection";
  }

  return (
    <div className="bg-white relative w-full overflow-hidden h-screen">
      {isMobile ? (
        <video 
          ref={videoRefs[0]}
          className="absolute inset-0 w-full h-full object-cover"
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
          {title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 px-4 text-center">
          {description}
        </p>
        <Link to={collectionLink}>
          <button className="bg-white text-black px-6 py-3 text-lg font-semibold hover:bg-gray-100 transition-colors">
            DESCOPERĂ COLECȚIA
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ResponsiveVideo;
