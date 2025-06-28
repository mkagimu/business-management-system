import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useTheme } from '../../contexts/ThemeContext';

const Layout = () => {
  const { theme } = useTheme();

  return (
    <div className={`flex h-screen ${theme === 'glass' ? 'bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500' : theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;