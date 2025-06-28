import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter,
  UserPlus,
  CreditCard,
  Bell,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  Settings,
  Star,
  TrendingUp
} from 'lucide-react';
import ClientModal from '../ClientPortal/ClientModal';
import { Client } from '../../types';
import { mockClients } from '../../data/mockData';

const ClientManagement = () => {
  const [activeTab, setActiveTab] = useState<'clients' | 'subscribers' | 'analytics'>('clients');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showClientModal, setShowClientModal] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [clients, setClients] = useState<Client[]>(mockClients);

  const mockSubscribers = [
    {
      id: '1',
      clientId: '1',
      clientName: 'TechCorp Inc.',
      service: 'Web Hosting',
      plan: 'Premium',
      monthlyFee: 99,
      status: 'active',
      nextBilling: '2024-02-15',
      autoRenewal: true,
      startDate: '2023-02-15',
      lastInvoice: '2024-01-15',
      totalPaid: 1188
    },
    {
      id: '2',
      clientId: '2',
      clientName: 'StartupCo',
      service: 'Email Hosting',
      plan: 'Business',
      monthlyFee: 25,
      status: 'active',
      nextBilling: '2024-02-01',
      autoRenewal: true,
      startDate: '2023-08-01',
      lastInvoice: '2024-01-01',
      totalPaid: 150
    },
    {
      id: '3',
      clientId: '3',
      clientName: 'RetailPlus',
      service: 'Domain Registration',
      plan: 'Standard',
      monthlyFee: 15,
      status: 'expiring',
      nextBilling: '2024-01-30',
      autoRenewal: false,
      startDate: '2023-01-30',
      lastInvoice: '2023-01-30',
      totalPaid: 180
    },
    {
      id: '4',
      clientId: '4',
      clientName: 'HealthTech Solutions',
      service: 'Cloud Storage',
      plan: 'Enterprise',
      monthlyFee: 199,
      status: 'overdue',
      nextBilling: '2024-01-10',
      autoRenewal: true,
      startDate: '2023-06-10',
      lastInvoice: '2023-12-10',
      totalPaid: 1393
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'expiring': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddClient = (newClient: Client) => {
    setClients([...clients, newClient]);
    setShowClientModal(false);
  };

  const handleEditClient = (client: Client) => {
    setEditingClient(client);
    setShowClientModal(true);
  };

  const handleUpdateClient = (updatedClient: Client) => {
    setClients(clients.map(client => 
      client.id === updatedClient.id ? updatedClient : client
    ));
    setShowClientModal(false);
    setEditingClient(null);
  };

  const totalRevenue = mockSubscribers.reduce((sum, sub) => sum + sub.totalPaid, 0);
  const monthlyRecurring = mockSubscribers.filter(s => s.status === 'active').reduce((sum, sub) => sum + sub.monthlyFee, 0);
  const expiringSubscriptions = mockSubscribers.filter(s => s.status === 'expiring' || s.status === 'overdue').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            Client Management
          </h1>
          <p className="text-gray-600 mt-1">Manage clients, subscriptions, and relationships</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => {
              setEditingClient(null);
              setShowClientModal(true);
            }}
            className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-4 py-2 rounded-xl hover:from-pink-700 hover:to-rose-700 transition-all flex items-center space-x-2 shadow-lg"
          >
            <Plus size={20} />
            <span>Add Client</span>
          </button>
          <button className="bg-white/20 backdrop-blur-md border border-white/30 text-gray-700 px-4 py-2 rounded-xl hover:bg-white/30 transition-colors flex items-center space-x-2">
            <FileText size={20} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">{filteredClients.length}</div>
              <div className="text-gray-600 text-sm">Total Clients</div>
            </div>
            <Users size={32} className="text-pink-500" />
          </div>
          <div className="mt-4 text-gray-600 text-sm">+3 new this month</div>
        </div>
        
        <div className="bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">P{monthlyRecurring.toLocaleString()}</div>
              <div className="text-gray-600 text-sm">Monthly Recurring</div>
            </div>
            <TrendingUp size={32} className="text-green-500" />
          </div>
          <div className="mt-4 text-gray-600 text-sm">+12% from last month</div>
        </div>
        
        <div className="bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-600">P{totalRevenue.toLocaleString()}</div>
              <div className="text-gray-600 text-sm">Total Revenue</div>
            </div>
            <DollarSign size={32} className="text-blue-500" />
          </div>
          <div className="mt-4 text-gray-600 text-sm">All time</div>
        </div>
        
        <div className="bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-orange-600">{expiringSubscriptions}</div>
              <div className="text-gray-600 text-sm">Need Attention</div>
            </div>
            <Bell size={32} className="text-orange-500" />
          </div>
          <div className="mt-4 text-gray-600 text-sm">Expiring soon</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl overflow-hidden">
        {/* Navigation Tabs */}
        <div className="border-b border-white/20">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'clients', label: 'Client Directory', icon: Users },
              { id: 'subscribers', label: 'Subscriptions', icon: CreditCard },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-pink-500 text-pink-600'
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
                className="pl-10 pr-4 py-2 bg-white/50 border border-white/30 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent w-full backdrop-blur-sm"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-white/50 border border-white/30 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent backdrop-blur-sm"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="expiring">Expiring</option>
              <option value="overdue">Overdue</option>
            </select>
            <button className="flex items-center space-x-2 px-4 py-2 bg-white/50 border border-white/30 rounded-xl hover:bg-white/70 transition-colors backdrop-blur-sm">
              <Filter size={16} />
              <span>Filter</span>
            </button>
          </div>

          {/* Clients Tab */}
          {activeTab === 'clients' && (
            <div className="space-y-4">
              {filteredClients.map((client) => (
                <div key={client.id} className="bg-white/30 backdrop-blur-sm border border-white/30 rounded-xl p-6 hover:bg-white/40 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white font-bold">
                        {client.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                        <p className="text-gray-600">{client.company}</p>
                        <p className="text-sm text-gray-500">{client.designation}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                        {client.status}
                      </span>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className="text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Mail size={14} />
                        <span>{client.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Phone size={14} />
                        <span>{client.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin size={14} />
                        <span>{client.address}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Projects:</span>
                        <span className="font-medium">{client.projects.length}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total Value:</span>
                        <span className="font-medium">P{client.totalValue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Join Date:</span>
                        <span className="font-medium">{new Date(client.joinDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Last Activity:</span>
                        <span className="font-medium">{new Date(client.lastActivity).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Satisfaction:</span>
                        <span className="font-medium text-green-600">Excellent</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-white/20">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">VIP</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Long-term</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors text-sm">
                        View Details
                      </button>
                      <button 
                        onClick={() => handleEditClient(client)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Settings size={16} />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <Mail size={16} />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                        <Phone size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Subscribers Tab */}
          {activeTab === 'subscribers' && (
            <div className="space-y-4">
              {mockSubscribers.map((subscriber) => (
                <div key={subscriber.id} className="bg-white/30 backdrop-blur-sm border border-white/30 rounded-xl p-6 hover:bg-white/40 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{subscriber.clientName}</h3>
                      <p className="text-gray-600">{subscriber.service} - {subscriber.plan}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(subscriber.status)}`}>
                        {subscriber.status}
                      </span>
                      {subscriber.autoRenewal && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Auto-Renewal</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-600">Monthly Fee</div>
                      <div className="text-xl font-bold text-gray-900">P{subscriber.monthlyFee}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Next Billing</div>
                      <div className="font-medium text-gray-900">{new Date(subscriber.nextBilling).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Total Paid</div>
                      <div className="font-medium text-green-600">P{subscriber.totalPaid.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Start Date</div>
                      <div className="font-medium text-gray-900">{new Date(subscriber.startDate).toLocaleDateString()}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-white/20">
                    <div className="text-sm text-gray-600">
                      Last Invoice: {new Date(subscriber.lastInvoice).toLocaleDateString()}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                        Send Invoice
                      </button>
                      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Bell size={16} />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                        <Settings size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Client Analytics & Insights</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white/30 backdrop-blur-sm border border-white/30 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Revenue Trends</h4>
                  <div className="text-center py-12 text-gray-500">
                    <TrendingUp size={64} className="mx-auto mb-4 text-gray-300" />
                    <p>Revenue analytics will be displayed here</p>
                    <p className="text-sm">Track monthly recurring revenue and growth</p>
                  </div>
                </div>
                
                <div className="bg-white/30 backdrop-blur-sm border border-white/30 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Client Satisfaction</h4>
                  <div className="text-center py-12 text-gray-500">
                    <Star size={64} className="mx-auto mb-4 text-gray-300" />
                    <p>Satisfaction metrics and feedback</p>
                    <p className="text-sm">Monitor client happiness and retention</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/30 backdrop-blur-sm border border-white/30 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Subscription Analytics</h4>
                <div className="text-center py-12 text-gray-500">
                  <CreditCard size={64} className="mx-auto mb-4 text-gray-300" />
                  <p>Subscription performance and churn analysis</p>
                  <p className="text-sm">Track subscription lifecycle and renewals</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Client Modal */}
      <ClientModal
        isOpen={showClientModal}
        onClose={() => {
          setShowClientModal(false);
          setEditingClient(null);
        }}
        onSubmit={editingClient ? handleUpdateClient : handleAddClient}
        initialData={editingClient}
      />
    </div>
  );
};

export default ClientManagement;