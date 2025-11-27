import { TripDay } from '../../hooks/useTripData';

interface CalendarTabProps {
  days: TripDay[];
  selectedDayNumber: number;
  onSelectDay: (dayNumber: number) => void;
}

export function CalendarTab({ days, selectedDayNumber, onSelectDay }: CalendarTabProps) {
  const selectedDay = days.find(d => d.day_number === selectedDayNumber) || days[0];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatDayName = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const timeSlots = [
    'All day',
    '8:00 AM',
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
    '6:00 PM',
    '7:00 PM',
    '8:00 PM',
  ];

  return (
    <div className="bg-white rounded-2xl shadow-soft-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Calendar · {days.length} days
        </h2>

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {days.map((day) => (
            <button
              key={day.id}
              onClick={() => onSelectDay(day.day_number)}
              className={`flex-shrink-0 px-4 py-3 rounded-lg border-2 transition-all ${
                selectedDayNumber === day.day_number
                  ? 'border-coral-500 bg-coral-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`text-sm font-medium ${
                selectedDayNumber === day.day_number ? 'text-coral-600' : 'text-gray-600'
              }`}>
                {formatDayName(day.date)}
              </div>
              <div className={`text-lg font-bold ${
                selectedDayNumber === day.day_number ? 'text-coral-600' : 'text-gray-900'
              }`}>
                {formatDate(day.date)}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="grid grid-cols-[120px_1fr] divide-y divide-gray-200">
          {timeSlots.map((slot) => (
            <div key={slot} className="contents">
              <div className="p-3 bg-gray-50 text-sm font-medium text-gray-600 border-r border-gray-200">
                {slot}
              </div>
              <div className="p-3 min-h-[60px] hover:bg-gray-50 transition-colors">
                {slot === '10:00 AM' && selectedDay?.activities[0] && (
                  <div className="bg-coral-100 border-l-4 border-coral-500 rounded px-3 py-2">
                    <div className="font-medium text-sm text-gray-900">
                      {selectedDay.activities[0].title}
                    </div>
                  </div>
                )}
                {slot === '1:00 PM' && selectedDay?.activities[1] && (
                  <div className="bg-blue-100 border-l-4 border-blue-500 rounded px-3 py-2">
                    <div className="font-medium text-sm text-gray-900">
                      {selectedDay.activities[1].title}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-center text-sm text-gray-500">
        Drag to rearrange (coming soon)
      </div>
    </div>
  );
}
