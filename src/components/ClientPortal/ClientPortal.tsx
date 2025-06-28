import React, { useState } from 'react';
import { 
  User, 
  FolderOpen, 
  FileText, 
  MessageSquare, 
  Bell,
  Download,
  Eye,
  Calendar,
  Users
} from 'lucide-react';
import Clients from './Clients';

const ClientPortal = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'clients'>('dashboard');

  const clientProjects = [
    {
      id: '1',
      name: 'E-commerce Platform',
      status: 'In Development',
      progress: 65,
      lastUpdate: '2024-01-20',
      nextMilestone: 'Beta Release'
    },
    {
      id: '2',
      name: 'Mobile App',
      status: 'Design Phase',
      progress: 35,
      lastUpdate: '2024-01-18',
      nextMilestone: 'Design Approval'
    }
  ];

  const recentInvoices = [
    { id: 'INV-001', amount: 2500, status: 'Paid', date: '2024-01-15' },
    { id: 'INV-002', amount: 1800, status: 'Pending', date: '2024-01-20' },
    { id: 'INV-003', amount: 3200, status: 'Overdue', date: '2024-01-10' }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">2</div>
          <div className="text-sm text-gray-600">Active Projects</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-green-600">P 5,300</div>
          <div className="text-sm text-gray-600">Paid This Month</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-orange-600">3</div>
          <div className="text-sm text-gray-600">Pending Invoices</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-purple-600">85%</div>
          <div className="text-sm text-gray-600">Overall Progress</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Your Projects</h3>
            <FolderOpen size={20} className="text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {clientProjects.map((project) => (
              <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{project.name}</h4>
                  <span className="text-sm text-blue-600 font-medium">{project.status}</span>
                </div>
                
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-medium text-gray-900">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Next: {project.nextMilestone}</span>
                  <span>Updated {new Date(project.lastUpdate).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Communications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Updates</h3>
            <MessageSquare size={20} className="text-gray-400" />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User size={16} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Project Manager</p>
                <p className="text-sm text-gray-600">Design phase completed, moving to development</p>
                <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <FileText size={16} className="text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">New Invoice</p>
                <p className="text-sm text-gray-600">Invoice INV-002 has been generated</p>
                <p className="text-xs text-gray-500 mt-1">1 day ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <Calendar size={16} className="text-yellow-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Meeting Scheduled</p>
                <p className="text-sm text-gray-600">Review meeting on Jan 25, 2024</p>
                <p className="text-xs text-gray-500 mt-1">2 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invoices and Support */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Invoices */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Invoices</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          
          <div className="space-y-3">
            {recentInvoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{invoice.id}</p>
                  <p className="text-sm text-gray-600">{new Date(invoice.date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">P {invoice.amount}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                    {invoice.status}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-1 text-gray-600 hover:text-blue-600 transition-colors">
                    <Eye size={16} />
                  </button>
                  <button className="p-1 text-gray-600 hover:text-green-600 transition-colors">
                    <Download size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support & Requests */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Support & Requests</h3>
          
          <div className="space-y-4">
            <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-left">
              <div className="flex items-center space-x-3">
                <MessageSquare className="text-blue-600" size={20} />
                <div>
                  <p className="font-medium text-gray-900">Request Changes</p>
                  <p className="text-sm text-gray-600">Submit change requests for your projects</p>
                </div>
              </div>
            </button>
            
            <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors text-left">
              <div className="flex items-center space-x-3">
                <Bell className="text-green-600" size={20} />
                <div>
                  <p className="font-medium text-gray-900">Get Support</p>
                  <p className="text-sm text-gray-600">Contact our support team for assistance</p>
                </div>
              </div>
            </button>
            
            <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors text-left">
              <div className="flex items-center space-x-3">
                <Calendar className="text-purple-600" size={20} />
                <div>
                  <p className="font-medium text-gray-900">Schedule Meeting</p>
                  <p className="text-sm text-gray-600">Book a meeting with our team</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Client Portal</h1>
          <p className="text-gray-600 mt-1">Welcome back, TechCorp Inc.</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">2</span>
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-700 font-medium">TC</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Sarah Johnson</p>
              <p className="text-xs text-gray-500">TechCorp Inc.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'dashboard'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FolderOpen className="w-5 h-5 inline-block mr-2" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('clients')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'clients'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Users className="w-5 h-5 inline-block mr-2" />
            Manage Clients
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'dashboard' ? renderDashboard() : <Clients />}
    </div>
  );
};

export default ClientPortal;