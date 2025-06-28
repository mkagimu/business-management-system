import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Users, 
  Calendar, 
  BarChart3, 
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Settings,
  Phone,
  Clock,
  CheckCircle,
  XCircle,
  Eye
} from 'lucide-react';

const SMS = () => {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'contacts' | 'templates' | 'analytics'>('campaigns');
  const [searchTerm, setSearchTerm] = useState('');

  const mockCampaigns = [
    {
      id: '1',
      name: 'Welcome Series',
      status: 'active',
      sent: 1250,
      delivered: 1198,
      failed: 52,
      replies: 89,
      optOuts: 12,
      scheduledDate: '2024-01-20',
      createdDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'Product Launch Announcement',
      status: 'completed',
      sent: 2500,
      delivered: 2456,
      failed: 44,
      replies: 156,
      optOuts: 23,
      scheduledDate: '2024-01-18',
      createdDate: '2024-01-10'
    },
    {
      id: '3',
      name: 'Holiday Promotion',
      status: 'scheduled',
      sent: 0,
      delivered: 0,
      failed: 0,
      replies: 0,
      optOuts: 0,
      scheduledDate: '2024-01-25',
      createdDate: '2024-01-22'
    }
  ];

  const mockContacts = [
    { id: '1', name: 'John Doe', phone: '+267 71234567', group: 'VIP Customers', status: 'active', lastContact: '2024-01-20' },
    { id: '2', name: 'Jane Smith', phone: '+267 72345678', group: 'New Leads', status: 'active', lastContact: '2024-01-19' },
    { id: '3', name: 'Mike Johnson', phone: '+267 73456789', group: 'VIP Customers', status: 'opted-out', lastContact: '2024-01-15' },
    { id: '4', name: 'Sarah Wilson', phone: '+267 74567890', group: 'Prospects', status: 'active', lastContact: '2024-01-18' }
  ];

  const mockTemplates = [
    { id: '1', name: 'Welcome Message', category: 'Onboarding', usage: 45, lastUsed: '2024-01-20' },
    { id: '2', name: 'Appointment Reminder', category: 'Reminders', usage: 128, lastUsed: '2024-01-19' },
    { id: '3', name: 'Payment Due Notice', category: 'Billing', usage: 67, lastUsed: '2024-01-18' },
    { id: '4', name: 'Thank You Message', category: 'Customer Service', usage: 89, lastUsed: '2024-01-17' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'opted-out': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle size={16} className="text-green-600" />;
      case 'completed': return <CheckCircle size={16} className="text-blue-600" />;
      case 'scheduled': return <Clock size={16} className="text-yellow-600" />;
      case 'opted-out': return <XCircle size={16} className="text-red-600" />;
      default: return <Clock size={16} className="text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            SMS Marketing
          </h1>
          <p className="text-gray-600 mt-1">Manage SMS campaigns, contacts, and messaging</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all flex items-center space-x-2 shadow-lg">
            <Plus size={20} />
            <span>New Campaign</span>
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors flex items-center space-x-2">
            <Settings size={20} />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">12,450</div>
              <div className="text-purple-100 text-sm">Total Messages Sent</div>
            </div>
            <MessageSquare size={32} className="text-purple-200" />
          </div>
          <div className="mt-4 text-purple-100 text-sm">+15% from last month</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">11,890</div>
              <div className="text-green-100 text-sm">Messages Delivered</div>
            </div>
            <CheckCircle size={32} className="text-green-200" />
          </div>
          <div className="mt-4 text-green-100 text-sm">95.5% delivery rate</div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">1,234</div>
              <div className="text-blue-100 text-sm">Active Contacts</div>
            </div>
            <Users size={32} className="text-blue-200" />
          </div>
          <div className="mt-4 text-blue-100 text-sm">+8% new contacts</div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">8.7%</div>
              <div className="text-orange-100 text-sm">Response Rate</div>
            </div>
            <BarChart3 size={32} className="text-orange-200" />
          </div>
          <div className="mt-4 text-orange-100 text-sm">Above industry avg</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'campaigns', label: 'Campaigns', icon: MessageSquare },
              { id: 'contacts', label: 'Contacts', icon: Users },
              { id: 'templates', label: 'Templates', icon: Calendar },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Search and Filter */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
              <Filter size={16} />
              <span>Filter</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
              <Download size={16} />
              <span>Export</span>
            </button>
          </div>

          {/* Campaigns Tab */}
          {activeTab === 'campaigns' && (
            <div className="space-y-4">
              {mockCampaigns.map((campaign) => (
                <div key={campaign.id} className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(campaign.status)}`}>
                        {getStatusIcon(campaign.status)}
                        <span className="ml-1">{campaign.status}</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Settings size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{campaign.sent.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Sent</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{campaign.delivered.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Delivered</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">{campaign.failed}</div>
                      <div className="text-sm text-gray-600">Failed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{campaign.replies}</div>
                      <div className="text-sm text-gray-600">Replies</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">{campaign.optOuts}</div>
                      <div className="text-sm text-gray-600">Opt-outs</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                    <span>Scheduled: {new Date(campaign.scheduledDate).toLocaleDateString()}</span>
                    <span>Created: {new Date(campaign.createdDate).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Contacts Tab */}
          {activeTab === 'contacts' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Contact Management</h3>
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors">
                    <Upload size={16} />
                    <span>Import</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors">
                    <Plus size={16} />
                    <span>Add Contact</span>
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Phone</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Group</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Last Contact</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockContacts.map((contact) => (
                      <tr key={contact.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4 font-medium text-gray-900">{contact.name}</td>
                        <td className="py-4 px-4 text-gray-600 flex items-center space-x-2">
                          <Phone size={14} />
                          <span>{contact.phone}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                            {contact.group}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 w-fit ${getStatusColor(contact.status)}`}>
                            {getStatusIcon(contact.status)}
                            <span className="ml-1">{contact.status}</span>
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-600">{new Date(contact.lastContact).toLocaleDateString()}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                              <MessageSquare size={14} />
                            </button>
                            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <Settings size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Templates Tab */}
          {activeTab === 'templates' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Message Templates</h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors">
                  <Plus size={16} />
                  <span>New Template</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockTemplates.map((template) => (
                  <div key={template.id} className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">{template.name}</h4>
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                        {template.category}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Usage Count:</span>
                        <span className="font-medium text-gray-900">{template.usage}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Last Used:</span>
                        <span className="font-medium text-gray-900">{new Date(template.lastUsed).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-4">
                      <button className="flex-1 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
                        Use Template
                      </button>
                      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Settings size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">SMS Analytics & Reports</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Delivery Performance</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Delivery Rate</span>
                      <span className="font-bold text-green-600">95.5%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '95.5%' }}></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">Delivered</div>
                        <div className="font-bold text-green-600">11,890</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Failed</div>
                        <div className="font-bold text-red-600">560</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Engagement Metrics</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Response Rate</span>
                      <span className="font-bold text-purple-600">8.7%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '8.7%' }}></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">Replies</div>
                        <div className="font-bold text-blue-600">1,034</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Opt-outs</div>
                        <div className="font-bold text-orange-600">89</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Campaign Performance Trends</h4>
                <div className="text-center py-12 text-gray-500">
                  <BarChart3 size={64} className="mx-auto mb-4 text-gray-300" />
                  <p>Detailed analytics charts will be available here</p>
                  <p className="text-sm">Track delivery rates, engagement, and ROI over time</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SMS;