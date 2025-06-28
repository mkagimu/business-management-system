import React, { useState } from 'react';
import { 
  FileSignature, 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Eye,
  Edit,
  Bell,
  Users,
  DollarSign
} from 'lucide-react';

const Contracts = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'internal' | 'client' | 'vendor'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const mockContracts = [
    {
      id: 'CON-001',
      title: 'Software Development Agreement',
      type: 'client',
      client: 'TechCorp Inc.',
      value: 45000,
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2024-06-15',
      renewalDate: '2024-05-15',
      autoRenewal: true,
      daysToExpiry: 145,
      lastModified: '2024-01-20'
    },
    {
      id: 'CON-002',
      title: 'Office Lease Agreement',
      type: 'vendor',
      client: 'Property Management Co.',
      value: 24000,
      status: 'active',
      startDate: '2023-12-01',
      endDate: '2024-11-30',
      renewalDate: '2024-10-01',
      autoRenewal: false,
      daysToExpiry: 305,
      lastModified: '2024-01-10'
    },
    {
      id: 'CON-003',
      title: 'Employment Contract - Senior Developer',
      type: 'internal',
      client: 'John Doe',
      value: 95000,
      status: 'active',
      startDate: '2023-03-15',
      endDate: '2025-03-15',
      renewalDate: '2025-01-15',
      autoRenewal: true,
      daysToExpiry: 420,
      lastModified: '2024-01-05'
    },
    {
      id: 'CON-004',
      title: 'Cloud Services Agreement',
      type: 'vendor',
      client: 'AWS',
      value: 12000,
      status: 'expiring',
      startDate: '2023-02-01',
      endDate: '2024-02-01',
      renewalDate: '2024-01-01',
      autoRenewal: true,
      daysToExpiry: 12,
      lastModified: '2024-01-18'
    },
    {
      id: 'CON-005',
      title: 'Marketing Services Contract',
      type: 'client',
      client: 'StartupCo',
      value: 18000,
      status: 'draft',
      startDate: '2024-02-01',
      endDate: '2024-08-01',
      renewalDate: '2024-07-01',
      autoRenewal: false,
      daysToExpiry: null,
      lastModified: '2024-01-22'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'expiring': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'terminated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'client': return 'bg-blue-100 text-blue-800';
      case 'vendor': return 'bg-purple-100 text-purple-800';
      case 'internal': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle size={16} className="text-green-600" />;
      case 'draft': return <Edit size={16} className="text-gray-600" />;
      case 'expiring': return <AlertTriangle size={16} className="text-yellow-600" />;
      case 'expired': return <Clock size={16} className="text-red-600" />;
      default: return <Clock size={16} className="text-gray-600" />;
    }
  };

  const filteredContracts = mockContracts.filter(contract => {
    const matchesSearch = contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || contract.type === activeTab;
    const matchesStatus = !statusFilter || contract.status === statusFilter;
    return matchesSearch && matchesTab && matchesStatus;
  });

  const expiringContracts = mockContracts.filter(contract => 
    contract.daysToExpiry !== null && contract.daysToExpiry <= 30
  );

  const totalValue = filteredContracts.reduce((sum, contract) => sum + contract.value, 0);
  const activeContracts = filteredContracts.filter(c => c.status === 'active').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Contract Management
          </h1>
          <p className="text-gray-600 mt-1">Manage contracts, renewals, and compliance</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center space-x-2 shadow-lg">
            <Plus size={20} />
            <span>New Contract</span>
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors flex items-center space-x-2">
            <Download size={20} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{activeContracts}</div>
              <div className="text-blue-100 text-sm">Active Contracts</div>
            </div>
            <FileSignature size={32} className="text-blue-200" />
          </div>
          <div className="mt-4 text-blue-100 text-sm">+3 new this month</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
              <div className="text-green-100 text-sm">Total Contract Value</div>
            </div>
            <DollarSign size={32} className="text-green-200" />
          </div>
          <div className="mt-4 text-green-100 text-sm">Across all contracts</div>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{expiringContracts.length}</div>
              <div className="text-yellow-100 text-sm">Expiring Soon</div>
            </div>
            <AlertTriangle size={32} className="text-yellow-200" />
          </div>
          <div className="mt-4 text-yellow-100 text-sm">Within 30 days</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">
                {mockContracts.filter(c => c.autoRenewal).length}
              </div>
              <div className="text-purple-100 text-sm">Auto-Renewals</div>
            </div>
            <Bell size={32} className="text-purple-200" />
          </div>
          <div className="mt-4 text-purple-100 text-sm">Automated renewals</div>
        </div>
      </div>

      {/* Expiring Contracts Alert */}
      {expiringContracts.length > 0 && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="text-yellow-600" size={24} />
            <h3 className="text-lg font-semibold text-yellow-800">Contracts Expiring Soon</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {expiringContracts.map((contract) => (
              <div key={contract.id} className="bg-white border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{contract.title}</h4>
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                    {contract.daysToExpiry} days
                  </span>
                </div>
                <p className="text-sm text-gray-600">{contract.client}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Expires: {new Date(contract.endDate).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'all', label: 'All Contracts', icon: FileSignature },
              { id: 'internal', label: 'Internal', icon: Users },
              { id: 'client', label: 'Client Contracts', icon: Users },
              { id: 'vendor', label: 'Vendor Contracts', icon: Users }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
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
                placeholder="Search contracts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-full"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="expiring">Expiring</option>
              <option value="expired">Expired</option>
            </select>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
              <Filter size={16} />
              <span>More Filters</span>
            </button>
          </div>

          {/* Contracts Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Contract</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Client/Vendor</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Value</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">End Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Renewal</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredContracts.map((contract) => (
                  <tr key={contract.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{contract.title}</div>
                        <div className="text-sm text-gray-500">{contract.id}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(contract.type)}`}>
                        {contract.type}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-900">{contract.client}</td>
                    <td className="py-4 px-4 font-medium text-gray-900">
                      ${contract.value.toLocaleString()}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 w-fit ${getStatusColor(contract.status)}`}>
                        {getStatusIcon(contract.status)}
                        <span className="ml-1">{contract.status}</span>
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-gray-900">{new Date(contract.endDate).toLocaleDateString()}</div>
                      {contract.daysToExpiry !== null && contract.daysToExpiry <= 30 && (
                        <div className="text-xs text-yellow-600 font-medium">
                          {contract.daysToExpiry} days left
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        {contract.autoRenewal ? (
                          <span className="text-green-600 text-sm flex items-center space-x-1">
                            <CheckCircle size={14} />
                            <span>Auto</span>
                          </span>
                        ) : (
                          <span className="text-gray-500 text-sm">Manual</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye size={16} />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <Edit size={16} />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                          <Download size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredContracts.length === 0 && (
            <div className="text-center py-12">
              <FileSignature size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No contracts found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contracts;