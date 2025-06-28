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
    label: 'Dashboard'
  },
  {
    path: '/leads',
    icon: Users,
    label: 'Leads',
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
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Orizon CRM</h1>
        <p className="text-sm text-gray-500 mt-1">Business Management Software</p>
      </div>
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          item.label === 'Dashboard' ? (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 mb-2 border-b border-gray-200 pb-1 ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ) : (
            <div key={item.label} className="mb-2 border-b border-gray-200 pb-1">
              <div
                className={`flex items-center justify-between space-x-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer ${
                  expanded === item.label
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={() => handleModuleClick(item)}
              >
                <span className="flex items-center space-x-3">
                  <item.icon size={20} />
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
                <div className="ml-8 mt-1 space-y-1">
                  {item.submodules.map((sub) => (
                    <NavLink
                      key={sub.path}
                      to={sub.path}
                      className={({ isActive }) =>
                        `block px-2 py-1 rounded transition-all duration-200 text-sm ${
                          isActive
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`
                      }
                    >
                      {sub.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          )
        ))}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 px-4 py-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-700 text-sm font-medium">JD</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">John Doe</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;