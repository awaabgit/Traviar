import { Lightbulb, Clock, MapPin } from 'lucide-react';

export function AIReminderSuggestions() {
  const suggestions = [
    {
      icon: Clock,
      title: 'Book tickets in advance',
      description: 'Popular attractions like the Eiffel Tower often sell out. Book 2-3 days ahead.',
      color: 'blue',
    },
    {
      icon: MapPin,
      title: 'Check neighborhood safety',
      description: 'Some areas are best avoided after dark. Research your hotel location.',
      color: 'yellow',
    },
    {
      icon: Lightbulb,
      title: 'Consider a museum pass',
      description: 'Save time and money with a multi-day pass for museums and attractions.',
      color: 'purple',
    },
  ];

  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200',
    yellow: 'bg-yellow-50 border-yellow-200',
    purple: 'bg-purple-50 border-purple-200',
  };

  const iconColors = {
    blue: 'text-blue-600',
    yellow: 'text-yellow-600',
    purple: 'text-purple-600',
  };

  return (
    <div className="bg-white rounded-[18px] shadow-soft border border-gray-100 p-6
                    hover:shadow-soft-lg transition-all duration-300">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 rounded-lg bg-coral-100">
          <Lightbulb className="w-5 h-5 text-coral-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">AI Suggestions</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {suggestions.map((suggestion, index) => {
          const Icon = suggestion.icon;
          const colorClass = colorClasses[suggestion.color as keyof typeof colorClasses];
          const iconColor = iconColors[suggestion.color as keyof typeof iconColors];

          return (
            <div
              key={suggestion.title}
              style={{ animationDelay: `${index * 100}ms` }}
              className={`p-5 rounded-xl border-2 transition-all duration-200
                       hover:shadow-md cursor-pointer animate-slide-up-fade
                       transform hover:scale-105 ${colorClass}`}
            >
              <Icon className={`w-6 h-6 mb-3 ${iconColor}`} />
              <h4 className="text-sm font-semibold text-gray-900 mb-2">{suggestion.title}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{suggestion.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
