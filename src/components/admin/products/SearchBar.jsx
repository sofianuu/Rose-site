import { Search } from 'lucide-react';

const SearchBar = ({ activeView, searchTerm, setSearchTerm }) => {
  return (
    <div className="relative flex-1">
      <input
        type="text"
        placeholder={`Caută ${activeView === 'products' ? 'produse' : 'categorii'}...`}
        className="pl-10 pr-4 py-2 border rounded-lg w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
    </div>
  );
};

export default SearchBar;