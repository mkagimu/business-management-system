import React, { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Phone, Mail, DollarSign, Edit, Trash2, Eye, Users, Tag, ChevronDown, ChevronUp } from 'lucide-react';
import { Lead } from '../../types';
import { mockLeads, mockOwners, mockTags } from '../../data/mockData';
import LeadWizardModal from './LeadWizardModal';

const Leads = () => {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [ownerFilter, setOwnerFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [showBulkBar, setShowBulkBar] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [drawerLead, setDrawerLead] = useState<Lead | null>(null);

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || lead.status === statusFilter;
    const matchesOwner = !ownerFilter || lead.owner === ownerFilter;
    const matchesTag = !tagFilter || (lead.tags && lead.tags.includes(tagFilter));
    return matchesSearch && matchesStatus && matchesOwner && matchesTag;
  });

  const getStatusColor = (status: Lead['status']) => {
    switch (status) {
      case 'new': return 'bg-gray-100 text-gray-800';
      case 'contacted': return 'bg-blue-100 text-blue-800';
      case 'qualified': return 'bg-yellow-100 text-yellow-800';
      case 'proposal': return 'bg-purple-100 text-purple-800';
      case 'converted': return 'bg-green-100 text-green-800';
      case 'lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleSelectLead = (id: string) => {
    setSelectedLeads(prev => prev.includes(id) ? prev.filter(lid => lid !== id) : [...prev, id]);
  };
  const selectAll = () => setSelectedLeads(filteredLeads.map(l => l.id));
  const clearAll = () => setSelectedLeads([]);

  const totalValue = filteredLeads.reduce((sum, lead) => sum + lead.value, 0);
  const qualifiedLeads = filteredLeads.filter(lead => lead.status === 'qualified').length;
  const overdueLeads = filteredLeads.filter(lead => {
    if (!lead.nextAction || !lead.lastActivity) return false;
    const last = new Date(lead.lastActivity);
    const now = new Date();
    return (now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24) > 7;
  }).length;
  const conversionRate = leads.length > 0 ? (leads.filter(l => l.status === 'converted').length / leads.length * 100).toFixed(1) : '0';

  const openDrawer = (lead: Lead) => {
    setDrawerLead(lead);
    setShowDrawer(true);
  };
  const closeDrawer = () => {
    setDrawerLead(null);
    setShowDrawer(false);
  };

  const handleLeadWizardComplete = (wizardData: any) => {
    const newLead: Lead = {
      id: Date.now().toString(),
      name: wizardData.contact.firstName + ' ' + wizardData.contact.lastName,
      company: wizardData.company.name,
      email: wizardData.contact.email,
      phone: wizardData.contact.phone,
      status: 'new',
      source: 'manual',
      value: wizardData.documentDetails.items.reduce((sum: number, item: any) => sum + Number(item.price) * Number(item.quantity), 0),
      createdAt: new Date().toISOString().split('T')[0],
      lastContact: new Date().toISOString().split('T')[0],
      notes: wizardData.documentDetails.notes || '',
      tags: [],
      assignedTo: '',
      owner: '',
      nextAction: '',
      lastActivity: new Date().toISOString().split('T')[0],
    };
    setLeads(prev => {
      const updated = [newLead, ...prev];
      localStorage.setItem('leads', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
          <p className="text-gray-600 mt-1">Manage your potential customers and track conversions</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Lead</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{filteredLeads.length}</div>
          <div className="text-sm text-gray-600">Total Leads</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-green-600">{qualifiedLeads}</div>
          <div className="text-sm text-gray-600">Qualified</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">${totalValue.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Pipeline Value</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-red-600">{overdueLeads}</div>
          <div className="text-sm text-gray-600">Overdue Follow-Ups</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-purple-600">{conversionRate}%</div>
          <div className="text-sm text-gray-600">Conversion Rate</div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search leads..."
            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-400" />
          <select
            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="proposal">Proposal</option>
            <option value="converted">Converted</option>
            <option value="lost">Lost</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <Users size={18} className="text-gray-400" />
          <select
            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={ownerFilter}
            onChange={e => setOwnerFilter(e.target.value)}
          >
            <option value="">All Owners</option>
            {mockOwners.map(owner => (
              <option key={owner.id} value={owner.name}>{owner.name}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <Tag size={18} className="text-gray-400" />
          <select
            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={tagFilter}
            onChange={e => setTagFilter(e.target.value)}
          >
            <option value="">All Tags</option>
            {mockTags.map(tag => (
              <option key={tag.id} value={tag.label}>{tag.label}</option>
            ))}
          </select>
        </div>
        <button
          className="ml-auto px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          onClick={() => { setStatusFilter(''); setOwnerFilter(''); setTagFilter(''); setSearchTerm(''); }}
        >
          Clear Filters
        </button>
      </div>

      {selectedLeads.length > 0 && (
        <div className="flex items-center gap-4 bg-blue-50 border border-blue-200 rounded-xl px-6 py-3 mb-2">
          <span className="font-semibold text-blue-700">{selectedLeads.length} selected</span>
          <button className="text-blue-600 hover:underline">Bulk Email</button>
          <button className="text-blue-600 hover:underline">Bulk Assign</button>
          <button className="text-blue-600 hover:underline">Bulk Status</button>
          <button className="text-red-600 hover:underline" onClick={clearAll}>Clear</button>
        </div>
      )}

      <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-sm">
        <table className="w-full min-w-[1200px]">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="p-3 text-left"><input type="checkbox" checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0} onChange={e => e.target.checked ? selectAll() : clearAll()} /></th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Company</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Value</th>
              <th className="p-3 text-left">Source</th>
              <th className="p-3 text-left">Owner</th>
              <th className="p-3 text-left">Next Action</th>
              <th className="p-3 text-left">Last Activity</th>
              <th className="p-3 text-left">Tags</th>
              <th className="p-3 text-left">Last Contact</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map(lead => (
              <tr key={lead.id} className="border-b border-gray-100 hover:bg-blue-50 transition-all">
                <td className="p-3"><input type="checkbox" checked={selectedLeads.includes(lead.id)} onChange={() => toggleSelectLead(lead.id)} /></td>
                <td className="p-3 font-semibold text-blue-900 cursor-pointer" onClick={() => openDrawer(lead)}>{lead.name}</td>
                <td className="p-3">{lead.company}</td>
                <td className="p-3"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(lead.status)}`}>{lead.status}</span></td>
                <td className="p-3">${lead.value.toLocaleString()}</td>
                <td className="p-3">{lead.source}</td>
                <td className="p-3">{lead.owner}</td>
                <td className="p-3">{lead.nextAction}</td>
                <td className="p-3">{lead.lastActivity}</td>
                <td className="p-3">
                  <div className="flex flex-wrap gap-1">
                    {lead.tags.map((tag, idx) => {
                      const tagObj = mockTags.find(t => t.label === tag);
                      return (
                        <span key={idx} className={`px-2 py-1 rounded-full text-xs font-semibold ${tagObj ? tagObj.color : 'bg-gray-100 text-gray-700'}`}>{tag}</span>
                      );
                    })}
                  </div>
                </td>
                <td className="p-3">{lead.lastContact}</td>
                <td className="p-3 flex gap-2">
                  <button className="text-blue-600 hover:text-blue-800" title="View" onClick={() => openDrawer(lead)}><Eye size={16} /></button>
                  <button className="text-green-600 hover:text-green-800" title="Call"><Phone size={16} /></button>
                  <button className="text-indigo-600 hover:text-indigo-800" title="Email"><Mail size={16} /></button>
                  <button className="text-yellow-600 hover:text-yellow-800" title="Edit"><Edit size={16} /></button>
                  <button className="text-red-600 hover:text-red-800" title="Delete" onClick={() => setLeads(leads.filter(l => l.id !== lead.id))}><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredLeads.length === 0 && (
          <div className="text-center text-gray-500 py-12">No leads found.</div>
        )}
      </div>

      {showDrawer && drawerLead && (
        <div className="fixed inset-0 z-50 flex">
          <div className="bg-black/30 w-full h-full" onClick={closeDrawer}></div>
          <div className="w-full max-w-lg bg-white h-full shadow-2xl p-8 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Lead Details</h3>
              <button onClick={closeDrawer} className="text-gray-400 hover:text-gray-600"><MoreVertical size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500">Name</div>
                <div className="font-semibold text-lg text-blue-900">{drawerLead.name}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Company</div>
                <div className="font-medium">{drawerLead.company}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Email</div>
                <div className="font-medium">{drawerLead.email}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Phone</div>
                <div className="font-medium">{drawerLead.phone}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Status</div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(drawerLead.status)}`}>{drawerLead.status}</span>
              </div>
              <div>
                <div className="text-sm text-gray-500">Owner</div>
                <div className="font-medium">{drawerLead.owner}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Next Action</div>
                <div className="font-medium">{drawerLead.nextAction}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Last Activity</div>
                <div className="font-medium">{drawerLead.lastActivity}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Tags</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {drawerLead.tags.map((tag, idx) => {
                    const tagObj = mockTags.find(t => t.label === tag);
                    return (
                      <span key={idx} className={`px-2 py-1 rounded-full text-xs font-semibold ${tagObj ? tagObj.color : 'bg-gray-100 text-gray-700'}`}>{tag}</span>
                    );
                  })}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Notes</div>
                <div className="bg-gray-50 p-3 rounded-lg text-gray-700 mt-1">{drawerLead.notes}</div>
              </div>
            </div>
            <div className="flex justify-end mt-8">
              <button onClick={closeDrawer} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Close</button>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <LeadWizardModal open={showAddModal} onClose={() => setShowAddModal(false)} onComplete={handleLeadWizardComplete} />
      )}
    </div>
  );
};

export default Leads;