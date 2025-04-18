import React from 'react';

const OrderStatusBadge = ({ status }) => {
  const getStatusClasses = () => {
    switch (status) {
      case 'Livrat':
        return 'bg-green-100 text-green-800';
      case 'În procesare':
        return 'bg-yellow-100 text-yellow-800';
      case 'În livrare':
        return 'bg-blue-100 text-blue-800';
      case 'Anulat':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs ${getStatusClasses()}`}>
      {status}
    </span>
  );
};

export default OrderStatusBadge;