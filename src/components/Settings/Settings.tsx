import React from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Database,
  Key,
  Mail,
  Smartphone,
  Users
} from 'lucide-react';

const Settings = () => {
  const settingsCategories = [
    {
      title: 'Account Settings',
      icon: User,
      items: [
        { name: 'Profile Information', description: 'Update your personal information and avatar' },
        { name: 'Password & Security', description: 'Manage your password and two-factor authentication' },
        { name: 'Email Preferences', description: 'Configure email notifications and preferences' }
      ]
    },
    {
      title: 'Business Settings',
      icon: Shield,
      items: [
        { name: 'Company Information', description: 'Update company details and branding' },
        { name: 'Team Management', description: 'Manage team members and permissions' },
        { name: 'Billing & Subscription', description: 'Manage your subscription and billing information' }
      ]
    },
    {
      title: 'System Settings',
      icon: Database,
      items: [
        { name: 'Data Export', description: 'Export your business data and reports' },
        { name: 'API Keys', description: 'Manage API keys for integrations' },
        { name: 'Backup & Recovery', description: 'Configure automatic backups and recovery options' }
      ]
    }
  ];

  const quickSettings = [
    { icon: Bell, title: 'Notifications', description: 'Email and push notifications', enabled: true },
    { icon: Palette, title: 'Dark Mode', description: 'Switch to dark theme', enabled: false },
    { icon: Globe, title: 'Language', description: 'Change display language', value: 'English' },
    { icon: Smartphone, title: '2FA', description: 'Two-factor authentication', enabled: true }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account and system preferences</p>
        </div>
      </div>

      {/* Quick Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickSettings.map((setting, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <setting.icon className="text-blue-600" size={20} />
                </div>
                {typeof setting.enabled === 'boolean' && (
                  <div className={`w-12 h-6 rounded-full transition-colors ${
                    setting.enabled ? 'bg-blue-600' : 'bg-gray-300'
                  } relative cursor-pointer`}>
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                      setting.enabled ? 'translate-x-6' : 'translate-x-0.5'
                    }`}></div>
                  </div>
                )}
              </div>
              <h4 className="font-medium text-gray-900">{setting.title}</h4>
              <p className="text-sm text-gray-600">{setting.description}</p>
              {setting.value && (
                <p className="text-sm text-blue-600 font-medium mt-1">{setting.value}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Settings Categories */}
      <div className="space-y-6">
        {settingsCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gray-100 rounded-lg">
                <category.icon className="text-gray-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
            </div>
            
            <div className="space-y-4">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <div>
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    Configure
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Integration Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Integrations</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'Slack', description: 'Team communication', icon: '💬', connected: true },
            { name: 'Google Calendar', description: 'Schedule management', icon: '📅', connected: true },
            { name: 'Stripe', description: 'Payment processing', icon: '💳', connected: false },
            { name: 'Zapier', description: 'Workflow automation', icon: '⚡', connected: false },
            { name: 'Dropbox', description: 'File storage', icon: '📁', connected: true },
            { name: 'Mailchimp', description: 'Email marketing', icon: '📧', connected: false }
          ].map((integration, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{integration.icon}</span>
                  <div>
                    <h4 className="font-medium text-gray-900">{integration.name}</h4>
                    <p className="text-sm text-gray-600">{integration.description}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  integration.connected 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {integration.connected ? 'Connected' : 'Not Connected'}
                </div>
              </div>
              <button className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                integration.connected
                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}>
                {integration.connected ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6">
        <h3 className="text-lg font-semibold text-red-900 mb-6">Danger Zone</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
            <div>
              <h4 className="font-medium text-red-900">Export All Data</h4>
              <p className="text-sm text-red-700">Download a complete backup of all your business data</p>
            </div>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
              Export Data
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
            <div>
              <h4 className="font-medium text-red-900">Delete Account</h4>
              <p className="text-sm text-red-700">Permanently delete your account and all associated data</p>
            </div>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;