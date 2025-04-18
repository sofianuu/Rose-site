import React from 'react';
import StatusBadge from './StatusBadge';
import ActionButtons from './ActionButtons';

const ProductItem = ({ product, handleEdit, handleDelete, handleViewDescription, isMobile }) => {
  const renderDescription = () => (
    <div className={isMobile ? "mt-1" : ""}>
      {product.description ? (
        <div className="flex items-center gap-2">
          <span className="text-sm">
            {product.description.length > 50 
              ? `${product.description.substring(0, 50)}...` 
              : product.description}
          </span>
          <button
            onClick={() => handleViewDescription(product)}
            className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
            title="Vezi descrierea completă"
          >
            Vezi tot
          </button>
        </div>
      ) : ''}
    </div>
  );
  
  if (isMobile) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-sm font-medium text-gray-600">Nume Produs</p>
            <p className="text-base font-semibold">{product.name}</p>
          </div>
          <StatusBadge status={product.status} />
        </div>

        <div className="mt-3">
          <p className="text-sm font-medium text-gray-600">Descriere</p>
          {renderDescription()}
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div>
            <p className="text-sm font-medium text-gray-600">Preț</p>
            <p className="text-base">{product.price} RON</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Stoc</p>
            <p className="text-base">{product.stock} buc</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Categorie</p>
            <p className="text-base">{product.category}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">ID</p>
            <p className="text-base">{product.id}</p>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t flex justify-end">
          <ActionButtons 
            item={product} 
            handleEdit={handleEdit} 
            handleDelete={handleDelete} 
            objectType="Produsul" 
            size={20}
          />
        </div>
      </div>
    );
  }
  
  return (
    <tr>
      <td className="px-4 py-3 text-sm text-gray-900">{product.id}</td>
      <td className="px-4 py-3 text-sm text-gray-900">{product.name}</td>
      <td className="px-4 py-3 text-sm text-gray-900">
        {renderDescription()}
      </td>
      <td className="px-4 py-3 text-sm text-gray-900">{product.price} RON</td>
      <td className="px-4 py-3 text-sm text-gray-900">{product.stock}</td>
      <td className="px-4 py-3 text-sm text-gray-900">{product.category}</td>
      <td className="px-4 py-3 text-sm text-gray-900">
        <StatusBadge status={product.status} />
      </td>
      <td className="px-4 py-3 text-sm text-gray-900">
        <ActionButtons 
          item={product} 
          handleEdit={handleEdit} 
          handleDelete={handleDelete} 
          objectType="Produsul"
        />
      </td>
    </tr>
  );
};

export default ProductItem;