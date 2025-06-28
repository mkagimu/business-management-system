import React, { useState } from 'react';
import { Bell, Search, Mail, Sun, Moon, Palette, Settings, User, LogOut } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useTenant } from '../../contexts/TenantContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { currentTenant, tenants, switchTenant } = useTenant();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showTenantMenu, setShowTenantMenu] = useState(false);

  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return <Sun size={20} className="text-yellow-600" />;
      case 'dark': return <Moon size={20} className="text-blue-600" />;
      case 'glass': return <Palette size={20} className="text-purple-600" />;
      default: return <Sun size={20} />;
    }
  };

  const getThemeClasses = () => {
    switch (theme) {
      case 'glass':
        return 'bg-white/10 backdrop-blur-md border-white/20 text-white';
      case 'dark':
        return 'bg-gray-800 border-gray-700 text-white';
      default:
        return 'bg-white border-gray-200 text-gray-900';
    }
  };

  return (
    <header className={`border-b px-6 py-4 shadow-sm ${getThemeClasses()}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search anything..."
              className={`pl-10 pr-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80 transition-all ${
                theme === 'glass' 
                  ? 'bg-white/20 border-white/30 text-white placeholder-white/70 backdrop-blur-sm' 
                  : theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-gray-50 border-gray-300 text-gray-900 hover:bg-white'
              }`}
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Tenant Selector */}
          <div className="relative">
            <button
              onClick={() => setShowTenantMenu(!showTenantMenu)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all ${
                theme === 'glass'
                  ? 'hover:bg-white/20 text-white'
                  : theme === 'dark'
                  ? 'hover:bg-gray-700 text-white'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <span className="text-sm font-medium">{currentTenant?.name}</span>
            </button>
            
            {showTenantMenu && (
              <div className={`absolute right-0 mt-2 w-64 rounded-xl shadow-lg z-50 ${
                theme === 'glass'
                  ? 'bg-white/20 backdrop-blur-md border-white/30'
                  : theme === 'dark'
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-200'
              } border`}>
                <div className="p-4">
                  <h3 className={`text-sm font-medium mb-3 ${theme === 'dark' || theme === 'glass' ? 'text-white' : 'text-gray-900'}`}>
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
                            ? theme === 'glass'
                              ? 'bg-white/30'
                              : theme === 'dark'
                              ? 'bg-gray-700'
                              : 'bg-blue-50'
                            : theme === 'glass'
                            ? 'hover:bg-white/20'
                            : theme === 'dark'
                            ? 'hover:bg-gray-700'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: tenant.primaryColor }}
                        ></div>
                        <div className="text-left">
                          <div className={`text-sm font-medium ${theme === 'dark' || theme === 'glass' ? 'text-white' : 'text-gray-900'}`}>
                            {tenant.name}
                          </div>
                          <div className={`text-xs ${theme === 'dark' || theme === 'glass' ? 'text-gray-300' : 'text-gray-500'}`}>
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
          <button className={`relative p-2 rounded-xl transition-all duration-200 group ${
            theme === 'glass'
              ? 'hover:bg-white/20 text-white'
              : theme === 'dark'
              ? 'hover:bg-gray-700 text-white'
              : 'hover:bg-blue-50 text-gray-600 hover:text-blue-600'
          }`}>
            <Mail size={20} className="group-hover:animate-pulse" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center shadow-lg animate-bounce">3</span>
          </button>
          
          <button className={`relative p-2 rounded-xl transition-all duration-200 group ${
            theme === 'glass'
              ? 'hover:bg-white/20 text-white'
              : theme === 'dark'
              ? 'hover:bg-gray-700 text-white'
              : 'hover:bg-blue-50 text-gray-600 hover:text-blue-600'
          }`}>
            <Bell size={20} className="group-hover:animate-pulse" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs rounded-full flex items-center justify-center shadow-lg animate-bounce">5</span>
          </button>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-xl transition-all duration-200 group ${
              theme === 'glass'
                ? 'hover:bg-white/20'
                : theme === 'dark'
                ? 'hover:bg-gray-700'
                : 'hover:bg-yellow-50'
            }`}
          >
            {getThemeIcon()}
          </button>

          <div className={`w-px h-6 ${theme === 'glass' ? 'bg-white/30' : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'}`}></div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className={`flex items-center space-x-3 px-3 py-2 rounded-xl transition-all duration-200 ${
                theme === 'glass'
                  ? 'bg-white/20 border-white/30 hover:bg-white/30'
                  : theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                  : 'bg-gradient-to-r from-gray-50 to-white border-gray-200 hover:shadow-md'
              } border`}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white text-sm font-bold">JD</span>
              </div>
              <div>
                <p className={`text-sm font-medium ${theme === 'dark' || theme === 'glass' ? 'text-white' : 'text-gray-900'}`}>
                  John Doe
                </p>
                <p className={`text-xs ${theme === 'dark' || theme === 'glass' ? 'text-gray-300' : 'text-gray-500'}`}>
                  Administrator
                </p>
              </div>
            </button>

            {showUserMenu && (
              <div className={`absolute right-0 mt-2 w-48 rounded-xl shadow-lg z-50 ${
                theme === 'glass'
                  ? 'bg-white/20 backdrop-blur-md border-white/30'
                  : theme === 'dark'
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-200'
              } border`}>
                <div className="p-2">
                  <button className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    theme === 'glass'
                      ? 'hover:bg-white/20 text-white'
                      : theme === 'dark'
                      ? 'hover:bg-gray-700 text-white'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}>
                    <User size={16} />
                    <span>Profile</span>
                  </button>
                  <button className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    theme === 'glass'
                      ? 'hover:bg-white/20 text-white'
                      : theme === 'dark'
                      ? 'hover:bg-gray-700 text-white'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}>
                    <Settings size={16} />
                    <span>Settings</span>
                  </button>
                  <hr className={`my-2 ${theme === 'glass' ? 'border-white/20' : theme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`} />
                  <button className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    theme === 'glass'
                      ? 'hover:bg-red-500/20 text-red-300'
                      : theme === 'dark'
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