import { useState } from 'react';
import { Calendar, MapPin, Users, DollarSign, ChevronDown, ChevronUp, Clock } from 'lucide-react';

interface Activity {
  id: string;
  title: string;
  time: string;
  category: string;
  thumbnail: string;
}

interface Day {
  dayNumber: number;
  city: string;
  activities: Activity[];
}

const MOCK_TRIP_DATA = {
  name: 'Summer in Paris',
  emoji: '🗼',
  dateRange: 'Jun 15 - Jun 20, 2024',
  duration: '5 days',
  destination: 'Paris',
  travelers: '2 travelers',
  budget: '$$',
  days: [
    {
      dayNumber: 1,
      city: 'Paris',
      activities: [
        {
          id: '1-1',
          title: 'Eiffel Tower Visit',
          time: '9:00 AM',
          category: 'attraction',
          thumbnail: 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=80',
        },
        {
          id: '1-2',
          title: 'Le Comptoir du Relais',
          time: '12:30 PM',
          category: 'restaurant',
          thumbnail: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=80',
        },
        {
          id: '1-3',
          title: 'Seine River Cruise',
          time: '3:00 PM',
          category: 'activity',
          thumbnail: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=80',
        },
      ],
    },
    {
      dayNumber: 2,
      city: 'Paris',
      activities: [
        {
          id: '2-1',
          title: 'Louvre Museum',
          time: '9:00 AM',
          category: 'attraction',
          thumbnail: 'https://images.pexels.com/photos/2675269/pexels-photo-2675269.jpeg?auto=compress&cs=tinysrgb&w=80',
        },
        {
          id: '2-2',
          title: 'Angelina Paris',
          time: '12:00 PM',
          category: 'restaurant',
          thumbnail: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=80',
        },
        {
          id: '2-3',
          title: 'Tuileries Garden',
          time: '2:00 PM',
          category: 'activity',
          thumbnail: 'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&w=80',
        },
      ],
    },
    {
      dayNumber: 3,
      city: 'Paris',
      activities: [
        {
          id: '3-1',
          title: 'Montmartre Walking Tour',
          time: '9:30 AM',
          category: 'activity',
          thumbnail: 'https://images.pexels.com/photos/1125212/pexels-photo-1125212.jpeg?auto=compress&cs=tinysrgb&w=80',
        },
        {
          id: '3-2',
          title: 'Le Consulat',
          time: '1:00 PM',
          category: 'restaurant',
          thumbnail: 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=80',
        },
        {
          id: '3-3',
          title: 'Sacré-Cœur Basilica',
          time: '3:30 PM',
          category: 'attraction',
          thumbnail: 'https://images.pexels.com/photos/208733/pexels-photo-208733.jpeg?auto=compress&cs=tinysrgb&w=80',
        },
      ],
    },
  ] as Day[],
};

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    restaurant: 'bg-orange-100 text-orange-700',
    attraction: 'bg-blue-100 text-blue-700',
    activity: 'bg-green-100 text-green-700',
    hotel: 'bg-purple-100 text-purple-700',
  };
  return colors[category] || 'bg-gray-100 text-gray-700';
};

export function TripSheetPanel() {
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set([1]));

  const toggleDay = (dayNumber: number) => {
    const newExpanded = new Set(expandedDays);
    if (newExpanded.has(dayNumber)) {
      newExpanded.delete(dayNumber);
    } else {
      newExpanded.add(dayNumber);
    }
    setExpandedDays(newExpanded);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm mb-4 animate-fade-in">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{MOCK_TRIP_DATA.emoji}</span>
            <div>
              <h3 className="font-bold text-gray-900">{MOCK_TRIP_DATA.name}</h3>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {MOCK_TRIP_DATA.dateRange}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-full bg-coral-50 text-coral-700 font-medium flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {MOCK_TRIP_DATA.destination}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 font-medium">
            {MOCK_TRIP_DATA.duration}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 font-medium flex items-center gap-1">
            <Users className="w-3 h-3" />
            {MOCK_TRIP_DATA.travelers}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 font-medium flex items-center gap-1">
            <DollarSign className="w-3 h-3" />
            {MOCK_TRIP_DATA.budget}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {MOCK_TRIP_DATA.days.map((day, index) => {
          const isExpanded = expandedDays.has(day.dayNumber);

          return (
            <div
              key={day.dayNumber}
              className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden
                       transition-all duration-200 hover:shadow-md animate-slide-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <button
                onClick={() => toggleDay(day.dayNumber)}
                className="w-full flex items-center justify-between p-3.5 text-left
                         hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-coral-500 text-white
                                flex items-center justify-center text-sm font-bold">
                    {day.dayNumber}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      Day {day.dayNumber}
                    </p>
                    <p className="text-xs text-gray-600 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {day.city} · {day.activities.length} stops
                    </p>
                  </div>
                </div>

                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </button>

              {isExpanded && (
                <div className="px-3 pb-3 space-y-2 animate-slide-in-down">
                  {day.activities.map((activity) => (
                    <button
                      key={activity.id}
                      className="w-full flex items-center gap-3 p-2 rounded-lg
                               hover:bg-gray-50 transition-all duration-200
                               transform hover:scale-[1.01] group"
                    >
                      <img
                        src={activity.thumbnail}
                        alt={activity.title}
                        className="w-10 h-10 rounded-lg object-cover flex-shrink-0
                                 group-hover:scale-110 transition-transform duration-200"
                      />

                      <div className="flex-1 min-w-0 text-left">
                        <p className="font-medium text-sm text-gray-900 truncate">
                          {activity.title}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-gray-600 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {activity.time}
                          </span>
                          <span className={`text-xs px-1.5 py-0.5 rounded ${getCategoryColor(activity.category)}`}>
                            {activity.category}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
