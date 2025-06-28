import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FolderOpen,
  CheckSquare,
  Calendar,
  FileText,
  UserCircle,
  MessageCircle,
  FileSignature,
  FileStack,
  Building,
  ShoppingCart,
  LifeBuoy,
  CalendarDays,
  Box,
  DollarSign,
  Truck,
  BarChart2,
  Settings,
  ChevronDown,
  Clock
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useTenant } from '../../contexts/TenantContext';

const navItems = [
  {
    path: '/',
    icon: LayoutDashboard,
    label: 'Dashboard',
    gradient: 'from-blue-500 to-indigo-600'
  },
  {
    path: '/leads',
    icon: Users,
    label: 'Leads',
    gradient: 'from-green-500 to-emerald-600'
  },
  {
    path: '/projects',
    icon: FolderOpen,
    label: 'Projects',
    gradient: 'from-purple-500 to-violet-600'
  },
  {
    path: '/tasks',
    icon: CheckSquare,
    label: 'Tasks',
    gradient: 'from-orange-500 to-red-600'
  },
  {
    path: '/calendar',
    icon: Calendar,
    label: 'Calendar',
    gradient: 'from-teal-500 to-cyan-600'
  },
  {
    path: '/schedule',
    icon: Clock,
    label: 'Schedule',
    gradient: 'from-amber-500 to-yellow-600'
  },
  {
    path: '/clients',
    icon: UserCircle,
    label: 'Client Management',
    gradient: 'from-pink-500 to-rose-600'
  },
  {
    path: '/sms',
    icon: MessageCircle,
    label: 'SMS',
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    path: '/contracts',
    icon: FileSignature,
    label: 'Contracts',
    gradient: 'from-indigo-500 to-purple-600'
  },
  {
    path: '/documents',
    icon: FileStack,
    label: 'Documents',
    gradient: 'from-emerald-500 to-teal-600'
  },
  {
    path: '/hr',
    icon: Building,
    label: 'HR',
    gradient: 'from-blue-500 to-cyan-600'
  },
  {
    path: '/shop',
    icon: ShoppingCart,
    label: 'Shop',
    gradient: 'from-green-500 to-lime-600'
  },
  {
    path: '/support',
    icon: LifeBuoy,
    label: 'Support',
    gradient: 'from-cyan-500 to-blue-600'
  },
  {
    path: '/events',
    icon: CalendarDays,
    label: 'Events',
    gradient: 'from-violet-500 to-purple-600'
  },
  {
    path: '/assets',
    icon: Box,
    label: 'Assets',
    gradient: 'from-slate-500 to-gray-600'
  },
  {
    path: '/finance',
    icon: DollarSign,
    label: 'Finance',
    gradient: 'from-yellow-500 to-orange-600'
  },
  {
    path: '/settings',
    icon: Settings,
    label: 'Settings',
    gradient: 'from-gray-500 to-slate-600'
  }
];

const Sidebar = () => {
  const [expanded, setExpanded] = useState(null);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { currentTenant } = useTenant();

  const handleModuleClick = (item: any) => {
    setExpanded(expanded === item.label ? null : item.label);
    navigate(item.path);
  };

  const getSidebarClasses = () => {
    switch (theme) {
      case 'glass':
        return 'bg-white/10 backdrop-blur-md border-white/20 text-white';
      case 'dark':
        return 'bg-gray-900 border-gray-700 text-white';
      default:
        return 'bg-white border-gray-200 text-gray-900';
    }
  };

  const getHeaderClasses = () => {
    switch (theme) {
      case 'glass':
        return 'bg-white/20 border-white/30';
      case 'dark':
        return 'bg-gray-800 border-gray-700';
      default:
        return 'bg-gradient-to-r from-blue-600 to-indigo-600';
    }
  };

  const getFooterClasses = () => {
    switch (theme) {
      case 'glass':
        return 'bg-white/20 border-white/30';
      case 'dark':
        return 'bg-gray-800 border-gray-700';
      default:
        return 'bg-gradient-to-r from-slate-800 to-slate-700';
    }
  };

  // Filter navigation items based on tenant features
  const filteredNavItems = navItems.filter(item => {
    if (!currentTenant?.settings.features.includes('all')) {
      const moduleMap: Record<string, string> = {
        '/leads': 'leads',
        '/projects': 'projects',
        '/tasks': 'tasks',
        '/clients': 'clients',
        '/finance': 'finance'
      };
      const requiredFeature = moduleMap[item.path];
      return !requiredFeature || currentTenant?.settings.features.includes(requiredFeature);
    }
    return true;
  });

  return (
    <div className={`w-72 border-r h-full flex flex-col shadow-2xl ${getSidebarClasses()}`}>
      <div className={`p-6 border-b ${getHeaderClasses()}`}>
        <h1 className={`text-2xl font-bold ${theme === 'glass' || theme === 'dark' ? 'text-white' : 'text-white'}`}>
          {currentTenant?.name || 'BusinessHub'}
        </h1>
        <p className={`text-sm mt-1 ${theme === 'glass' || theme === 'dark' ? 'text-gray-300' : 'text-blue-100'}`}>
          Complete Business Management
        </p>
      </div>
      
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {filteredNavItems.map((item) => (
          item.label === 'Dashboard' ? (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 mb-3 group ${
                  isActive
                    ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg transform scale-105`
                    : theme === 'glass'
                    ? 'text-white/80 hover:bg-white/20 hover:text-white hover:transform hover:scale-105'
                    : theme === 'dark'
                    ? 'text-gray-300 hover:bg-gray-700/50 hover:text-white hover:transform hover:scale-105'
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white hover:transform hover:scale-105'
                }`
              }
            >
              <item.icon size={20} className="group-hover:animate-pulse" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ) : (
            <div key={item.label} className="mb-1">
              <div
                className={`flex items-center justify-between space-x-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer group ${
                  expanded === item.label
                    ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                    : theme === 'glass'
                    ? 'text-white/80 hover:bg-white/20 hover:text-white hover:transform hover:scale-105'
                    : theme === 'dark'
                    ? 'text-gray-300 hover:bg-gray-700/50 hover:text-white hover:transform hover:scale-105'
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white hover:transform hover:scale-105'
                }`}
                onClick={() => handleModuleClick(item)}
              >
                <span className="flex items-center space-x-3">
                  <item.icon size={20} className="group-hover:animate-pulse" />
                  <span className="font-medium">{item.label}</span>
                </span>
              </div>
            </div>
          )
        ))}
      </nav>
      
      <div className={`p-4 border-t ${getFooterClasses()}`}>
        <div className={`flex items-center space-x-3 px-4 py-3 rounded-xl ${
          theme === 'glass' ? 'bg-white/20' : theme === 'dark' ? 'bg-gray-600/50' : 'bg-slate-600/50'
        }`}>
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-sm font-bold">JD</span>
          </div>
          <div>
            <p className={`text-sm font-medium ${theme === 'glass' || theme === 'dark' ? 'text-white' : 'text-white'}`}>
              John Doe
            </p>
            <p className={`text-xs ${theme === 'glass' || theme === 'dark' ? 'text-gray-300' : 'text-slate-300'}`}>
              Administrator
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;