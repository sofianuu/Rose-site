import { useState } from "react";
import { FiUser } from "react-icons/fi";
import { LiaTimesSolid } from "react-icons/lia";
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import Logo from "./Logo";

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleMenu = () => {
        setIsOpen(prev => !prev);
        
        // Adăugăm sau eliminăm clasa pentru a preveni scrollul pe body când meniul este deschis
        if (!isOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }
    
    const closeMenu = () => {
        if (isOpen) {
            setIsOpen(false);
            document.body.classList.remove('overflow-hidden');
        }
    }

    return (
        <>
            <header className="flex items-center justify-between px-4 md:px-10 h-20 fixed top-0 left-0 right-0 z-50 bg-white text-gray-600 ">
                <Logo closeMenu={closeMenu}/>
                
                {/* Nav-ul este afișat direct pentru desktop, pentru mobil este parte din overlay */}
                <div className="hidden md:block">
                    <Nav isOpen={isOpen} toggleMenu={toggleMenu} />
                </div>
                
                <div className="flex items-center gap-4 md:hidden">
                    <Link 
                        className="hover:text-black max-w-36 text-center block w-auto"
                        to="/login" 
                        onClick={closeMenu}
                    >
                        <FiUser size={20} className="hover:scale-110 transition-transform" />
                    </Link>
                    <button 
                        onClick={toggleMenu} 
                        className="hover:text-black z-50 relative"
                        aria-label={isOpen ? "Închide meniul" : "Deschide meniul"}
                    >
                        {isOpen ? 
                            <LiaTimesSolid size={24} className="hover:scale-110 transition-transform" /> : 
                            <AiOutlineMenu size={24} className="hover:scale-110 transition-transform" />
                        }
                    </button>
                </div>
            </header>
            
            {/* Meniul fullscreen pentru mobil */}
            {isOpen && (
                <div className="fixed inset-0 bg-white z-40 pt-20 md:hidden flex flex-col">
                    <div className="flex-1 overflow-y-auto">
                        <Nav isOpen={isOpen} toggleMenu={toggleMenu} />
                    </div>
                </div>
            )}
            
            {/* Adăugăm un div gol pentru a menține spațiul ocupat de header-ul fixed */}
            <div className="h-20"></div>
        </>
    );
}

export default Header;