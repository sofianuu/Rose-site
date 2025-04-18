import { useState } from 'react';
import { ArrowUpDown, ChevronDown } from 'lucide-react';

const SortDropdown = ({ setSortOption, sortOption }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSortChange = (option) => {
    setSortOption(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative">
      <button 
        className="flex items-center space-x-2 text-sm hover:font-medium"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <ArrowUpDown size={18} />
        <span>
          {sortOption === 'featured' && 'Recomandate'}
          {sortOption === 'price-asc' && 'Preț (crescător)'}
          {sortOption === 'price-desc' && 'Preț (descrescător)'}
          {sortOption === 'name-asc' && 'Nume (A-Z)'}
          {sortOption === 'name-desc' && 'Nume (Z-A)'}
        </span>
        <ChevronDown 
          size={16} 
          className={`transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      
      <div 
        className={`${isDropdownOpen ? 'block' : 'hidden'} absolute right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-md z-20 w-48 py-1 text-sm`}
      >
        <button 
          onClick={() => handleSortChange('featured')}
          className={`w-full text-left px-4 py-2 hover:bg-black hover:text-white ${sortOption === 'featured' ? 'bg-black text-white' : ''}`}
        >
          Recomandate
        </button>
        <button 
          onClick={() => handleSortChange('price-asc')}
          className={`w-full text-left px-4 py-2 hover:bg-black hover:text-white ${sortOption === 'price-asc' ? 'bg-black text-white' : ''}`}
        >
          Preț (crescător)
        </button>
        <button 
          onClick={() => handleSortChange('price-desc')}
          className={`w-full text-left px-4 py-2 hover:bg-black hover:text-white ${sortOption === 'price-desc' ? 'bg-black text-white' : ''}`}
        >
          Preț (descrescător)
        </button>
        <button 
          onClick={() => handleSortChange('name-asc')}
          className={`w-full text-left px-4 py-2 hover:bg-black hover:text-white ${sortOption === 'name-asc' ? 'bg-black text-white' : ''}`}
        >
          Nume (A-Z)
        </button>
        <button 
          onClick={() => handleSortChange('name-desc')}
          className={`w-full text-left px-4 py-2 hover:bg-black hover:text-white ${sortOption === 'name-desc' ? 'bg-black text-white' : ''}`}
        >
          Nume (Z-A)
        </button>
      </div>
    </div>
  );
};

export default SortDropdown;