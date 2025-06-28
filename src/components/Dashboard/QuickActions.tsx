import React from 'react';
import { Plus, UserPlus, FolderPlus, FileText, MessageSquare } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      icon: UserPlus,
      title: 'Add New Lead',
      description: 'Create a new lead entry',
      color: 'text-blue-600 bg-blue-50 hover:bg-blue-100',
      border: 'border-blue-200'
    },
    {
      icon: FolderPlus,
      title: 'Create Project',
      description: 'Start a new project',
      color: 'text-purple-600 bg-purple-50 hover:bg-purple-100',
      border: 'border-purple-200'
    },
    {
      icon: FileText,
      title: 'Generate Invoice',
      description: 'Create new invoice',
      color: 'text-green-600 bg-green-50 hover:bg-green-100',
      border: 'border-green-200'
    },
    {
      icon: MessageSquare,
      title: 'Contact Client',
      description: 'Send message or email',
      color: 'text-orange-600 bg-orange-50 hover:bg-orange-100',
      border: 'border-orange-200'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
      
      <div className="space-y-3">
        {actions.map((action, index) => (
          <button
            key={index}
            className={`w-full p-4 rounded-lg border ${action.border} ${action.color} transition-all duration-200 hover:shadow-sm`}
          >
            <div className="flex items-center space-x-3">
              <action.icon size={20} />
              <div className="text-left">
                <p className="font-medium">{action.title}</p>
                <p className="text-sm opacity-75">{action.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Upcoming Deadlines</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Website Design Review</span>
            <span className="text-red-600 font-medium">Today</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Client Presentation</span>
            <span className="text-orange-600 font-medium">Tomorrow</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Project Milestone</span>
            <span className="text-gray-600">3 days</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;