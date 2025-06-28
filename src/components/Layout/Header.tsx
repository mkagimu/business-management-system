import React from 'react';
import { Bell, Search, Mail, Sun, Moon } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search anything..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80 bg-gray-50 hover:bg-white transition-colors"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 group">
            <Mail size={20} className="group-hover:animate-pulse" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center shadow-lg animate-bounce">3</span>
          </button>
          
          <button className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 group">
            <Bell size={20} className="group-hover:animate-pulse" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs rounded-full flex items-center justify-center shadow-lg animate-bounce">5</span>
          </button>

          <button className="p-2 text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-xl transition-all duration-200 group">
            <Sun size={20} className="group-hover:animate-spin" />
          </button>

          <div className="w-px h-6 bg-gray-300"></div>

          <div className="flex items-center space-x-3 px-3 py-2 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white text-sm font-bold">JD</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">John Doe</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;