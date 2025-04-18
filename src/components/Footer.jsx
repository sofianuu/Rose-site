import { useState } from 'react';
import { Facebook, Twitter, Linkedin, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const currentYear = new Date().getFullYear();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    
    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification('Vă rugăm să introduceți o adresă de email validă', 'error');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Email trimis:', email);
      setEmail('');
      setIsSubscribed(true);
      showNotification('V-ați abonat cu succes la newsletter-ul nostru!');
      
      // Reset button state after 5 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting email:', error);
      showNotification('A apărut o eroare. Vă rugăm să încercați din nou.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-white py-20 text-black relative">
      {/* Notification */}
      {notification && (
        <div 
          className={`fixed bottom-4 right-4 z-50 flex items-center px-4 py-3 rounded-md shadow-lg ${
            notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle size={18} className="mr-2" />
          ) : (
            <AlertCircle size={18} className="mr-2" />
          )}
          <p>{notification.message}</p>
        </div>
      )}
      
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1 - About & Logo */}
          <div>
            <h1 className="text-black font-bold text-3xl mb-4">Rose</h1>
          
          </div>
      
          <div>
            <h3 className="text-lg font-bold mb-4">Companie</h3>
            <ul className="space-y-2">
              <li><Link to="/footer/terms" className="text-gray-600 hover:text-black transition">Termeni & Condiții</Link></li>
              <li><Link to="/footer/privacy" className="text-gray-600 hover:text-black transition">Politica de confidențialitate</Link></li>
              <li><Link to="/footer/project" className="text-gray-600 hover:text-black transition">Protecție proiect</Link></li>
              <li><Link to="/footer/faq" className="text-gray-600 hover:text-black transition">Întrebări frecvente</Link></li>
            </ul>
          </div>
          
          {/* Column 3 - About */}
          <div>
            <h3 className="text-lg font-bold mb-4">Magazin</h3>
            <ul className="space-y-2">
              <li><Link to="/women" className="text-gray-600 hover:text-black transition">Femei</Link></li>
              <li><Link to="/men" className="text-gray-600 hover:text-black transition">Barbati</Link></li>
              <li><Link to="/kids" className="text-gray-600 hover:text-black transition">Copii</Link></li>
            </ul>
          </div>
          
          {/* Column 4 - Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">Sign up to our Newsletter</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full px-4 py-3 bg-white border-b border-gray-300 text-black focus:outline-none focus:border-black transition-all duration-300 rounded-t-md"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  disabled={isLoading || isSubscribed}
                />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-focus-within:w-full"></span>
              </div>
              <button 
                type="submit" 
                className={`flex justify-center items-center px-4 py-3 font-medium rounded-md bg-black text-white transition-all duration-300 transform ${
                  isSubscribed 
                    ? 'bg-green-700'
                    : isLoading
                      ? 'bg-gray-700 cursor-not-allowed'
                      : 'hover:bg-gray-800 hover:-translate-y-1'
                }`}
                disabled={isLoading || isSubscribed}
              >
                {isLoading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                    <span>SE PROCESEAZĂ...</span>
                  </>
                ) : isSubscribed ? (
                  'ABONAT ✓'
                ) : (
                  'SUBSCRIBE'
                )}
              </button>
            </form>
            
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition">
                <Twitter size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition">
                <Linkedin size={20} />
              </a>
              <a href="mailto:contact@rose-fashion.com" className="text-gray-600 hover:text-black transition">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Section - Copyright */}
      <div className="border-t border-gray-200 ">
        <div className="container mx-auto px-4 mt-10">
          <p className="text-gray-600 text-sm text-center">Copyright © {currentYear} Rose.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;