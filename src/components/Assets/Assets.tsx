import React, { useState } from 'react';
import { 
  Box, 
  Plus, 
  Search, 
  Filter, 
  Monitor,
  Smartphone,
  Laptop,
  Printer,
  Wifi,
  Car,
  Wrench,
  Calendar,
  User,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  FileText
} from 'lucide-react';

const Assets = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'assigned' | 'maintenance' | 'reports'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const mockAssets = [
    {
      id: 'AST-001',
      name: 'MacBook Pro 16"',
      category: 'laptop',
      brand: 'Apple',
      model: 'MacBook Pro',
      serialNumber: 'C02XD0AAJGH5',
      purchaseDate: '2023-06-15',
      purchasePrice: 2500,
      currentValue: 2000,
      status: 'active',
      condition: 'excellent',
      assignedTo: 'John Doe',
      assignedDate: '2023-06-20',
      location: 'Office - Desk 12',
      warrantyExpiry: '2026-06-15',
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-07-10',
      notes: 'Primary development machine'
    },
    {
      id: 'AST-002',
      name: 'Dell Monitor 27"',
      category: 'monitor',
      brand: 'Dell',
      model: 'UltraSharp U2720Q',
      serialNumber: 'CN-0P2415-74180-25A-0001',
      purchaseDate: '2023-08-20',
      purchasePrice: 450,
      currentValue: 350,
      status: 'active',
      condition: 'good',
      assignedTo: 'Jane Smith',
      assignedDate: '2023-08-25',
      location: 'Office - Desk 8',
      warrantyExpiry: '2026-08-20',
      lastMaintenance: null,
      nextMaintenance: '2024-08-20',
      notes: 'Secondary monitor for design work'
    },
    {
      id: 'AST-003',
      name: 'iPhone 14 Pro',
      category: 'mobile',
      brand: 'Apple',
      model: 'iPhone 14 Pro',
      serialNumber: 'F2LN8QJKQ1G7',
      purchaseDate: '2023-10-01',
      purchasePrice: 1200,
      currentValue: 900,
      status: 'active',
      condition: 'excellent',
      assignedTo: 'Mike Johnson',
      assignedDate: '2023-10-05',
      location: 'Mobile - Employee',
      warrantyExpiry: '2024-10-01',
      lastMaintenance: null,
      nextMaintenance: null,
      notes: 'Company phone for sales team'
    },
    {
      id: 'AST-004',
      name: 'HP LaserJet Printer',
      category: 'printer',
      brand: 'HP',
      model: 'LaserJet Pro M404n',
      serialNumber: 'VNC9L60234',
      purchaseDate: '2023-03-10',
      purchasePrice: 300,
      currentValue: 200,
      status: 'maintenance',
      condition: 'fair',
      assignedTo: null,
      assignedDate: null,
      location: 'Office - Print Room',
      warrantyExpiry: '2024-03-10',
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-02-15',
      notes: 'Scheduled for toner replacement'
    },
    {
      id: 'AST-005',
      name: 'Company Vehicle - Toyota Corolla',
      category: 'vehicle',
      brand: 'Toyota',
      model: 'Corolla 2023',
      serialNumber: 'JTDEPRAE5NJ123456',
      purchaseDate: '2023-01-15',
      purchasePrice: 25000,
      currentValue: 22000,
      status: 'active',
      condition: 'excellent',
      assignedTo: 'Alice Brown',
      assignedDate: '2023-01-20',
      location: 'Field - Sales Territory',
      warrantyExpiry: '2026-01-15',
      lastMaintenance: '2024-01-05',
      nextMaintenance: '2024-04-05',
      notes: 'Regular service required every 3 months'
    },
    {
      id: 'AST-006',
      name: 'Wireless Router',
      category: 'network',
      brand: 'Cisco',
      model: 'RV340W',
      serialNumber: 'FCW2315G0QZ',
      purchaseDate: '2023-05-01',
      purchasePrice: 180,
      currentValue: 150,
      status: 'retired',
      condition: 'poor',
      assignedTo: null,
      assignedDate: null,
      location: 'Storage - IT Room',
      warrantyExpiry: '2024-05-01',
      lastMaintenance: '2023-12-01',
      nextMaintenance: null,
      notes: 'Replaced with newer model'
    }
  ];

  const getAssetIcon = (category: string) => {
    switch (category) {
      case 'laptop': return <Laptop className="text-blue-500" size={24} />;
      case 'monitor': return <Monitor className="text-green-500" size={24} />;
      case 'mobile': return <Smartphone className="text-purple-500" size={24} />;
      case 'printer': return <Printer className="text-orange-500" size={24} />;
      case 'network': return <Wifi className="text-cyan-500" size={24} />;
      case 'vehicle': return <Car className="text-red-500" size={24} />;
      default: return <Box className="text-gray-500" size={24} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'retired': return 'bg-gray-100 text-gray-800';
      case 'lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle size={16} className="text-green-600" />;
      case 'maintenance': return <Wrench size={16} className="text-yellow-600" />;
      case 'retired': return <Clock size={16} className="text-gray-600" />;
      case 'lost': return <AlertTriangle size={16} className="text-red-600" />;
      default: return <Clock size={16} className="text-gray-600" />;
    }
  };

  const filteredAssets = mockAssets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || asset.category === categoryFilter;
    const matchesStatus = !statusFilter || asset.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = [...new Set(mockAssets.map(a => a.category))];
  const totalValue = filteredAssets.reduce((sum, asset) => sum + asset.currentValue, 0);
  const activeAssets = filteredAssets.filter(a => a.status === 'active').length;
  const maintenanceAssets = filteredAssets.filter(a => a.status === 'maintenance').length;
  const assignedAssets = filteredAssets.filter(a => a.assignedTo).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-600 to-gray-600 bg-clip-text text-transparent">
            Asset Management
          </h1>
          <p className="text-gray-600 mt-1">Track and manage company assets, assignments, and maintenance</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-gradient-to-r from-slate-600 to-gray-600 text-white px-4 py-2 rounded-xl hover:from-slate-700 hover:to-gray-700 transition-all flex items-center space-x-2 shadow-lg">
            <Plus size={20} />
            <span>Add Asset</span>
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors flex items-center space-x-2">
            <FileText size={20} />
            <span>Import</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-slate-500 to-slate-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{filteredAssets.length}</div>
              <div className="text-slate-100 text-sm">Total Assets</div>
            </div>
            <Box size={32} className="text-slate-200" />
          </div>
          <div className="mt-4 text-slate-100 text-sm">All categories</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{activeAssets}</div>
              <div className="text-green-100 text-sm">Active Assets</div>
            </div>
            <CheckCircle size={32} className="text-green-200" />
          </div>
          <div className="mt-4 text-green-100 text-sm">In use</div>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{maintenanceAssets}</div>
              <div className="text-yellow-100 text-sm">Maintenance</div>
            </div>
            <Wrench size={32} className="text-yellow-200" />
          </div>
          <div className="mt-4 text-yellow-100 text-sm">Needs attention</div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">P{totalValue.toLocaleString()}</div>
              <div className="text-blue-100 text-sm">Total Value</div>
            </div>
            <DollarSign size={32} className="text-blue-200" />
          </div>
          <div className="mt-4 text-blue-100 text-sm">Current worth</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'all', label: 'All Assets', icon: Box },
              { id: 'assigned', label: 'Assigned', icon: User },
              { id: 'maintenance', label: 'Maintenance', icon: Wrench },
              { id: 'reports', label: 'Reports', icon: FileText }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-slate-500 text-slate-600'
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
                placeholder="Search assets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent w-full"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="maintenance">Maintenance</option>
              <option value="retired">Retired</option>
              <option value="lost">Lost</option>
            </select>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
              <Filter size={16} />
              <span>More Filters</span>
            </button>
          </div>

          {/* Assets Content */}
          {(activeTab === 'all' || activeTab === 'assigned' || activeTab === 'maintenance') && (
            <div className="space-y-4">
              {filteredAssets
                .filter(asset => {
                  if (activeTab === 'assigned') return asset.assignedTo;
                  if (activeTab === 'maintenance') return asset.status === 'maintenance';
                  return true;
                })
                .map((asset) => (
                <div key={asset.id} className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      {getAssetIcon(asset.category)}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{asset.name}</h3>
                        <p className="text-sm text-gray-600">{asset.brand} {asset.model}</p>
                        <p className="text-xs text-gray-500">#{asset.id} • SN: {asset.serialNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(asset.status)}`}>
                        {getStatusIcon(asset.status)}
                        <span className="ml-1">{asset.status}</span>
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getConditionColor(asset.condition)}`}>
                        {asset.condition}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Assignment</h4>
                      <div className="space-y-1 text-sm">
                        {asset.assignedTo ? (
                          <>
                            <div className="flex items-center space-x-2">
                              <User size={14} className="text-gray-400" />
                              <span className="text-gray-900">{asset.assignedTo}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar size={14} className="text-gray-400" />
                              <span className="text-gray-600">Since {new Date(asset.assignedDate!).toLocaleDateString()}</span>
                            </div>
                          </>
                        ) : (
                          <span className="text-gray-500">Unassigned</span>
                        )}
                        <div className="flex items-center space-x-2">
                          <MapPin size={14} className="text-gray-400" />
                          <span className="text-gray-600">{asset.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Financial</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Purchase:</span>
                          <span className="font-medium">P{asset.purchasePrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Current:</span>
                          <span className="font-medium">P{asset.currentValue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Depreciation:</span>
                          <span className="text-red-600 font-medium">
                            {(((asset.purchasePrice - asset.currentValue) / asset.purchasePrice) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Maintenance</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Warranty:</span>
                          <span className="font-medium">{new Date(asset.warrantyExpiry).toLocaleDateString()}</span>
                        </div>
                        {asset.lastMaintenance && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Last service:</span>
                            <span className="font-medium">{new Date(asset.lastMaintenance).toLocaleDateString()}</span>
                          </div>
                        )}
                        {asset.nextMaintenance && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Next service:</span>
                            <span className="font-medium text-orange-600">{new Date(asset.nextMaintenance).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {asset.notes && (
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-1">Notes</h4>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{asset.notes}</p>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      Purchased {new Date(asset.purchaseDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors text-sm">
                        View Details
                      </button>
                      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <User size={16} />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                        <Wrench size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Asset Reports & Analytics</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-slate-50 to-gray-50 border border-slate-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Asset Distribution</h4>
                  <div className="space-y-3">
                    {categories.map(category => {
                      const count = mockAssets.filter(a => a.category === category).length;
                      const percentage = (count / mockAssets.length) * 100;
                      return (
                        <div key={category} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {getAssetIcon(category)}
                            <span className="font-medium capitalize">{category}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-slate-500 h-2 rounded-full"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{count}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Maintenance Schedule</h4>
                  <div className="text-center py-8 text-gray-500">
                    <Calendar size={48} className="mx-auto mb-3 text-gray-300" />
                    <p>Maintenance calendar will be displayed here</p>
                    <p className="text-sm">Track upcoming maintenance and service schedules</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Asset Value Trends</h4>
                <div className="text-center py-12 text-gray-500">
                  <DollarSign size={64} className="mx-auto mb-4 text-gray-300" />
                  <p>Asset depreciation and value trends</p>
                  <p className="text-sm">Monitor asset values and depreciation over time</p>
                </div>
              </div>
            </div>
          )}

          {filteredAssets.length === 0 && activeTab !== 'reports' && (
            <div className="text-center py-12">
              <Box size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No assets found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assets;