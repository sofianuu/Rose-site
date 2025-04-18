// OrderStatusBadge.jsx
import React from 'react';

const OrderStatusBadge = ({ status }) => {
  const getStatusStyles = (status) => {
    switch(status) {
      case 'Livrat':
        return 'bg-green-100 text-green-800';
      case 'În procesare':
        return 'bg-blue-100 text-blue-800';
      case 'În livrare':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusStyles(status)}`}>
      {status}
    </span>
  );
};

export default OrderStatusBadge;