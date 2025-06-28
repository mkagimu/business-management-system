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
      case 'completed': return 'bg-green-100 text-green-800 border-green-400';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-400';
      default: return 'bg-gray-100 text-gray-800 border-gray-400';
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
    <div className="space-y-6 p-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900">
            Daily Schedule
          </h1>
          <p className="text-slate-700 mt-1 font-medium">Manage your daily tasks and timeline</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-all flex items-center space-x-2 border-2 border-amber-600 font-bold shadow-lg">
            <Plus size={20} />
            <span>Add Task</span>
          </button>
          <div className="flex items-center bg-white rounded-lg p-1 border-2 border-slate-300">
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-1 rounded-md text-sm font-bold transition-all border ${
                viewMode === 'day' 
                  ? 'bg-slate-100 text-slate-900 border-slate-400' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border-transparent'
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1 rounded-md text-sm font-bold transition-all border ${
                viewMode === 'week' 
                  ? 'bg-slate-100 text-slate-900 border-slate-400' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border-transparent'
              }`}
            >
              Week
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border-2 border-slate-300 shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-black text-slate-900">{mockTasks.length}</div>
              <div className="text-slate-600 text-sm font-semibold">Total Tasks</div>
            </div>
            <Clock size={32} className="text-amber-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border-2 border-slate-300 shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-black text-green-600">
                {mockTasks.filter(t => t.status === 'completed').length}
              </div>
              <div className="text-slate-600 text-sm font-semibold">Completed</div>
            </div>
            <CheckCircle size={32} className="text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border-2 border-slate-300 shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-black text-blue-600">
                {mockTasks.filter(t => t.status === 'in-progress').length}
              </div>
              <div className="text-slate-600 text-sm font-semibold">In Progress</div>
            </div>
            <Clock size={32} className="text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border-2 border-slate-300 shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-black text-red-600">
                {mockTasks.filter(t => t.priority === 'high').length}
              </div>
              <div className="text-slate-600 text-sm font-semibold">High Priority</div>
            </div>
            <AlertTriangle size={32} className="text-red-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Timeline */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg border-2 border-slate-300 shadow-lg overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black text-slate-900">
                  {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h2>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors border border-slate-300">
                    <Calendar size={20} />
                  </button>
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors border border-slate-300">
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
                      <div className="w-16 text-sm font-black text-slate-600 pt-2">
                        {time}
                      </div>
                      <div className="flex-1 space-y-2">
                        {tasksAtTime.map(task => (
                          <div
                            key={task.id}
                            className={`p-4 rounded-lg border-l-4 border border-slate-200 ${getPriorityColor(task.priority)} hover:shadow-md transition-all cursor-pointer`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <h4 className="font-black text-slate-900 mb-1">{task.title}</h4>
                                <p className="text-sm text-slate-600 mb-2 font-medium">{task.description}</p>
                                <div className="flex items-center space-x-4 text-xs text-slate-500">
                                  <span className="font-medium">{task.startTime} - {task.endTime}</span>
                                  <span className="flex items-center space-x-1">
                                    <User size={12} />
                                    <span className="font-medium">{task.assignee}</span>
                                  </span>
                                  <span className="font-medium">{task.project}</span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-black border ${getStatusColor(task.status)}`}>
                                  {task.status}
                                </span>
                                {getStatusIcon(task.status)}
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {task.tags.map((tag, index) => (
                                <span key={index} className="px-2 py-1 bg-white text-slate-700 rounded-full text-xs font-medium border border-slate-300">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                        {tasksAtTime.length === 0 && (
                          <div className="h-4 border-l-2 border-dashed border-slate-300 ml-2"></div>
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
          <div className="bg-white rounded-lg border-2 border-slate-300 shadow-lg p-6">
            <h3 className="text-lg font-black text-slate-900 mb-4">Task Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 font-medium">Completed</span>
                <span className="font-black text-green-600">
                  {mockTasks.filter(t => t.status === 'completed').length}/{mockTasks.length}
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 border border-slate-300">
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
          <div className="bg-white rounded-lg border-2 border-slate-300 shadow-lg p-6">
            <h3 className="text-lg font-black text-slate-900 mb-4">High Priority</h3>
            <div className="space-y-3">
              {mockTasks.filter(t => t.priority === 'high').map(task => (
                <div key={task.id} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-bold text-slate-900 text-sm">{task.title}</h4>
                  <p className="text-xs text-slate-600 mt-1 font-medium">{task.startTime} - {task.endTime}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg border-2 border-slate-300 shadow-lg p-6">
            <h3 className="text-lg font-black text-slate-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full p-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-bold border-2 border-amber-600">
                Add Break
              </button>
              <button className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-bold border-2 border-blue-600">
                Schedule Meeting
              </button>
              <button className="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-bold border-2 border-green-600">
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