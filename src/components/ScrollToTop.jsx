import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' }); // poți pune și 'smooth' dacă vrei
  }, [pathname]);

  return null;
};

export default ScrollToTop;
