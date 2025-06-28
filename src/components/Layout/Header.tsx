import React, { useState } from 'react';
import { Bell, Search, Mail, Sun, Moon, Settings, User, LogOut } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useTenant } from '../../contexts/TenantContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { currentTenant, tenants, switchTenant } = useTenant();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showTenantMenu, setShowTenantMenu] = useState(false);

  const getThemeIcon = () => {
    return theme === 'light' ? <Moon size={20} /> : <Sun size={20} />;
  };

  return (
    <header className={`border-b px-6 py-4 ${
      theme === 'dark' 
        ? 'bg-slate-800 border-slate-700 text-white' 
        : 'bg-white border-slate-200 text-slate-900'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search anything..."
              className={`pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80 transition-all ${
                theme === 'dark'
                  ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                  : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-500'
              }`}
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Tenant Selector */}
          <div className="relative">
            <button
              onClick={() => setShowTenantMenu(!showTenantMenu)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all ${
                theme === 'dark'
                  ? 'hover:bg-slate-700 border-slate-600'
                  : 'hover:bg-slate-100 border-slate-300'
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <span className="text-sm font-semibold">{currentTenant?.name}</span>
            </button>
            
            {showTenantMenu && (
              <div className={`absolute right-0 mt-2 w-64 rounded-lg shadow-lg border z-50 ${
                theme === 'dark'
                  ? 'bg-slate-800 border-slate-700'
                  : 'bg-white border-slate-200'
              }`}>
                <div className="p-4">
                  <h3 className={`text-sm font-semibold mb-3 ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                    Switch Organization
                  </h3>
                  <div className="space-y-2">
                    {tenants.map((tenant) => (
                      <button
                        key={tenant.id}
                        onClick={() => {
                          switchTenant(tenant.id);
                          setShowTenantMenu(false);
                        }}
                        className={`w-full flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                          currentTenant?.id === tenant.id
                            ? theme === 'dark'
                              ? 'bg-slate-700 border border-slate-600'
                              : 'bg-blue-50 border border-blue-200'
                            : theme === 'dark'
                            ? 'hover:bg-slate-700'
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: tenant.primaryColor }}
                        ></div>
                        <div className="text-left">
                          <div className={`text-sm font-semibold ${
                            theme === 'dark' ? 'text-white' : 'text-slate-900'
                          }`}>
                            {tenant.name}
                          </div>
                          <div className={`text-xs ${
                            theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                          }`}>
                            {tenant.domain}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Notifications */}
          <button className={`relative p-2 rounded-lg transition-all ${
            theme === 'dark'
              ? 'hover:bg-slate-700 text-slate-300'
              : 'hover:bg-slate-100 text-slate-600'
          }`}>
            <Mail size={20} />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">3</span>
          </button>
          
          <button className={`relative p-2 rounded-lg transition-all ${
            theme === 'dark'
              ? 'hover:bg-slate-700 text-slate-300'
              : 'hover:bg-slate-100 text-slate-600'
          }`}>
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center font-bold">5</span>
          </button>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-all ${
              theme === 'dark'
                ? 'hover:bg-slate-700 text-yellow-400'
                : 'hover:bg-slate-100 text-slate-600'
            }`}
          >
            {getThemeIcon()}
          </button>

          <div className={`w-px h-6 ${theme === 'dark' ? 'bg-slate-600' : 'bg-slate-300'}`}></div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg border transition-all ${
                theme === 'dark'
                  ? 'bg-slate-700 border-slate-600 hover:bg-slate-600'
                  : 'bg-white border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">JD</span>
              </div>
              <div>
                <p className={`text-sm font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  John Doe
                </p>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  Administrator
                </p>
              </div>
            </button>

            {showUserMenu && (
              <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg border z-50 ${
                theme === 'dark'
                  ? 'bg-slate-800 border-slate-700'
                  : 'bg-white border-slate-200'
              }`}>
                <div className="p-2">
                  <button className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'hover:bg-slate-700 text-white'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}>
                    <User size={16} />
                    <span>Profile</span>
                  </button>
                  <button className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'hover:bg-slate-700 text-white'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}>
                    <Settings size={16} />
                    <span>Settings</span>
                  </button>
                  <hr className={`my-2 ${theme === 'dark' ? 'border-slate-600' : 'border-slate-200'}`} />
                  <button className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'hover:bg-red-900/20 text-red-400'
                      : 'hover:bg-red-50 text-red-600'
                  }`}>
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;