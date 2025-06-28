import React, { useState } from 'react';
import { Client, Project, Milestone } from '../../types';
import { mockClients } from '../../data/mockData';
import { countries } from 'countries-list';

const PROJECT_TYPE_STAGES: Record<string, any> = {
  Website: [
    {
      title: 'Requirements Gathering',
      steps: [
        { label: 'Confirm site purpose, target audience, must-have features', type: 'textarea' },
        { label: 'Identify site type', type: 'radio', options: ['Brochure', 'E-commerce', 'Booking', 'Web App', 'Other'] },
      ],
    },
    {
      title: 'Page Planning',
      steps: [
        { label: 'Pages', type: 'pages' },
      ],
    },
    {
      title: 'Asset Collection',
      steps: [
        { label: 'Collect logo (or trigger Logo Design sub-project if none)', type: 'file' },
        { label: 'Gather company profile, copy, brand guide', type: 'file' },
      ],
    },
    {
      title: 'Template Selection & Mapping',
      steps: [
        { label: 'Choose Envato/Elementor template kit', type: 'text' },
      ],
    },
    {
      title: 'AI Content Mapping',
      steps: [
        { label: 'AI maps content to template sections, drafts outline', type: 'checkbox' },
      ],
    },
    {
      title: 'Platform Decision',
      steps: [
        { label: 'Select build platform (WordPress, CURSOR site builder, etc.)', type: 'select', options: ['WordPress', 'CURSOR', 'Other'] },
      ],
    },
    {
      title: 'WordPress Setup',
      steps: [
        { label: 'Reset existing content (if any)', type: 'checkbox' },
        { label: 'Install required plugins', type: 'checkbox' },
        { label: 'Upload & activate chosen template kit', type: 'checkbox' },
        { label: 'Appearance > Themes – install Hello Elementor and activate', type: 'checkbox' },
        { label: 'Pages > Add all planned pages', type: 'checkbox' },
        { label: 'Appearance > Menus – create & order menu items', type: 'checkbox' },
        { label: 'Settings > Reading – set static Home page', type: 'checkbox' },
        { label: 'Settings > Permalinks – choose Post Name', type: 'checkbox' },
        { label: 'Elementor > Kits – Save, edit header & footer', type: 'checkbox' },
      ],
    },
    {
      title: 'Design & Content Integration',
      steps: [
        { label: 'Design each page, drop in text/images, follow brand colours', type: 'checkbox' },
        { label: 'Task checklist per page; completion updates overall % complete', type: 'checkbox' },
      ],
    },
    {
      title: 'Internal QA & Testing',
      steps: [
        { label: 'Browser/device checks, link tests, performance pass', type: 'checkbox' },
      ],
    },
    {
      title: 'Client Review Rounds',
      steps: [
        { label: 'Round 1: Feedback and revisions', type: 'checkbox' },
        { label: 'Round 2: Feedback and revisions', type: 'checkbox' },
        { label: 'Final: Sign-off (changes after this become billable)', type: 'checkbox' },
      ],
    },
    {
      title: 'Domain & Hosting Setup',
      steps: [
        { label: 'Purchase/transfer domain', type: 'checkbox' },
        { label: 'Provision hosting, SSL, backups', type: 'checkbox' },
        { label: 'Record server logins in the project', type: 'checkbox' },
      ],
    },
    {
      title: 'Email & DNS Configuration',
      steps: [
        { label: 'Create requested email accounts', type: 'checkbox' },
        { label: 'Verify MX/SPF records', type: 'checkbox' },
      ],
    },
    {
      title: 'Launch & Handover',
      steps: [
        { label: 'Point DNS, run final live checks, deliver admin creds', type: 'checkbox' },
      ],
    },
    {
      title: 'Post-Launch Maintenance',
      steps: [
        { label: 'Schedule hosting/domain renewal invoices', type: 'checkbox' },
        { label: 'Set automatic reminders (30 days, 7 days, suspension notice)', type: 'checkbox' },
      ],
    },
  ],
  'Mobile App': [
    'Requirements Gathering',
    'Wireframing',
    'UI/UX Design',
    'Development',
    'Testing',
    'Deployment',
  ],
  Design: [
    'Briefing',
    'Moodboard',
    'Concept Design',
    'Client Feedback',
    'Final Delivery',
  ],
  Software: [
    'Requirements Gathering',
    'System Architecture',
    'Development',
    'Testing',
    'Deployment',
  ],
};

const steps = ['Select Client', 'Select Project Type', 'Review Stages', 'Confirm & Create'];

interface ProjectWizardModalProps {
  open: boolean;
  onClose: () => void;
  onComplete: (project: Project) => void;
}

export const ProjectWizardModal: React.FC<ProjectWizardModalProps> = ({ open, onClose, onComplete }) => {
  const [step, setStep] = useState(0);
  const [selectedClientId, setSelectedClientId] = useState('');
  const [projectType, setProjectType] = useState('');
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [stages, setStages] = useState<string[]>([]);
  const [currentSectionIdx, setCurrentSectionIdx] = useState(0);
  const [websiteStepData, setWebsiteStepData] = useState<Record<string, any>>({});
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [clientSearch, setClientSearch] = useState('');
  const [showAddClient, setShowAddClient] = useState(false);
  const [newClient, setNewClient] = useState({
    name: '',
    company: '',
    designation: '',
    email: '',
    countryCode: '+267',
    phone: '',
    address: '',
    postalAddress: '',
  });
  const [addClientError, setAddClientError] = useState('');

  const selectedClient = clients.find(c => c.id === selectedClientId);

  const filteredClients = clientSearch.trim() && !selectedClientId
    ? clients.filter(c =>
        c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
        c.email.toLowerCase().includes(clientSearch.toLowerCase()) ||
        c.phone.toLowerCase().includes(clientSearch.toLowerCase())
      )
    : [];

  React.useEffect(() => {
    if (projectType && PROJECT_TYPE_STAGES[projectType]) {
      if (projectType === 'Website') {
        const grouped = PROJECT_TYPE_STAGES[projectType];
        setStages(grouped.flatMap((section: any) => section.steps));
      } else {
        setStages(PROJECT_TYPE_STAGES[projectType]);
      }
    } else {
      setStages([]);
    }
  }, [projectType]);

  React.useEffect(() => {
    setCurrentSectionIdx(0);
  }, [projectType, step]);

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleSendAiPrompt = async () => {
    if (!aiPrompt.trim()) return;
    setAiLoading(true);
    setAiError('');
    setAiResponse('');
    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      if (!apiKey) {
        setAiError('OpenAI API key not found. Please set VITE_OPENAI_API_KEY in your .env.local file.');
        setAiLoading(false);
        return;
      }
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant for website project planning.' },
            { role: 'user', content: aiPrompt }
          ],
          max_tokens: 512,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error?.message || 'OpenAI API error');
      }
      const data = await res.json();
      const content = data.choices?.[0]?.message?.content || '';
      setAiResponse(content);
    } catch (err: any) {
      setAiError(err.message || 'Failed to get AI response.');
    } finally {
      setAiLoading(false);
    }
  };

  const handleCreate = () => {
    if (!selectedClient) return;
    const now = new Date();
    const end = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); 
    const milestones: Milestone[] = stages.map((title, idx) => ({
      id: `${Date.now()}-${idx}`,
      title,
      dueDate: new Date(now.getTime() + (idx + 1) * 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      completed: false,
      description: '',
    }));
    const newProject: Project = {
      id: `${Date.now()}`,
      name: projectName || `${projectType} Project`,
      clientId: selectedClient.id,
      clientName: selectedClient.name,
      status: 'planning',
      progress: 0,
      startDate: now.toISOString().slice(0, 10),
      endDate: end.toISOString().slice(0, 10),
      budget: 0,
      spent: 0,
      description,
      team: [],
      tasks: [],
      milestones,
    };
    onComplete(newProject);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm" />
      <div className="relative w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-7">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Add New Project</h2>
              <p className="text-blue-100 text-sm">Create and track a new client project with automated stages</p>
            </div>
            <button onClick={onClose} className="text-white text-3xl hover:text-blue-200 focus:outline-none">×</button>
          </div>
          <div className="flex items-center mt-6 space-x-0 justify-center">
            {steps.map((label, idx) => (
              <React.Fragment key={label}>
                <div className="flex flex-col items-center">
                  <div className={`w-9 h-9 flex items-center justify-center rounded-full border-4 ${step === idx ? 'border-white bg-white text-blue-600' : step > idx ? 'border-green-400 bg-green-400 text-white' : 'border-blue-200 bg-blue-100 text-blue-400'} font-bold text-lg transition-all duration-200`}>
                    {step > idx ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    ) : (
                      idx + 1
                    )}
                  </div>
                  <span className={`mt-2 text-xs font-medium ${step === idx ? 'text-white' : 'text-blue-100'}`}>{label}</span>
                </div>
                {idx < steps.length - 1 && <div className="w-8 h-1 bg-blue-200 mx-1 rounded" />}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="bg-white px-8 py-10 rounded-b-3xl">
          {step === 0 && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Select Client*</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-4 py-3 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm hover:border-gray-300"
                  placeholder="Search client by name, email, or phone..."
                  value={clientSearch}
                  onChange={e => {
                    setClientSearch(e.target.value);
                    if (selectedClientId) setSelectedClientId('');
                  }}
                  autoComplete="off"
                />
                {clientSearch && !selectedClientId && (
                  <div className="absolute left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-10 mt-1 max-h-56 overflow-y-auto">
                    {filteredClients.length > 0 ? (
                      filteredClients.map(client => (
                        <div
                          key={client.id}
                          className="px-4 py-2 cursor-pointer hover:bg-blue-50"
                          onClick={() => {
                            setSelectedClientId(client.id);
                            setClientSearch(client.name);
                          }}
                        >
                          <div className="font-medium">{client.name}</div>
                          <div className="text-xs text-gray-500">{client.email} {client.phone && `| ${client.phone}`}</div>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-gray-600 flex flex-col items-start">
                        <span>No client found.</span>
                        <button
                          className="mt-2 px-3 py-1 bg-blue-600 text-white rounded"
                          type="button"
                          onClick={() => {
                            setShowAddClient(true);
                            setClientSearch('');
                          }}
                        >
                          + Add New Client
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              {showAddClient && !selectedClientId && (
                <div className="mt-6 p-5 border border-blue-200 rounded-xl bg-blue-50">
                  <div className="font-semibold text-blue-700 mb-2">Add New Client</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1">Full Name*</label>
                      <input
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={newClient.name}
                        onChange={e => setNewClient(c => ({ ...c, name: e.target.value }))}
                        required
                        placeholder="e.g. John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">Company Name</label>
                      <input
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={newClient.company}
                        onChange={e => setNewClient(c => ({ ...c, company: e.target.value }))}
                        placeholder="e.g. TechCorp Inc."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">Designation</label>
                      <input
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={newClient.designation}
                        onChange={e => setNewClient(c => ({ ...c, designation: e.target.value }))}
                        placeholder="e.g. Marketing Manager"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">Email</label>
                      <input
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={newClient.email}
                        onChange={e => setNewClient(c => ({ ...c, email: e.target.value }))}
                        type="email"
                        placeholder="e.g. john.doe@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">Phone</label>
                      <div className="flex">
                        <select
                          className="w-28 flex-shrink-0 px-3 py-2 border border-r-0 border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-sm"
                          value={newClient.countryCode}
                          onChange={e => setNewClient(c => ({ ...c, countryCode: e.target.value }))}
                        >
                          {Object.entries(countries).map(([code, country]) => (
                            <option key={code} value={`+${country.phone[0]}`}>{`${code} +${country.phone[0]}`}</option>
                          ))}
                        </select>
                        <input
                          className="flex-grow w-full px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={newClient.phone}
                          onChange={e => setNewClient(c => ({ ...c, phone: e.target.value }))}
                          type="tel"
                          placeholder="e.g. 71234567"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">Physical Address</label>
                      <input
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={newClient.address}
                        onChange={e => setNewClient(c => ({ ...c, address: e.target.value }))}
                        placeholder="e.g. Plot 123, Main Street, Gaborone"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">Postal Address</label>
                      <input
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={newClient.postalAddress}
                        onChange={e => setNewClient(c => ({ ...c, postalAddress: e.target.value }))}
                        placeholder="e.g. P.O. Box 123, Gaborone"
                      />
                    </div>
                  </div>
                  {addClientError && <div className="text-red-600 mt-2">{addClientError}</div>}
                  <div className="flex gap-2 mt-4">
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded"
                      type="button"
                      onClick={() => {
                        if (!newClient.name.trim()) {
                          setAddClientError('Name is required.');
                          return;
                        }
                        const id = Date.now().toString();
                        const now = new Date().toISOString().slice(0, 10);
                        const client: Client = {
                          id,
                          name: newClient.name,
                          email: newClient.email || '',
                          company: newClient.company || '',
                          phone: `${newClient.countryCode} ${newClient.phone}`,
                          address: newClient.address || '',
                          postalAddress: newClient.postalAddress || '',
                          designation: newClient.designation || '',
                          projects: [],
                          totalValue: 0,
                          status: 'active',
                          joinDate: now,
                          lastActivity: now,
                        };
                        setClients(cs => [...cs, client]);
                        setSelectedClientId(id);
                        setClientSearch(client.name);
                        setShowAddClient(false);
                        setNewClient({
                          name: '',
                          company: '',
                          designation: '',
                          email: '',
                          countryCode: '+267',
                          phone: '',
                          address: '',
                          postalAddress: '',
                        });
                        setAddClientError('');
                      }}
                    >
                      Add & Select Client
                    </button>
                    <button
                      className="px-4 py-2 border border-gray-400 rounded bg-white"
                      type="button"
                      onClick={() => {
                        setShowAddClient(false);
                        setAddClientError('');
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              <div className="flex justify-end mt-8">
                <button
                  className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow disabled:opacity-50"
                  disabled={!selectedClientId}
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </div>
          )}
          {step === 1 && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Project Type*</label>
              <select
                className="w-full px-4 py-3 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm hover:border-gray-300"
                value={projectType}
                onChange={e => setProjectType(e.target.value)}
              >
                <option value="">Select a project type</option>
                {Object.keys(PROJECT_TYPE_STAGES).map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Project Name</label>
                <input
                  className="w-full px-4 py-3 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm hover:border-gray-300"
                  placeholder="Enter project name (optional)"
                  value={projectName}
                  onChange={e => setProjectName(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  className="w-full px-4 py-3 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm hover:border-gray-300 resize-none"
                  placeholder="Describe the project (optional)"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="flex justify-between mt-8">
                <button className="px-6 py-2 border border-gray-300 rounded-xl" onClick={handleBack}>Back</button>
                <button
                  className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow disabled:opacity-50"
                  disabled={!projectType}
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Stages</h3>
              {projectType === 'Website' && currentSectionIdx === 0 && (
                <div className="mb-8">
                  <div className="text-gray-800 font-semibold mb-2">Reference links to sites the client likes</div>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="url"
                      className="px-2 py-1 border border-gray-200 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter reference link (e.g. https://example.com)"
                      value={websiteStepData['reference-links-input'] || ''}
                      onChange={e => setWebsiteStepData(d => ({ ...d, ['reference-links-input']: e.target.value }))}
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const val = (websiteStepData['reference-links-input'] || '').trim();
                          if (val) {
                            setWebsiteStepData(d => ({
                              ...d,
                              ['reference-links']: [...(d['reference-links'] || []), val],
                              ['reference-links-input']: ''
                            }));
                          }
                        }
                      }}
                    />
                    <button
                      className="px-4 py-1 bg-blue-600 text-white rounded"
                      type="button"
                      onClick={() => {
                        const val = (websiteStepData['reference-links-input'] || '').trim();
                        if (val) {
                          setWebsiteStepData(d => ({
                            ...d,
                            ['reference-links']: [...(d['reference-links'] || []), val],
                            ['reference-links-input']: ''
                          }));
                        }
                      }}
                    >
                      Add Link
                    </button>
                  </div>
                  <ul className="flex flex-wrap gap-2 mt-2">
                    {(websiteStepData['reference-links'] || []).map((link: string, idx: number) => (
                      <li key={idx} className="bg-blue-50 border border-blue-200 rounded px-3 py-1 flex items-center gap-2">
                        <span>{link}</span>
                        <button
                          type="button"
                          className="text-red-500 hover:text-red-700 text-lg font-bold"
                          onClick={() => setWebsiteStepData(d => ({
                            ...d,
                            ['reference-links']: d['reference-links'].filter((_: string, i: number) => i !== idx)
                          }))}
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {projectType === 'Website' ? (
                  (() => {
                    const sections = Array.isArray(PROJECT_TYPE_STAGES['Website']) ? PROJECT_TYPE_STAGES['Website'] : [];
                    const section = sections[currentSectionIdx] || {};
                   if (section.title === 'AI Content Mapping') {
                     return (
                       <div className="mb-6">
                         <div className="font-semibold text-blue-700 mb-2 text-base">{currentSectionIdx + 1}. {section.title}</div>
                         <div className="mb-2">Write a prompt to the AI to generate a content outline or mapping for your project.</div>
                         <textarea
                           className="px-3 py-2 border border-gray-200 rounded w-full min-h-[100px] resize-vertical focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                           value={aiPrompt}
                           onChange={e => setAiPrompt(e.target.value)}
                           placeholder="e.g. Draft a homepage outline for a pharmacy website with online booking and product catalog."
                           disabled={aiLoading}
                         />
                         <button
                           className="px-4 py-2 bg-blue-600 text-white rounded shadow disabled:opacity-60"
                           type="button"
                           onClick={handleSendAiPrompt}
                           disabled={aiLoading || !aiPrompt.trim()}
                         >
                           {aiLoading ? (
                             <span className="flex items-center gap-2"><svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>Sending...</span>
                           ) : 'Send'}
                         </button>
                         {aiError && (
                           <div className="mt-4 text-red-600 bg-red-50 border border-red-200 rounded p-3">{aiError}</div>
                         )}
                         {aiResponse && (
                           <div className="mt-4 bg-gray-50 border border-gray-200 rounded p-4">
                             <div className="font-semibold text-gray-700 mb-1">AI Response:</div>
                             <div className="text-gray-800 whitespace-pre-line">{aiResponse}</div>
                           </div>
                         )}
                       </div>
                     );
                   }
                   return (
                     <div className="mb-6">
                       <div className="font-semibold text-blue-700 mb-2 text-base">{currentSectionIdx + 1}. {section.title}</div>
                       <ul className="space-y-2 ml-4">
                         {Array.isArray(section.steps) && section.steps.map((step: any, idx: number) => {
                           const stepKey = `${currentSectionIdx}-${idx}`;
                           const value = websiteStepData[stepKey] || '';
                           return (
                             <li key={idx} className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-4 flex flex-col gap-2">
                               {step.type === 'textarea' ? (
                                 <>
                                   <div className="text-gray-800 font-semibold mb-2">{step.label}</div>
                                   <textarea
                                     className="px-3 py-2 border border-gray-200 rounded w-full min-h-[180px] resize-vertical focus:outline-none focus:ring-2 focus:ring-blue-500"
                                     value={value}
                                     onChange={e => setWebsiteStepData(d => ({ ...d, [stepKey]: e.target.value }))}
                                     placeholder="Enter detailed information..."
                                   />
                                 </>
                               ) : step.type === 'radio' ? (
                                 <>
                                   <div className="text-gray-800 font-semibold mb-2">{step.label}</div>
                                   <div className="flex flex-wrap gap-4">
                                     {step.options.map((opt: string) => (
                                       <label key={opt} className="flex items-center cursor-pointer">
                                         <input
                                           type="radio"
                                           name={stepKey}
                                           value={opt}
                                           checked={value === opt}
                                           onChange={e => setWebsiteStepData(d => ({ ...d, [stepKey]: e.target.value }))}
                                           className="form-radio h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                                           style={{ borderRadius: '50%' }}
                                         />
                                         <span className="ml-2 text-gray-700">{opt}</span>
                                       </label>
                                     ))}
                                   </div>
                                 </>
                               ) : step.type === 'pages' && (
                                 <>
                                   <div className="text-gray-800 font-semibold mb-2">{step.label}</div>
                                   <div className="flex gap-2 mb-2">
                                     <input
                                       type="text"
                                       className="px-2 py-1 border border-gray-200 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                       placeholder="Enter page name (e.g. Home, About, Contact)"
                                       value={websiteStepData[`${stepKey}-input`] || ''}
                                       onChange={e => setWebsiteStepData(d => ({ ...d, [`${stepKey}-input`]: e.target.value }))}
                                       onKeyDown={e => {
                                         if (e.key === 'Enter') {
                                           e.preventDefault();
                                           const val = (websiteStepData[`${stepKey}-input`] || '').trim();
                                           if (val) {
                                             setWebsiteStepData(d => ({
                                               ...d,
                                               [stepKey]: [...(d[stepKey] || []), val],
                                               [`${stepKey}-input`]: ''
                                             }));
                                           }
                                         }
                                       }}
                                     />
                                     <button
                                       className="px-4 py-1 bg-blue-600 text-white rounded"
                                       type="button"
                                       onClick={() => {
                                         const val = (websiteStepData[`${stepKey}-input`] || '').trim();
                                         if (val) {
                                           setWebsiteStepData(d => ({
                                             ...d,
                                             [stepKey]: [...(d[stepKey] || []), val],
                                             [`${stepKey}-input`]: ''
                                           }));
                                         }
                                       }}
                                     >
                                       Add Page
                                     </button>
                                   </div>
                                   <ul className="flex flex-wrap gap-2 mt-2">
                                     {(websiteStepData[stepKey] || []).map((page: string, idx: number) => (
                                       <li key={idx} className="bg-blue-50 border border-blue-200 rounded px-3 py-1 flex items-center gap-2">
                                         <span>{page}</span>
                                         <button
                                           type="button"
                                           className="text-red-500 hover:text-red-700 text-lg font-bold"
                                           onClick={() => setWebsiteStepData(d => ({
                                             ...d,
                                             [stepKey]: d[stepKey].filter((_: string, i: number) => i !== idx)
                                           }))}
                                         >
                                           ×
                                         </button>
                                       </li>
                                     ))}
                                   </ul>
                                 </>
                               )
                               }
                             </li>
                           );
                         })}
                       </ul>
                     </div>
                   );
                  })()
                ) : (
                <ul className="space-y-2">
                  {stages.map((stage, idx) => (
                    <li key={idx} className="bg-gray-100 rounded-md px-4 py-2">{stage}</li>
                  ))}
                </ul>
              )}
              <div className="flex justify-between mt-8">
                <button
                  className="px-6 py-2 border border-gray-300 rounded-xl"
                  onClick={() => {
                    if (projectType === 'Website' && currentSectionIdx > 0) {
                      setCurrentSectionIdx(i => i - 1);
                    } else {
                      handleBack();
                    }
                  }}
                >
                  Back
                </button>
                <button
                  className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow disabled:opacity-50"
                  onClick={() => {
                    if (projectType === 'Website' && currentSectionIdx < (PROJECT_TYPE_STAGES['Website']?.length - 1)) {
                      setCurrentSectionIdx(i => i + 1);
                    } else {
                      handleNext();
                    }
                  }}
                >
                  {projectType === 'Website' && currentSectionIdx < (PROJECT_TYPE_STAGES['Website']?.length - 1) ? 'Next Section' : 'Next'}
                </button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm & Create Project</h3>
              <div className="space-y-4 bg-gray-50 p-4 rounded-xl">
                <div><strong>Client:</strong> {selectedClient?.name}</div>
                <div><strong>Project Type:</strong> {projectType}</div>
                <div><strong>Project Name:</strong> {projectName || `${projectType} Project`}</div>
                <div><strong>Description:</strong> {description || 'N/A'}</div>
                <div><strong>Stages:</strong> {stages.length > 0 ? stages.join(', ') : 'N/A'}</div>
              </div>
              <div className="flex justify-between mt-8">
                <button className="px-6 py-2 border border-gray-300 rounded-xl" onClick={handleBack}>Back</button>
                <button
                  className="px-6 py-2 bg-green-600 text-white rounded-xl shadow"
                  onClick={handleCreate}
                >
                  Confirm & Create
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
