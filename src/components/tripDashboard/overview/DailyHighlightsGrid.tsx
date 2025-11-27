import { MapPin, Clock } from 'lucide-react';

interface DailyHighlightsGridProps {
  tripId: string;
}

const MOCK_DAILY_HIGHLIGHTS = [
  { day: 1, emoji: '🗼', title: 'Iconic Landmarks', activities: 5, duration: '6h 30m' },
  { day: 2, emoji: '🍽️', title: 'Culinary Tour', activities: 4, duration: '5h 00m' },
  { day: 3, emoji: '🎨', title: 'Museums & Art', activities: 3, duration: '4h 45m' },
  { day: 4, emoji: '🛍️', title: 'Shopping & Markets', activities: 4, duration: '5h 15m' },
  { day: 5, emoji: '🌳', title: 'Parks & Nature', activities: 3, duration: '4h 00m' },
  { day: 6, emoji: '🎭', title: 'Entertainment', activities: 4, duration: '6h 00m' },
];

export function DailyHighlightsGrid({ tripId }: DailyHighlightsGridProps) {
  return (
    <div className="bg-white rounded-[18px] shadow-soft border border-gray-100 p-6
                    hover:shadow-soft-lg transition-all duration-300">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Daily Highlights</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {MOCK_DAILY_HIGHLIGHTS.map((day, index) => (
          <div
            key={day.day}
            style={{ animationDelay: `${index * 60}ms` }}
            className="flex flex-col items-center gap-3 p-4 rounded-xl border border-gray-200
                     hover:border-coral-300 hover:bg-coral-50 hover:shadow-md
                     transition-all duration-200 cursor-pointer animate-slide-up-fade
                     transform hover:scale-105 group"
          >
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center
                          text-2xl group-hover:scale-110 transition-transform duration-200">
              {day.emoji}
            </div>
            <div className="text-center space-y-1">
              <div className="text-xs font-semibold text-gray-500">Day {day.day}</div>
              <div className="text-sm font-medium text-gray-900 leading-tight">{day.title}</div>
              <div className="flex items-center justify-center gap-1 text-xs text-gray-600">
                <MapPin className="w-3 h-3" />
                <span>{day.activities}</span>
              </div>
              <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>{day.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
