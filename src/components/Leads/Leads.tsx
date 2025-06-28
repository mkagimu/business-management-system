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
      case 'new': return 'bg-gray-100 text-gray-800 border-gray-400';
      case 'contacted': return 'bg-blue-100 text-blue-800 border-blue-400';
      case 'qualified': return 'bg-yellow-100 text-yellow-800 border-yellow-400';
      case 'proposal': return 'bg-purple-100 text-purple-800 border-purple-400';
      case 'converted': return 'bg-green-100 text-green-800 border-green-400';
      case 'lost': return 'bg-red-100 text-red-800 border-red-400';
      default: return 'bg-gray-100 text-gray-800 border-gray-400';
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
    <div className="space-y-6 p-6 bg-slate-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900">
            Leads
          </h1>
          <p className="mt-1 text-slate-700 font-medium">
            Manage your potential customers and track conversions
          </p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 border-2 border-blue-600 font-bold shadow-lg hover:shadow-xl"
        >
          <Plus size={20} />
          <span>Add Lead</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-6 rounded-xl border-2 border-slate-300 shadow-lg">
          <div className="text-2xl font-black text-slate-900">
            {filteredLeads.length}
          </div>
          <div className="text-sm text-slate-600 font-semibold">
            Total Leads
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border-2 border-slate-300 shadow-lg">
          <div className="text-2xl font-black text-green-600">{qualifiedLeads}</div>
          <div className="text-sm text-slate-600 font-semibold">
            Qualified
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border-2 border-slate-300 shadow-lg">
          <div className="text-2xl font-black text-blue-600">${totalValue.toLocaleString()}</div>
          <div className="text-sm text-slate-600 font-semibold">
            Pipeline Value
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border-2 border-slate-300 shadow-lg">
          <div className="text-2xl font-black text-red-600">{overdueLeads}</div>
          <div className="text-sm text-slate-600 font-semibold">
            Overdue Follow-Ups
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border-2 border-slate-300 shadow-lg">
          <div className="text-2xl font-black text-purple-600">{conversionRate}%</div>
          <div className="text-sm text-slate-600 font-semibold">
            Conversion Rate
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-xl border-2 border-slate-300 shadow-lg">
        <div className="flex items-center gap-2">
          <Search size={18} className="text-slate-500" />
          <input
            type="text"
            placeholder="Search leads..."
            className="px-3 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-900 placeholder-slate-500 font-medium"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-slate-500" />
          <select
            className="px-3 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-900 font-medium"
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
          <Users size={18} className="text-slate-500" />
          <select
            className="px-3 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-900 font-medium"
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
          <Tag size={18} className="text-slate-500" />
          <select
            className="px-3 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-900 font-medium"
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
          className="ml-auto px-4 py-2 rounded-lg transition-colors border-2 border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:border-slate-400 font-bold"
          onClick={() => { setStatusFilter(''); setOwnerFilter(''); setTagFilter(''); setSearchTerm(''); }}
        >
          Clear Filters
        </button>
      </div>

      {selectedLeads.length > 0 && (
        <div className="flex items-center gap-4 bg-blue-50 border-2 border-blue-300 rounded-xl px-6 py-3 mb-2">
          <span className="font-black text-blue-700">
            {selectedLeads.length} selected
          </span>
          <button className="hover:underline font-bold text-blue-600">
            Bulk Email
          </button>
          <button className="hover:underline font-bold text-blue-600">
            Bulk Assign
          </button>
          <button className="hover:underline font-bold text-blue-600">
            Bulk Status
          </button>
          <button className="hover:underline font-bold text-red-600" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}

      <div className="overflow-x-auto bg-white rounded-xl border-2 border-slate-300 shadow-lg">
        <table className="w-full min-w-[1200px]">
          <thead className="sticky top-0 z-10 bg-slate-100 border-b-2 border-slate-300">
            <tr>
              <th className="p-3 text-left border-r border-slate-300">
                <input 
                  type="checkbox" 
                  checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0} 
                  onChange={e => e.target.checked ? selectAll() : clearAll()} 
                  className="rounded border-2 border-slate-400"
                />
              </th>
              <th className="p-3 text-left font-black text-slate-900 border-r border-slate-300">Name</th>
              <th className="p-3 text-left font-black text-slate-900 border-r border-slate-300">Company</th>
              <th className="p-3 text-left font-black text-slate-900 border-r border-slate-300">Status</th>
              <th className="p-3 text-left font-black text-slate-900 border-r border-slate-300">Value</th>
              <th className="p-3 text-left font-black text-slate-900 border-r border-slate-300">Source</th>
              <th className="p-3 text-left font-black text-slate-900 border-r border-slate-300">Owner</th>
              <th className="p-3 text-left font-black text-slate-900 border-r border-slate-300">Next Action</th>
              <th className="p-3 text-left font-black text-slate-900 border-r border-slate-300">Last Activity</th>
              <th className="p-3 text-left font-black text-slate-900 border-r border-slate-300">Tags</th>
              <th className="p-3 text-left font-black text-slate-900 border-r border-slate-300">Last Contact</th>
              <th className="p-3 text-left font-black text-slate-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map(lead => (
              <tr key={lead.id} className="border-b-2 border-slate-200 hover:bg-blue-50 transition-all">
                <td className="p-3 border-r border-slate-200">
                  <input 
                    type="checkbox" 
                    checked={selectedLeads.includes(lead.id)} 
                    onChange={() => toggleSelectLead(lead.id)} 
                    className="rounded border-2 border-slate-400"
                  />
                </td>
                <td className="p-3 font-black cursor-pointer text-blue-900 border-r border-slate-200 hover:text-blue-700" onClick={() => openDrawer(lead)}>
                  {lead.name}
                </td>
                <td className="p-3 font-bold text-slate-900 border-r border-slate-200">
                  {lead.company}
                </td>
                <td className="p-3 border-r border-slate-200">
                  <span className={`px-2 py-1 rounded-full text-xs font-black border-2 ${getStatusColor(lead.status)}`}>
                    {lead.status}
                  </span>
                </td>
                <td className="p-3 font-bold text-slate-900 border-r border-slate-200">
                  ${lead.value.toLocaleString()}
                </td>
                <td className="p-3 text-slate-700 font-medium border-r border-slate-200">
                  {lead.source}
                </td>
                <td className="p-3 text-slate-700 font-medium border-r border-slate-200">
                  {lead.owner}
                </td>
                <td className="p-3 text-slate-700 font-medium border-r border-slate-200">
                  {lead.nextAction}
                </td>
                <td className="p-3 text-slate-700 font-medium border-r border-slate-200">
                  {lead.lastActivity}
                </td>
                <td className="p-3 border-r border-slate-200">
                  <div className="flex flex-wrap gap-1">
                    {lead.tags.map((tag, idx) => {
                      const tagObj = mockTags.find(t => t.label === tag);
                      return (
                        <span key={idx} className={`px-2 py-1 rounded-full text-xs font-black border-2 ${tagObj ? tagObj.color + ' border-gray-400' : 'bg-gray-100 text-gray-700 border-gray-400'}`}>
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                </td>
                <td className="p-3 text-slate-700 font-medium border-r border-slate-200">
                  {lead.lastContact}
                </td>
                <td className="p-3 flex gap-2">
                  <button className="text-blue-600 hover:text-blue-800 p-1 rounded border-2 border-blue-300 hover:bg-blue-50 hover:border-blue-400" title="View" onClick={() => openDrawer(lead)}>
                    <Eye size={16} />
                  </button>
                  <button className="text-green-600 hover:text-green-800 p-1 rounded border-2 border-green-300 hover:bg-green-50 hover:border-green-400" title="Call">
                    <Phone size={16} />
                  </button>
                  <button className="text-indigo-600 hover:text-indigo-800 p-1 rounded border-2 border-indigo-300 hover:bg-indigo-50 hover:border-indigo-400" title="Email">
                    <Mail size={16} />
                  </button>
                  <button className="text-yellow-600 hover:text-yellow-800 p-1 rounded border-2 border-yellow-300 hover:bg-yellow-50 hover:border-yellow-400" title="Edit">
                    <Edit size={16} />
                  </button>
                  <button className="text-red-600 hover:text-red-800 p-1 rounded border-2 border-red-300 hover:bg-red-50 hover:border-red-400" title="Delete" onClick={() => setLeads(leads.filter(l => l.id !== lead.id))}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredLeads.length === 0 && (
          <div className="text-center py-12 text-slate-500 font-medium">
            No leads found.
          </div>
        )}
      </div>

      {showDrawer && drawerLead && (
        <div className="fixed inset-0 z-50 flex">
          <div className="bg-black/30 w-full h-full" onClick={closeDrawer}></div>
          <div className="w-full max-w-lg bg-white h-full shadow-2xl p-8 overflow-y-auto border-l-2 border-slate-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-black text-slate-900">
                Lead Details
              </h3>
              <button onClick={closeDrawer} className="text-slate-400 hover:text-slate-600">
                <MoreVertical size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="p-4 border-2 border-slate-300 rounded-lg bg-slate-50">
                <div className="text-sm text-slate-500 font-semibold">Name</div>
                <div className="font-black text-lg text-blue-900">
                  {drawerLead.name}
                </div>
              </div>
              <div className="p-4 border-2 border-slate-300 rounded-lg bg-slate-50">
                <div className="text-sm text-slate-500 font-semibold">Company</div>
                <div className="font-bold text-slate-900">
                  {drawerLead.company}
                </div>
              </div>
              <div className="p-4 border-2 border-slate-300 rounded-lg bg-slate-50">
                <div className="text-sm text-slate-500 font-semibold">Email</div>
                <div className="font-bold text-slate-900">
                  {drawerLead.email}
                </div>
              </div>
              <div className="p-4 border-2 border-slate-300 rounded-lg bg-slate-50">
                <div className="text-sm text-slate-500 font-semibold">Phone</div>
                <div className="font-bold text-slate-900">
                  {drawerLead.phone}
                </div>
              </div>
              <div className="p-4 border-2 border-slate-300 rounded-lg bg-slate-50">
                <div className="text-sm text-slate-500 font-semibold">Status</div>
                <span className={`px-2 py-1 rounded-full text-xs font-black border-2 ${getStatusColor(drawerLead.status)}`}>
                  {drawerLead.status}
                </span>
              </div>
              <div className="p-4 border-2 border-slate-300 rounded-lg bg-slate-50">
                <div className="text-sm text-slate-500 font-semibold">Owner</div>
                <div className="font-bold text-slate-900">
                  {drawerLead.owner}
                </div>
              </div>
              <div className="p-4 border-2 border-slate-300 rounded-lg bg-slate-50">
                <div className="text-sm text-slate-500 font-semibold">Next Action</div>
                <div className="font-bold text-slate-900">
                  {drawerLead.nextAction}
                </div>
              </div>
              <div className="p-4 border-2 border-slate-300 rounded-lg bg-slate-50">
                <div className="text-sm text-slate-500 font-semibold">Last Activity</div>
                <div className="font-bold text-slate-900">
                  {drawerLead.lastActivity}
                </div>
              </div>
              <div className="p-4 border-2 border-slate-300 rounded-lg bg-slate-50">
                <div className="text-sm text-slate-500 font-semibold">Tags</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {drawerLead.tags.map((tag, idx) => {
                    const tagObj = mockTags.find(t => t.label === tag);
                    return (
                      <span key={idx} className={`px-2 py-1 rounded-full text-xs font-black border-2 ${tagObj ? tagObj.color + ' border-gray-400' : 'bg-gray-100 text-gray-700 border-gray-400'}`}>
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="p-4 border-2 border-slate-300 rounded-lg bg-slate-50">
                <div className="text-sm text-slate-500 font-semibold">Notes</div>
                <div className="bg-white p-3 rounded-lg mt-1 border-2 border-slate-300 text-slate-700 font-medium">
                  {drawerLead.notes}
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-8">
              <button onClick={closeDrawer} className="px-4 py-2 border-2 border-slate-300 rounded-lg transition-colors font-bold bg-white text-slate-900 hover:bg-slate-50 hover:border-slate-400">
                Close
              </button>
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