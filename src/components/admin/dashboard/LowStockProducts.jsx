// LowStockProducts.jsx
import React from 'react';
import { AlertTriangle } from 'lucide-react';

const LowStockProducts = ({ lowStockProducts }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Produse cu stoc redus</h3>
        <AlertTriangle className="w-5 h-5 text-yellow-500" />
      </div>
      <div className="space-y-4">
        {lowStockProducts.map((product) => (
          <div key={product.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">{product.name}</p>
              <p className="text-sm text-gray-500">Stoc: {product.stock} unități</p>
            </div>
            <span className="px-2 py-1 text-xs font-medium text-yellow-800 bg-yellow-100 rounded-full">
              Atenție
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LowStockProducts;