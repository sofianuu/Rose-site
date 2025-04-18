import React, { useState, useEffect } from 'react';
import { Package, Phone, Share2, Bell, Save } from 'lucide-react';
import { Switch } from '@headlessui/react';
import StoreInfoSection from './sections/StoreInfoSection';
import ContactInfoSection from './sections/ContactInfoSection';
import SocialMediaSection from './sections/SocialMediaSection';
import NotificationsSection from './sections/NotificationsSection';

const SettingsManager = () => {
  const [settings, setSettings] = useState({
    storeName: 'Rose',
    email: 'contact@rose.ro',
    phone: '+40 123 456 789',
    address: 'Strada Trandafirilor nr.30, București',
    socialMedia: {
      facebook: '',
      instagram: ''
    },
    notifications: {
      newOrders: true,
      lowStock: true
    }
  });
  
  const [originalSettings, setOriginalSettings] = useState({});
  const [hasSettingsChanged, setHasSettingsChanged] = useState(false);

  useEffect(() => {
    // Initialize original settings when component mounts
    setOriginalSettings(settings);
  }, []);

  const handleSettingsChange = (field, value) => {
    const newSettings = { ...settings };
    
    // Handle nested fields (for socialMedia and notifications)
    if (field.includes('.')) {
      const [section, subfield] = field.split('.');
      newSettings[section] = {
        ...newSettings[section],
        [subfield]: value
      };
    } else {
      newSettings[field] = value;
    }
    
    setSettings(newSettings);
    
    // Check if any value is different from original
    const hasChanges = JSON.stringify(originalSettings) !== JSON.stringify(newSettings);
    setHasSettingsChanged(hasChanges);
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    // Here would be the logic to save settings to backend
    setOriginalSettings(settings);
    setHasSettingsChanged(false);
    alert('Setările au fost salvate cu succes!');
  };

  const handleToggleNotification = (field, value) => {
    handleSettingsChange(`notifications.${field}`, value);
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Informații Magazin */}
        <StoreInfoSection 
          settings={settings} 
          handleSettingsChange={handleSettingsChange} 
        />

        {/* Contact */}
        <ContactInfoSection 
          settings={settings} 
          handleSettingsChange={handleSettingsChange} 
        />

        {/* Social Media */}
        <SocialMediaSection 
          settings={settings} 
          handleSettingsChange={handleSettingsChange} 
        />

        {/* Notificări */}
        <NotificationsSection 
          settings={settings} 
          handleToggleNotification={handleToggleNotification} 
        />
      </div>

      {/* Show save button only when changes exist */}
      {hasSettingsChanged && (
        <div className="flex justify-end">
          <button 
            onClick={handleSaveSettings}
            className="px-6 py-2.5 bg-black text-white rounded-xl hover:bg-gray-900 transition-colors flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            <span>Salvează Modificările</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SettingsManager;