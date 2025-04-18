import React from 'react';
import { Share2 } from 'lucide-react';

const SocialMediaSection = ({ settings, handleSettingsChange }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-50 rounded-lg">
          <Share2 className="w-5 h-5 text-purple-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">Social Media</h3>
      </div>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1.5">
            Facebook
          </label>
          <input
            type="url"
            value={settings.socialMedia?.facebook || ''}
            onChange={(e) => handleSettingsChange('socialMedia.facebook', e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            placeholder="https://facebook.com/rose"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1.5">
            Instagram
          </label>
          <input
            type="url"
            value={settings.socialMedia?.instagram || ''}
            onChange={(e) => handleSettingsChange('socialMedia.instagram', e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            placeholder="https://instagram.com/rose"
          />
        </div>
      </form>
    </div>
  );
};

export default SocialMediaSection;