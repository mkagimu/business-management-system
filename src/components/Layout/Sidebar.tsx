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
  Mail,
  ChevronDown
} from 'lucide-react';

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
    gradient: 'from-green-500 to-emerald-600',
    submodules: [
      { path: '/lead-capture', label: 'Lead Capture' },
      { path: '/quotes-proposals', label: 'Quotes & Proposals' },
      { path: '/automated-follow-ups', label: 'Automated Follow-Ups' },
      { path: '/lead-conversion', label: 'Lead Conversion' }
    ]
  },
  {
    path: '/projects',
    icon: FolderOpen,
    label: 'Projects',
    gradient: 'from-purple-500 to-violet-600',
    submodules: [
      { path: '/project-types', label: 'Project Types' },
      { path: '/stage-gates', label: 'Stage Gates' },
      { path: '/timeline-budget', label: 'Timeline & Budget Tracking' },
      { path: '/website-project-flow', label: 'Website Project Flow' },
      { path: '/scoping-wizard', label: 'Scoping Wizard' },
      { path: '/wordpress-setup', label: 'WordPress Setup' },
      { path: '/page-level-tasks', label: 'Page-Level Tasks' },
      { path: '/three-round-review', label: 'Three-Round Review' },
      { path: '/domain-hosting-handoff', label: 'Domain & Hosting Hand-Off' }
    ]
  },
  {
    path: '/tasks',
    icon: CheckSquare,
    label: 'Tasks',
    gradient: 'from-orange-500 to-red-600',
    submodules: [
      { path: '/kanban-board', label: 'Kanban Board' },
      { path: '/task-dependencies', label: 'Task Dependencies' },
      { path: '/recurring-tasks', label: 'Recurring Tasks' },
      { path: '/time-tracking', label: 'Time Tracking' },
      { path: '/smart-reminders', label: 'Smart Reminders' }
    ]
  },
  {
    path: '/calendar',
    icon: Calendar,
    label: 'Calendar',
    gradient: 'from-teal-500 to-cyan-600',
    submodules: [
      { path: '/two-way-sync', label: 'Two-Way Sync' },
      { path: '/drag-drop-reschedule', label: 'Drag-and-Drop Reschedule' },
      { path: '/ai-time-slot', label: 'AI Time-Slot Suggestions' }
    ]
  },
  {
    path: '/notes',
    icon: FileText,
    label: 'Notes',
    gradient: 'from-amber-500 to-yellow-600',
    submodules: [
      { path: '/meeting-notes-parser', label: 'Meeting Notes Parser' },
      { path: '/action-extraction', label: 'Action Extraction' },
      { path: '/agenda-carry-over', label: 'Agenda Carry-Over' },
      { path: '/knowledge-search', label: 'Knowledge Search' }
    ]
  },
  {
    path: '/clients',
    icon: UserCircle,
    label: 'Clients',
    gradient: 'from-pink-500 to-rose-600',
    submodules: [
      { path: '/project-dashboard', label: 'Project Dashboard' },
      { path: '/inline-change-requests', label: 'Inline Change Requests' },
      { path: '/invoices-payments', label: 'Invoices & Payments' },
      { path: '/file-uploads', label: 'File Uploads' },
      { path: '/meeting-booking', label: 'Meeting Booking' },
      { path: '/email-domain-management', label: 'Email & Domain Management' }
    ]
  },
  {
    path: '/sms',
    icon: MessageCircle,
    label: 'SMS',
    gradient: 'from-purple-500 to-pink-600',
    submodules: [
      { path: '/contact-groups', label: 'Contact Groups' },
      { path: '/template-library', label: 'Template Library' },
      { path: '/campaign-scheduler', label: 'Campaign Scheduler' },
      { path: '/delivery-reply-logs', label: 'Delivery & Reply Logs' },
      { path: '/opt-out-compliance', label: 'Opt-Out Compliance' }
    ]
  },
  {
    path: '/contracts',
    icon: FileSignature,
    label: 'Contracts',
    gradient: 'from-indigo-500 to-purple-600',
    submodules: [
      { path: '/internal-contracts', label: 'Internal Contracts' },
      { path: '/client-vendor-contracts', label: 'Client/Vendor Contracts' },
      { path: '/renewal-reminders', label: 'Renewal Reminders' },
      { path: '/linked-billing-tasks', label: 'Linked Billing Tasks' }
    ]
  },
  {
    path: '/documents',
    icon: FileStack,
    label: 'Documents',
    gradient: 'from-emerald-500 to-teal-600',
    submodules: [
      { path: '/central-repository', label: 'Central Repository' },
      { path: '/tagging-folders', label: 'Tagging & Folders' },
      { path: '/version-control', label: 'Version Control' },
      { path: '/expiry-tracking', label: 'Expiry Tracking' }
    ]
  },
  {
    path: '/hr',
    icon: Building,
    label: 'HR',
    gradient: 'from-blue-500 to-cyan-600',
    submodules: [
      { path: '/employee-records', label: 'Employee Records' },
      { path: '/departments-designations', label: 'Departments & Designations' },
      { path: '/attendance-shifts', label: 'Attendance & Shifts' },
      { path: '/leave-management', label: 'Leave Management' },
      { path: '/appreciations', label: 'Appreciations' },
      { path: '/payroll', label: 'Payroll' }
    ]
  },
  {
    path: '/shop',
    icon: ShoppingCart,
    label: 'Shop',
    gradient: 'from-green-500 to-lime-600',
    submodules: [
      { path: '/product-catalog', label: 'Product Catalog' },
      { path: '/cart', label: 'Cart' },
      { path: '/checkout', label: 'Checkout' },
      { path: '/orders', label: 'Orders' },
      { path: '/purchase-history', label: 'Purchase History' }
    ]
  },
  {
    path: '/support',
    icon: LifeBuoy,
    label: 'Support',
    gradient: 'from-cyan-500 to-blue-600',
    submodules: [
      { path: '/categories', label: 'Categories' },
      { path: '/sla-timers', label: 'SLA Timers' },
      { path: '/status-workflow', label: 'Status Workflow' },
      { path: '/escalations', label: 'Escalations' },
      { path: '/attachments', label: 'Attachments' }
    ]
  },
  {
    path: '/events',
    icon: CalendarDays,
    label: 'Events',
    gradient: 'from-violet-500 to-purple-600',
    submodules: [
      { path: '/events-calendar', label: 'Events Calendar' },
      { path: '/rsvp', label: 'RSVP' },
      { path: '/chat-threads', label: 'Chat Threads' },
      { path: '/message-to-task', label: 'Message-to-Task' }
    ]
  },
  {
    path: '/assets',
    icon: Box,
    label: 'Assets',
    gradient: 'from-slate-500 to-gray-600',
    submodules: [
      { path: '/asset-registry', label: 'Asset Registry' },
      { path: '/assignment-to-staff', label: 'Assignment to Staff' },
      { path: '/warranty-maintenance', label: 'Warranty/Maintenance Tracking' },
      { path: '/status-updates', label: 'Status Updates' }
    ]
  },
  {
    path: '/finance',
    icon: DollarSign,
    label: 'Finance',
    gradient: 'from-yellow-500 to-orange-600',
    submodules: [
      { path: '/invoices', label: 'Invoices' },
      { path: '/payments', label: 'Payments' },
      { path: '/credit-notes', label: 'Credit Notes' },
      { path: '/expenses', label: 'Expenses' },
      { path: '/bank-accounts', label: 'Bank Accounts' },
      { path: '/income-vs-expense', label: 'Income vs Expense Charts' }
    ]
  },
  {
    path: '/purchases',
    icon: Truck,
    label: 'Purchases',
    gradient: 'from-indigo-500 to-blue-600',
    submodules: [
      { path: '/vendor-directory', label: 'Vendor Directory' },
      { path: '/product-list', label: 'Product List' },
      { path: '/purchase-orders', label: 'Purchase Orders' },
      { path: '/vendor-bills', label: 'Vendor Bills' },
      { path: '/vendor-payments', label: 'Vendor Payments' },
      { path: '/vendor-credits', label: 'Vendor Credits' },
      { path: '/inventory-updates', label: 'Inventory Updates' }
    ]
  },
  {
    path: '/reports',
    icon: BarChart2,
    label: 'Reports',
    gradient: 'from-red-500 to-pink-600',
    submodules: [
      { path: '/task-reports', label: 'Task Reports' },
      { path: '/time-log-reports', label: 'Time-Log Reports' },
      { path: '/finance-dashboards', label: 'Finance Dashboards' },
      { path: '/sales-lead-funnels', label: 'Sales & Lead Funnels' },
      { path: '/leave-reports', label: 'Leave Reports' },
      { path: '/purchase-renewal-reports', label: 'Purchase & Renewal Reports' }
    ]
  },
  {
    path: '/settings',
    icon: Settings,
    label: 'Settings',
    gradient: 'from-gray-500 to-slate-600',
    submodules: [
      { path: '/roles-permissions', label: 'Roles & Permissions' },
      { path: '/template-editors', label: 'Template Editors' },
      { path: '/integration-keys', label: 'Integration Keys' },
      { path: '/system-preferences', label: 'System Preferences' },
      { path: '/audit-logs', label: 'Audit Logs' }
    ]
  }
];

const Sidebar = () => {
  const [expanded, setExpanded] = useState(null);
  const navigate = useNavigate();

  const handleModuleClick = (item: any) => {
    setExpanded(expanded === item.label ? null : item.label);
    navigate(item.path);
  };

  return (
    <div className="w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700 h-full flex flex-col shadow-2xl">
      <div className="p-6 border-b border-slate-700 bg-gradient-to-r from-blue-600 to-indigo-600">
        <h1 className="text-2xl font-bold text-white">BusinessHub</h1>
        <p className="text-sm text-blue-100 mt-1">Complete Business Management</p>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          item.label === 'Dashboard' ? (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 mb-3 group ${
                  isActive
                    ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg transform scale-105`
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
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white hover:transform hover:scale-105'
                }`}
                onClick={() => handleModuleClick(item)}
              >
                <span className="flex items-center space-x-3">
                  <item.icon size={20} className="group-hover:animate-pulse" />
                  <span className="font-medium">{item.label}</span>
                </span>
                {item.submodules && (
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-200 ${expanded === item.label ? 'rotate-180' : ''}`}
                  />
                )}
              </div>
              {expanded === item.label && item.submodules && (
                <div className="ml-8 mt-2 space-y-1 animate-fadeIn">
                  {item.submodules.map((sub) => (
                    <NavLink
                      key={sub.path}
                      to={sub.path}
                      className={({ isActive }) =>
                        `block px-3 py-2 rounded-lg transition-all duration-200 text-sm group ${
                          isActive
                            ? 'bg-slate-600 text-white shadow-md'
                            : 'text-slate-400 hover:bg-slate-700/30 hover:text-slate-200'
                        }`
                      }
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">
                        {sub.label}
                      </span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          )
        ))}
      </nav>
      <div className="p-4 border-t border-slate-700 bg-gradient-to-r from-slate-800 to-slate-700">
        <div className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-slate-600/50">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-sm font-bold">JD</span>
          </div>
          <div>
            <p className="text-sm font-medium text-white">John Doe</p>
            <p className="text-xs text-slate-300">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;