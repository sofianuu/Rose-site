import React from 'react';
import { useMediaQuery } from '../hooks/UseMediaQuery';
import ProductItem from './ProductItem';

const ProductsList = ({ products, handleEdit, handleDelete, handleViewDescription }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (isMobile) {
    return (
      <div className="space-y-4">
        {products.map(product => (
          <ProductItem 
            key={product.id}
            product={product}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleViewDescription={handleViewDescription}
            isMobile={true}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">ID</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Nume</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Descriere</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Preț</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Stoc</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Categorie</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Acțiuni</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map(product => (
            <ProductItem 
              key={product.id}
              product={product}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleViewDescription={handleViewDescription}
              isMobile={false}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsList;