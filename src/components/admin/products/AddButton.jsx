import React from 'react';
import { Plus } from 'lucide-react';

const AddButton = ({ activeView, handleAdd }) => {
  return (
    <button 
      onClick={() => handleAdd(activeView === 'products' ? 'produs' : 'categorie')}
      className="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 justify-center"
    >
      <Plus size={18} className="mr-2" />
      Adaugă {activeView === 'products' ? 'produs' : 'categorie'}
    </button>
  );
};

export default AddButton;