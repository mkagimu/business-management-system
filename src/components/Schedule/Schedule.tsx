import React, { useState } from 'react';
import { 
  Clock, 
  Plus, 
  Calendar,
  CheckCircle,
  AlertTriangle,
  User,
  Tag,
  Filter,
  Search
} from 'lucide-react';

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');

  const mockTasks = [
    {
      id: '1',
      title: 'Review project proposals',
      description: 'Go through the new project proposals from potential clients',
      startTime: '09:00',
      endTime: '10:30',
      priority: 'high',
      status: 'pending',
      assignee: 'John Doe',
      project: 'Business Development',
      tags: ['review', 'proposals']
    },
    {
      id: '2',
      title: 'Team standup meeting',
      description: 'Daily standup with the development team',
      startTime: '10:30',
      endTime: '11:00',
      priority: 'medium',
      status: 'completed',
      assignee: 'Jane Smith',
      project: 'Team Management',
      tags: ['meeting', 'daily']
    },
    {
      id: '3',
      title: 'Client presentation preparation',
      description: 'Prepare slides and demo for TechCorp presentation',
      startTime: '11:00',
      endTime: '13:00',
      priority: 'high',
      status: 'in-progress',
      assignee: 'Mike Johnson',
      project: 'TechCorp Project',
      tags: ['presentation', 'client']
    },
    {
      id: '4',
      title: 'Lunch break',
      description: 'Team lunch at the new restaurant',
      startTime: '13:00',
      endTime: '14:00',
      priority: 'low',
      status: 'pending',
      assignee: 'Team',
      project: 'Personal',
      tags: ['break', 'team']
    },
    {
      id: '5',
      title: 'Code review session',
      description: 'Review pull requests and provide feedback',
      startTime: '14:00',
      endTime: '15:30',
      priority: 'medium',
      status: 'pending',
      assignee: 'Alice Brown',
      project: 'Development',
      tags: ['code', 'review']
    },
    {
      id: '6',
      title: 'Client call - StartupCo',
      description: 'Weekly check-in call with StartupCo team',
      startTime: '15:30',
      endTime: '16:30',
      priority: 'high',
      status: 'pending',
      assignee: 'Bob Wilson',
      project: 'StartupCo Project',
      tags: ['call', 'client']
    },
    {
      id: '7',
      title: 'Documentation update',
      description: 'Update project documentation and user guides',
      startTime: '16:30',
      endTime: '17:30',
      priority: 'low',
      status: 'pending',
      assignee: 'Carol Davis',
      project: 'Documentation',
      tags: ['docs', 'update']
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle size={16} className="text-green-600" />;
      case 'in-progress': return <Clock size={16} className="text-blue-600" />;
      case 'pending': return <AlertTriangle size={16} className="text-yellow-600" />;
      default: return <Clock size={16} className="text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return `${hour}:00`;
  });

  const getTasksForTimeSlot = (time: string) => {
    return mockTasks.filter(task => {
      const taskStart = task.startTime;
      const taskEnd = task.endTime;
      return time >= taskStart && time < taskEnd;
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
            Daily Schedule
          </h1>
          <p className="text-gray-600 mt-1">Manage your daily tasks and timeline</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-4 py-2 rounded-xl hover:from-amber-700 hover:to-yellow-700 transition-all flex items-center space-x-2 shadow-lg">
            <Plus size={20} />
            <span>Add Task</span>
          </button>
          <div className="flex items-center bg-white/20 backdrop-blur-md rounded-xl p-1 border border-white/30">
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'day' 
                  ? 'bg-white/30 text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'week' 
                  ? 'bg-white/30 text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Week
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">{mockTasks.length}</div>
              <div className="text-gray-600 text-sm">Total Tasks</div>
            </div>
            <Clock size={32} className="text-amber-500" />
          </div>
        </div>
        
        <div className="bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {mockTasks.filter(t => t.status === 'completed').length}
              </div>
              <div className="text-gray-600 text-sm">Completed</div>
            </div>
            <CheckCircle size={32} className="text-green-500" />
          </div>
        </div>
        
        <div className="bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {mockTasks.filter(t => t.status === 'in-progress').length}
              </div>
              <div className="text-gray-600 text-sm">In Progress</div>
            </div>
            <Clock size={32} className="text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-red-600">
                {mockTasks.filter(t => t.priority === 'high').length}
              </div>
              <div className="text-gray-600 text-sm">High Priority</div>
            </div>
            <AlertTriangle size={32} className="text-red-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Timeline */}
        <div className="lg:col-span-3">
          <div className="bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl overflow-hidden">
            <div className="p-6 border-b border-white/20">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h2>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                    <Calendar size={20} />
                  </button>
                  <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                    <Filter size={20} />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 max-h-[600px] overflow-y-auto">
              <div className="space-y-2">
                {timeSlots.filter((_, index) => index >= 8 && index <= 18).map(time => {
                  const tasksAtTime = getTasksForTimeSlot(time);
                  
                  return (
                    <div key={time} className="flex items-start space-x-4 min-h-[60px]">
                      <div className="w-16 text-sm font-medium text-gray-600 pt-2">
                        {time}
                      </div>
                      <div className="flex-1 space-y-2">
                        {tasksAtTime.map(task => (
                          <div
                            key={task.id}
                            className={`p-4 rounded-lg border-l-4 ${getPriorityColor(task.priority)} hover:shadow-md transition-all cursor-pointer`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900 mb-1">{task.title}</h4>
                                <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                                <div className="flex items-center space-x-4 text-xs text-gray-500">
                                  <span>{task.startTime} - {task.endTime}</span>
                                  <span className="flex items-center space-x-1">
                                    <User size={12} />
                                    <span>{task.assignee}</span>
                                  </span>
                                  <span>{task.project}</span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                                  {task.status}
                                </span>
                                {getStatusIcon(task.status)}
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {task.tags.map((tag, index) => (
                                <span key={index} className="px-2 py-1 bg-white/50 text-gray-700 rounded-full text-xs">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                        {tasksAtTime.length === 0 && (
                          <div className="h-4 border-l-2 border-dashed border-gray-300 ml-2"></div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Task Summary */}
          <div className="bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Completed</span>
                <span className="font-medium text-green-600">
                  {mockTasks.filter(t => t.status === 'completed').length}/{mockTasks.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full"
                  style={{ 
                    width: `${(mockTasks.filter(t => t.status === 'completed').length / mockTasks.length) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Priority Tasks */}
          <div className="bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">High Priority</h3>
            <div className="space-y-3">
              {mockTasks.filter(t => t.priority === 'high').map(task => (
                <div key={task.id} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 text-sm">{task.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">{task.startTime} - {task.endTime}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full p-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium">
                Add Break
              </button>
              <button className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                Schedule Meeting
              </button>
              <button className="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                Mark Complete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;