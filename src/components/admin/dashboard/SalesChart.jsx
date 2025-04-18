// SalesChart.jsx
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import SalesStatsSummary from './SalesStatsSummary';

const SalesChart = ({ dailySalesData }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Vânzări pe Ultimele 7 Zile</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dailySalesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tick={{ fill: '#4B5563' }}
            />
            <YAxis 
              tick={{ fill: '#4B5563' }}
              tickFormatter={(value) => `${value} RON`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value, name) => {
                if (name === 'sales') return [`${value} RON`, 'Vânzări'];
                if (name === 'orders') return [value, 'Comenzi'];
                return [value, name];
              }}
              labelStyle={{ color: '#4B5563', fontWeight: 'bold' }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="sales" 
              stroke="#2563eb" 
              strokeWidth={2}
              dot={{ 
                fill: '#2563eb',
                strokeWidth: 2,
                r: 4
              }}
              activeDot={{ 
                r: 6,
                fill: '#2563eb',
                stroke: '#fff',
                strokeWidth: 2
              }}
            />
            <Line 
              type="monotone" 
              dataKey="orders" 
              stroke="#10b981" 
              strokeWidth={2}
              dot={{ 
                fill: '#10b981',
                strokeWidth: 2,
                r: 4
              }}
              activeDot={{ 
                r: 6,
                fill: '#10b981',
                stroke: '#fff',
                strokeWidth: 2
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <SalesStatsSummary dailySalesData={dailySalesData} />
    </div>
  );
};

export default SalesChart;