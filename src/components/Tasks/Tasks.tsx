import React, { useState } from 'react';
import { Plus, Search, Calendar, User, AlertCircle, Clock, CheckCircle2, Filter } from 'lucide-react';
import { Task } from '../../types';
import { mockTasks } from '../../data/mockData';

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [activeView, setActiveView] = useState<'board' | 'list' | 'calendar'>('board');
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [assigneeFilter, setAssigneeFilter] = useState('');

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = !priorityFilter || task.priority === priorityFilter;
    const matchesAssignee = !assigneeFilter || task.assignee.toLowerCase().includes(assigneeFilter.toLowerCase());
    return matchesSearch && matchesPriority && matchesAssignee;
  });

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityIcon = (priority: Task['priority']) => {
    return priority === 'high' ? AlertCircle : null;
  };

  const updateTaskStatus = (taskId: string, newStatus: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const tasksByStatus = {
    pending: filteredTasks.filter(task => task.status === 'pending'),
    'in-progress': filteredTasks.filter(task => task.status === 'in-progress'),
    completed: filteredTasks.filter(task => task.status === 'completed')
  };

  const getTaskProgress = (task: Task) => {
    if (task.actualHours && task.estimatedHours) {
      return Math.min((task.actualHours / task.estimatedHours) * 100, 100);
    }
    return task.status === 'completed' ? 100 : task.status === 'in-progress' ? 50 : 0;
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString();
  };

  const TaskCard = ({ task }: { task: Task }) => {
    const PriorityIcon = getPriorityIcon(task.priority);
    const progress = getTaskProgress(task);
    const overdue = isOverdue(task.dueDate) && task.status !== 'completed';
    
    return (
      <div className={`bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow duration-200 ${
        overdue ? 'border-red-200 bg-red-50' : 'border-gray-200'
      }`}>
        <div className="flex items-start justify-between mb-3">
          <h4 className="font-medium text-gray-900 line-clamp-2">{task.title}</h4>
          <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${getPriorityColor(task.priority)}`}>
            {PriorityIcon && <PriorityIcon size={12} className="mr-1" />}
            {task.priority}
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
        
        {/* Progress Bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Progress</span>
            <span className="text-xs text-gray-500">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className={`h-1.5 rounded-full ${
                task.status === 'completed' ? 'bg-green-500' : 
                task.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-400'
              }`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="space-y-2 mb-3">
          <div className="flex items-center text-sm text-gray-600">
            <User size={14} className="mr-2" />
            <span>{task.assignee}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar size={14} className="mr-2" />
            <span className={overdue ? 'text-red-600 font-medium' : ''}>
              {new Date(task.dueDate).toLocaleDateString()}
              {overdue && ' (Overdue)'}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock size={14} className="mr-2" />
            <span>
              {task.actualHours ? `${task.actualHours}h` : '0h'} / {task.estimatedHours}h
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">{task.projectName}</span>
          <select
            value={task.status}
            onChange={(e) => updateTaskStatus(task.id, e.target.value as Task['status'])}
            className="text-xs border border-gray-300 rounded px-2 py-1"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        {/* Tags */}
        {task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {task.tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  };

  const ListView = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Task</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Project</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Assignee</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Priority</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Due Date</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Progress</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => {
              const progress = getTaskProgress(task);
              const overdue = isOverdue(task.dueDate) && task.status !== 'completed';
              
              return (
                <tr key={task.id} className={`border-b border-gray-100 hover:bg-gray-50 ${
                  overdue ? 'bg-red-50' : ''
                }`}>
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{task.title}</div>
                      <div className="text-sm text-gray-600 line-clamp-1">{task.description}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{task.projectName}</td>
                  <td className="py-4 px-4 text-sm text-gray-900">{task.assignee}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                      {task.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`text-sm ${overdue ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
                      {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            task.status === 'completed' ? 'bg-green-500' : 
                            task.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-400'
                          }`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">{Math.round(progress)}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-600 mt-1">Manage and track project tasks across your team</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveView('board')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeView === 'board' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Board
            </button>
            <button
              onClick={() => setActiveView('list')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeView === 'list' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              List
            </button>
            <button
              onClick={() => setActiveView('calendar')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeView === 'calendar' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Calendar
            </button>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus size={20} />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{filteredTasks.length}</div>
          <div className="text-sm text-gray-600">Total Tasks</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">{tasksByStatus['in-progress'].length}</div>
          <div className="text-sm text-gray-600">In Progress</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-green-600">{tasksByStatus.completed.length}</div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-red-600">
            {filteredTasks.filter(t => isOverdue(t.dueDate) && t.status !== 'completed').length}
          </div>
          <div className="text-sm text-gray-600">Overdue</div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
          />
        </div>
        <select 
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <input
          type="text"
          placeholder="Filter by assignee..."
          value={assigneeFilter}
          onChange={(e) => setAssigneeFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Task Views */}
      {activeView === 'board' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pending Column */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              Pending
              <span className="ml-2 px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">
                {tasksByStatus.pending.length}
              </span>
            </h3>
            <div className="space-y-4">
              {tasksByStatus.pending.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>

          {/* In Progress Column */}
          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              In Progress
              <span className="ml-2 px-2 py-1 bg-blue-200 text-blue-700 text-xs rounded-full">
                {tasksByStatus['in-progress'].length}
              </span>
            </h3>
            <div className="space-y-4">
              {tasksByStatus['in-progress'].map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>

          {/* Completed Column */}
          <div className="bg-green-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              Completed
              <span className="ml-2 px-2 py-1 bg-green-200 text-green-700 text-xs rounded-full">
                {tasksByStatus.completed.length}
              </span>
            </h3>
            <div className="space-y-4">
              {tasksByStatus.completed.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        </div>
      )}

      {activeView === 'list' && <ListView />}

      {/* Calendar View */}
      {activeView === 'calendar' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-center py-12">
            <Calendar size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Calendar View</h3>
            <p className="text-gray-600">Calendar integration coming soon</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;