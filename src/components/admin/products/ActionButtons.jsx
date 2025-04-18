import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const ActionButtons = ({ item, handleEdit, handleDelete, objectType, size = 18 }) => {
  return (
    <div className="flex space-x-2 sm:space-x-3">
      <button
        onClick={() => handleEdit(item)}
        className="text-blue-600 hover:text-blue-800"
      >
        <Edit size={size} />
      </button>
      <button
        onClick={() => handleDelete(item.id, objectType)}
        className="text-red-600 hover:text-red-800"
      >
        <Trash2 size={size} />
      </button>
    </div>
  );
};

export default ActionButtons;