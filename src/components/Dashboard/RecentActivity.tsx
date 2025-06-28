import React from 'react';
import { Clock, User, FolderOpen, CheckSquare, DollarSign } from 'lucide-react';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'lead',
      icon: User,
      title: 'New lead: Sarah Johnson',
      description: 'Interested in web development services',
      time: '2 minutes ago',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      id: 2,
      type: 'project',
      icon: FolderOpen,
      title: 'Project "E-commerce Platform" updated',
      description: 'Moved to development phase',
      time: '15 minutes ago',
      color: 'text-purple-600 bg-purple-100'
    },
    {
      id: 3,
      type: 'task',
      icon: CheckSquare,
      title: 'Task completed: UI Design Review',
      description: 'By Alex Martinez',
      time: '1 hour ago',
      color: 'text-green-600 bg-green-100'
    },
    {
      id: 4,
      type: 'payment',
      icon: DollarSign,
      title: 'Payment received: $2,500',
      description: 'From TechCorp Inc.',
      time: '2 hours ago',
      color: 'text-emerald-600 bg-emerald-100'
    },
    {
      id: 5,
      type: 'project',
      icon: FolderOpen,
      title: 'New project created: Mobile App',
      description: 'For RetailPlus client',
      time: '3 hours ago',
      color: 'text-indigo-600 bg-indigo-100'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View all
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150">
            <div className={`p-2 rounded-full ${activity.color}`}>
              <activity.icon size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.title}</p>
              <p className="text-sm text-gray-600">{activity.description}</p>
              <div className="flex items-center mt-1">
                <Clock size={12} className="text-gray-400 mr-1" />
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;