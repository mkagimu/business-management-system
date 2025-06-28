import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  Clock,
  MapPin,
  Users,
  Video,
  Bell
} from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');

  const mockEvents = [
    {
      id: '1',
      title: 'Team Meeting',
      date: '2024-01-25',
      time: '10:00',
      duration: '1 hour',
      type: 'meeting',
      location: 'Conference Room A',
      attendees: ['John Doe', 'Jane Smith', 'Mike Johnson'],
      isVirtual: false
    },
    {
      id: '2',
      title: 'Client Presentation',
      date: '2024-01-26',
      time: '14:00',
      duration: '2 hours',
      type: 'presentation',
      location: 'Virtual Meeting',
      attendees: ['Alice Brown', 'Bob Wilson'],
      isVirtual: true
    },
    {
      id: '3',
      title: 'Project Deadline',
      date: '2024-01-28',
      time: '17:00',
      duration: '30 minutes',
      type: 'deadline',
      location: 'Office',
      attendees: ['Carol Davis'],
      isVirtual: false
    },
    {
      id: '4',
      title: 'Monthly Review',
      date: '2024-01-30',
      time: '09:00',
      duration: '3 hours',
      type: 'review',
      location: 'Boardroom',
      attendees: ['Management Team'],
      isVirtual: false
    }
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return mockEvents.filter(event => event.date === dateString);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-500';
      case 'presentation': return 'bg-purple-500';
      case 'deadline': return 'bg-red-500';
      case 'review': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-6 p-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900">
            Calendar
          </h1>
          <p className="text-slate-700 mt-1 font-medium">Manage your schedule and upcoming events</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all flex items-center space-x-2 border-2 border-teal-600 font-bold shadow-lg">
            <Plus size={20} />
            <span>New Event</span>
          </button>
          <div className="flex items-center bg-white rounded-lg p-1 border-2 border-slate-300">
            {['month', 'week', 'day'].map((viewType) => (
              <button
                key={viewType}
                onClick={() => setView(viewType as any)}
                className={`px-3 py-1 rounded-md text-sm font-bold transition-all border ${
                  view === viewType 
                    ? 'bg-slate-100 text-slate-900 border-slate-400' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border-transparent'
                }`}
              >
                {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg border-2 border-slate-300 shadow-lg overflow-hidden">
            {/* Calendar Header */}
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-slate-900">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => navigateMonth('prev')}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors border border-slate-300"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => setCurrentDate(new Date())}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-bold border-2 border-teal-600"
                  >
                    Today
                  </button>
                  <button
                    onClick={() => navigateMonth('next')}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors border border-slate-300"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="p-6">
              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {dayNames.map(day => (
                  <div key={day} className="p-3 text-center font-black text-slate-700 text-sm border border-slate-200 bg-slate-100">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => {
                  if (!day) {
                    return <div key={index} className="p-3 h-24 border border-slate-200"></div>;
                  }

                  const events = getEventsForDate(day);
                  const isToday = day.toDateString() === new Date().toDateString();
                  const isSelected = day.toDateString() === selectedDate.toDateString();

                  return (
                    <div
                      key={index}
                      onClick={() => setSelectedDate(day)}
                      className={`p-2 h-24 border border-slate-200 rounded cursor-pointer transition-all hover:bg-slate-50 hover:border-slate-400 ${
                        isToday ? 'bg-teal-100 border-teal-400' : ''
                      } ${isSelected ? 'bg-blue-100 border-blue-400' : ''}`}
                    >
                      <div className={`text-sm font-black mb-1 ${
                        isToday ? 'text-teal-700' : 'text-slate-900'
                      }`}>
                        {day.getDate()}
                      </div>
                      <div className="space-y-1">
                        {events.slice(0, 2).map(event => (
                          <div
                            key={event.id}
                            className={`text-xs px-2 py-1 rounded text-white truncate border border-white ${getEventTypeColor(event.type)}`}
                          >
                            {event.title}
                          </div>
                        ))}
                        {events.length > 2 && (
                          <div className="text-xs text-slate-500 font-medium">
                            +{events.length - 2} more
                          </div>
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
          {/* Today's Events */}
          <div className="bg-white rounded-lg border-2 border-slate-300 shadow-lg p-6">
            <h3 className="text-lg font-black text-slate-900 mb-4">Today's Events</h3>
            <div className="space-y-3">
              {getEventsForDate(new Date()).map(event => (
                <div key={event.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-slate-900">{event.title}</h4>
                    <span className={`w-3 h-3 rounded-full border border-white ${getEventTypeColor(event.type)}`}></span>
                  </div>
                  <div className="space-y-1 text-sm text-slate-600">
                    <div className="flex items-center space-x-2">
                      <Clock size={14} />
                      <span className="font-medium">{event.time} ({event.duration})</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {event.isVirtual ? <Video size={14} /> : <MapPin size={14} />}
                      <span className="font-medium">{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users size={14} />
                      <span className="font-medium">{event.attendees.length} attendees</span>
                    </div>
                  </div>
                </div>
              ))}
              {getEventsForDate(new Date()).length === 0 && (
                <p className="text-slate-500 text-sm font-medium">No events scheduled for today</p>
              )}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-lg border-2 border-slate-300 shadow-lg p-6">
            <h3 className="text-lg font-black text-slate-900 mb-4">Upcoming Events</h3>
            <div className="space-y-3">
              {mockEvents.slice(0, 3).map(event => (
                <div key={event.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-slate-900">{event.title}</h4>
                    <span className={`w-3 h-3 rounded-full border border-white ${getEventTypeColor(event.type)}`}></span>
                  </div>
                  <div className="text-sm text-slate-600 font-medium">
                    {new Date(event.date).toLocaleDateString()} at {event.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg border-2 border-slate-300 shadow-lg p-6">
            <h3 className="text-lg font-black text-slate-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full p-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-bold border-2 border-teal-600">
                Schedule Meeting
              </button>
              <button className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-bold border-2 border-blue-600">
                Block Time
              </button>
              <button className="w-full p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-bold border-2 border-purple-600">
                Set Reminder
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;