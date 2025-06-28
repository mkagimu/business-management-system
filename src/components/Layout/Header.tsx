import React, { useState } from 'react';
import { Bell, Search, Mail, Settings, User, LogOut } from 'lucide-react';
import { useTenant } from '../../contexts/TenantContext';

const Header = () => {
  const { currentTenant, tenants, switchTenant } = useTenant();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showTenantMenu, setShowTenantMenu] = useState(false);

  return (
    <header className="bg-white border-b border-slate-300 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search anything..."
              className="pl-10 pr-4 py-2 rounded-lg border-2 border-slate-300 bg-white text-slate-900 placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80 transition-all font-medium"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Tenant Selector */}
          <div className="relative">
            <button
              onClick={() => setShowTenantMenu(!showTenantMenu)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg border-2 border-slate-300 bg-white hover:bg-slate-50 hover:border-slate-400 transition-all"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border border-slate-300"></div>
              <span className="text-sm font-bold text-slate-900">{currentTenant?.name}</span>
            </button>
            
            {showTenantMenu && (
              <div className="absolute right-0 mt-2 w-64 rounded-lg shadow-lg border-2 border-slate-300 bg-white z-50">
                <div className="p-4">
                  <h3 className="text-sm font-bold mb-3 text-slate-900">
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
                        className={`w-full flex items-center space-x-3 p-2 rounded-lg border transition-colors ${
                          currentTenant?.id === tenant.id
                            ? 'bg-blue-50 border-blue-300'
                            : 'hover:bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div 
                          className="w-4 h-4 rounded-full border border-slate-300"
                          style={{ backgroundColor: tenant.primaryColor }}
                        ></div>
                        <div className="text-left">
                          <div className="text-sm font-bold text-slate-900">
                            {tenant.name}
                          </div>
                          <div className="text-xs text-slate-600">
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
          <button className="relative p-2 rounded-lg border-2 border-slate-300 bg-white hover:bg-slate-50 hover:border-slate-400 text-slate-600 transition-all">
            <Mail size={20} />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold border border-white">3</span>
          </button>
          
          <button className="relative p-2 rounded-lg border-2 border-slate-300 bg-white hover:bg-slate-50 hover:border-slate-400 text-slate-600 transition-all">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center font-bold border border-white">5</span>
          </button>

          <div className="w-px h-6 bg-slate-300"></div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg border-2 border-slate-300 bg-white hover:bg-slate-50 hover:border-slate-400 transition-all"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center border border-slate-300">
                <span className="text-white text-sm font-bold">JD</span>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">
                  John Doe
                </p>
                <p className="text-xs text-slate-600">
                  Administrator
                </p>
              </div>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg border-2 border-slate-300 bg-white z-50">
                <div className="p-2">
                  <button className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg border border-transparent hover:bg-slate-50 hover:border-slate-200 text-slate-700 transition-colors">
                    <User size={16} />
                    <span className="font-medium">Profile</span>
                  </button>
                  <button className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg border border-transparent hover:bg-slate-50 hover:border-slate-200 text-slate-700 transition-colors">
                    <Settings size={16} />
                    <span className="font-medium">Settings</span>
                  </button>
                  <hr className="my-2 border-slate-200" />
                  <button className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg border border-transparent hover:bg-red-50 hover:border-red-200 text-red-600 transition-colors">
                    <LogOut size={16} />
                    <span className="font-medium">Sign Out</span>
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