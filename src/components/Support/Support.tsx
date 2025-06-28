import React, { useState } from 'react';
import { 
  LifeBuoy, 
  Plus, 
  Search, 
  Filter, 
  Clock,
  AlertTriangle,
  CheckCircle,
  MessageSquare,
  User,
  Calendar,
  Tag,
  Paperclip,
  Send,
  Phone,
  Mail,
  Star
} from 'lucide-react';

const Support = () => {
  const [activeTab, setActiveTab] = useState<'tickets' | 'knowledge' | 'analytics'>('tickets');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  const mockTickets = [
    {
      id: 'TKT-001',
      title: 'Website loading slowly on mobile devices',
      description: 'Users are reporting slow loading times on mobile devices, especially on the checkout page.',
      status: 'open',
      priority: 'high',
      category: 'Technical',
      client: 'TechCorp Inc.',
      assignee: 'John Doe',
      createdDate: '2024-01-20',
      lastUpdate: '2024-01-22',
      dueDate: '2024-01-25',
      responses: 3,
      rating: null
    },
    {
      id: 'TKT-002',
      title: 'Request for additional user accounts',
      description: 'Need to add 5 more user accounts to the system with admin privileges.',
      status: 'in-progress',
      priority: 'medium',
      category: 'Account Management',
      client: 'StartupCo',
      assignee: 'Jane Smith',
      createdDate: '2024-01-19',
      lastUpdate: '2024-01-21',
      dueDate: '2024-01-26',
      responses: 2,
      rating: null
    },
    {
      id: 'TKT-003',
      title: 'Email notifications not working',
      description: 'Customers are not receiving order confirmation emails after purchase.',
      status: 'resolved',
      priority: 'high',
      category: 'Email',
      client: 'RetailPlus',
      assignee: 'Mike Johnson',
      createdDate: '2024-01-18',
      lastUpdate: '2024-01-20',
      dueDate: '2024-01-22',
      responses: 5,
      rating: 5
    },
    {
      id: 'TKT-004',
      title: 'Feature request: Dark mode',
      description: 'Users are requesting a dark mode option for better user experience.',
      status: 'open',
      priority: 'low',
      category: 'Feature Request',
      client: 'HealthTech Solutions',
      assignee: 'Alice Brown',
      createdDate: '2024-01-17',
      lastUpdate: '2024-01-19',
      dueDate: '2024-01-30',
      responses: 1,
      rating: null
    },
    {
      id: 'TKT-005',
      title: 'Payment gateway integration issue',
      description: 'Stripe payments are failing for international customers.',
      status: 'escalated',
      priority: 'critical',
      category: 'Payment',
      client: 'E-commerce Store',
      assignee: 'Bob Wilson',
      createdDate: '2024-01-22',
      lastUpdate: '2024-01-22',
      dueDate: '2024-01-23',
      responses: 1,
      rating: null
    }
  ];

  const mockKnowledgeBase = [
    {
      id: '1',
      title: 'How to reset your password',
      category: 'Account Management',
      views: 1250,
      helpful: 89,
      lastUpdated: '2024-01-15'
    },
    {
      id: '2',
      title: 'Setting up email notifications',
      category: 'Email',
      views: 890,
      helpful: 76,
      lastUpdated: '2024-01-12'
    },
    {
      id: '3',
      title: 'Troubleshooting payment issues',
      category: 'Payment',
      views: 2100,
      helpful: 145,
      lastUpdated: '2024-01-20'
    },
    {
      id: '4',
      title: 'Mobile app installation guide',
      category: 'Technical',
      views: 567,
      helpful: 42,
      lastUpdated: '2024-01-18'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      case 'escalated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <Clock size={16} className="text-blue-600" />;
      case 'in-progress': return <Clock size={16} className="text-yellow-600" />;
      case 'resolved': return <CheckCircle size={16} className="text-green-600" />;
      case 'escalated': return <AlertTriangle size={16} className="text-red-600" />;
      default: return <Clock size={16} className="text-gray-600" />;
    }
  };

  const filteredTickets = mockTickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || ticket.status === statusFilter;
    const matchesPriority = !priorityFilter || ticket.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const ticketStats = {
    total: mockTickets.length,
    open: mockTickets.filter(t => t.status === 'open').length,
    inProgress: mockTickets.filter(t => t.status === 'in-progress').length,
    resolved: mockTickets.filter(t => t.status === 'resolved').length,
    avgResponseTime: '2.5 hours',
    satisfaction: '4.2/5'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            Support Center
          </h1>
          <p className="text-gray-600 mt-1">Manage customer support tickets and knowledge base</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-4 py-2 rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all flex items-center space-x-2 shadow-lg">
            <Plus size={20} />
            <span>New Ticket</span>
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors flex items-center space-x-2">
            <MessageSquare size={20} />
            <span>Live Chat</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{ticketStats.total}</div>
              <div className="text-blue-100 text-sm">Total Tickets</div>
            </div>
            <LifeBuoy size={28} className="text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{ticketStats.open}</div>
              <div className="text-orange-100 text-sm">Open</div>
            </div>
            <Clock size={28} className="text-orange-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{ticketStats.inProgress}</div>
              <div className="text-yellow-100 text-sm">In Progress</div>
            </div>
            <AlertTriangle size={28} className="text-yellow-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{ticketStats.resolved}</div>
              <div className="text-green-100 text-sm">Resolved</div>
            </div>
            <CheckCircle size={28} className="text-green-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{ticketStats.avgResponseTime}</div>
              <div className="text-purple-100 text-sm">Avg Response</div>
            </div>
            <Clock size={28} className="text-purple-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{ticketStats.satisfaction}</div>
              <div className="text-pink-100 text-sm">Satisfaction</div>
            </div>
            <Star size={28} className="text-pink-200" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'tickets', label: 'Support Tickets', icon: LifeBuoy },
              { id: 'knowledge', label: 'Knowledge Base', icon: MessageSquare },
              { id: 'analytics', label: 'Analytics', icon: Star }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-cyan-500 text-cyan-600'
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
          {/* Tickets Tab */}
          {activeTab === 'tickets' && (
            <div className="space-y-6">
              {/* Search and Filter */}
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search tickets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent w-full"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  <option value="">All Status</option>
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="escalated">Escalated</option>
                </select>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  <option value="">All Priority</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              {/* Tickets List */}
              <div className="space-y-4">
                {filteredTickets.map((ticket) => (
                  <div key={ticket.id} className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{ticket.title}</h3>
                          <span className="text-sm text-gray-500">#{ticket.id}</span>
                        </div>
                        <p className="text-gray-600 mb-3">{ticket.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <User size={14} />
                            <span>{ticket.client}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar size={14} />
                            <span>Created {new Date(ticket.createdDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageSquare size={14} />
                            <span>{ticket.responses} responses</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(ticket.status)}`}>
                            {getStatusIcon(ticket.status)}
                            <span className="ml-1">{ticket.status}</span>
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                            {ticket.priority}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          Assigned to {ticket.assignee}
                        </div>
                        {ticket.rating && (
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={14} 
                                className={i < ticket.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'} 
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Due: {new Date(ticket.dueDate).toLocaleDateString()}</span>
                        <span>Category: {ticket.category}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors text-sm">
                          View Details
                        </button>
                        <button className="p-2 text-gray-600 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors">
                          <MessageSquare size={16} />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Phone size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Knowledge Base Tab */}
          {activeTab === 'knowledge' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Knowledge Base Articles</h3>
                <button className="bg-cyan-600 text-white px-4 py-2 rounded-xl hover:bg-cyan-700 transition-colors flex items-center space-x-2">
                  <Plus size={16} />
                  <span>New Article</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockKnowledgeBase.map((article) => (
                  <div key={article.id} className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">{article.title}</h4>
                      <span className="px-2 py-1 bg-cyan-100 text-cyan-800 rounded-full text-xs font-medium">
                        {article.category}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Views:</span>
                        <span className="font-medium text-gray-900">{article.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Helpful votes:</span>
                        <span className="font-medium text-green-600">{article.helpful}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Last updated:</span>
                        <span className="font-medium text-gray-900">{new Date(article.lastUpdated).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-4">
                      <button className="flex-1 px-3 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors text-sm">
                        View Article
                      </button>
                      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <MessageSquare size={16} />
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
              <h3 className="text-lg font-semibold text-gray-900">Support Analytics</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Response Time Trends</h4>
                  <div className="text-center py-12 text-gray-500">
                    <Clock size={64} className="mx-auto mb-4 text-gray-300" />
                    <p>Response time analytics will be displayed here</p>
                    <p className="text-sm">Track average response times and SLA compliance</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Customer Satisfaction</h4>
                  <div className="text-center py-12 text-gray-500">
                    <Star size={64} className="mx-auto mb-4 text-gray-300" />
                    <p>Satisfaction ratings and feedback analysis</p>
                    <p className="text-sm">Monitor customer satisfaction trends</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Ticket Volume by Category</h4>
                <div className="text-center py-12 text-gray-500">
                  <LifeBuoy size={64} className="mx-auto mb-4 text-gray-300" />
                  <p>Category-wise ticket distribution charts</p>
                  <p className="text-sm">Identify common issues and trends</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Support;