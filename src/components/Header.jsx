import { useState, useEffect } from "react";
import { FiUser } from "react-icons/fi";
import { LiaTimesSolid } from "react-icons/lia";
import { AiOutlineMenu } from "react-icons/ai";
import { RiMenu2Line } from "react-icons/ri";
import { CiMenuBurger } from "react-icons/ci";

import { IoMdClose } from "react-icons/io";
import { HiArrowLeft } from "react-icons/hi";

import { Link } from "react-router-dom";
import Nav from "./Nav";
import Logo from "./Logo";

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState("femei");
    const [showSubcategories, setShowSubcategories] = useState(true);
    const [previousCategory, setPreviousCategory] = useState(null);
    
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
            // Reset to default state when closing the menu
            setTimeout(() => {
                setActiveCategory("femei");
                setShowSubcategories(true);
                setPreviousCategory(null);
            }, 300);
        }
    }

    // Handle category change
    const handleCategoryChange = (category, e) => {
        e.preventDefault(); // Prevent the default link behavior
        setPreviousCategory(activeCategory);
        setActiveCategory(category);
    }

    // Handle back button
    const handleBack = () => {
        if (previousCategory) {
            setActiveCategory(previousCategory);
            setPreviousCategory(null);
        } else {
            setShowSubcategories(false);
        }
    }

    // Închide menu-ul la click în afara conținutului
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (isOpen && !e.target.closest('.menu-content') && !e.target.closest('button')) {
                closeMenu();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    // Category data
    const categories = {
        femei: {
            title: "Îmbrăcăminte Femei",
            items: [
                { name: "VIZUALIZAȚI TOT", path: "/women/All" },
                { name: "ROCHII", path: "/women/Rochii" },
                { name: "BLUZE ȘI TOPURI", path: "/women/Topuri & Tricouri" },
                { name: "FUSTE", path: "/women/Fuste" },
                { name: "PANTALONI", path: "/women/Pantaloni" },
                { name: "JEANS", path: "/women/Jeans" },
                { name: "SACOURI", path: "/women/Sacouri" },
                { name: "TRICOURI", path: "/women/Tricouri" },
                { name: "PULOVERE", path: "/women/Pulovere" },
            ]
        },
        barbati: {
            title: "Îmbrăcăminte Bărbați",
            items: [
                { name: "VIZUALIZAȚI TOT", path: "/men/All" },
                { name: "TRICOURI", path: "/men/Tricouri" },
                { name: "PULOVERE", path: "/men/Pulovere" },
                { name: "CĂMĂȘI", path: "/men/Cămăși" },
                { name: "JACHETE", path: "/men/Jachete" },
                { name: "PANTALONI", path: "/men/Pantaloni" },
                { name: "ARTICOLE DE BAZĂ", path: "/men/Articole-baza" },
                { name: "SACOURI", path: "/men/Sacouri" },
                { name: "BLUGI", path: "/men/Blugi" },
            ]
        },
        copii: {
            title: "Îmbrăcăminte Copii",
            items: [
                { name: "VIZUALIZAȚI TOT", path: "/kids/All" },
                { name: "NOU-NĂSCUȚI (0-12 LUNI)", path: "/kids/age/1/All" },
                { name: "BEBELUȘI (1-5 ANI)", path: "/kids/age/2/All" },
                { name: "COPII (5-13 ANI)", path: "/kids/age/3All" },
                { name: "FETE", path: "/kids/girls/All" },
                { name: "BĂIEȚI", path: "/kids/boys/All" },
            ]
        }
    };

    return (
        <>
            <header className="flex items-center justify-between px-4 md:px-10 h-20 fixed top-0 left-0 right-0 z-50 bg-white text-black font-light ">
               
            <div className="flex items-center md:ml-8 sm:ml-0">
                    <button 
                        onClick={toggleMenu} 
                        className="hover:text-black relative font-light z-60"
                        aria-label={isOpen ? "Închide meniul" : "Deschide meniul"}
                    >
                        {isOpen ? 
                            <LiaTimesSolid size={24} className="hover:scale-110 transition-transform" /> : 
                            <CiMenuBurger size={24} className="hover:scale-110 transition-transform" />
                        }
                    </button>
                    <Logo closeMenu={closeMenu}/>
            </div>
            
                <div className="block">
                    <Nav isOpen={isOpen} toggleMenu={toggleMenu} />
                </div>
                
                  <div 
                    className={`fixed inset-0 bg-black bg-opacity-10 transition-opacity duration-300 z-40 ${
                        isOpen ? 'opacity-60' : 'opacity-0 pointer-events-none'
                    }`}
                    onClick={closeMenu}
                 ></div> 
            </header>
         
            <div 
                className={`fixed top-0 left-0 h-full w-full md:w-1/2 bg-white shadow-xl z-50 transition-transform duration-300 ease-in-out menu-content ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                    {previousCategory && (
                        <button 
                            onClick={handleBack}
                            className="flex items-center text-gray-700 hover:text-black" 
                        >
                            <HiArrowLeft size={20} className="mr-1" />
                            <span>Înapoi</span>
                        </button>
                    )}
                    <div className="ml-auto">
                        <button 
                            onClick={closeMenu}
                            className="text-gray-500 hover:text-black" 
                            aria-label="Închide meniul"
                        >
                            <IoMdClose size={24} />
                        </button>
                    </div>
                </div>
                
                <div className="p-5 h-[calc(100%-70px)] overflow-y-auto">
                    {/* Categorii principale */}
                    <div className="flex space-x-6 text-lg font-medium mb-10 overflow-x-auto pb-2">
                        <button 
                            className={`whitespace-nowrap ${activeCategory === 'femei' ? 'font-bold border-b-2 border-black' : ''}`}
                            onClick={(e) => handleCategoryChange('femei', e)}
                        >
                            FEMEI
                        </button>
                        <button 
                            className={`whitespace-nowrap ${activeCategory === 'barbati' ? 'font-bold border-b-2 border-black' : ''}`}
                            onClick={(e) => handleCategoryChange('barbati', e)}
                        >
                            BĂRBAȚI
                        </button>
                        <button 
                            className={`whitespace-nowrap ${activeCategory === 'copii' ? 'font-bold border-b-2 border-black' : ''}`}
                            onClick={(e) => handleCategoryChange('copii', e)}
                        >
                            COPII
                        </button>
                    </div>
                    
                    {activeCategory && categories[activeCategory] && (
                        <>
                            <h2 className="text-2xl mb-6">{categories[activeCategory].title}</h2>
                            
                            {/* Lista de categorii */}
                            <ul className="space-y-4">
                                {categories[activeCategory].items.map((item, index) => (
                                    <li key={index}>
                                        <Link 
                                            to={item.path} 
                                            className="hover:underline transition-colors hover:text-black" 
                                            onClick={closeMenu}
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            </div>
            
            {/* Mobile Menu (pentru compatibilitate) - Acum ascuns */}
            {isOpen && (
                <div className="fixed inset-0 bg-white z-40 pt-20 md:hidden hidden">
                    <div className="flex-1 overflow-y-auto">
                        <Nav isOpen={isOpen} toggleMenu={toggleMenu} />
                    </div>
                </div>
            )}
            
            <div className="h-20"></div>
        </>
    );
}

export default Header;