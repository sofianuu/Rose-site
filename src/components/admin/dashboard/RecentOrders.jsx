// RecentOrders.jsx
import React from 'react';
import OrderStatusBadge from './OrderStatusBadge';

const RecentOrders = ({ orders }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Comenzi Recente</h3>
      <div className="space-y-4">
        {orders.slice(0, 5).map((order) => (
          <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">{order.customer}</p>
              <p className="text-sm text-gray-500">{order.date}</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900">{order.total} RON</p>
              <OrderStatusBadge status={order.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrders;