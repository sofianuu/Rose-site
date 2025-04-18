// SalesStatsSummary.jsx
import React from 'react';

const SalesStatsSummary = ({ dailySalesData }) => {
  return (
    <div className="mt-4 grid grid-cols-3 gap-4">
      <div className="bg-gray-50 p-3 rounded-lg">
        <p className="text-sm text-gray-500">Vânzări azi</p>
        <p className="text-lg font-semibold text-gray-900">
          {dailySalesData[0]?.sales.toFixed(2)} RON
        </p>
        <p className={`text-sm ${
          dailySalesData[0]?.trend > 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          {dailySalesData[0]?.trend > 0 ? '↑' : '↓'} {Math.abs(dailySalesData[0]?.trend).toFixed(2)} RON față de ieri
        </p>
      </div>
      <div className="bg-gray-50 p-3 rounded-lg">
        <p className="text-sm text-gray-500">Comenzi azi</p>
        <p className="text-lg font-semibold text-gray-900">
          {dailySalesData[0]?.orders} comenzi
        </p>
        <p className="text-sm text-gray-500">
          {dailySalesData[0]?.sales / dailySalesData[0]?.orders} RON/comandă
        </p>
      </div>
      <div className="bg-gray-50 p-3 rounded-lg">
        <p className="text-sm text-gray-500">Vânzări medii</p>
        <p className="text-lg font-semibold text-gray-900">
          {(dailySalesData.reduce((sum, day) => sum + day.sales, 0) / dailySalesData.length).toFixed(2)} RON
        </p>
        <p className="text-sm text-gray-500">pe zi în ultima săptămână</p>
      </div>
    </div>
  );
};

export default SalesStatsSummary;