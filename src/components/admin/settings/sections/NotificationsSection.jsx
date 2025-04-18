import React from 'react';
import { Bell } from 'lucide-react';
import { Switch } from '@headlessui/react';

const NotificationsSection = ({ settings, handleToggleNotification }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-orange-50 rounded-lg">
          <Bell className="w-5 h-5 text-orange-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">Notificări</h3>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div>
            <p className="font-medium text-gray-800">Email-uri comenzi noi</p>
            <p className="text-sm text-gray-500">Primește notificări când apar comenzi noi</p>
          </div>
          <Switch
            checked={settings.notifications?.newOrders || false}
            onChange={(value) => handleToggleNotification('newOrders', value)}
            className={`${settings.notifications?.newOrders ? 'bg-black' : 'bg-gray-200'} 
              relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
          >
            <span className={`${settings.notifications?.newOrders ? 'translate-x-6' : 'translate-x-1'} 
              inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
        </div>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div>
            <p className="font-medium text-gray-800">Notificări stoc</p>
            <p className="text-sm text-gray-500">Alertă când stocul este scăzut</p>
          </div>
          <Switch
            checked={settings.notifications?.lowStock || false}
            onChange={(value) => handleToggleNotification('lowStock', value)}
            className={`${settings.notifications?.lowStock ? 'bg-black' : 'bg-gray-200'} 
              relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
          >
            <span className={`${settings.notifications?.lowStock ? 'translate-x-6' : 'translate-x-1'} 
              inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default NotificationsSection;