import { Clock, MapPin, Calendar } from 'lucide-react';

const RECENT_TRIP = {
  id: '1',
  image: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=600',
  title: 'Summer in Barcelona',
  destination: 'Barcelona, Spain',
  dates: 'Jul 15 - Jul 22',
  progress: 65,
};

const RECENT_SEARCHES = [
  'Best beaches in Greece',
  'Budget hotels Tokyo',
  'Things to do in Rome',
  'Street food Bangkok',
];

export function JumpBackIn() {
  return (
    <section className="animate-fade-in" style={{ animationDelay: '400ms' }}>
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Jump Back In</h3>

      <div className="space-y-3">
        <button className="w-full group animate-slide-up">
          <div className="relative rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-white
                        hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
            <div className="relative h-40 overflow-hidden">
              <img
                src={RECENT_TRIP.image}
                alt={RECENT_TRIP.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              <div className="absolute bottom-3 left-3 right-3">
                <h4 className="font-semibold text-white text-base mb-1.5">{RECENT_TRIP.title}</h4>
                <div className="flex items-center gap-3 text-white/90 text-xs">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{RECENT_TRIP.destination}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{RECENT_TRIP.dates}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 border-t border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-600">Trip planning</span>
                <span className="text-xs font-semibold text-coral-500">{RECENT_TRIP.progress}% complete</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-coral-500 rounded-full transition-all duration-500"
                  style={{ width: `${RECENT_TRIP.progress}%` }}
                />
              </div>
            </div>

            <div className="px-3 pb-3">
              <button className="w-full py-2 px-4 rounded-lg bg-coral-500 hover:bg-coral-600
                               text-white text-sm font-medium transition-colors">
                Resume Planning
              </button>
            </div>
          </div>
        </button>

        <div className="p-4 rounded-xl border border-gray-200 bg-white animate-slide-up"
             style={{ animationDelay: '100ms' }}>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-gray-500" />
            <h4 className="text-sm font-semibold text-gray-900">Recent Searches</h4>
          </div>

          <div className="flex flex-wrap gap-2">
            {RECENT_SEARCHES.map((search, index) => (
              <button
                key={index}
                className="px-3 py-1.5 rounded-full border border-gray-200 bg-gray-50
                         hover:bg-coral-50 hover:border-coral-300 text-xs font-medium text-gray-700
                         transition-all duration-200 transform hover:scale-105"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
