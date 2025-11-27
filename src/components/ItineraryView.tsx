import { useState } from 'react';
import { ChevronDown, ChevronUp, Plus, Hotel, UtensilsCrossed, MapPin, Calendar, DollarSign } from 'lucide-react';

const CATEGORY_ICONS = {
  accommodation: Hotel,
  restaurant: UtensilsCrossed,
  attraction: MapPin,
  activity: Calendar,
  transport: Calendar,
  other: MapPin,
};

const MOCK_ITINERARY = {
  id: '1',
  title: 'Weekend in Paris',
  destination: 'Paris, France',
  total_budget: 500,
  spent_budget: 245,
  days: [
    {
      id: 'd1',
      day_number: 1,
      title: 'Arrival & City Exploration',
      items: [
        {
          id: 'i1',
          category: 'accommodation',
          title: 'Hotel Le Marais',
          location_name: 'Le Marais District',
          start_time: '15:00',
          cost: 120,
        },
        {
          id: 'i2',
          category: 'restaurant',
          title: 'Bistro Paul Bert',
          location_name: '18 Rue Paul Bert',
          start_time: '19:30',
          cost: 45,
        },
      ],
    },
    {
      id: 'd2',
      day_number: 2,
      title: 'Museums & Culture',
      items: [
        {
          id: 'i3',
          category: 'attraction',
          title: 'Louvre Museum',
          location_name: 'Rue de Rivoli',
          start_time: '10:00',
          cost: 17,
        },
        {
          id: 'i4',
          category: 'restaurant',
          title: 'Café de Flore',
          location_name: 'Saint-Germain',
          start_time: '13:00',
          cost: 28,
        },
        {
          id: 'i5',
          category: 'activity',
          title: 'Seine River Cruise',
          location_name: 'Port de la Bourdonnais',
          start_time: '18:00',
          cost: 35,
        },
      ],
    },
    {
      id: 'd3',
      day_number: 3,
      title: 'Departure',
      items: [],
    },
  ],
};

export function ItineraryView() {
  const [expandedDays, setExpandedDays] = useState<Set<string>>(new Set(['d1', 'd2']));

  const toggleDay = (dayId: string) => {
    const newExpanded = new Set(expandedDays);
    if (newExpanded.has(dayId)) {
      newExpanded.delete(dayId);
    } else {
      newExpanded.add(dayId);
    }
    setExpandedDays(newExpanded);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 lg:p-8">
      <div className="mb-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {MOCK_ITINERARY.title}
            </h1>
            <p className="text-gray-600">{MOCK_ITINERARY.destination}</p>
          </div>

          <div className="bg-gray-100 rounded-xl px-6 py-4">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-5 h-5 text-coral-600" />
              <span className="text-2xl font-bold text-gray-900">
                ${MOCK_ITINERARY.spent_budget}
              </span>
              <span className="text-gray-600">/ ${MOCK_ITINERARY.total_budget}</span>
            </div>
            <p className="text-xs text-gray-600">{MOCK_ITINERARY.days.length} days</p>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <button className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200
                           text-sm font-medium text-gray-700 transition-colors">
            Itinerary
          </button>
          <button className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600
                           hover:bg-gray-100 transition-colors">
            Notes
          </button>
          <button className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600
                           hover:bg-gray-100 transition-colors">
            Budget
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {MOCK_ITINERARY.days.map((day) => {
          const isExpanded = expandedDays.has(day.id);

          return (
            <div key={day.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleDay(day.id)}
                className="w-full flex items-center justify-between p-5 hover:bg-gray-50
                         transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-coral-500
                                flex items-center justify-center text-white font-bold text-lg">
                    {day.day_number}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">{day.title}</p>
                    <p className="text-sm text-gray-500">{day.items.length} activities</p>
                  </div>
                </div>

                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 space-y-3">
                  {day.items.map((item) => {
                    const Icon = CATEGORY_ICONS[item.category as keyof typeof CATEGORY_ICONS];

                    return (
                      <div
                        key={item.id}
                        className="flex items-start gap-4 p-4 rounded-xl bg-gray-50
                                 hover:bg-gray-100 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center
                                      shadow-sm">
                          <Icon className="w-5 h-5 text-gray-600" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h4 className="font-semibold text-gray-900">{item.title}</h4>
                              <p className="text-sm text-gray-600 mt-0.5">{item.location_name}</p>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className="text-sm font-semibold text-gray-900">${item.cost}</p>
                              <p className="text-xs text-gray-500">{item.start_time}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <button className="w-full flex items-center justify-center gap-2 p-4
                                   rounded-xl border-2 border-dashed border-gray-300
                                   hover:border-coral-400 hover:bg-coral-50
                                   text-gray-600 hover:text-coral-600
                                   transition-all duration-200">
                    <Plus className="w-5 h-5" />
                    <span className="font-medium">Add Place / Note / Budget Item</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}

        <button className="w-full flex items-center justify-center gap-2 p-4
                         rounded-2xl border-2 border-dashed border-gray-300
                         hover:border-coral-400 hover:bg-coral-50
                         text-gray-600 hover:text-coral-600
                         transition-all duration-200">
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add New Day</span>
        </button>
      </div>
    </div>
  );
}
