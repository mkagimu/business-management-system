import React, { useState } from 'react';
import { Users, Calendar, Award, Clock, Plus, Search, Mail, Phone, MapPin } from 'lucide-react';
import { Employee } from '../../types';
import { mockEmployees } from '../../data/mockData';

const HR = () => {
  const [employees] = useState<Employee[]>(mockEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = !departmentFilter || employee.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const departments = [...new Set(employees.map(e => e.department))];
  const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);
  const avgSalary = Math.round(totalSalary / employees.length);

  const upcomingEvents = [
    { id: '1', title: 'Team Meeting', date: '2024-01-25', time: '10:00 AM', type: 'meeting' },
    { id: '2', title: 'Performance Review - John Doe', date: '2024-01-26', time: '2:00 PM', type: 'review' },
    { id: '3', title: 'New Employee Orientation', date: '2024-01-28', time: '9:00 AM', type: 'orientation' },
    { id: '4', title: 'Department Sync - Engineering', date: '2024-01-29', time: '3:00 PM', type: 'meeting' },
    { id: '5', title: 'Quarterly Planning Session', date: '2024-01-30', time: '1:00 PM', type: 'planning' }
  ];

  const getEventColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800';
      case 'review': return 'bg-purple-100 text-purple-800';
      case 'orientation': return 'bg-green-100 text-green-800';
      case 'planning': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const EmployeeModal = ({ employee, onClose }: { employee: Employee; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-700 text-xl font-medium">{employee.avatar}</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{employee.name}</h3>
              <p className="text-gray-600">{employee.position}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-gray-400" />
                <span className="text-gray-700">{employee.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-gray-400" />
                <span className="text-gray-700">{employee.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users size={16} className="text-gray-400" />
                <span className="text-gray-700">{employee.department}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Employment Details</h4>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600">Join Date</label>
                <p className="font-medium">{new Date(employee.joinDate).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Salary</label>
                <p className="font-medium">${employee.salary.toLocaleString()}/year</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Status</label>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  employee.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {employee.status}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="font-medium text-gray-900 mb-3">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {employee.skills.map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="font-medium text-gray-900 mb-3">Current Projects</h4>
          <div className="space-y-2">
            {employee.projects.map((projectId, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Project #{projectId}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Close
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Edit Employee
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Human Resources</h1>
          <p className="text-gray-600 mt-1">Manage employees, schedules, and HR processes</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus size={20} />
          <span>Add Employee</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="text-blue-600" size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{employees.length}</div>
              <div className="text-sm text-gray-600">Total Employees</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-full">
              <Award className="text-green-600" size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{departments.length}</div>
              <div className="text-sm text-gray-600">Departments</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-yellow-100 rounded-full">
              <Calendar className="text-yellow-600" size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{upcomingEvents.length}</div>
              <div className="text-sm text-gray-600">Upcoming Events</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 rounded-full">
              <Clock className="text-purple-600" size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">${avgSalary.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Avg Salary</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Employee Directory */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Employee Directory</h3>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredEmployees.map((employee) => (
              <div key={employee.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                   onClick={() => setSelectedEmployee(employee)}>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-700 font-medium">{employee.avatar}</span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{employee.name}</h4>
                      <p className="text-sm text-gray-600">{employee.position}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-900">{employee.department}</p>
                      <p className="text-sm text-gray-600">Joined {new Date(employee.joinDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{employee.email}</span>
                      <span>{employee.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        employee.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {employee.status}
                      </span>
                      <span className="text-sm text-gray-600">${employee.salary.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Upcoming Events</h3>
          
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{event.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventColor(event.type)}`}>
                    {event.type}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={14} />
                    <span>{event.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
            View All Events
          </button>
        </div>
      </div>

      {/* Department Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Department Overview</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {departments.map(department => {
            const deptEmployees = employees.filter(emp => emp.department === department);
            const deptSalary = deptEmployees.reduce((sum, emp) => sum + emp.salary, 0);
            const avgDeptSalary = Math.round(deptSalary / deptEmployees.length);
            
            return (
              <div key={department} className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">{department}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Employees:</span>
                    <span className="font-medium">{deptEmployees.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Avg Salary:</span>
                    <span className="font-medium">${avgDeptSalary.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Cost:</span>
                    <span className="font-medium">${deptSalary.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Employee Detail Modal */}
      {selectedEmployee && (
        <EmployeeModal 
          employee={selectedEmployee} 
          onClose={() => setSelectedEmployee(null)} 
        />
      )}
    </div>
  );
};

export default HR;