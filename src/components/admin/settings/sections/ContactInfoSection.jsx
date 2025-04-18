import React from 'react';
import { Phone } from 'lucide-react';

const ContactInfoSection = ({ settings, handleSettingsChange }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-50 rounded-lg">
          <Phone className="w-5 h-5 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">Informații contact</h3>
      </div>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1.5">
            Email contact
          </label>
          <input
            type="email"
            value={settings.email}
            onChange={(e) => handleSettingsChange('email', e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            placeholder="email@exemplu.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1.5">
            Telefon Contact
          </label>
          <input
            type="tel"
            value={settings.phone}
            onChange={(e) => handleSettingsChange('phone', e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            placeholder="+40 123 456 789"
          />
        </div>
      </form>
    </div>
  );
};

export default ContactInfoSection;