import React, { useState } from 'react';
import { Client, Lead } from '../../types';
import { mockClients } from '../../data/mockData';
import { countries } from 'countries-list';
import { Save, X, CheckCircle } from 'lucide-react';

const steps = ['Contact Information', 'Company Details', 'Lead Details', 'Review & Save'];

interface LeadWizardModalProps {
  open: boolean;
  onClose: () => void;
  onComplete: (lead: Lead) => void;
}

const LeadWizardModal: React.FC<LeadWizardModalProps> = ({ open, onClose, onComplete }) => {
  const [step, setStep] = useState(0);
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [formData, setFormData] = useState({
    // Contact Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '+267',
    
    // Company Details
    company: '',
    designation: '',
    address: '',
    website: '',
    
    // Lead Details
    source: 'Website',
    value: 0,
    notes: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    tags: [] as string[],
    
    // Additional
    referredBy: '',
    industry: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  const validateStep = (stepIndex: number) => {
    const newErrors: Record<string, string> = {};
    
    if (stepIndex === 0) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    }
    
    if (stepIndex === 1) {
      if (!formData.company.trim()) newErrors.company = 'Company name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProgress = async () => {
    if (!validateStep(0)) return;
    
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newLead: Lead = {
      id: Date.now().toString(),
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: `${formData.countryCode} ${formData.phone}`,
      company: formData.company || 'Unknown Company',
      status: 'new',
      source: formData.source,
      value: formData.value || 0,
      createdAt: new Date().toISOString().split('T')[0],
      lastContact: new Date().toISOString().split('T')[0],
      notes: formData.notes || 'Lead saved in progress',
      tags: formData.tags,
      assignedTo: 'Unassigned',
      owner: 'Current User',
      nextAction: 'Send Quotation',
      lastActivity: new Date().toISOString().split('T')[0],
    };
    
    onComplete(newLead);
    setIsSaving(false);
    setShowSaveSuccess(true);
    
    setTimeout(() => {
      setShowSaveSuccess(false);
      onClose();
      // Reset form
      setFormData({
        firstName: '', lastName: '', email: '', phone: '', countryCode: '+267',
        company: '', designation: '', address: '', website: '',
        source: 'Website', value: 0, notes: '', priority: 'medium', tags: [],
        referredBy: '', industry: '',
      });
      setStep(0);
    }, 1500);
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(s => s + 1);
    }
  };

  const handleBack = () => setStep(s => s - 1);

  const handleFinalSave = () => {
    if (validateStep(step)) {
      handleSaveProgress();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 px-8 py-7">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Add New Lead</h2>
              <p className="text-blue-100 text-sm">Capture and manage potential customers</p>
            </div>
            <button onClick={onClose} className="text-white text-3xl hover:text-blue-200 focus:outline-none">
              <X size={28} />
            </button>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center mt-6 space-x-0 justify-center">
            {steps.map((label, idx) => (
              <React.Fragment key={label}>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 flex items-center justify-center rounded-full border-4 transition-all duration-300 ${
                    step === idx 
                      ? 'border-white bg-white text-blue-600 shadow-lg' 
                      : step > idx 
                        ? 'border-green-400 bg-green-400 text-white' 
                        : 'border-blue-200 bg-blue-100 text-blue-400'
                  } font-bold text-lg`}>
                    {step > idx ? (
                      <CheckCircle size={20} />
                    ) : (
                      idx + 1
                    )}
                  </div>
                  <span className={`mt-2 text-xs font-medium ${step === idx ? 'text-white' : 'text-blue-100'}`}>
                    {label}
                  </span>
                </div>
                {idx < steps.length - 1 && <div className="w-8 h-1 bg-blue-200 mx-1 rounded" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white px-8 py-10 rounded-b-3xl">
          {/* Success Message */}
          {showSaveSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-3">
              <CheckCircle className="text-green-600" size={24} />
              <div>
                <h4 className="font-semibold text-green-800">Lead Saved Successfully!</h4>
                <p className="text-green-600 text-sm">The lead has been added to your pipeline with status "New"</p>
              </div>
            </div>
          )}

          {/* Step 0: Contact Information */}
          {step === 0 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        errors.firstName ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      placeholder="Enter first name"
                    />
                    {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        errors.lastName ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      placeholder="Enter last name"
                    />
                    {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      placeholder="Enter email address"
                    />
                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <div className="flex">
                      <select
                        value={formData.countryCode}
                        onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                        className="w-32 px-3 py-3 border border-r-0 border-gray-200 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                      >
                        {Object.entries(countries).slice(0, 20).map(([code, country]) => (
                          <option key={code} value={`+${country.phone[0]}`}>
                            {code} +{country.phone[0]}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="flex-1 px-4 py-3 border border-gray-200 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between pt-6">
                <button
                  onClick={onClose}
                  className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <div className="flex space-x-3">
                  <button
                    onClick={handleSaveProgress}
                    disabled={isSaving}
                    className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium flex items-center space-x-2 disabled:opacity-50"
                  >
                    <Save size={18} />
                    <span>{isSaving ? 'Saving...' : 'Save Progress'}</span>
                  </button>
                  <button
                    onClick={handleNext}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Company Details */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Company Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name *</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        errors.company ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      placeholder="Enter company name"
                    />
                    {errors.company && <p className="text-red-600 text-sm mt-1">{errors.company}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Designation</label>
                    <input
                      type="text"
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
                      placeholder="Enter job title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Industry</label>
                    <select
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
                    >
                      <option value="">Select industry</option>
                      <option value="Technology">Technology</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Finance">Finance</option>
                      <option value="Education">Education</option>
                      <option value="Retail">Retail</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Website</label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
                      placeholder="https://company.com"
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Company Address</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all resize-none"
                    placeholder="Enter company address"
                  />
                </div>
              </div>
              
              <div className="flex justify-between pt-6">
                <button
                  onClick={handleBack}
                  className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Lead Details */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Lead Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Lead Source</label>
                    <select
                      value={formData.source}
                      onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
                    >
                      <option value="Website">Website</option>
                      <option value="Referral">Referral</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Cold Email">Cold Email</option>
                      <option value="Google Ads">Google Ads</option>
                      <option value="Trade Show">Trade Show</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Estimated Value</label>
                    <input
                      type="number"
                      value={formData.value}
                      onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Priority</label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'low' | 'medium' | 'high' })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Referred By</label>
                    <input
                      type="text"
                      value={formData.referredBy}
                      onChange={(e) => setFormData({ ...formData, referredBy: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
                      placeholder="Enter referrer name"
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all resize-none"
                    placeholder="Add any additional notes about this lead..."
                  />
                </div>
              </div>
              
              <div className="flex justify-between pt-6">
                <button
                  onClick={handleBack}
                  className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                >
                  Review
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review & Save */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Review & Save</h3>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}</p>
                        <p><span className="font-medium">Email:</span> {formData.email}</p>
                        <p><span className="font-medium">Phone:</span> {formData.countryCode} {formData.phone}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Company Details</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Company:</span> {formData.company}</p>
                        <p><span className="font-medium">Designation:</span> {formData.designation || 'N/A'}</p>
                        <p><span className="font-medium">Industry:</span> {formData.industry || 'N/A'}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Lead Details</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Source:</span> {formData.source}</p>
                        <p><span className="font-medium">Value:</span> ${formData.value.toLocaleString()}</p>
                        <p><span className="font-medium">Priority:</span> {formData.priority}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Additional Info</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Status:</span> New</p>
                        <p><span className="font-medium">Next Action:</span> Send Quotation</p>
                        <p><span className="font-medium">Referred By:</span> {formData.referredBy || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                  
                  {formData.notes && (
                    <div className="mt-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Notes</h4>
                      <p className="text-sm text-gray-700 bg-white p-3 rounded-lg">{formData.notes}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between pt-6">
                <button
                  onClick={handleBack}
                  className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Back
                </button>
                <button
                  onClick={handleFinalSave}
                  disabled={isSaving}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all font-medium flex items-center space-x-2 disabled:opacity-50 shadow-lg"
                >
                  <Save size={18} />
                  <span>{isSaving ? 'Saving Lead...' : 'Save Lead'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadWizardModal;