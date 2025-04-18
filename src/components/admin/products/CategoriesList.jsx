import React from 'react';
import { useMediaQuery } from '../hooks/UseMediaQuery';
import CategoryItem from './CategoryItem';

const CategoriesList = ({ categories, handleEdit, handleDelete }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (isMobile) {
    return (
      <div className="space-y-4">
        {categories.map(category => (
          <CategoryItem 
            key={category.id}
            category={category}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            isMobile={true}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">ID</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Nume</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Nr. Produse</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Acțiuni</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories.map(category => (
              <CategoryItem 
                key={category.id}
                category={category}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                isMobile={false}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoriesList;