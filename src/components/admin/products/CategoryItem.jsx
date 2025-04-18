import React from 'react';
import StatusBadge from './StatusBadge';
import ActionButtons from './ActionButtons';

const CategoryItem = ({ category, handleEdit, handleDelete, isMobile }) => {
  if (isMobile) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-sm font-medium text-gray-600">Nume Categorie</p>
            <p className="text-base font-semibold">{category.name}</p>
          </div>
          <StatusBadge status={category.status} />
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div>
            <p className="text-sm font-medium text-gray-600">ID</p>
            <p className="text-base">{category.id}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Nr. Produse</p>
            <p className="text-base">{category.productCount}</p>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t flex justify-end">
          <ActionButtons 
            item={category} 
            handleEdit={handleEdit} 
            handleDelete={handleDelete} 
            objectType="Categoria"
            size={20}
          />
        </div>
      </div>
    );
  }
  
  return (
    <tr>
      <td className="px-4 py-3 text-sm text-gray-900">{category.id}</td>
      <td className="px-4 py-3 text-sm text-gray-900">{category.name}</td>
      <td className="px-4 py-3 text-sm text-gray-900">{category.productCount}</td>
      <td className="px-4 py-3 text-sm text-gray-900">
        <StatusBadge status={category.status} />
      </td>
      <td className="px-4 py-3 text-sm text-gray-900">
        <ActionButtons 
          item={category} 
          handleEdit={handleEdit} 
          handleDelete={handleDelete} 
          objectType="Categoria"
        />
      </td>
    </tr>
  );
};

export default CategoryItem;