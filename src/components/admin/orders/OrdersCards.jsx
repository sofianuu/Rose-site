import React from 'react';
import OrderStatusBadge from './OrderStatusBadge';

const OrdersCards = ({ orders }) => {
  return (
    <div className="space-y-4">
      {orders.map(order => (
        <div key={order.id} className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-sm font-medium text-gray-600">ID Comandă</p>
              <p className="text-base font-semibold">{order.id}</p>
            </div>
            <OrderStatusBadge status={order.status} />
          </div>
          
          <div className="space-y-2">
            <div>
              <p className="text-sm font-medium text-gray-600">Client</p>
              <p className="text-base">{order.customer}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-base">{order.total} RON</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Data</p>
              <p className="text-base">{order.date}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersCards;