import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FiUser } from "react-icons/fi";
import { LuHeart } from "react-icons/lu";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineShoppingBag } from "react-icons/hi2";

function Nav({isOpen, toggleMenu}) {
  const navItems = [
    { id: 1, component: <FiUser size={20} />, text: 'Profil', slug: '/Profile' },
    { id: 2, component: <LuHeart size={20} />, text: 'Favorite', slug: '/Favorites' },
    { id: 3, component: <HiOutlineShoppingBag size={20} />, text: 'Cos', slug: '/Cart' },
    { id: 4, component: <IoIosSearch size={20} />, text: 'Cautare', slug: '/Search' }
  ];

  return (
    <nav 
      className={`fixed  px-4 py-8 top-20 left-0 w-full h-[calc(100vh-5rem)] 
        bg-white z-30 flex flex-col items-start md:items-center md:justify-end md:static 
        transition-all duration-300 ease-in-out 
        ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"} 
        md:static md:flex-row md:h-auto md:translate-x-0 md:opacity-100 md:py-0`}
    >
      <ul className="flex flex-col md:flex-row gap-8 md:gap-6 w-full md:w-auto text-gray-700 mt-8 md:mt-0">
        {navItems.map((item) => (
          <li key={item.id}>
            <Link 
              onClick={toggleMenu} 
              to={item.slug} 
              className="flex items-center gap-3 hover:scale-110  hover:text-black transition-colors duration-200 text-lg md:text-base"
            >
              <span className="md:hidden">{item.component}</span> 
              <span className="md:hidden">{item.text}</span>
              <span className="hidden md:inline" aria-hidden="true">{item.component}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

Nav.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired
};

export default Nav;