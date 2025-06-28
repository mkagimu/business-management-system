import React, { useState } from 'react';
import { 
  CalendarDays, 
  Plus, 
  Search, 
  Filter, 
  MapPin,
  Clock,
  Users,
  Calendar,
  Bell,
  Video,
  Coffee,
  Briefcase,
  Star,
  MessageSquare,
  CheckCircle,
  XCircle
} from 'lucide-react';

const Events = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'calendar'>('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const mockEvents = [
    {
      id: '1',
      title: 'Team Building Workshop',
      description: 'Annual team building activities and workshops to improve collaboration.',
      type: 'workshop',
      date: '2024-01-25',
      time: '09:00',
      duration: '4 hours',
      location: 'Conference Room A',
      isVirtual: false,
      organizer: 'HR Department',
      attendees: 25,
      maxAttendees: 30,
      status: 'confirmed',
      rsvpDeadline: '2024-01-23',
      tags: ['team-building', 'workshop', 'internal']
    },
    {
      id: '2',
      title: 'Client Presentation - TechCorp',
      description: 'Quarterly business review and project updates presentation for TechCorp.',
      type: 'meeting',
      date: '2024-01-26',
      time: '14:00',
      duration: '2 hours',
      location: 'Virtual Meeting',
      isVirtual: true,
      organizer: 'John Doe',
      attendees: 8,
      maxAttendees: 15,
      status: 'confirmed',
      rsvpDeadline: '2024-01-25',
      tags: ['client', 'presentation', 'quarterly']
    },
    {
      id: '3',
      title: 'Product Launch Event',
      description: 'Official launch event for our new mobile application with live demo.',
      type: 'launch',
      date: '2024-01-30',
      time: '18:00',
      duration: '3 hours',
      location: 'Innovation Hub, Gaborone',
      isVirtual: false,
      organizer: 'Marketing Team',
      attendees: 45,
      maxAttendees: 100,
      status: 'confirmed',
      rsvpDeadline: '2024-01-28',
      tags: ['product-launch', 'public', 'marketing']
    },
    {
      id: '4',
      title: 'Monthly All-Hands Meeting',
      description: 'Company-wide monthly meeting to discuss progress, updates, and announcements.',
      type: 'meeting',
      date: '2024-02-01',
      time: '10:00',
      duration: '1.5 hours',
      location: 'Main Conference Room',
      isVirtual: false,
      organizer: 'Management',
      attendees: 35,
      maxAttendees: 50,
      status: 'confirmed',
      rsvpDeadline: '2024-01-31',
      tags: ['all-hands', 'monthly', 'company']
    },
    {
      id: '5',
      title: 'Tech Conference 2024',
      description: 'Annual technology conference featuring industry leaders and innovation showcases.',
      type: 'conference',
      date: '2024-02-15',
      time: '08:00',
      duration: '8 hours',
      location: 'Gaborone International Convention Centre',
      isVirtual: false,
      organizer: 'Tech Community',
      attendees: 150,
      maxAttendees: 500,
      status: 'confirmed',
      rsvpDeadline: '2024-02-10',
      tags: ['conference', 'technology', 'networking']
    }
  ];

  const pastEvents = [
    {
      id: '6',
      title:  'Year-End Celebration',
      description: 'Company year-end party and awards ceremony.',
      type: 'social',
      date: '2023-12-15',
      time: '19:00',
      duration: '4 hours',
      location: 'Hotel Ballroom',
      isVirtual: false,
      organizer: 'HR Department',
      attendees: 80,
      maxAttendees: 100,
      status: 'completed',
      feedback: 4.8,
      tags: ['celebration', 'awards', 'social']
    },
    {
      id: '7',
      title: 'Q4 Business Review',
      description: 'Quarterly business performance review and planning session.',
      type: 'meeting',
      date: '2023-12-20',
      time: '09:00',
      duration: '3 hours',
      location: 'Boardroom',
      isVirtual: false,
      organizer: 'Executive Team',
      attendees: 12,
      maxAttendees: 15,
      status: 'completed',
      feedback: 4.2,
      tags: ['quarterly', 'business', 'review']
    }
  ];

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'meeting': return <Briefcase className="text-blue-500" size={20} />;
      case 'workshop': return <Users className="text-green-500" size={20} />;
      case 'conference': return <CalendarDays className="text-purple-500" size={20} />;
      case 'launch': return <Star className="text-orange-500" size={20} />;
      case 'social': return <Coffee className="text-pink-500" size={20} />;
      default: return <Calendar className="text-gray-500" size={20} />;
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800';
      case 'workshop': return 'bg-green-100 text-green-800';
      case 'conference': return 'bg-purple-100 text-purple-800';
      case 'launch': return 'bg-orange-100 text-orange-800';
      case 'social': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !typeFilter || event.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const upcomingEvents = filteredEvents.filter(event => new Date(event.date) >= new Date());
  const eventTypes = [...new Set(mockEvents.map(e => e.type))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            Event Management
          </h1>
          <p className="text-gray-600 mt-1">Organize and manage company events, meetings, and activities</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-violet-700 hover:to-purple-700 transition-all flex items-center space-x-2 shadow-lg">
            <Plus size={20} />
            <span>New Event</span>
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors flex items-center space-x-2">
            <Calendar size={20} />
            <span>Calendar View</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-violet-500 to-violet-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{upcomingEvents.length}</div>
              <div className="text-violet-100 text-sm">Upcoming Events</div>
            </div>
            <CalendarDays size={32} className="text-violet-200" />
          </div>
          <div className="mt-4 text-violet-100 text-sm">Next 30 days</div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">
                {mockEvents.reduce((sum, event) => sum + event.attendees, 0)}
              </div>
              <div className="text-blue-100 text-sm">Total Attendees</div>
            </div>
            <Users size={32} className="text-blue-200" />
          </div>
          <div className="mt-4 text-blue-100 text-sm">All events</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">
                {pastEvents.length > 0 ? (pastEvents.reduce((sum, event) => sum + (event.feedback || 0), 0) / pastEvents.length).toFixed(1) : '0'}
              </div>
              <div className="text-green-100 text-sm">Avg Rating</div>
            </div>
            <Star size={32} className="text-green-200" />
          </div>
          <div className="mt-4 text-green-100 text-sm">Event satisfaction</div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{eventTypes.length}</div>
              <div className="text-orange-100 text-sm">Event Types</div>
            </div>
            <Briefcase size={32} className="text-orange-200" />
          </div>
          <div className="mt-4 text-orange-100 text-sm">Categories</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'upcoming', label: 'Upcoming Events', icon: CalendarDays },
              { id: 'past', label: 'Past Events', icon: Clock },
              { id: 'calendar', label: 'Calendar View', icon: Calendar }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-violet-500 text-violet-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Search and Filter */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent w-full"
              />
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              {eventTypes.map(type => (
                <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
              ))}
            </select>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
              <Filter size={16} />
              <span>More Filters</span>
            </button>
          </div>

          {/* Upcoming Events Tab */}
          {activeTab === 'upcoming' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {getEventTypeIcon(event.type)}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                          <p className="text-sm text-gray-600">{event.organizer}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                          {event.type}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                          {event.status}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center space-x-3 text-sm text-gray-600">
                        <Calendar size={16} />
                        <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                        <Clock size={16} />
                        <span>{event.duration}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3 text-sm text-gray-600">
                        {event.isVirtual ? (
                          <>
                            <Video size={16} />
                            <span>{event.location}</span>
                          </>
                        ) : (
                          <>
                            <MapPin size={16} />
                            <span>{event.location}</span>
                          </>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-3 text-sm text-gray-600">
                        <Users size={16} />
                        <span>{event.attendees}/{event.maxAttendees} attendees</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-violet-500 h-2 rounded-full"
                            style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {event.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-500">
                        RSVP by {new Date(event.rsvpDeadline).toLocaleDateString()}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors text-sm">
                          View Details
                        </button>
                        <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <CheckCircle size={16} />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <MessageSquare size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Past Events Tab */}
          {activeTab === 'past' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {pastEvents.map((event) => (
                  <div key={event.id} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {getEventTypeIcon(event.type)}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                          <p className="text-sm text-gray-600">{event.organizer}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                          {event.type}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                          {event.status}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center space-x-3 text-sm text-gray-600">
                        <Calendar size={16} />
                        <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3 text-sm text-gray-600">
                        <Users size={16} />
                        <span>{event.attendees} attendees</span>
                      </div>
                      
                      {event.feedback && (
                        <div className="flex items-center space-x-3 text-sm">
                          <Star className="text-yellow-500" size={16} />
                          <span className="text-gray-900 font-medium">{event.feedback}/5.0</span>
                          <span className="text-gray-600">feedback rating</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-500">
                        Completed on {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm">
                          View Report
                        </button>
                        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <MessageSquare size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Calendar View Tab */}
          {activeTab === 'calendar' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Calendar View</h3>
              <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 rounded-xl p-12">
                <div className="text-center">
                  <CalendarDays size={64} className="mx-auto text-violet-400 mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Calendar Integration</h4>
                  <p className="text-gray-600 mb-6">Interactive calendar view will be available here</p>
                  <button className="bg-violet-600 text-white px-6 py-3 rounded-xl hover:bg-violet-700 transition-colors">
                    Enable Calendar View
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;