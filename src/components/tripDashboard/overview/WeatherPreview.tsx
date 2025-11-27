import { Cloud, CloudRain, Sun, Wind } from 'lucide-react';

interface WeatherPreviewProps {
  destination: string;
}

const MOCK_WEATHER = [
  { day: 'Mon', high: 75, low: 62, condition: 'sunny', precipitation: 10 },
  { day: 'Tue', high: 72, low: 60, condition: 'cloudy', precipitation: 30 },
  { day: 'Wed', high: 68, low: 58, condition: 'rainy', precipitation: 70 },
  { day: 'Thu', high: 70, low: 59, condition: 'cloudy', precipitation: 40 },
  { day: 'Fri', high: 74, low: 61, condition: 'sunny', precipitation: 15 },
  { day: 'Sat', high: 76, low: 63, condition: 'sunny', precipitation: 5 },
  { day: 'Sun', high: 78, low: 64, condition: 'sunny', precipitation: 10 },
];

export function WeatherPreview({ destination }: WeatherPreviewProps) {
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="w-8 h-8 text-gray-400" />;
      case 'rainy':
        return <CloudRain className="w-8 h-8 text-blue-500" />;
      default:
        return <Sun className="w-8 h-8 text-yellow-500" />;
    }
  };

  return (
    <div className="bg-white rounded-[18px] shadow-soft border border-gray-100 p-6
                    hover:shadow-soft-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">7-Day Weather</h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Wind className="w-4 h-4" />
          <span>{destination}</span>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide -mx-2 px-2">
        {MOCK_WEATHER.map((day, index) => (
          <div
            key={day.day}
            style={{ animationDelay: `${index * 50}ms` }}
            className="flex-shrink-0 flex flex-col items-center gap-2 p-3 rounded-xl
                     hover:bg-gray-50 transition-all duration-200 animate-fade-in
                     transform hover:scale-105 cursor-pointer min-w-[80px]"
          >
            <span className="text-sm font-medium text-gray-600">{day.day}</span>
            <div className="transform hover:scale-110 transition-transform duration-200">
              {getWeatherIcon(day.condition)}
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">{day.high}°</div>
              <div className="text-sm text-gray-500">{day.low}°</div>
            </div>
            <div className="text-xs text-blue-600">{day.precipitation}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}
