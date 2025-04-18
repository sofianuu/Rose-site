// src/components/ui/Breadcrumbs.jsx
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ items }) => {
    return (
      <div className="container mx-auto px-4 py-3 text-sm text-gray-500 flex justify-center">
        <nav className="flex items-center">
          {items.map((item, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && <span className="mx-2">/</span>}
              {item.link ? (
                <Link to={item.link} className="hover:text-black">
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-black truncate">
                  {item.label}
                </span>
              )}
            </div>
          ))}
        </nav>
      </div>
    );
  };
  

export default Breadcrumbs;