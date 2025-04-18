import React from 'react';
import { Package } from 'lucide-react';

const StoreInfoSection = ({ settings, handleSettingsChange }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Package className="w-5 h-5 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">Informații magazin</h3>
      </div>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1.5">
            Nume magazin
          </label>
          <input
            type="text"
            value={settings.storeName}
            onChange={(e) => handleSettingsChange('storeName', e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            placeholder="Introduceți numele magazinului"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1.5">
            Adresă
          </label>
          <textarea
            value={settings.address}
            onChange={(e) => handleSettingsChange('address', e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            rows={3}
            placeholder="Introduceți adresa magazinului"
          />
        </div>
      </form>
    </div>
  );
};

export default StoreInfoSection;